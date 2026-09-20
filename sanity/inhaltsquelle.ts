/**
 * Sanity-Inhaltsquelle, VORBEREITET, NOCH NICHT IN BETRIEB.
 *
 * Erfüllt dieselbe Schnittstelle wie die lokale Quelle (lib/inhalt/typen.ts).
 * Beim Umstellen wird in lib/inhalt/index.ts eine einzige Zeile geändert:
 *
 *   export { sanityInhaltsquelle as inhalt } from "@/sanity/inhaltsquelle";
 *
 * Alle Seiten und Komponenten bleiben unverändert. Abgeleitete Werte
 * (Telefonlink, aufgelöste Bilder) entstehen hier, nicht in GROQ und nicht
 * in den Komponenten.
 */
import "server-only";

import type {
  Baustein,
  Gaestebuchseite,
  Inhaltsquelle,
  Kontaktseite,
  Lageplan,
  Preisliste,
  Rechtstext,
  RichText,
  Salonseite,
  Seite,
  Seo,
  Startseite,
  Teamseite,
  Websiteeinstellungen,
} from "@/lib/inhalt/typen";
import {
  einstellungenAbfrage,
  gaestebuchAbfrage,
  kontaktseiteAbfrage,
  lageplanAbfrage,
  preislisteAbfrage,
  rechtstextAbfrage,
  salonAbfrage,
  seitenAbfrage,
  startseiteAbfrage,
  teamAbfrage,
} from "./abfragen";
import { sanityBild, sanityBildPflicht, sanityBilder, type SanityBild } from "./bild";
import { sanityClient } from "./client";

/** tel:-Adresse aus der angezeigten Nummer: Schweizer Vorwahl, nur Ziffern. */
function telefonLink(nummer: string): string {
  const ziffern = nummer.replace(/[^\d+]/g, "");
  return `tel:${ziffern.startsWith("+") ? ziffern : `+41${ziffern.replace(/^0/, "")}`}`;
}

/**
 * Prüft, dass eine Abfrage etwas geliefert hat. Sanity liefert bei
 * unveröffentlichten Dokumenten null; hier wird bewusst laut gescheitert,
 * statt still eine halb leere Seite zu bauen.
 */
function erwartet<T>(wert: T | null | undefined, was: string): T {
  if (wert === null || wert === undefined) throw new Error(`Sanity liefert keinen Eintrag für «${was}». Ist der Inhalt veröffentlicht?`);
  return wert;
}

type Roh<T, Bildfelder extends keyof T, Listenfelder extends keyof T = never> = Omit<T, Bildfelder | Listenfelder> & Record<Bildfelder, SanityBild | null> & Record<Listenfelder, (SanityBild | null)[] | null>;

type BausteinRoh =
  | Exclude<Baustein, { _type: "bildblock" } | { _type: "galerieblock" }>
  | { _type: "bildblock"; _key: string; bild: SanityBild | null; breit?: boolean }
  | { _type: "galerieblock"; _key: string; titel?: string; bilder: (SanityBild | null)[] | null };

function bausteinAufloesen(baustein: BausteinRoh): Baustein | null {
  switch (baustein._type) {
    case "bildblock": {
      const bild = sanityBild(baustein.bild);
      return bild ? { _type: "bildblock", _key: baustein._key, bild, breit: baustein.breit ?? false } : null;
    }
    case "galerieblock":
      return { _type: "galerieblock", _key: baustein._key, titel: baustein.titel, bilder: sanityBilder(baustein.bilder) };
    case "preisauszug":
      return { ...baustein, kategorien: baustein.kategorien ?? [] };
    case "gaestebuchauszug":
      return { ...baustein, nummern: baustein.nummern ?? [] };
    default:
      return baustein;
  }
}

