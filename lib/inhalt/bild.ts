import { bildmanifest } from "@/lib/bilder/manifest";
import type { Bild, Bildverweis } from "./typen";

/**
 * Kurzschreibweise für einen Bildverweis in den Inhaltsdateien:
 *
 *   bild("schaufenster-neon", "Schaufenster mit blauer Leuchtschrift …")
 */
export function bild(schluessel: string, alt: string, legende?: string): Bildverweis {
  return { schluessel, alt, ...(legende ? { legende } : {}) };
}

/**
 * Löst einen Verweis über das lokale Manifest auf. Fehlt der Schlüssel, ist
 * das ein Fehler in den Inhaltsdateien und soll den Build abbrechen, statt
 * still ein leeres Bild auszuliefern.
 */
export function aufloesen(verweis: Bildverweis): Bild {
  const eintrag = bildmanifest[verweis.schluessel];
  if (!eintrag) {
    throw new Error(
      `Bild «${verweis.schluessel}» fehlt im Manifest. Eintrag in scripts/bilder-aufbereiten.mjs ergänzen und «npm run bilder» ausführen.`
    );
  }
  return {
    src: eintrag.standard,
    breite: eintrag.breite,
    hoehe: eintrag.hoehe,
    alt: verweis.alt,
    ...(verweis.legende ? { legende: verweis.legende } : {}),
    unschaerfe: eintrag.unschaerfe,
    varianten: eintrag.varianten,
    absolut: false,
  };
}

export function alleAufloesen(verweise: readonly Bildverweis[]): Bild[] {
  return verweise.map(aufloesen);
}
