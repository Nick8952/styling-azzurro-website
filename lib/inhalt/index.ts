import "server-only";

import { lokaleInhaltsquelle } from "./lokal";
import type { Inhaltsquelle } from "./typen";

/**
 * Aktive Inhaltsquelle der Demo.
 *
 * Hier steht bewusst KEINE Umschaltung zur Laufzeit. Würde diese Datei beide
 * Quellen importieren, läge der Sanity-Client im Abhängigkeitsbaum des
 * statischen Exports, auch wenn er nie aufgerufen wird. Der Wechsel auf
 * Sanity ist deshalb ein bewusster Einzeiler:
 *
 *   export { sanityInhaltsquelle as inhalt } from "@/sanity/inhaltsquelle";
 *
 * Alles Übrige (Seiten, Komponenten, Typen) bleibt unverändert.
 * Siehe docs/sanity-vercel-einrichtung.md.
 */
export const inhalt: Inhaltsquelle = lokaleInhaltsquelle;

export type { Inhaltsquelle } from "./typen";
