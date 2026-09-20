#!/usr/bin/env node
/**
 * Prüft den statischen Export in out/ auf die typischen Fallen bei einer
 * Auslieferung unter einem Repository-Unterpfad.
 *
 * Geprüft wird:
 *  - HTML: jede interne Verweisadresse (href, src, srcset) beginnt mit dem
 *    Unterpfad, jede referenzierte lokale Datei existiert, jeder Seitenlink
 *    führt auf eine vorhandene index.html, jede Seite trägt noindex
 *  - CSS: jede url()-Referenz auf eine lokale Datei existiert und trägt den
 *    Unterpfad
 *  - HTML, CSS und JavaScript: kein localhost, keine Sanity-Adresse, kein
 *    Token-Muster, keine private Umgebungsvariable
 *  - 404.html und .nojekyll sind vorhanden
 *
 * Nicht geprüft werden Adressen, die erst zur Laufzeit in JavaScript
 * zusammengesetzt werden. Für diese Website sind das keine – alle Bilder und
 * Dateien stehen im HTML oder CSS.
 *
 *   node scripts/export-pruefen.mjs --pfad /repo-name
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..", "out");
const argumente = process.argv.slice(2);
const index = argumente.indexOf("--pfad");
const basis = index >= 0 && argumente[index + 1] ? argumente[index + 1] : process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const fehler = [];
const warnung = [];

async function alleDateien(ordner) {
  const ergebnis = [];
  for (const eintrag of await readdir(ordner, { withFileTypes: true })) {
    const pfad = join(ordner, eintrag.name);
    if (eintrag.isDirectory()) ergebnis.push(...(await alleDateien(pfad)));
    else ergebnis.push(pfad);
  }
  return ergebnis;
}

if (!existsSync(wurzel)) {
  console.error("out/ fehlt. Zuerst 'npm run build:pages' ausführen.");
  process.exit(1);
}

const dateien = await alleDateien(wurzel);
const htmlDateien = dateien.filter((datei) => datei.endsWith(".html"));

if (!existsSync(join(wurzel, "404.html"))) fehler.push("out/404.html fehlt.");
if (!existsSync(join(wurzel, ".nojekyll"))) warnung.push("out/.nojekyll fehlt – wird beim Deploy angelegt.");

const verbotenesMuster = [
  { muster: /http:\/\/localhost/gi, text: "localhost-Adresse im Ergebnis" },
  { muster: /\.api\.sanity\.io/gi, text: "Sanity-Adresse im Ergebnis" },
  { muster: /\bsk[A-Za-z0-9]{40,}\b/g, text: "möglicher Sanity-Token im Ergebnis" },
  { muster: /SANITY_API_WRITE_TOKEN|SANITY_REVALIDATE_SECRET/g, text: "private Umgebungsvariable im Ergebnis" },
];

/** Verbotene Zeichenketten in allen Textdateien des Exports. */
for (const datei of dateien.filter((d) => /\.(css|js|txt|json)$/.test(d))) {
  const inhalt = await readFile(datei, "utf8");
  const anzeige = datei.slice(wurzel.length);
  for (const { muster, text } of verbotenesMuster) {
    if (muster.test(inhalt)) fehler.push(`${anzeige}: ${text}.`);
    muster.lastIndex = 0;
  }
}

/** CSS: lokale url()-Referenzen müssen existieren und den Unterpfad tragen. */
for (const datei of dateien.filter((d) => d.endsWith(".css"))) {
  const inhalt = await readFile(datei, "utf8");
  const anzeige = datei.slice(wurzel.length);
  for (const treffer of inhalt.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) {
    const ziel = treffer[2];
    if (/^(data:|https?:|#)/.test(ziel)) continue;
    let ohneBasis;
    if (ziel.startsWith("/")) {
      if (basis && !ziel.startsWith(`${basis}/`)) {
        fehler.push(`${anzeige}: url() ohne Unterpfad -> ${ziel}`);
        continue;
      }
      ohneBasis = basis ? ziel.slice(basis.length) : ziel;
    } else {
      // relativ zur CSS-Datei
      ohneBasis = join(datei.slice(wurzel.length), "..", ziel);
    }
    if (!existsSync(join(wurzel, ohneBasis.split("?")[0]))) {
      fehler.push(`${anzeige}: url()-Datei fehlt -> ${ziel}`);
    }
  }
}

for (const datei of htmlDateien) {
  const inhalt = await readFile(datei, "utf8");
  const anzeige = datei.slice(wurzel.length) || "/";

  if (!/<meta name="robots" content="[^"]*noindex/i.test(inhalt)) {
    fehler.push(`${anzeige}: kein noindex im Kopfbereich.`);
  }

  for (const { muster, text } of verbotenesMuster) {
    if (muster.test(inhalt)) fehler.push(`${anzeige}: ${text}.`);
    muster.lastIndex = 0;
  }

  // Verbindungs-Hinweise von Next (preconnect/dns-prefetch) sind keine
  // Verweise auf Inhalte und werden vor der Prüfung entfernt.
  const geprueft = inhalt.replace(/<link[^>]*rel="(?:preconnect|dns-prefetch)"[^>]*>/gi, "");

  // Alle absoluten lokalen Verweise einsammeln
  const verweise = new Set();
  for (const treffer of geprueft.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) verweise.add(treffer[1]);
  for (const treffer of geprueft.matchAll(/srcSet="([^"]+)"|srcset="([^"]+)"/g)) {
    const satz = treffer[1] ?? treffer[2];
    for (const teil of satz.split(",")) {
      const adresse = teil.trim().split(/\s+/)[0];
      if (adresse.startsWith("/")) verweise.add(adresse);
    }
  }

  for (const verweis of [...verweise].filter((eintrag) => !eintrag.startsWith("//"))) {
    if (basis && !verweis.startsWith(`${basis}/`) && verweis !== basis) {
      fehler.push(`${anzeige}: Verweis ohne Unterpfad -> ${verweis}`);
      continue;
    }
    const ohneBasis = basis ? verweis.slice(basis.length) || "/" : verweis;
    const ziel = join(wurzel, ohneBasis);

    if (extname(ohneBasis)) {
      if (!existsSync(ziel)) fehler.push(`${anzeige}: Datei fehlt -> ${verweis}`);
      continue;
    }
    // Seitenverweis: es muss index.html darunter geben
    const seite = join(ziel, "index.html");
    if (!existsSync(seite)) {
      try {
        const info = await stat(ziel);
        if (!info.isFile()) fehler.push(`${anzeige}: Seite fehlt -> ${verweis}`);
      } catch {
        fehler.push(`${anzeige}: Seite fehlt -> ${verweis}`);
      }
    }
  }
}

console.log(`Geprüft: ${htmlDateien.length} Seiten, ${dateien.length} Dateien, Unterpfad "${basis || "(keiner)"}"`);
for (const eintrag of warnung) console.log(`  Hinweis: ${eintrag}`);
if (fehler.length === 0) {
  console.log("Keine Fehler gefunden.");
} else {
  console.log(`\n${fehler.length} Fehler:`);
  for (const eintrag of fehler) console.log(`  - ${eintrag}`);
  process.exit(1);
}
