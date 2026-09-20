# Lokale Demo-Inhalte pflegen

Solange kein CMS angeschlossen ist, sind die Inhalte typisierte Dateien unter `data/`.
Jede Änderung: Datei bearbeiten → `npm test` → `npm run build` → Push auf `main`
(GitHub Actions veröffentlicht automatisch).

| Datei | Inhalt |
|---|---|
| `data/einstellungen.ts` | Name, Kontakt, Öffnungszeiten (7 Tage, Sonderzeiten), Navigation, rechtliche Links, Demohinweis |
| `data/startseite.ts` | Hero, Willkommen, Teaser (Team, Preise-Auszug, Salon-Bilder, Gästebuch-Nummern) |
| `data/team.ts` | Teammitglieder (Name, optional Rolle/Porträt), gemeinsame Fotos, Hinweis |
| `data/salon.ts` | Galerie «Mein Geschäft» |
| `data/preisliste.ts` | Kategorien und Positionen (`fest("Leistung", "Variante", Betrag)`), Hinweise |
| `data/gaestebuch.ts` | Einträge (`sichtbar: false` blendet aus, `grund` erklärt warum) |
| `data/lageplan.ts` | Karten-Einbettungsadresse, Anreise |
| `data/kontaktseite.ts` | Texte der Kontaktseite |
| `data/rechtstexte.ts` | Impressum, Datenschutzerklärung (Portable Text über `text()`) |
| `data/seiten.ts` | freie Seiten aus Bausteinen (z. B. «Leistungen») |

## Texte

`text("Absatz", "## Zwischentitel", "- Punkt", "**fett**", "[Link](/preisliste/)")`
erzeugt Portable-Text-Blöcke, exakt die Struktur, die Sanity später liefert. Harte
Zeilenumbrüche innerhalb eines Absatzes mit `\n`.

## Bilder

1. Datei nach `assets/original/` legen (Ordner ist nicht im Git; Originale mit
   `npm run originale` erneut laden, siehe `assets/quellen.json`).
2. In `scripts/bilder-aufbereiten.mjs` einen Eintrag ergänzen
   (`{ id: "mein-bild", datei: "mein-bild.jpg" }`, optional `seitenverhaeltnis`, `position`).
3. `npm run bilder` → erzeugt AVIF/WebP-Varianten in `public/bilder/` und das Manifest.
4. In der Inhaltsdatei `bild("mein-bild", "Beschreibung, was zu sehen ist")` verwenden.
5. Herkunft in `assets/quellen.json` eintragen.

`npm test` schlägt fehl, wenn ein Verweis im Manifest fehlt oder ein Alt-Text zu kurz ist.

## Preise

Beträge in Franken als Zahl. `preisart: "ab"` zeigt «ab CHF …», `"aufAnfrage"` zeigt
«auf Anfrage» ohne Betrag. Aufeinanderfolgende Positionen mit derselben `leistung`
werden als Gruppe mit Varianten dargestellt. Die `hinweise` erscheinen sichtbar über
der Liste; der Test prüft, dass sie vorhanden sind.

## Neue Seite

Eintrag in `data/seiten.ts` mit `slug`, `titel`, `bausteine` (Text, Bild, Galerie,
Preisauszug, Team, Kontakt, Öffnungszeiten, Karte, Gästebuch-Auszug). `inNavigation: true`
hängt sie hinten an die Navigation; für eine bestimmte Position den Punkt in
`data/einstellungen.ts` → `hauptnavigation` eintragen (Ziel `/slug/`).
