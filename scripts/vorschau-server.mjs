#!/usr/bin/env node
/**
 * Statischer Vorschauserver für out/.
 *
 * Bildet die Auslieferung von GitHub Pages nach, inklusive Repository-
 * Unterpfad und 404.html. Damit lässt sich vor dem Deploy prüfen, ob
 * Unterseiten direkt aufrufbar sind und alle Pfade stimmen.
 *
 *   node scripts/vorschau-server.mjs [--port 4321] [--pfad /repo-name]
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..", "out");
const argumente = process.argv.slice(2);
const wert = (name, standard) => {
  const index = argumente.indexOf(name);
  return index >= 0 && argumente[index + 1] ? argumente[index + 1] : standard;
};

const port = Number(wert("--port", "4321"));
const basis = wert("--pfad", process.env.NEXT_PUBLIC_BASE_PATH ?? "");

const typen = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

createServer(async (anfrage, antwort) => {
  let pfad = decodeURIComponent((anfrage.url ?? "/").split("?")[0]);

  if (basis && pfad !== basis && !pfad.startsWith(`${basis}/`)) {
    antwort.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    antwort.end(`Ausserhalb des Unterpfads ${basis}`);
    return;
  }
  if (basis) pfad = pfad.slice(basis.length) || "/";

  const kandidaten = pfad.endsWith("/")
    ? [join(pfad, "index.html")]
    : [pfad, `${pfad}.html`, join(pfad, "index.html")];

  for (const kandidat of kandidaten) {
    const datei = join(wurzel, normalize(kandidat).replace(/^(\.\.[/\\])+/, ""));
    try {
      const info = await stat(datei);
      if (!info.isFile()) continue;
      const inhalt = await readFile(datei);
      antwort.writeHead(200, {
        "content-type": typen[extname(datei)] ?? "application/octet-stream",
        "cache-control": "no-store",
      });
      antwort.end(inhalt);
      return;
    } catch {
      // nächster Kandidat
    }
  }

  try {
    const inhalt = await readFile(join(wurzel, "404.html"));
    antwort.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    antwort.end(inhalt);
  } catch {
    antwort.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    antwort.end("404");
  }
}).listen(port, () => {
  console.log(`Vorschau: http://localhost:${port}${basis || "/"}`);
});
