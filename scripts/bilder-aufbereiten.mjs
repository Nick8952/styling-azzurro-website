#!/usr/bin/env node
/**
 * Bildaufbereitung für den statischen Export.
 *
 * Liest die Originale aus assets/original/, erzeugt daraus AVIF- und WebP-
 * Varianten in mehreren Breiten unter public/bilder/ und schreibt ein
 * typisiertes Manifest nach lib/bilder/manifest.ts (Masse, Varianten,
 * Unschärfe-Vorschau). Zusätzlich entstehen Logo und Symbole (Favicon,
 * Apple-Icon, Open-Graph-Bild) aus dem Originallogo.
 *
 * Der Lauf ist deterministisch: gleiche Originale, gleiche Ausgabe.
 * «npm run bilder» darf deshalb im CI laufen, ohne einen Git-Diff zu erzeugen.
 *
 * Die Originale der bisherigen Website sind maximal 1000 px breit (Jimdo-
 * Auslieferung). Grössere Breiten werden nicht hochgerechnet.
 */
import sharp from "sharp";
import { mkdir, writeFile, rm, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..");
const quelleOrdner = join(wurzel, "assets/original");
const zielOrdner = join(wurzel, "public/bilder");
const appOrdner = join(wurzel, "app");

/** Markenblau, aus dem Logo gemessen (dominanter Farbwert #2838f8 / #1828a8). */
const AZZURRO = { r: 0x24, g: 0x31, b: 0xd6 };

/**
 * Seitenverhältnisse sind je Einsatzort gewählt, damit kein Motiv beschnitten
 * wird, das die Aussage trägt. Ohne Angabe bleibt das Original-Verhältnis.
 * @type {{id:string, datei:string, seitenverhaeltnis?:number, position?:string, maxBreite?:number}[]}
 */
const bilder = [
  // Schaufenster mit Leuchtschrift: Hochformat für die Galerie, Querformat (oberer Teil) für den Hero.
  { id: "schaufenster-neon", datei: "schaufenster-neon.png" },
  { id: "schaufenster-neon-quer", datei: "schaufenster-neon.png", seitenverhaeltnis: 5 / 4, position: "top" },
  // Team
  { id: "team-selfie", datei: "team-selfie.png" },
  { id: "team-im-salon-a", datei: "team-im-salon-a.png" },
  { id: "team-im-salon-b", datei: "team-im-salon-b.png" },
  { id: "team-nah", datei: "team-nah.png" },
  { id: "team-fenster", datei: "team-fenster.png" },
  { id: "team-masken-salon", datei: "team-masken-salon.png" },
  { id: "team-ausflug", datei: "team-ausflug.png" },
  { id: "team-anlass", datei: "team-anlass.png" },
  { id: "team-portrait", datei: "team-portrait.png" },
  { id: "haarwaesche", datei: "haarwaesche.png" },
  // Salon
  { id: "salon-uebersicht", datei: "salon-uebersicht.jpg" },
  { id: "salon-arbeitsplatz", datei: "salon-arbeitsplatz.jpg" },
  { id: "salon-empfang", datei: "salon-empfang.jpg" },
  { id: "salon-waschplatz", datei: "salon-waschplatz.png" },
  { id: "salon-spiegelplatz", datei: "salon-spiegelplatz.png" },
  { id: "salon-innen-neon", datei: "salon-innen-neon.png" },
  { id: "produkte-regal-a", datei: "produkte-regal-a.png" },
  { id: "produkte-regal-b", datei: "produkte-regal-b.png" },
  { id: "kundin-im-stuhl", datei: "kundin-im-stuhl.png" },
  { id: "frisur-locken-a", datei: "frisur-locken-a.png" },
  { id: "frisur-locken-b", datei: "frisur-locken-b.png" },
  { id: "hund-im-salon", datei: "hund-im-salon.png" },
  { id: "herz-dekoration", datei: "herz-dekoration.png" },
];

const breitenraster = [320, 480, 640, 960, 1280];

if (!existsSync(quelleOrdner)) {
  console.error(
    "assets/original/ fehlt. Zuerst 'npm run originale' ausführen.\n" +
      "Die Originale liegen bewusst nicht im Repository (Urheberrecht, siehe assets/quellen.json)."
  );
  process.exit(1);
}

await rm(zielOrdner, { recursive: true, force: true });
await mkdir(zielOrdner, { recursive: true });

const manifest = {};

for (const bild of bilder) {
  const pfad = join(quelleOrdner, bild.datei);
  const info = await sharp(pfad, { failOn: "none" }).rotate().metadata();

  let breite = info.width ?? 0;
  let hoehe = info.height ?? 0;
  if (bild.seitenverhaeltnis) {
    // grösstmöglicher Ausschnitt im gewünschten Verhältnis
    if (breite / hoehe > bild.seitenverhaeltnis) breite = Math.round(hoehe * bild.seitenverhaeltnis);
    else hoehe = Math.round(breite / bild.seitenverhaeltnis);
  }

  const maxBreite = Math.min(bild.maxBreite ?? breite, breite);
  const breiten = breitenraster.filter((b) => b < maxBreite).concat(maxBreite);
  const varianten = { avif: [], webp: [] };

  for (const b of breiten) {
    const h = Math.round((b / breite) * hoehe);
    const zuschnitt = sharp(pfad, { failOn: "none" })
      .rotate()
      .resize(b, h, { fit: "cover", position: bild.position ?? "attention", withoutEnlargement: true });

    await zuschnitt.clone().avif({ quality: 55, effort: 6 }).toFile(join(zielOrdner, `${bild.id}-${b}.avif`));
    await zuschnitt.clone().webp({ quality: 82, effort: 5 }).toFile(join(zielOrdner, `${bild.id}-${b}.webp`));

    varianten.avif.push({ breite: b, pfad: `/bilder/${bild.id}-${b}.avif` });
    varianten.webp.push({ breite: b, pfad: `/bilder/${bild.id}-${b}.webp` });
  }

  const unschaerfe = await sharp(pfad, { failOn: "none" })
    .rotate()
    .resize(20, Math.max(1, Math.round((20 / breite) * hoehe)), { fit: "cover", position: bild.position ?? "attention" })
    .webp({ quality: 40 })
    .toBuffer();

  manifest[bild.id] = {
    breite: maxBreite,
    hoehe: Math.round((maxBreite / breite) * hoehe),
    standard: `/bilder/${bild.id}-${breiten[breiten.length - 1]}.webp`,
    varianten,
    unschaerfe: `data:image/webp;base64,${unschaerfe.toString("base64")}`,
  };
  console.log(`aufbereitet: ${bild.id} (${breiten.length} Breiten bis ${maxBreite}px)`);
}

/* ------------------------------------------------------------------- Logo */

/**
 * Das Logo liegt auf der bisherigen Website nur als 250x90-JPEG vor. Im
 * Preislisten-Bild ist dieselbe Wortmarke grösser enthalten (385x99 px);
 * daraus entsteht hier das Logo. Die Wortmarke wird auf das gemessene
 * Markenblau reduziert und freigestellt (Helligkeit -> Deckkraft), damit sie
 * auf jedem Hintergrund sauber steht. Form und Schriftzug bleiben unverändert.
 */
async function wortmarkeAlsMaske(ausschnitt, breite) {
  const { data, info } = await sharp(join(quelleOrdner, "preisliste.png"))
    .extract(ausschnitt)
    .resize(breite, null, { kernel: "lanczos3" })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i += 1) {
    // Weiss (255) -> transparent, Blau (dunkel im Graubild) -> deckend.
    const hell = data[i];
    const alpha = Math.max(0, Math.min(255, Math.round((235 - hell) * 1.6)));
    rgba[i * 4] = AZZURRO.r;
    rgba[i * 4 + 1] = AZZURRO.g;
    rgba[i * 4 + 2] = AZZURRO.b;
    rgba[i * 4 + 3] = alpha;
  }
  return { rgba, info };
}

