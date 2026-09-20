import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fuss } from "@/components/Fuss";
import { Kopf } from "@/components/Kopf";
import { ladeRahmen } from "@/lib/inhalt/seiten";
import { metadatenBasis } from "@/lib/seite-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: metadatenBasis,
  title: {
    default: "Coiffeur Styling Azzurro, Zürich",
    template: "%s | Coiffeur Styling Azzurro",
  },
  description:
    "Coiffeur Styling Azzurro an der Winterthurerstrasse 659, 8051 Zürich. Antonella Rullo und Ida Patella. Termine unter 044 321 20 35.",
  // Verkaufs-Demo: nicht indexieren. robots.txt erlaubt das Crawlen, damit
  // Suchmaschinen diesen Hinweis überhaupt lesen können.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "Coiffeur Styling Azzurro",
    // Bild kommt aus app/opengraph-image.png (Dateikonvention); Next ergänzt den Unterpfad.
  },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2431d6",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { einstellungen, zusatznavigation } = await ladeRahmen();
  return (
    <html lang="de-CH">
      <body>
        <Kopf einstellungen={einstellungen} zusatznavigation={zusatznavigation} />
        <main id="hauptinhalt" tabIndex={-1}>
          {children}
        </main>
        <Fuss einstellungen={einstellungen} zusatznavigation={zusatznavigation} />
      </body>
    </html>
  );
}
