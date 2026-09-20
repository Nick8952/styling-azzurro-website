# Sanity und Vercel später einrichten

Gilt erst, wenn der Kunde Interesse zeigt. Bis dahin läuft die Demo vollständig ohne
diese Dienste. Nichts hier ist bereits angelegt.

Stand der Vorbereitung (was geprüft ist und was nicht):

| Baustein | Zustand |
|---|---|
| Sanity-Schemas `sanity/schemas/**` (deutsche Feldnamen, Hilfetexte, Validierungen) | vorbereitet, **typgeprüft** (`npm run typecheck`), noch nie in einem Studio geladen |
| Studio-Konfiguration `sanity.config.ts` (eigene Build-Einheit, Einzeldokumente ohne Löschen) | vorbereitet, typgeprüft, nicht gestartet |
| GROQ-Abfragen `sanity/abfragen.ts` + Adapter `sanity/inhaltsquelle.ts` | vorbereitet, typgeprüft gegen `lib/inhalt/typen.ts`, **erst nach Einrichtung gegen echte Daten prüfbar** |
| Bildauflösung `sanity/bild.ts` (Zuschnitt, Hotspot, LQIP, Varianten über das Sanity-CDN) | vorbereitet, erst nach Einrichtung prüfbar |
| Seed-Skript `scripts/sanity-seed.mts` (Trockenlauf, kein Überschreiben ohne Flag) | vorbereitet, typgeprüft, **nie ausgeführt** |
| Build-Profil `DEPLOY_TARGET=vercel` in `next.config.ts` | vorbereitet, lokal nicht gebaut |
| `.env.example` | vorhanden, ohne Werte |

## 1. Sanity-Projekt anlegen (Nick)

1. Bei sanity.io anmelden, neues Projekt «Styling Azzurro», Dataset `production` (public).
2. Projekt-ID notieren (keine Geheimnis) und einen **Token mit Schreibrechten** für den
   Import erzeugen (Geheimnis, nur lokal).
3. Lokal: `cp .env.example .env.local`, dann `NEXT_PUBLIC_SANITY_PROJECT_ID`,
   `NEXT_PUBLIC_SANITY_DATASET=production`, `SANITY_API_WRITE_TOKEN` eintragen.
   `.env.local` ist in `.gitignore`.
4. CORS: in den Sanity-Projekteinstellungen `http://localhost:3000`, `http://localhost:3333`
   und später die Vercel-Domain als erlaubte Ursprünge eintragen (mit Credentials).

## 2. Inhalte importieren

```
npm run seed -- --trockenlauf   # zeigt Projekt, Dataset und jedes Dokument, schreibt nichts
npm run seed                    # legt an, was fehlt; vorhandene Dokumente bleiben unverändert
```

Das Skript lädt die aufbereiteten WebP-Varianten aus `public/bilder/` hoch (die
Originale liegen nicht im Repository). Dokument-IDs sind fest: Einzeldokumente heissen
wie ihr Typ (`preisliste`, `startseite`, …), Gästebucheinträge `gaestebuch-<nummer>`,
Rechtstexte `rechtstext-impressum` / `rechtstext-datenschutz`, Seiten `seite-<slug>`.
Ein zweiter Lauf ist ungefährlich. `--aktualisieren` ersetzt vorhandene Dokumente und
verlangt vorher die Eingabe des Dataset-Namens; nur benutzen, solange der Salon noch
nichts selbst gepflegt hat.

## 3. Studio starten und prüfen

```
npm run studio      # http://localhost:3333
```

Prüfen: alle Einzeldokumente öffnen, Preisliste (3 Kategorien, 29 Positionen),
Gästebucheinträge, Bilder mit Beschreibung. Dann **veröffentlichen** (Seed legt
Dokumente direkt veröffentlicht an; falls sie als Entwürfe erscheinen: «Publish»).

Studio für den Kunden bereitstellen: `npx sanity deploy` (Adresse
`<name>.sanity.studio`). Der Kunde meldet sich mit E-Mail an; Rolle **Editor**
(Inhalte pflegen), Nick bleibt Administrator. Kein GitHub-Konto nötig.

Alternativ als Route auf Vercel: erst nach dem Umstieg auf Vercel und nur mit
`app/studio/[[...tool]]/page.tsx` + `NextStudio`; für GitHub Pages ausdrücklich nicht
(Catch-all-Route bricht den statischen Export).

## 4. Website auf Sanity umstellen (eine Zeile)

`lib/inhalt/index.ts`:

```ts
export { sanityInhaltsquelle as inhalt } from "@/sanity/inhaltsquelle";
```

Danach `npm run typecheck` und `DEPLOY_TARGET=vercel npm run build:vercel` lokal.
Fehlt ein Dokument, bricht der Build absichtlich ab («Sanity liefert keinen Eintrag …»).

Was sich damit ändert: Bilder kommen vom Sanity-CDN (`absolut: true`, kein Unterpfad,
`images.unoptimized` in `next.config.ts` kann entfallen), die Bildpipeline
`npm run bilder` wird nicht mehr gebraucht, `data/` bleibt als Vorlage für den Seed.

## 5. Vercel

1. Vercel-Konto, «Import Git Repository» → `Nick8952/styling-azzurro-website`.
2. Build Command `npm run build:vercel`, Framework Next.js, Node 22.
3. Umgebungsvariablen: `DEPLOY_TARGET=vercel`, `NEXT_PUBLIC_SANITY_PROJECT_ID`,
   `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SITE_URL=https://<projekt>.vercel.app`
   (später Kundendomain), `SANITY_REVALIDATE_SECRET` (zufälliger Wert). **Kein**
   Schreib-Token auf Vercel.
   Hinweis: Vercel übergibt jede angelegte Variable, auch eine leere, als leere
   Zeichenkette. `lib/seite-url.ts` behandelt leer deshalb wie «nicht gesetzt» und
   fällt auf Vercels eigene `VERCEL_PROJECT_PRODUCTION_URL` zurück (Build-Fehler
   «Invalid URL» vom 21.09.2026 behoben).
   Ohne Sanity (Inhalte weiterhin aus `data/`) genügt auf Vercel auch der Standard-
   Build `npm run build`: Er erzeugt den statischen Export ohne Unterpfad, den Vercel
   als statische Site ausliefert.
4. Aktualisierung: Ohne weitere Massnahme sind Inhalte ein Build-Stand. Für
   Aktualisierung nach jedem Veröffentlichen: in Sanity einen Webhook auf
   `https://<domain>/api/revalidate?secret=…` einrichten und in der App eine
   Route `app/api/revalidate/route.ts` mit `revalidatePath("/", "layout")` ergänzen
   (noch nicht im Repository, weil der Export keine API-Routen kennt), oder einen
   Vercel-Deploy-Hook als Webhook-Ziel verwenden (löst einen kompletten Neuaufbau aus,
   einfacher, ~1 Minute). Empfehlung für diesen Salon: **Deploy-Hook**.
5. Vorschau/Visual Editing: erst sinnvoll, wenn der Kunde regelmässig selbst pflegt.
   Benötigt `next-sanity` Draft Mode und einen Viewer-Token; bewusst nicht vorbereitet.

## 6. Nach dem Umzug

- GitHub-Pages-Workflow entfernen oder Pages deaktivieren (sonst zwei Stände).
- `robots` in `app/layout.tsx` auf `index: true` stellen, Sitemap ergänzen, Canonical
  auf die Kundendomain; siehe `docs/umstellungs-checkliste.md`.
- Datenschutzerklärung anpassen (Hosting Vercel, Sanity-CDN für Bilder, Studio).