const logoAusschnitt = { left: 160, top: 18, width: 396, height: 108 };
for (const b of [396, 792]) {
  const { rgba, info } = await wortmarkeAlsMaske(logoAusschnitt, b);
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(join(zielOrdner, `logo-${b}.png`));
}
manifest["logo"] = {
  breite: 792,
  hoehe: Math.round((792 / logoAusschnitt.width) * logoAusschnitt.height),
  standard: "/bilder/logo-792.png",
  varianten: { avif: [], webp: [] },
  unschaerfe: "",
};
console.log("aufbereitet: logo (freigestellte Wortmarke, 2 Breiten)");

/* ---------------------------------------------------------------- Symbole */

/**
 * Favicon und Apple-Icon: das geschwungene «A» aus «Azzurro», weiss auf
 * Markenblau. Nachbarbuchstaben, die in den Ausschnitt ragen, werden an den
 * Rändern maskiert.
 */
async function symbol(groesse, radius, dateiname) {
  const rand = Math.round(groesse * 0.16);
  const glyphBreite = groesse - rand * 2;
  const { data, info } = await sharp(join(quelleOrdner, "preisliste.png"))
    .extract({ left: 330, top: 68, width: 66, height: 60 })
    .resize(glyphBreite, null, { kernel: "lanczos3" })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const i = y * info.width + x;
      let alpha = Math.max(0, Math.min(255, Math.round((235 - data[i]) * 1.6)));
      // Reste von «G» (oben links) und «z» (rechts) ausblenden
      if ((x < info.width * 0.2 && y < info.height * 0.16) || x > info.width * 0.895) alpha = 0;
      rgba[i * 4] = 255;
      rgba[i * 4 + 1] = 255;
      rgba[i * 4 + 2] = 255;
      rgba[i * 4 + 3] = alpha;
    }
  }
  const glyph = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
  const hintergrund = Buffer.from(
    `<svg width="${groesse}" height="${groesse}" viewBox="0 0 ${groesse} ${groesse}"><rect width="${groesse}" height="${groesse}" rx="${radius}" fill="#2431d6"/></svg>`
  );
  await sharp(hintergrund)
    .composite([{ input: glyph, left: rand, top: Math.round((groesse - info.height) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(join(appOrdner, dateiname));
}
await symbol(64, 12, "icon.png");
await symbol(180, 0, "apple-icon.png");
console.log("aufbereitet: icon.png, apple-icon.png");

/**
 * Open-Graph-Bild 1200x630: Wortmarke auf Weiss mit blauem Balken. Statisch,
 * damit es im Export ohne Bildserver funktioniert.
 */
{
  const { rgba, info } = await wortmarkeAlsMaske(logoAusschnitt, 720);
  const wortmarke = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
  const grund = Buffer.from(
    `<svg width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#ffffff"/><rect y="590" width="1200" height="40" fill="#2431d6"/></svg>`
  );
  await sharp(grund)
    .composite([{ input: wortmarke, left: Math.round((1200 - info.width) / 2), top: Math.round((590 - info.height) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(join(appOrdner, "opengraph-image.png"));
  console.log("aufbereitet: opengraph-image.png");
}

/* --------------------------------------------------------------- Manifest */

const zeilen = [
  "// Automatisch erzeugt von scripts/bilder-aufbereiten.mjs. Nicht von Hand bearbeiten.",
  "// Neu erzeugen mit: npm run bilder",
  "",
  'import type { Bildmanifest } from "./typen";',
  "",
  `export const bildmanifest: Bildmanifest = ${JSON.stringify(manifest, null, 2)} as const;`,
  "",
];
await mkdir(join(wurzel, "lib/bilder"), { recursive: true });
await writeFile(join(wurzel, "lib/bilder/manifest.ts"), zeilen.join("\n"), "utf8");

const dateien = await readdir(zielOrdner);
console.log(`\nFertig: ${dateien.length} Dateien in public/bilder/, Manifest in lib/bilder/manifest.ts`);
