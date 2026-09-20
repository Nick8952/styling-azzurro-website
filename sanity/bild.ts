import imageUrlBuilder from "@sanity/image-url";
import type { Bild } from "@/lib/inhalt/typen";
import { dataset, projectId } from "./client";

/** Form eines Bildes, wie es die GROQ-Abfragen liefern (siehe abfragen.ts). */
export type SanityBild = {
  alt?: string;
  legende?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  asset?: {
    _id: string;
    url: string;
    metadata?: { dimensions?: { width: number; height: number }; lqip?: string };
  };
};

const builder = imageUrlBuilder({ projectId: projectId ?? "", dataset });
const breiten = [320, 480, 640, 960, 1280];

/**
 * Löst ein Sanity-Bild in das Darstellungsmodell auf: Adressen zeigen auf das
 * Sanity-CDN (absolut = true), Zuschnitt und Hotspot fliessen in jede
 * Variante ein, die Masse berücksichtigen den Zuschnitt.
 */
export function sanityBild(eintrag: SanityBild | null | undefined): Bild | null {
  if (!eintrag?.asset) return null;
  const masse = eintrag.asset.metadata?.dimensions ?? { width: 1000, height: 1000 };
  const crop = eintrag.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const breite = Math.round(masse.width * (1 - crop.left - crop.right));
  const hoehe = Math.round(masse.height * (1 - crop.top - crop.bottom));
  const basis = builder.image(eintrag).fit("crop");
  const maxBreite = Math.min(breite, 1600);
  const stufen = breiten.filter((b) => b < maxBreite).concat(maxBreite);
  // Das Sanity-CDN kennt kein explizites AVIF; «auto=format» liefert je nach
  // Browser WebP oder AVIF. Deshalb nur WebP-Varianten, die AVIF-Liste bleibt leer.
  const variante = (b: number) => ({
    breite: b,
    pfad: basis
      .width(b)
      .height(Math.round((b / breite) * hoehe))
      .auto("format")
      .quality(82)
      .url(),
  });
  return {
    src: variante(maxBreite).pfad,
    breite: maxBreite,
    hoehe: Math.round((maxBreite / breite) * hoehe),
    alt: eintrag.alt ?? "",
    ...(eintrag.legende ? { legende: eintrag.legende } : {}),
    unschaerfe: eintrag.asset.metadata?.lqip ?? "",
    varianten: {
      avif: [],
      webp: stufen.map((b) => variante(b)),
    },
    absolut: true,
  };
}

export function sanityBildPflicht(eintrag: SanityBild | null | undefined, was: string): Bild {
  const bild = sanityBild(eintrag);
  if (!bild) throw new Error(`Sanity liefert kein Bild für «${was}». Ist es hochgeladen und veröffentlicht?`);
  return bild;
}

export function sanityBilder(eintraege: readonly (SanityBild | null)[] | null | undefined): Bild[] {
  return (eintraege ?? []).map((eintrag) => sanityBild(eintrag)).filter((bild): bild is Bild => bild !== null);
}
