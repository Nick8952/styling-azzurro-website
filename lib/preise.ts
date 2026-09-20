import type { Preisposition } from "@/lib/inhalt/typen";

/** "CHF 42.00", "ab CHF 42.00" oder "auf Anfrage". */
export function preisText(position: Preisposition, waehrung = "CHF"): string {
  if (position.preisart === "aufAnfrage" || position.betrag === undefined) return "auf Anfrage";
  const betrag = position.betrag.toFixed(2);
  return position.preisart === "ab" ? `ab ${waehrung} ${betrag}` : `${waehrung} ${betrag}`;
}

export type Preisgruppe = { leistung: string; positionen: Preisposition[] };

/**
 * Fasst aufeinanderfolgende Positionen derselben Leistung zusammen, damit
 * «Föhnen» mit Kurz-/Mittellang-/Langhaar als eine Gruppe erscheint.
 */
export function gruppieren(positionen: readonly Preisposition[]): Preisgruppe[] {
  const gruppen: Preisgruppe[] = [];
  for (const position of positionen) {
    const letzte = gruppen[gruppen.length - 1];
    if (letzte && letzte.leistung === position.leistung) letzte.positionen.push(position);
    else gruppen.push({ leistung: position.leistung, positionen: [position] });
  }
  return gruppen;
}
