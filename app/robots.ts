import type { MetadataRoute } from "next";

// Statischer Export: Datei wird zur Bauzeit erzeugt.
export const dynamic = "force-static";

/**
 * Crawlen ist erlaubt, damit Suchmaschinen das «noindex» im HTML lesen.
 * Ein Disallow würde die Seiten als «gesperrt, aber bekannt» listen.
 * Keine Sitemap: Die Demo soll nicht gefunden werden.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
