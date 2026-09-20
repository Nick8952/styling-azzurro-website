import type { NextConfig } from "next";

/**
 * Zwei Build-Profile aus einer Codebasis:
 *
 *   DEPLOY_TARGET=pages   (Standard) -> statischer Export für GitHub Pages,
 *                                        inkl. Repository-Unterpfad.
 *   DEPLOY_TARGET=vercel             -> Server-Build für Vercel, ohne Unterpfad.
 *
 * Die Demo läuft ohne jede Sanity-/Vercel-Variable. Fehlt NEXT_PUBLIC_BASE_PATH,
 * wird ohne Unterpfad gebaut (z. B. für die lokale Vorschau).
 */
const istStatisch = process.env.DEPLOY_TARGET !== "vercel";
const basisPfad = istStatisch ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  output: istStatisch ? "export" : undefined,
  basePath: basisPfad,
  trailingSlash: true,
  reactStrictMode: true,
  // Der statische Export kann den Next-Bildserver nicht nutzen. Die Bilder
  // werden zur Bauzeit von scripts/bilder-aufbereiten.mjs in AVIF/WebP und
  // mehreren Breiten erzeugt (siehe components/Bild.tsx). Auf Vercel kann
  // diese Zeile entfernt werden, sobald Bilder aus Sanity kommen.
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basisPfad },
};

export default nextConfig;
