#!/usr/bin/env node
/**
 * Laedt die Originalmedien der bestehenden Website erneut nach assets/original/.
 * Quellen und Rechtehinweis stehen in assets/quellen.json.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..");
const quellen = JSON.parse(await readFile(join(wurzel, "assets/quellen.json"), "utf8"));
const ziel = join(wurzel, "assets/original");
await mkdir(ziel, { recursive: true });

for (const eintrag of quellen.dateien) {
  const antwort = await fetch(eintrag.quelle, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!antwort.ok) {
    console.error(`FEHLER ${antwort.status} bei ${eintrag.datei}`);
    process.exitCode = 1;
    continue;
  }
  await writeFile(join(ziel, eintrag.datei), Buffer.from(await antwort.arrayBuffer()));
  console.log(`geladen: ${eintrag.datei}`);
}
