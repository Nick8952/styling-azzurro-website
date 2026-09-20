/**
 * Inhaltsmodell der Website.
 *
 * Diese Typen sind die gemeinsame Schnittstelle zwischen Darstellung und
 * Inhaltsquelle. Komponenten kennen ausschliesslich diese Typen, nie die
 * lokalen Dateien unter data/ und nie Sanity-Dokumente. Der spätere Wechsel
 * auf Sanity tauscht nur die Implementierung der Inhaltsquelle aus
 * (lib/inhalt/index.ts, eine Zeile).
 */

/* ------------------------------------------------------------------ Rich Text */

/** Textabschnitt innerhalb eines Blocks. Kompatibel zu Sanitys Portable Text. */
export type TextSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
};

export type Markierung =
  | { _type: "link"; _key: string; href: string; extern?: boolean }
  | { _type: "telefon"; _key: string; nummer: string };

export type TextBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet" | "number";
  level?: number;
  children: TextSpan[];
  markDefs?: Markierung[];
};

export type RichText = TextBlock[];

/* ---------------------------------------------------------------------- Bilder */

export type Bildvariante = { breite: number; pfad: string };

/**
 * Ein Bild, wie es die Darstellung braucht: bereits aufgelöst.
 *
 * Die lokale Quelle löst Manifest-Schlüssel auf (scripts/bilder-aufbereiten.mjs),
 * die spätere Sanity-Quelle löst Asset-Referenzen inkl. Zuschnitt auf. Die
 * Komponenten wissen nichts von beidem. `absolut` = true bedeutet, dass die
 * Adresse schon auf den Zielserver zeigt und kein Repository-Unterpfad
 * vorangestellt werden darf (Sanity-CDN).
 */
export type Bild = {
  src: string;
  breite: number;
  hoehe: number;
  alt: string;
  /** Optionale Bildlegende unter dem Bild. */
  legende?: string;
  /** Winzige Vorschau als Data-URL gegen Layoutsprünge. Leer, wenn unbekannt. */
  unschaerfe: string;
  varianten: { avif: Bildvariante[]; webp: Bildvariante[] };
  absolut: boolean;
};

/**
 * Verweis auf ein Bild in den lokalen Inhaltsdateien. Wird von der lokalen
 * Quelle in ein `Bild` aufgelöst und erreicht die Komponenten nie.
 */
export type Bildverweis = { schluessel: string; alt: string; legende?: string };

/* ----------------------------------------------------- Kontakt & Öffnungszeiten */

export type Kontakt = {
  betriebsname: string;
  /** Ansprechperson laut Kontaktseite der Quellwebsite («Rullo Antonella»). Keine Rolle, weil nicht belegt. */
  ansprechperson: string;
  strasse: string;
  plz: string;
  ort: string;
  /** Stadtteil, sofern belegt (Postleitzahl 8051 = Zürich-Schwamendingen). */
  quartier?: string;
  land: string;
  telefon: string;
  /** Telefonnummer in tel:-Schreibweise. */
  telefonLink: string;
  email: string;
  /** Adresse der bisherigen Website. */
  website: string;
  facebook?: string;
  /** Externer Routenlink (öffnet Google Maps in neuem Fenster, kein Embed). */
  routenlink: string;
  /** Anreise mit dem ÖV, wörtlich von der Quellwebsite. */
  oev: string;
};

export type Zeitfenster = { von: string; bis: string };

export type Wochentag = "Montag" | "Dienstag" | "Mittwoch" | "Donnerstag" | "Freitag" | "Samstag" | "Sonntag";

export type Tageszeit = {
  tag: Wochentag;
  geschlossen: boolean;
  zeiten: Zeitfenster[];
};

export type Sonderzeit = {
  bezeichnung: string;
  /** ISO-Datum, z. B. "2026-12-24". */
  datum: string;
  geschlossen: boolean;
  zeiten: Zeitfenster[];
};

