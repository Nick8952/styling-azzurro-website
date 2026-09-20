import "server-only";

import { lokaleInhaltsquelle } from "./lokal";
import type { Inhaltsquelle } from "./typen";

/**
 * Aktive Inhaltsquelle der Demo.
 *
 * Hier steht bewusst KEINE Umschaltung zur Laufzeit. Würde diese Datei beide
 * Quellen importieren, läge der Sanity-Client im Abhängigkeitsbaum des
 * statischen Exports, auch wenn er nie aufgerufen wird. Der Wechsel auf
 * Sanity ersetzt den Inhalt dieser Datei durch genau diese drei Zeilen:
 *
 *   import "server-only";
 *   export { sanityInhaltsquelle as inhalt } from "@/sanity/inhaltsquelle";
 *   export type { Inhaltsquelle } from "./typen";
 *
 * Alles Übrige (Seiten, Komponenten, Typen) bleibt unverändert.
 * Siehe docs/sanity-vercel-einrichtung.md.
 */
export const inhalt: Inhaltsquelle = lokaleInhaltsquelle;

export type { Inhaltsquelle } from "./typen";