export const sanityInhaltsquelle: Inhaltsquelle = {
  async einstellungen() {
    type RohEinstellungen = Omit<Websiteeinstellungen, "kontakt" | "hauptnavigation" | "rechtsnavigation"> & {
      kontakt: Omit<Websiteeinstellungen["kontakt"], "telefonLink">;
      hauptnavigation: Websiteeinstellungen["hauptnavigation"] | null;
      rechtsnavigation: Websiteeinstellungen["rechtsnavigation"] | null;
    };
    const roh = erwartet(await sanityClient.fetch<RohEinstellungen | null>(einstellungenAbfrage), "Website-Einstellungen");
    return {
      ...roh,
      kurzname: roh.kurzname ?? roh.name,
      demohinweis: roh.demohinweis ?? "",
      kontakt: { ...roh.kontakt, website: roh.kontakt.website ?? "", telefonLink: telefonLink(roh.kontakt.telefon) },
      hauptnavigation: roh.hauptnavigation ?? [],
      rechtsnavigation: roh.rechtsnavigation ?? [],
      oeffnungszeiten: { ...roh.oeffnungszeiten, sonderzeiten: roh.oeffnungszeiten.sonderzeiten ?? [] },
    };
  },

  async startseite() {
    const roh = erwartet(await sanityClient.fetch<Roh<Startseite, "heroBild" | "teamBild", "salonBilder"> | null>(startseiteAbfrage), "Startseite");
    return {
      ...roh,
      heroBild: sanityBildPflicht(roh.heroBild, "Startseite: Bild im Kopfbereich"),
      teamBild: sanityBildPflicht(roh.teamBild, "Startseite: Teambild"),
      salonBilder: sanityBilder(roh.salonBilder),
      preisAuszug: roh.preisAuszug ?? [],
      gaestebuchAuszug: roh.gaestebuchAuszug ?? [],
    };
  },

  async team() {
    type RohTeam = Omit<Teamseite, "mitglieder" | "bilder"> & {
      mitglieder: { name: string; rolle?: string; bild: SanityBild | null }[] | null;
      bilder: (SanityBild | null)[] | null;
    };
    const roh = erwartet(await sanityClient.fetch<RohTeam | null>(teamAbfrage), "Team");
    return {
      ...roh,
      einleitung: roh.einleitung ?? "",
      mitglieder: (roh.mitglieder ?? []).map(({ bild, ...mitglied }) => {
        const aufgeloest = sanityBild(bild);
        return { ...mitglied, ...(aufgeloest ? { bild: aufgeloest } : {}) };
      }),
      bilder: sanityBilder(roh.bilder),
    };
  },

  async salon() {
    const roh = erwartet(await sanityClient.fetch<Roh<Salonseite, never, "galerie"> | null>(salonAbfrage), "Mein Geschäft");
    return { ...roh, galerie: sanityBilder(roh.galerie) };
  },

  async preisliste() {
    const roh = erwartet(await sanityClient.fetch<Preisliste | null>(preislisteAbfrage), "Preisliste");
    return { ...roh, waehrung: "CHF", hinweise: roh.hinweise ?? [], kategorien: roh.kategorien ?? [] };
  },

  async gaestebuch() {
    type RohGaestebuch = { seite: Omit<Gaestebuchseite, "eintraege"> | null; eintraege: Gaestebuchseite["eintraege"] | null };
    const roh = await sanityClient.fetch<RohGaestebuch>(gaestebuchAbfrage);
    const seite = erwartet(roh.seite, "Gästebuch (Seite)");
    return { ...seite, eintraege: (roh.eintraege ?? []).map((eintrag) => ({ ...eintrag, sichtbar: eintrag.sichtbar !== false })) };
  },

  async lageplan() {
    type RohLageplan = { seo: Seo; titel: string; einleitung: string; karteEinbettungsUrl: string; karteTitel: string; anreiseTitel: string; anreise: RichText | null };
    const roh = erwartet(await sanityClient.fetch<RohLageplan | null>(lageplanAbfrage), "Lageplan");
    const lageplan: Lageplan = {
      seo: roh.seo,
      titel: roh.titel,
      einleitung: roh.einleitung,
      karte: { anbieter: "google", einbettungsUrl: roh.karteEinbettungsUrl, titel: roh.karteTitel },
      anreiseTitel: roh.anreiseTitel ?? "Anreise",
      anreise: roh.anreise ?? [],
    };
    return lageplan;
  },

  async kontaktseite() {
    const roh = erwartet(await sanityClient.fetch<Kontaktseite | null>(kontaktseiteAbfrage), "Kontakt");
    return { ...roh, terminText: roh.terminText ?? [] };
  },

  async rechtstext(art) {
    return await sanityClient.fetch<Rechtstext | null>(rechtstextAbfrage, { art });
  },

  async seiten() {
    type RohSeite = Omit<Seite, "bausteine"> & { bausteine: BausteinRoh[] | null };
    const roh = (await sanityClient.fetch<RohSeite[]>(seitenAbfrage)) ?? [];
    return roh.map((seite) => ({
      ...seite,
      seo: seite.seo ?? { titel: seite.titel, beschreibung: seite.einleitung ?? seite.titel },
      inNavigation: seite.inNavigation === true,
      bausteine: (seite.bausteine ?? []).map(bausteinAufloesen).filter((baustein): baustein is Baustein => baustein !== null),
    }));
  },

  async seite(slug) {
    const alle = await this.seiten();
    return alle.find((seite) => seite.slug === slug) ?? null;
  },
};