export type Oeffnungszeiten = {
  woche: Tageszeit[];
  sonderzeiten: Sonderzeit[];
  /** Hinweis zur Terminvereinbarung, z. B. «Termine nach telefonischer Vereinbarung». */
  terminHinweis: string;
  /** Woher die Angaben stammen. */
  quelle: string;
};

/* --------------------------------------------------------------- Seiten & Meta */

export type Seo = {
  titel: string;
  beschreibung: string;
};

export type Navigationspunkt = {
  beschriftung: string;
  ziel: string;
  extern?: boolean;
};

export type Websiteeinstellungen = {
  name: string;
  kurzname: string;
  beschreibung: string;
  kontakt: Kontakt;
  oeffnungszeiten: Oeffnungszeiten;
  hauptnavigation: Navigationspunkt[];
  /** Rechtliche Links, auf jeder Seite im Fuss. */
  rechtsnavigation: Navigationspunkt[];
  /** Wird auf jeder Seite als Demo-Kennzeichnung angezeigt. */
  demohinweis: string;
};

/* ------------------------------------------------------------------ Startseite */

export type Startseite = {
  seo: Seo;
  heroTitel: string;
  heroText: string;
  heroBild: Bild;
  willkommenTitel: string;
  willkommenText: RichText;
  /** Grussformel und Namen, wörtlich von der Quellwebsite. */
  grussformel: string;
  unterzeichnende: string;
  teamTitel: string;
  teamText: string;
  teamBild: Bild;
  preiseTitel: string;
  preiseText: string;
  /** Leistungen aus der Preisliste, die auf der Startseite als Auszug erscheinen. */
  preisAuszug: { kategorie: string; leistung: string }[];
  salonTitel: string;
  salonText: string;
  salonBilder: Bild[];
  gaestebuchTitel: string;
  /** Nummern der Einträge, die auf der Startseite erscheinen. */
  gaestebuchAuszug: number[];
};

/* ------------------------------------------------------------------------ Team */

export type Teammitglied = {
  name: string;
  /** Rolle nur, wenn vom Salon belegt. Sonst leer. */
  rolle?: string;
  /** Einzelporträt nur, wenn die Zuordnung belegt ist. */
  bild?: Bild;
};

export type Teamseite = {
  seo: Seo;
  titel: string;
  einleitung: string;
  mitglieder: Teammitglied[];
  /** Gemeinsame Fotos ohne Einzelzuordnung. */
  bilder: Bild[];
  /** Sichtbarer Hinweis zur Bildzuordnung. */
  bildhinweis?: string;
};

/* ----------------------------------------------------------------------- Salon */

export type Salonseite = {
  seo: Seo;
  titel: string;
  einleitung: string;
  galerie: Bild[];
};

/* ------------------------------------------------------------------ Preisliste */

/**
 * `fest`       ausgewiesener Preis
 * `ab`         Preis «ab CHF …», nach oben offen
 * `aufAnfrage` kein Betrag, Preis nach Beratung
 */
export type Preisart = "fest" | "ab" | "aufAnfrage";

export type Preisposition = {
  leistung: string;
  /** z. B. «Kurzhaar», «AHV Mittellanghaar», «bis 6 Jahren». Leer = keine Variante. */
  variante?: string;
  preisart: Preisart;
  /** Betrag in CHF. Pflicht bei fest/ab, leer bei aufAnfrage. */
  betrag?: number;
  hinweis?: string;
};

export type Preiskategorie = {
  titel: string;
  positionen: Preisposition[];
};

export type Preisliste = {
  seo: Seo;
  titel: string;
  einleitung: string;
  waehrung: "CHF";
  kategorien: Preiskategorie[];
  /** Bedingungen, wörtlich von der Quellwebsite. Erscheinen sichtbar bei der Liste. */
  hinweise: string[];
  /** Woher die Preise stammen. */
  quelle: string;
};

/* ------------------------------------------------------------------- Gästebuch */

