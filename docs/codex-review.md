# Codex-Prüfung (Zweitmeinung, 20.09.2026)

Codex (`codex exec --sandbox read-only`) wurde zweimal einbezogen. Beide Antworten
liegen als Volltext in der Sitzungsablage vor; hier die Substanz und was daraus wurde.

## Runde 1: Architektur (vor der Umsetzung)

Geprüft: Static Export + späterer Wechsel Sanity/Vercel, Bildmodell, Portable Text
lokal, Seed-Skript, Trennung der Quellen, basePath-Fallen, Consent-Ansatz, Preismodell,
Studio-Einbettung.

| Empfehlung | Umsetzung |
|---|---|
| Komponenten sollen ein normalisiertes Darstellungsbild erhalten, nicht die Manifest/URL-Union | umgesetzt: `Bild`-Typ mit `src`, Massen, Varianten, `absolut`; lokale Quelle löst Manifest, Sanity-Quelle löst Assets (`sanity/bild.ts`) |
| Kein eingebettetes Studio (Catch-all) im statischen Export | umgesetzt: Studio als eigene Build-Einheit (`sanity.config.ts`, `npm run studio`, `sanity deploy`) |
| Bei genau einem optionalen Dienst kein generischer Banner, sondern Zwei-Klick-Platzhalter mit Konsequenzbeschreibung + Einstellungsseite | umgesetzt (`components/Karte.tsx`, `/datenschutz-einstellungen/`); Widerruf entfernt das Iframe, Grenzen (Google-Cookies) sind beschrieben |
| Seed: Trockenlauf, Projekt/Dataset anzeigen, Bestätigung für Überschreiben, deterministische IDs, keine Löschungen | umgesetzt (`scripts/sanity-seed.mts`) |
| Preise nicht als «fest» modellieren, wenn sie angepasst werden | teilweise: Modell kennt fest/ab/aufAnfrage; die Beträge sind wie im Original ausgewiesen, der Anpassungshinweis steht sichtbar über der Liste und auf der Startseite. Eine Umbenennung in «Richtpreis» hätte die Aussage des Kunden verändert. |
| Deployte URL per HTTP testen, nicht nur `out/` | umgesetzt (`scripts/live-pruefen.mjs`) |
| Portable Text: keinen informellen Eigenparser | teilweise: der kleine Wandler `text()` blieb (bewusst begrenzter Sprachumfang, deterministische Keys, Tests); Rich Text liegt als echte Portable-Text-Blöcke vor |
| Laufzeitvalidierung (Zod) der CMS-Antworten | nicht umgesetzt (bewusst schlank); Adapter scheitert laut bei fehlenden Dokumenten und setzt Fallbacks für optionale Felder |
| Versionen exakt pinnen | umgesetzt (package.json exakt, Actions auf SHAs) |

## Runde 2: Implementierungsreview (vor der Übergabe)

Geprüft: Inhaltstreue gegen Inventur und Preisdaten, Codequalität/Hydration, Sicherheit
(mailto, JSON-LD, iframe, Links, Secrets, Workflow), Mobile, Datenschutztechnik und
-erklärung, Sanity-Vorbereitung, GitHub-Pages-Fallen. Codex führte typecheck, lint und
Tests selbst aus (alle grün).

| Befund | Bewertung | Umsetzung |
|---|---|---|
| Preisliste hat 29, nicht 31 Positionen (Zählfehler in Inventur/Test) | zutreffend | Dokumente und Test korrigiert; Test prüft jetzt explizit 29 |
| «Inhaberin» und «Sonntag geschlossen» unbelegt | zutreffend | Rolle entfernt (Feld `ansprechperson`), Sonntag aus den Zeiten entfernt, beides als Kundenfrage geführt |
| Open-Graph-Bild mit doppeltem Unterpfad | zutreffend, kaputter Link | `absolut()` statt relativer Pfad; im Export geprüft |
| Seed liest `.env.local` nicht | zutreffend | Skript liest `.env.local` selbst |
| Zweiter Seed-Lauf lädt Bilder erneut hoch | zutreffend | Vorhandene IDs werden vor dem Bauen abgefragt; nur zu schreibende Dokumente werden gebaut |
| Datenschutzerklärung: mailto-Übergabe ungenau | zutreffend | Formulierung präzisiert (Übergabe ans Mailprogramm, Versand erst dort) |
| JSON-LD ohne `<`-Maskierung | zutreffend (relevant nach CMS) | `<`-Maskierung |
| Portable-Text-Links: beliebige Protokolle, `extern`-Flag | zutreffend | Allow-List (intern, https/http, mailto, tel), «extern» aus URL abgeleitet, Schema-Validierung |
| Schema optional vs. Typ pflichtig | zutreffend | Pflichtfelder im Schema ergänzt, Fallbacks im Adapter, `h4` im Fliesstext |
| Mobile Menü: Tab-Reihenfolge, fehlende max-height | zutreffend | Liste im DOM hinter den Knöpfen (Desktop per `order`), Panel scrollbar |
| Galerie-Hintergrundklick wirkungslos, Alt + Legende doppelt | zutreffend | Klickziel erweitert, grosses Bild ohne Alt (Legende beschreibt) |
| «Alle ablehnen» meldet «Gespeichert» | zutreffend | Meldung korrigiert; ungültige Speicherwerte werden entfernt |
| iframe `referrerPolicy` | Verbesserung | `no-referrer` |
| `.knopf { white-space: nowrap }` unter 360 px | Verbesserung | nowrap erst ab 40 rem |
| Workflow-Rechte für beide Jobs, Actions nur per Tag | zutreffend | `pages/id-token` nur im Deploy-Job, Actions auf Commit-SHAs |
| Unbelegte Wörter («direkt», «ruhig», «am schnellsten», «persönlich führen», «Online-Terminbuchung gibt es nicht») | zutreffend | Formulierungen auf das Belegte reduziert |
| «Stand 20.09.2026» beim Preisbild von 2022 | zutreffend | Quellenhinweis präzisiert |
| Inventur enthält Gästebuch-Texte nicht wörtlich | teils | Texte stehen wörtlich in `data/gaestebuch.ts` (mit Quell-URL); Inventur verweist dorthin |
| robots.txt unter dem Projektpfad wirkungslos | zutreffend | dokumentiert; `noindex` im HTML ist der Schutz |
| Verschachtelte Listen (`level`) im Renderer ignoriert | zutreffend, gering | nicht umgesetzt; Studio-Schema erlaubt Listen nur einstufig nutzen (dokumentiert) |
| Laufzeitvalidierung der GROQ-Antworten | Empfehlung | nicht umgesetzt (siehe Runde 1) |
| Fuss-Links ohne 44 px | war zum Reviewzeitpunkt bereits mit `min-width/min-height` behoben | – |

Nicht übernommen wurde die Umbenennung von Festpreisen in Richtpreise (Aussage des
Kunden bleibt) und eine Zod-Validierung (Aufwand/Nutzen für eine Demo).
