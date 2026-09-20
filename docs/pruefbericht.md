# Prüfbericht (20.09.2026)

Alle Tests mit Chrome (headless, puppeteer-core) in **Geräteemulation**, nicht auf
echten Geräten. Keine Lighthouse-Werte gemessen. Keine echten Kontaktanfragen oder
Termine ausgelöst (das Formular öffnet nur das E-Mail-Programm; im Test wurde die
`mailto:`-Adresse nur zusammengesetzt).

## Build und Code
| Prüfung | Ergebnis |
|---|---|
| `npm run typecheck` (inkl. sanity/, scripts/) | fehlerfrei |
| `npm run lint` | fehlerfrei (0 Fehler, 0 Warnungen) |
| `npm test` | 18 Tests bestanden (Preisbeträge 1:1, Gästebuch, Manifest, Portable Text, Zeiten, Einwilligung) |
| `npm run build:pages` mit Unterpfad | 14 Routen exportiert |
| `npm run export:pruefen` | 14 Seiten, 305 Dateien: keine toten Verweise, kein Verweis ohne Unterpfad, keine Sanity-Adresse, kein Token |
| Build ohne Env-Variablen | funktioniert (`.env.local` existiert nicht) |
| GitHub Actions | Run 35530777253 grün (typecheck, lint, test, build, export-Prüfung, Deploy) |
| `npm run live:pruefen` gegen GitHub Pages | 11 Routen 200 + noindex, 45 referenzierte Dateien 200, 404-Seite, robots.txt |

## Inhalt und Fakten
- Inventur `docs/inhaltsinventur.md`: alle 8 Inhaltsseiten + Rechtsseiten zugeordnet.
- Preisliste: 29 Positionen, Beträge per Test gegen das Quellbild fixiert; beide Hinweissätze sichtbar über der Liste und auf der Startseite.
- Gästebuch: 6 von 7 Einträgen wörtlich (Zeilenumbrüche erhalten), #6 dokumentiert ausgeblendet.
- Team: zwei Namen ohne Rollen (nicht vom Salon belegt); Antonella Rullo als Ansprechperson wie auf der Kontaktseite; keine Einzelzuordnung von Gesichtern.
- Keine erfundenen Öffnungszeiten (Sonntag wird mangels Angabe nicht gezeigt), keine Bewertungen, keine Partnerschaften (Wella-Produkte nur auf Fotos, kein Text).
- Schema.org `HairSalon` enthält nur Name, Adresse, Telefon, E-Mail, Öffnungszeiten, Facebook/Website.

## Responsiv (360, 390, 768, 1440 px)
| Prüfung | Ergebnis |
|---|---|
| Horizontaler Überlauf (`scrollWidth > clientWidth`) | 0 auf 12 Routen × 4 Breiten (nach Behebung: Telefonknopf 360 px, Grid-Blowout Mosaik) |
| Navigation | 1440: eine Zeile, aktiver Punkt markiert; < 1024: Menüknopf 44 px, Fläche mit Telefon + Zeiten, Escape schliesst |
| Bilder ohne `alt` | 0 |
| Genau ein `h1`, keine Überschriftensprünge | ja, alle Seiten |
| Preisliste 360 px | alle 29 Positionen mit Betrag einzeilig, Hinweis sichtbar (Screenshot) |
| Galerie / Vergrösserung | Spaltenlayout ohne Lücken; Dialog modal, Pfeile, Zähler, Schliessen |
| Formular | Fehlermeldungen unter dem Feld, Fokus springt aufs erste Fehlerfeld, Knopf «E-Mail vorbereiten» |
| 404 | eigene Seite unter Unterpfad, Status 404 |

