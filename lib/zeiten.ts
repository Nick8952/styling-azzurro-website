import type { Oeffnungszeiten, Tageszeit, Wochentag } from "@/lib/inhalt/typen";

/** Kurzformen der Wochentage, wie auf einem Türschild. */
export const tagKurz: Record<Wochentag, string> = {
  Montag: "Mo",
  Dienstag: "Di",
  Mittwoch: "Mi",
  Donnerstag: "Do",
  Freitag: "Fr",
  Samstag: "Sa",
  Sonntag: "So",
};

/** "08.00 bis 12.00, 13.30 bis 17.00" bzw. "geschlossen". */
export function zeitenAlsText(tag: Tageszeit): string {
  if (tag.geschlossen || tag.zeiten.length === 0) return "geschlossen";
  return tag.zeiten.map((fenster) => `${fenster.von} bis ${fenster.bis}`).join(", ");
}

/**
 * Fasst aufeinanderfolgende Tage mit identischen Zeiten zusammen:
 * [{ tage: "Mo bis Fr", text: "08.00 bis 12.00, 13.30 bis 17.00" }, { tage: "Sa, So", text: "geschlossen" }]
 */
export function zeitenGruppiert(zeiten: Oeffnungszeiten): { tage: string; text: string; geschlossen: boolean }[] {
  const gruppen: { von: Wochentag; bis: Wochentag; text: string; geschlossen: boolean }[] = [];
  for (const tag of zeiten.woche) {
    const text = zeitenAlsText(tag);
    const letzte = gruppen[gruppen.length - 1];
    if (letzte && letzte.text === text) letzte.bis = tag.tag;
    else gruppen.push({ von: tag.tag, bis: tag.tag, text, geschlossen: text === "geschlossen" });
  }
  return gruppen.map((gruppe) => ({
    tage: gruppe.von === gruppe.bis ? gruppe.von : `${gruppe.von} bis ${gruppe.bis}`,
    text: gruppe.text,
    geschlossen: gruppe.geschlossen,
  }));
}

/** Einzeiler für Kopf und Fuss: "Mo bis Fr 08.00 bis 12.00, 13.30 bis 17.00 · Sa geschlossen" */
export function zeitenKurz(zeiten: Oeffnungszeiten): string {
  return zeitenGruppiert(zeiten)
    .map((gruppe) => {
      const tage = gruppe.tage
        .replace(/Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag/g, (name) => tagKurz[name as Wochentag]);
      return `${tage}: ${gruppe.text}`;
    })
    .join(" | ");
}

/** "Mittwoch, 31. Januar 2024" aus einem ISO-Datum, ohne Zeitzonenverschiebung. */
export function datumLang(iso: string): string {
  const [jahr, monat, tag] = iso.slice(0, 10).split("-").map(Number);
  const datum = new Date(Date.UTC(jahr, monat - 1, tag));
  return new Intl.DateTimeFormat("de-CH", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(datum);
}
