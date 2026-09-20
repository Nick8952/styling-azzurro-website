import { basisPfad } from "./pfade";

/**
 * Öffentliche Basisadresse der Website, inklusive Repository-Unterpfad auf
 * GitHub Pages. Für absolute Adressen in Metadaten (Open Graph, JSON-LD).
 *
 * NEXT_PUBLIC_SITE_URL überschreibt die Vorgabe, z. B. für Vercel oder die
 * spätere Kundendomain (dann ohne Unterpfad).
 */
const ursprung = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nick8952.github.io").replace(/\/$/, "");

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