## Barrierefreiheit
| Prüfung | Ergebnis |
|---|---|
| Berührungsziele ≥ 44 × 44 px (alle `a, button, input`, ausser Inline-Links im Fliesstext) | erfüllt nach Behebung (Fusslinks `min-width`, Checkboxen 24 px + Label ≥ 44 px) |
| Tastatur: Tab-Reihenfolge, Fokusring auf ersten 12 Stopps je Seite | Sprunglink → Logo → Telefon → Menü → Inhalt; Fokusring überall sichtbar (3 px Azzurro) |
| Labels | 0 Felder ohne Label |
| Landmarken | header, nav (3: Haupt, Seitenübersicht, Rechtliches), main, footer |
| Kontrast | Text 16.9:1, Text 2 7.8:1, Azzurro 8.4:1, Weiss auf Azzurro 8.4:1, Fehler 6.4:1 (berechnet aus Token) |
| Reduzierte Bewegung | `prefers-reduced-motion: reduce` deaktiviert Einblenden, Übergänge und Smooth-Scroll (Screenshots mit reduce erstellt) |
| Screenreader | nicht mit VoiceOver getestet (offen); Struktur mit Rollen/aria geprüft |

## Datenschutztechnik (Consent-Flow, 10 Zustände, `consent.mjs`)
| Zustand | Iframe | localStorage | Cookies | externe Hosts |
|---|---|---|---|---|
| vor Auswahl (Lageplan) | 0 | leer | keine | keine |
| andere Seiten ohne Auswahl | 0 | leer | keine | keine |
| «Google Maps laden» einmalig | 1 | leer | keine (Erstpartei) | google.com, gstatic, googleapis |
| Neuladen nach einmalig | 0 | leer | keine | keine neuen |
| gemerkt + geladen | 1 | `styling-azzurro-einwilligung` {version 1, googleMaps, Zeitpunkt} | keine | Google |
| Neuladen nach gemerkt | 1 (automatisch) | vorhanden | keine | Google |
| Einstellungsseite zeigt Schlüssel/Dienst/Zeit | – | – | – | – |
| «Alle ablehnen» auf Einstellungsseite | 0 | gelöscht | keine | keine |
| Lageplan nach Widerruf | 0 | leer | keine | keine |
| Widerruf an der Karte + Neuladen | 0 | leer | keine | keine |

Cookies von Google innerhalb des Iframes sind Drittanbieter-Cookies, von der Seite
nicht lesbar und nicht löschbar; die Datenschutzerklärung sagt das.

## Behobene Befunde aus der Kritik
1. Navigation brach Wörter um («Tea m») → `white-space: nowrap`, `flex: 0 0 auto`.
2. Mosaik/Team-Bilder sprengten das Raster (`min-width: auto`) → `min-width: 0` auf Rasterkinder.
3. Telefonknopf zeigte kein Symbol (Modul-CSS verlor gegen globale `.knopf`-Regel, SVG auf 0 px) → höhere Spezifität, feste Symbolgrösse.
4. Hero mit zu viel Leerraum (min-height) → Padding statt Vollhöhe.
5. «Standard» als erfundene Variantenbezeichnung → Leistung selbst als Zeilentext (Dauerwelle).
6. Galerie mit Lücken (Grid) → Spaltenlayout ohne Beschnitt.
7. Fuss-Öffnungszeiten unlesbar umgebrochen → gestapelt.
8. Fusslinks 41 px breit, Checkboxen 20 px → Mindestbreite 44 px, Checkbox 24 px.
9. Aus dem Codex-Review (docs/codex-review.md): OG-Bild mit doppeltem Unterpfad, Zählfehler 31/29, unbelegte Wörter («Inhaberin», «direkt», «ruhig», Sonntag), JSON-LD-Maskierung, Link-Protokolle, Tab-Reihenfolge des Menüs, Seed-Skript (.env.local, doppelte Uploads), Workflow-Rechte je Job und SHA-Pins.

## Hinweise
- `robots.txt` liegt auf GitHub Pages unter dem Projektpfad, nicht an der Domainwurzel, und ist für Crawler deshalb wirkungslos; der Schutz der Demo ist das `noindex` im HTML jeder Seite (geprüft).

## Offen
- Tests auf echten Geräten (iOS Safari, Android Chrome) und mit Screenreader.
- Lighthouse.
- Alles unter «Sanity/Vercel» ist nur typgeprüft (siehe `docs/sanity-vercel-einrichtung.md`).
