import { basisPfad } from "./pfade";

/**
 * Öffentliche Basisadresse der Website, inklusive Repository-Unterpfad auf
 * GitHub Pages. Für absolute Adressen in Metadaten (Open Graph, JSON-LD).
 *
 * Reihenfolge:
 *   1. NEXT_PUBLIC_SITE_URL, falls nicht leer (Kundendomain oder Vercel-Adresse)
 *   2. Vercels eigene Variablen (VERCEL_PROJECT_PRODUCTION_URL, VERCEL_URL)
 *   3. GitHub Pages
 *
 * Eine leere Variable gilt als nicht gesetzt. Fehlt das Protokoll, wird https
 * ergänzt. So bricht der Build nie an einer ungültigen Adresse ab.
 */
function ursprungErmitteln(): string {
  const kandidaten = [process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL, process.env.VERCEL_URL];
  for (const kandidat of kandidaten) {
    const wert = kandidat?.trim();
    if (!wert) continue;
    const mitProtokoll = /^https?:\/\//i.test(wert) ? wert : `https://${wert}`;
    try {
      return new URL(mitProtokoll).origin;
    } catch {
      // ungültig, nächsten Kandidaten versuchen
    }
  }
  return "https://nick8952.github.io";
}

const ursprung = ursprungErmitteln();

export const seiteUrl = new URL(`${ursprung}${basisPfad}/`);

/**
 * Für Nexts `metadataBase` OHNE Unterpfad: Die dateibasierten Metadaten
 * (app/opengraph-image.png, app/icon.png) hängen den basePath selbst an.
 * Mit Unterpfad in metadataBase entstünde er doppelt.
 */
export const metadatenBasis = new URL(`${ursprung}/`);

export function absolut(pfad: string): string {
  return new URL(pfad.replace(/^\//, ""), seiteUrl).toString();
}
