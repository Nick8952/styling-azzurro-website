/**
 * Inhalte und freigegebene Medien nach Sanity importieren.
 *
 * VORBEREITET, NOCH NICHT AUSGEFÜHRT. Läuft erst, wenn ein Sanity-Projekt
 * existiert (docs/sanity-vercel-einrichtung.md):
 *
 *   cp .env.example .env.local        # Projekt-ID, Dataset, Schreib-Token eintragen
 *   npm run seed -- --trockenlauf     # zeigt nur, was geschrieben würde
 *   npm run seed                      # legt an, was noch nicht existiert (nichts wird überschrieben)
 *   npm run seed -- --aktualisieren   # ersetzt auch vorhandene Dokumente (nach Rückfrage)
 *
 * Sicherungen:
 *  - Projekt-ID, Dataset und Umfang werden vor jeder Schreiboperation angezeigt.
 *  - Ohne --aktualisieren wird kein vorhandenes Dokument verändert. Sobald der
 *    Salon eigene Texte pflegt, darf ein zweiter Lauf sie nicht zurücksetzen.
 *  - --aktualisieren verlangt eine Bestätigung mit dem Dataset-Namen.
 *  - Dokument-IDs sind deterministisch (Einzeldokumente = Typname, Gästebuch =
 *    gaestebuch-<nummer>, Rechtstexte = rechtstext-<art>, Seiten = seite-<slug>),
 *    Bilder werden pro Datei nur einmal hochgeladen.
 *  - Es wird nichts gelöscht.
 */
import { createClient } from "@sanity/client";
import { createInterface } from "node:readline/promises";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { einstellungen } from "../data/einstellungen";
import { gaestebuch } from "../data/gaestebuch";
import { kontaktseite } from "../data/kontaktseite";
import { lageplan } from "../data/lageplan";
import { preisliste } from "../data/preisliste";
import { rechtstexte } from "../data/rechtstexte";
import { salon } from "../data/salon";
import { seiten } from "../data/seiten";
import { startseite } from "../data/startseite";
import { team } from "../data/team";
import { bildmanifest } from "../lib/bilder/manifest";
import type { Bildverweis } from "../lib/inhalt/typen";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..");