export type Gaestebucheintrag = {
  nummer: number;
  name: string;
  /** ISO-Zeitpunkt, z. B. "2024-01-31T08:16". */
  datum: string;
  text: string;
  /** false = im Inhaltsmodell erfasst, aber nicht öffentlich angezeigt. */
  sichtbar: boolean;
  /** Grund, falls nicht sichtbar. */
  grund?: string;
};

export type Gaestebuchseite = {
  seo: Seo;
  titel: string;
  einleitung: string;
  eintraege: Gaestebucheintrag[];
  /** Erklärt, wie neue Einträge in der Demo möglich sind. */
  neuerEintragTitel: string;
  neuerEintragText: string;
};

/* -------------------------------------------------------------------- Lageplan */

export type Lageplan = {
  seo: Seo;
  titel: string;
  einleitung: string;
  karte: {
    anbieter: "google";
    /** Einbettungsadresse, wird erst nach Einwilligung geladen. */
    einbettungsUrl: string;
    titel: string;
  };
  anreiseTitel: string;
  anreise: RichText;
};

/* --------------------------------------------------------------------- Kontakt */

export type Kontaktseite = {
  seo: Seo;
  titel: string;
  einleitung: string;
  terminTitel: string;
  terminText: RichText;
  formularTitel: string;
  formularText: string;
};

/* ------------------------------------------------------------------ Rechtstext */

export type Rechtstext = {
  art: "impressum" | "datenschutz";
  titel: string;
  stand: string;
  inhalt: RichText;
  seo: Seo;
};

/* ------------------------------------------------------- Freie Seiten/Bausteine */

/**
 * Begrenzter Satz an Bausteinen für zusätzliche Seiten, die später im CMS
 * angelegt werden. Jede feste Seite der Demo nutzt dieselben Komponenten.
 */
export type Baustein =
  | { _type: "textblock"; _key: string; titel?: string; inhalt: RichText }
  | { _type: "bildblock"; _key: string; bild: Bild; breit: boolean }
  | { _type: "galerieblock"; _key: string; titel?: string; bilder: Bild[] }
  | { _type: "preisauszug"; _key: string; titel?: string; kategorien: string[] }
  | { _type: "teamblock"; _key: string; titel?: string }
  | { _type: "kontaktblock"; _key: string; titel?: string }
  | { _type: "oeffnungszeitenblock"; _key: string; titel?: string }
  | { _type: "kartenblock"; _key: string; titel?: string }
  | { _type: "gaestebuchauszug"; _key: string; titel?: string; nummern: number[] };

export type Seite = {
  slug: string;
  titel: string;
  einleitung?: string;
  bausteine: Baustein[];
  seo: Seo;
  /** Erscheint in der Hauptnavigation? */
  inNavigation: boolean;
};

/* -------------------------------------------------------- Inhaltsschnittstelle */

/**
 * Alle Methoden sind asynchron, auch in der lokalen Quelle. Damit verändert der
 * spätere Wechsel auf Sanity keine einzige aufrufende Stelle.
 *
 * Aktualitätsvertrag: Auf GitHub Pages und bei Vercel ohne ISR sind die
 * Inhalte ein Build-Stand. Erst Vercel mit ISR + Sanity-Webhook liefert
 * Änderungen ohne neuen Build (docs/sanity-vercel-einrichtung.md).
 */
export interface Inhaltsquelle {
  einstellungen(): Promise<Websiteeinstellungen>;
  startseite(): Promise<Startseite>;
  team(): Promise<Teamseite>;
  salon(): Promise<Salonseite>;
  preisliste(): Promise<Preisliste>;
  gaestebuch(): Promise<Gaestebuchseite>;
  lageplan(): Promise<Lageplan>;
  kontaktseite(): Promise<Kontaktseite>;
  rechtstext(art: Rechtstext["art"]): Promise<Rechtstext | null>;
  seiten(): Promise<readonly Seite[]>;
  seite(slug: string): Promise<Seite | null>;
}
