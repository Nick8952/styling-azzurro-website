#!/usr/bin/env node
/**
 * Prüft die tatsächlich veröffentlichte Demo per HTTP: jede Route antwortet
 * mit 200, trägt noindex, referenziert Stylesheets/Skripte/Bilder unter dem
 * Unterpfad, und alle im HTML referenzierten lokalen Dateien sind abrufbar.
 * Unbekannte Adressen liefern 404 mit der eigenen Fehlerseite.
 *
 *   node scripts/live-pruefen.mjs https://nick8952.github.io/styling-azzurro-website
 */
const basis = (process.argv[2] ?? process.env.LIVE_URL ?? "").replace(/\/$/, "");
if (!basis) {
  console.error("Adresse angeben: node scripts/live-pruefen.mjs https://…/styling-azzurro-website");
  process.exit(1);
}
const unterpfad = new URL(basis).pathname.replace(/\/$/, "");
const routen = ["/", "/team/", "/salon/", "/leistungen/", "/preisliste/", "/lageplan/", "/gaestebuch/", "/kontakt/", "/impressum/", "/datenschutz/", "/datenschutz-einstellungen/"];

const fehler = [];
const geprueft = new Set();

async function abrufen(url) {
  const antwort = await fetch(url, { redirect: "manual", headers: { "user-agent": "live-pruefen" } });
  return antwort;
}

for (const route of routen) {
  const url = basis + route;
  const antwort = await abrufen(url);
  if (antwort.status !== 200) {
    fehler.push(`${route}: Status ${antwort.status}`);
    continue;
  }
  const html = await antwort.text();
  if (!/<meta name="robots" content="noindex/.test(html)) fehler.push(`${route}: kein noindex`);
  if (!/<title>[^<]+<\/title>/.test(html)) fehler.push(`${route}: kein Titel`);
  const verweise = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((t) => t[1]).filter((v) => v.startsWith("/") && !v.startsWith("//"));
  for (const verweis of verweise) {
    if (!verweis.startsWith(unterpfad + "/") && verweis !== unterpfad) fehler.push(`${route}: Verweis ohne Unterpfad: ${verweis}`);
  }
  const dateien = verweises(html);
  for (const datei of dateien) {
    if (geprueft.has(datei)) continue;
    geprueft.add(datei);
    const r = await abrufen(new URL(datei, basis + "/").toString());
    if (r.status !== 200) fehler.push(`${route}: Datei ${datei} -> ${r.status}`);
  }
  console.log(`ok  ${route} (${dateien.length} Dateien)`);
}

function verweises(html) {
  const set = new Set();
  for (const t of html.matchAll(/(?:href|src)="([^"]+\.(?:css|js|png|webp|avif|ico|svg|txt))(?:\?[^"]*)?"/g)) {
    if (t[1].startsWith("/")) set.add(t[1]);
  }
  for (const t of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const teil of t[1].split(",")) {
      const pfad = teil.trim().split(/\s+/)[0];
      if (pfad.startsWith("/")) set.add(pfad);
    }
  }
  return [...set];
}

const nichtVorhanden = await abrufen(basis + "/diese-seite-gibt-es-nicht/");
if (nichtVorhanden.status !== 404) fehler.push(`Unbekannte Adresse liefert ${nichtVorhanden.status} statt 404`);
else {
  const html = await nichtVorhanden.text();
  if (!html.includes("Diese Seite gibt es nicht")) fehler.push("404 zeigt nicht die eigene Fehlerseite");
  else console.log("ok  404-Seite");
}

const robots = await abrufen(basis + "/robots.txt");
if (robots.status !== 200 || !/Allow: \//.test(await robots.text())) fehler.push("robots.txt fehlt oder verbietet das Crawlen");
else console.log("ok  robots.txt");

if (fehler.length) {
  console.error(`\n${fehler.length} Fehler:\n- ${fehler.join("\n- ")}`);
  process.exit(1);
}
console.log(`\nAlles in Ordnung: ${routen.length} Routen, ${geprueft.size} Dateien.`);