// .env.local wie Next lesen (tsx lädt sie nicht selbst). Bereits gesetzte Variablen gewinnen.
const envDatei = join(wurzel, ".env.local");
if (existsSync(envDatei)) {
  for (const zeile of readFileSync(envDatei, "utf8").split(/\r?\n/)) {
    const treffer = /^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/.exec(zeile);
    if (!treffer || zeile.trim().startsWith("#")) continue;
    const wert = treffer[2].replace(/^(['"])(.*)\1$/, "$2");
    if (wert && process.env[treffer[1]] === undefined) process.env[treffer[1]] = wert;
  }
}

const argumente = new Set(process.argv.slice(2));
const trockenlauf = argumente.has("--trockenlauf");
const aktualisieren = argumente.has("--aktualisieren");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("NEXT_PUBLIC_SANITY_PROJECT_ID und SANITY_API_WRITE_TOKEN werden gebraucht (siehe .env.example, docs/sanity-vercel-einrichtung.md).");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2026-09-01", useCdn: false });

console.log(`Sanity-Projekt: ${projectId}   Dataset: ${dataset}   Modus: ${trockenlauf ? "Trockenlauf" : aktualisieren ? "aktualisieren (überschreibt)" : "nur anlegen"}`);

if (aktualisieren && !trockenlauf) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const antwort = await rl.question(`Vorhandene Dokumente im Dataset «${dataset}» werden ersetzt. Zum Bestätigen den Dataset-Namen eingeben: `);
  rl.close();
  if (antwort.trim() !== dataset) {
    console.log("Abgebrochen, nichts geändert.");
    process.exit(0);
  }
}

/* ------------------------------------------------------------------ Bilder */

const hochgeladen = new Map<string, string>();

/** Lädt die grösste WebP-Variante eines Manifest-Bildes hoch (Originale liegen nicht im Repository). */
async function bildHochladen(schluessel: string): Promise<string | null> {
  if (hochgeladen.has(schluessel)) return hochgeladen.get(schluessel)!;
  const eintrag = bildmanifest[schluessel];
  if (!eintrag) {
    console.warn(`  Bild «${schluessel}» fehlt im Manifest, übersprungen.`);
    return null;
  }
  const pfad = join(wurzel, "public", eintrag.standard.replace(/^\//, ""));
  if (trockenlauf) {
    console.log(`  [Trockenlauf] würde hochladen: ${basename(pfad)}`);
    hochgeladen.set(schluessel, `image-trockenlauf-${schluessel}`);
    return hochgeladen.get(schluessel)!;
  }
  const daten = await readFile(pfad);
  const asset = await client.assets.upload("image", daten, { filename: basename(pfad) });
  hochgeladen.set(schluessel, asset._id);
  console.log(`  hochgeladen: ${basename(pfad)}`);
  return asset._id;
}

async function bild(verweis: Bildverweis) {
  const assetId = await bildHochladen(verweis.schluessel);
  if (!assetId) return undefined;
  return {
    _type: "bild",
    asset: { _type: "reference", _ref: assetId },
    alt: verweis.alt,
    ...(verweis.legende ? { legende: verweis.legende } : {}),
  };
}

async function bilder(verweise: readonly Bildverweis[]) {
  const ergebnis = [];
  for (const [index, verweis] of verweise.entries()) {
    const eintrag = await bild(verweis);
    if (eintrag) ergebnis.push({ ...eintrag, _key: `bild-${index}-${verweis.schluessel}` });
  }
  return ergebnis;
}

const mitKeys = <T extends object>(liste: readonly T[], praefix: string) => liste.map((eintrag, index) => ({ _key: `${praefix}-${index}`, ...eintrag }));

/* --------------------------------------------------------------- Dokumente */

type Dokument = { _id: string; _type: string } & Record<string, unknown>;

/** Alle IDs, die dieser Lauf erzeugen würde; deterministisch, deshalb vor dem Bauen bekannt. */
function alleIds(): string[] {
  return [
    "websiteEinstellungen",
    "startseite",
    "teamseite",
    "salonseite",
    "preisliste",
    "gaestebuchseite",
    ...gaestebuch.eintraege.map((e) => `gaestebuch-${e.nummer}`),
    "lageplan",
    "kontaktseite",
    ...rechtstexte.map((t) => `rechtstext-${t.art}`),
    ...seiten.map((s) => `seite-${s.slug}`),
  ];
}

/**
 * Baut nur die Dokumente, die geschrieben werden (`schreiben(id)`), damit für
 * übersprungene Dokumente keine Bilder hochgeladen werden.
 */
async function dokumente(schreiben: (id: string) => boolean): Promise<Dokument[]> {
  const liste: Dokument[] = [];
  const hinzufuegen = async (id: string, bauen: () => Promise<Dokument> | Dokument) => {
    if (!schreiben(id)) return;
    liste.push(await bauen());
  };

  await hinzufuegen("websiteEinstellungen", () => ({
    _id: "websiteEinstellungen",
    _type: "websiteEinstellungen",
    name: einstellungen.name,
    kurzname: einstellungen.kurzname,
    beschreibung: einstellungen.beschreibung,
    demohinweis: einstellungen.demohinweis,
    // telefonLink wird aus der Anzeige-Nummer abgeleitet und nicht gespeichert
    kontakt: Object.fromEntries(Object.entries(einstellungen.kontakt).filter(([feld]) => feld !== "telefonLink")),
    oeffnungszeiten: {
      ...einstellungen.oeffnungszeiten,
      woche: einstellungen.oeffnungszeiten.woche.map((tag, i) => ({ _key: `tag-${i}`, ...tag, zeiten: mitKeys(tag.zeiten, `zeit-${i}`) })),
      sonderzeiten: einstellungen.oeffnungszeiten.sonderzeiten.map((s, i) => ({ _key: `sonder-${i}`, ...s, zeiten: mitKeys(s.zeiten, `sonderzeit-${i}`) })),
    },
    hauptnavigation: mitKeys(einstellungen.hauptnavigation, "nav"),
    rechtsnavigation: mitKeys(einstellungen.rechtsnavigation, "recht"),
  }));

  await hinzufuegen("startseite", async () => ({
    _id: "startseite",
    _type: "startseite",
    ...startseite,
    heroBild: await bild(startseite.heroBild),
    teamBild: await bild(startseite.teamBild),
    salonBilder: await bilder(startseite.salonBilder),
    preisAuszug: mitKeys(startseite.preisAuszug.map((p) => ({ _type: "preisverweis", ...p })), "preis"),
  }));

  await hinzufuegen("teamseite", async () => ({
    _id: "teamseite",
    _type: "teamseite",
    ...team,
    mitglieder: await Promise.all(team.mitglieder.map(async ({ bild: portrait, ...m }, i) => ({ _key: `mitglied-${i}`, _type: "teammitglied", ...m, ...(portrait ? { bild: await bild(portrait) } : {}) }))),
    bilder: await bilder(team.bilder),
  }));

  await hinzufuegen("salonseite", async () => ({ _id: "salonseite", _type: "salonseite", ...salon, galerie: await bilder(salon.galerie) }));

  await hinzufuegen("preisliste", () => ({
    _id: "preisliste",
    _type: "preisliste",
    ...preisliste,
    kategorien: preisliste.kategorien.map((k, i) => ({ _key: `kat-${i}`, _type: "preiskategorie", titel: k.titel, positionen: k.positionen.map((p, j) => ({ _key: `pos-${i}-${j}`, _type: "preisposition", ...p })) })),
  }));

  const { eintraege, ...gaestebuchSeite } = gaestebuch;
  await hinzufuegen("gaestebuchseite", () => ({ _id: "gaestebuchseite", _type: "gaestebuchseite", ...gaestebuchSeite }));
  for (const eintrag of eintraege) {
    await hinzufuegen(`gaestebuch-${eintrag.nummer}`, () => ({ _id: `gaestebuch-${eintrag.nummer}`, _type: "gaestebucheintrag", ...eintrag, datum: `${eintrag.datum}:00Z` }));
  }

  await hinzufuegen("lageplan", () => ({
    _id: "lageplan",
    _type: "lageplan",
    seo: lageplan.seo,
    titel: lageplan.titel,
    einleitung: lageplan.einleitung,
    karteEinbettungsUrl: lageplan.karte.einbettungsUrl,
    karteTitel: lageplan.karte.titel,
    anreiseTitel: lageplan.anreiseTitel,
    anreise: lageplan.anreise,
  }));

  await hinzufuegen("kontaktseite", () => ({ _id: "kontaktseite", _type: "kontaktseite", ...kontaktseite }));

  for (const text of rechtstexte) await hinzufuegen(`rechtstext-${text.art}`, () => ({ _id: `rechtstext-${text.art}`, _type: "rechtstext", ...text }));

  for (const seite of seiten) {
    await hinzufuegen(`seite-${seite.slug}`, async () => {
      const bausteine = [];
      for (const baustein of seite.bausteine) {
        if (baustein._type === "bildblock") bausteine.push({ ...baustein, bild: await bild(baustein.bild) });
        else if (baustein._type === "galerieblock") bausteine.push({ ...baustein, bilder: await bilder(baustein.bilder) });
        else bausteine.push(baustein);
      }
      return { _id: `seite-${seite.slug}`, _type: "seite", titel: seite.titel, slug: { _type: "slug", current: seite.slug }, einleitung: seite.einleitung, inNavigation: seite.inNavigation, seo: seite.seo, bausteine };
    });
  }

  return liste;
}

/* ------------------------------------------------------------------ Lauf */

// Zuerst nachsehen, was es schon gibt; erst dann bauen (und Bilder hochladen).
const ids = alleIds();
const vorhanden = new Set<string>(await client.fetch<string[]>(`*[_id in $ids]._id`, { ids }));
const uebersprungen = ids.filter((id) => vorhanden.has(id) && !aktualisieren);
for (const id of uebersprungen) console.log(`  vorhanden, unverändert: ${id}`);

const alle = await dokumente((id) => !vorhanden.has(id) || aktualisieren);

console.log(`\n${ids.length} Dokumente insgesamt, ${vorhanden.size} existieren bereits, ${alle.length} werden geschrieben.`);
let angelegt = 0;
let ersetzt = 0;
const transaktion = client.transaction();
for (const dokument of alle) {
  if (vorhanden.has(dokument._id)) {
    transaktion.createOrReplace(dokument);
    ersetzt += 1;
    console.log(`  ersetzen: ${dokument._id}`);
  } else {
    transaktion.createIfNotExists(dokument);
    angelegt += 1;
    console.log(`  anlegen: ${dokument._id}`);
  }
}

if (trockenlauf) {
  console.log(`\n[Trockenlauf] Nichts geschrieben. Würde anlegen: ${angelegt}, ersetzen: ${ersetzt}, unverändert: ${uebersprungen.length}.`);
} else if (angelegt + ersetzt === 0) {
  console.log("\nNichts zu tun.");
} else {
  await transaktion.commit();
  console.log(`\nFertig: ${angelegt} angelegt, ${ersetzt} ersetzt, ${uebersprungen.length} unverändert. Dokumente sind als Entwürfe/veröffentlicht gemäss Sanity-Standard; im Studio prüfen und veröffentlichen.`);
}
