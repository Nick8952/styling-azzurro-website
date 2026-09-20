/**
 * Sanity-Client, VORBEREITET, NOCH NICHT IN BETRIEB.
 *
 * Diese Datei wird vom Build der Demo nicht erfasst, weil lib/inhalt/index.ts
 * sie nicht importiert. Erst beim Umstellen auf die Sanity-Quelle landet sie
 * im Abhängigkeitsbaum. Der statische Export enthält damit kein Sanity-Paket
 * (geprüft durch scripts/export-pruefen.mjs).
 */
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

if (!projectId) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID fehlt. Für die Demo auf GitHub Pages wird diese Datei nicht geladen; siehe docs/sanity-vercel-einrichtung.md.");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-01",
  // Auf Vercel mit ISR dürfen Antworten aus dem CDN kommen; der Sanity-Webhook
  // stösst nach jedem Veröffentlichen den Neuaufbau an.
  useCdn: true,
  perspective: "published",
});

export { projectId, dataset };
