# Styling Azzurro Website: Anweisungen für Claude Code

Verkaufs-Demo für **Coiffeur Styling Azzurro**, Winterthurerstrasse 659, 8051 Zürich
(Antonella Rullo und Ida Patella). Quelle aller Inhalte: www.styling-azzurro.ch
(Jimdo, abgerufen 20.09.2026). Die übergeordneten Regeln in
`../CLAUDE.md` (Workspace) und `~/.claude/CLAUDE.md` gelten weiterhin.

## Was das hier ist

- **Jetzt:** statischer Export (`output: "export"`) auf **GitHub Pages**,
  Repository `Nick8952/styling-azzurro-website`, Demo unter
  https://nick8952.github.io/styling-azzurro-website/ (immer `noindex`).
- **Später, nur bei Kundeninteresse:** **Sanity** als CMS, **Vercel** als Hosting.
  Beides ist vorbereitet, aber **nicht angelegt**. Keine Projekte anlegen, keine
  Zugänge verlangen, solange Nick das nicht ausdrücklich sagt.
- Die Demo baut und läuft **ohne jede Umgebungsvariable**.

## Befehle

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklung (ohne Unterpfad) |
| `npm run build` | statischer Export nach `out/` (Standard = `build:pages`) |
| `NEXT_PUBLIC_BASE_PATH=/styling-azzurro-website npm run build` | Export wie auf GitHub Pages |
| `npm run vorschau -- --pfad /styling-azzurro-website` | `out/` wie GitHub Pages ausliefern (Port 4321) |
| `npm run export:pruefen` | Unterpfad, tote Verweise, Tokens im Export prüfen |
| `npm run live:pruefen -- <URL>` | veröffentlichte Demo per HTTP prüfen |
| `npm run typecheck`, `npm run lint`, `npm test` | Qualitätstore (laufen auch im CI) |
| `npm run bilder` | Bildvarianten + Logo + Icons aus `assets/original/` erzeugen |
| `npm run originale` | Originale erneut von der Kundenwebsite laden (`assets/quellen.json`) |
| `npm run seed` | Inhalte nach Sanity importieren (erst nach Einrichtung, siehe unten) |
| `npm run studio` | Sanity Studio lokal (erst nach Einrichtung) |

Node ≥ 20.9 (lokal 26, CI 22). Paketversionen sind exakt gepinnt.

## Architektur

```
data/            typisierte Inhalte (Fakten 1:1 von der Quellwebsite)
lib/inhalt/      Inhaltsschnittstelle: typen.ts (Modell), lokal.ts (liest data/),
                 index.ts (aktive Quelle, EINE Zeile), seiten.ts (Lader je Route)
lib/bilder/      Manifest der erzeugten Bildvarianten (automatisch, nicht editieren)
sanity/          Schemas (deutsche Feldnamen), Client, GROQ, Adapter (vorbereitet)
components/      Darstellung; kennt nur lib/inhalt/typen.ts, nie data/ oder Sanity
app/             Routen (App Router), globals.css = Token-System
scripts/         Bildpipeline, Export-/Live-Prüfung, Vorschau, Seed
docs/            Inventur, Designkonzept, Handoff, Skill-Matrix, Übergabe, Umstellung
```

Regeln, die nicht verhandelbar sind:

1. **Komponenten holen Inhalte nur über `lib/inhalt/seiten.ts`.** Kein Import aus
   `data/` in `components/` oder `app/`.
2. **`lib/inhalt/index.ts` importiert genau eine Quelle.** Keine Laufzeit-Umschaltung,
   sonst landet der Sanity-Client im statischen Export.
3. **Bilder** sind in den Komponenten immer aufgelöst (`Bild`-Typ mit `src`, Massen,
   Varianten). Die lokale Quelle löst Manifest-Schlüssel auf, die Sanity-Quelle Assets.
4. **Adressen aus `public/`** immer über `oeffentlicherPfad()` (Unterpfad!). `<Link>`
   setzt den Unterpfad selbst.
5. **Fakten nur aus der Quelle.** Keine Preise, Zeiten, Namen, Rollen, Bewertungen
   erfinden. Unbelegtes wird in `docs/inhaltsinventur.md` als offen geführt.
6. **Kein Sanity-Studio als Next-Route.** Das Studio ist eine eigene Build-Einheit
   (`sanity.config.ts`, `npm run studio` / `npx sanity deploy`).

## Designregeln («Leuchtschrift», siehe docs/designkonzept.md)

- Ein Akzent: `--azzurro #2431d6` (aus dem Logo gemessen), decorativ `--neon #5c6cff`.
  Neutrale kühl. Keine zweite Akzentfarbe, keine Verläufe, kein Dark Mode (Logo
  existiert nur auf Weiss; Salon ist weiss).
- Eine Schriftfamilie: Figtree Variable (lokal via @fontsource). Ziffern tabellarisch.
- Formen: Knöpfe rund, Flächen 14 px, Eingaben 10 px.
- Signatur: Leuchtlinie unter Seitentiteln, Preistafel mit Punktlinien, Türschild
  für Öffnungszeiten. Sonst ruhig.
- Bewegung: nur Einblenden (320 ms) und Hover; `prefers-reduced-motion` schaltet alles ab.
- Kein Gedankenstrich (– oder —) in sichtbaren Texten; Schweizer Hochdeutsch («ss»), Anrede «Sie».
- Alle Berührungsziele ≥ 44 px, Kontrast ≥ 4.5:1, sichtbarer Fokus.

## Datenschutz

- Keine Cookies, keine Analyse, keine externen Schriften. Einziger externer Dienst:
  Google Maps auf `/lageplan/`, **nur nach Klick** (components/Karte.tsx). Zustimmung
  optional in `localStorage` (`styling-azzurro-einwilligung`), Widerruf unter
  `/datenschutz-einstellungen/` und an der Karte selbst.
- Kein Banner beim Seitenaufruf, weil ohne Handlung nichts Externes geladen wird.
  Wer einen weiteren einwilligungspflichtigen Dienst einbaut, muss `lib/einwilligung.ts`
  (DIENSTE) und die Datenschutzerklärung erweitern.
- Formulare senden nichts: `mailto` mit vorbereitetem Text («E-Mail vorbereiten»).

## GitHub Pages

`.github/workflows/deploy.yml`: bei Push auf `main` typecheck, lint, test, Export mit
`NEXT_PUBLIC_BASE_PATH=/<repo>`, `.nojekyll`, `export:pruefen`, Deploy via
`actions/deploy-pages`. Pages ist als «GitHub Actions»-Quelle aktiviert. Nach dem
Deploy `npm run live:pruefen -- https://nick8952.github.io/styling-azzurro-website`.

## Spätere Sanity-/Vercel-Einrichtung (nur auf Nicks Anweisung)

Schritt für Schritt in `docs/sanity-vercel-einrichtung.md`; Checkliste in
`docs/umstellungs-checkliste.md`. Kurzfassung: Sanity-Projekt anlegen → `.env.local`
aus `.env.example` → `npm run seed -- --trockenlauf` → `npm run seed` → im Studio
prüfen → `lib/inhalt/index.ts` auf `sanityInhaltsquelle` umstellen →
`DEPLOY_TARGET=vercel` → Vercel-Import mit Env-Variablen → Webhook für Revalidation.
Keine Zugangsdaten in Dateien; `.env.local` ist ignoriert.

## Nach wichtiger Arbeit

Obsidian-Brain aktualisieren (`Websites Hustle/04_Clients/Styling-Azzurro.md`,
`01_Projects/current-state.md`) gemäss Workspace-CLAUDE.md.
