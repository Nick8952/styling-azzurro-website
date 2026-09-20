import type {
  Baustein,
  Bild,
  Bildverweis,
  Gaestebuchseite,
  Kontaktseite,
  Lageplan,
  Preisliste,
  Rechtstext,
  Salonseite,
  Seite,
  Startseite,
  Teammitglied,
  Teamseite,
  Websiteeinstellungen,
} from "./typen";

/**
 * Formen der lokalen Inhaltsdateien unter data/. Sie entsprechen den
 * Darstellungstypen, verweisen aber auf Bilder nur über einen Schlüssel im
 * Bildmanifest. Die lokale Inhaltsquelle löst diese Verweise auf.
 */

export type StartseiteRoh = Omit<Startseite, "heroBild" | "teamBild" | "salonBilder"> & {
  heroBild: Bildverweis;
  teamBild: Bildverweis;
  salonBilder: Bildverweis[];
};

export type TeammitgliedRoh = Omit<Teammitglied, "bild"> & { bild?: Bildverweis };

export type TeamseiteRoh = Omit<Teamseite, "mitglieder" | "bilder"> & {
  mitglieder: TeammitgliedRoh[];
  bilder: Bildverweis[];
};

export type SalonseiteRoh = Omit<Salonseite, "galerie"> & { galerie: Bildverweis[] };

export type BausteinRoh =
  | Exclude<Baustein, { _type: "bildblock" } | { _type: "galerieblock" }>
  | { _type: "bildblock"; _key: string; bild: Bildverweis; breit: boolean }
  | { _type: "galerieblock"; _key: string; titel?: string; bilder: Bildverweis[] };

export type SeiteRoh = Omit<Seite, "bausteine"> & { bausteine: BausteinRoh[] };

export type { Bild, Gaestebuchseite, Kontaktseite, Lageplan, Preisliste, Rechtstext, Websiteeinstellungen };
