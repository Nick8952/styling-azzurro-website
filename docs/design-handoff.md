# Design-Handoff

Token in `app/globals.css` (`:root`). Werte nie roh in Komponenten.

## Layout
- Inhaltsbreite `--inhalt-breite` 72 rem, Rand `--rand` = clamp(16 px, 4 vw, 48 px)
- Textbreite `--text-breite` 40 rem für Fliesstext
- Breakpoints: 40 rem (640) zwei Spalten in Rastern, 48 rem (768) Fuss dreispaltig /
  Preistafel zweispaltig, 64 rem (1024) Desktop-Navigation und alle Split-Layouts
- Kopf: sticky, 68 px hoch, Wortmarke 150 px (136 px unter 400 px), Telefonknopf
  (unter 400 px nur Symbol, `aria-label` bleibt), Menüknopf 44 px

## Komponenten und Zustände

| Komponente | Datei | Zustände |
|---|---|---|
| Knopf primär/sekundär/leise | `globals.css .knopf-*` | Hover (dunkler/hell), Active (1 px nach unten), Fokus (3 px Ring, Versatz 3 px), Disabled (nur Einwilligung, bis Hydration) |
| Navigation | `components/Navigation.tsx` | geschlossen/offen (`aria-expanded`), aktiver Punkt (`aria-current="page"`, Neon-Unterstrich), Escape schliesst, Seitenwechsel schliesst |
| Bild | `components/Bild.tsx` | Unschärfe-Vorschau bis geladen, `loading=lazy` ausser Hero (`prioritaet`) |
| Einblenden | `components/Einblenden.tsx` | unsichtbar→sichtbar (Deckkraft + 12 px), nur mit JS und ohne `prefers-reduced-motion` |
| Galerie | `components/Galerie.tsx` | Spaltenlayout 2/3/4; Vergrösserung `<dialog>` modal, Fokus im Dialog, Escape/Hintergrund schliesst, Pfeiltasten blättern, Zähler «n von m» |
| Preistafel | `components/Preistafel.tsx` | Hinweiszeile, Kategorien, Gruppen mit Varianten, Punktlinie, Tabellenziffern; ab 48 rem zweispaltig (Damen links über zwei Zeilen) |
| Türschild | `components/Oeffnungszeiten.tsx` | Vollform (7 Tage, Sonderzeiten, Terminhinweis) und `kompakt` (gruppiert, Fuss) |
| Karte | `components/Karte.tsx` | gesperrt (Platzhalter mit Erklärung, «Google Maps laden», Häkchen «merken», Routenlink), geladen einmalig («Karte entfernen»), geladen gemerkt («Zustimmung widerrufen»), Speicherfehler (Hinweis) |
| Einwilligungsverwaltung | `components/Einwilligungsverwaltung.tsx` | wird gelesen / nichts gespeichert / gespeichert (Schlüssel, Dienste, Zeitpunkt); Meldung `role="status"` |
| Kontaktformular | `components/Kontaktformular.tsx` | leer, Fehler je Feld (`aria-invalid`, Text unter dem Feld, Fokus auf erstes Fehlerfeld), vorbereitet (Statuszeile mit Ersatzlink); nie «gesendet» |
| Gästebuchliste | `components/Gaestebuchliste.tsx` | Liste (neuste zuerst) oder Auszug zweispaltig |
| 404 | `app/not-found.tsx` | statisch, drei Auswege |

## Bewegung
| Element | Auslöser | Animation | Dauer | Kurve |
|---|---|---|---|---|
| Abschnitte | Eintritt ins Sichtfenster | Deckkraft 0→1, y 12→0 px | 320 ms (+ Staffel 60–80 ms) | `--kurve` |
| Menüfläche | öffnen | Deckkraft, y -6→0 | 320 ms | `--kurve` |
| Menüknopf | öffnen | Hamburger → Kreuz (Rotation) | 320 ms | `--kurve` |
| Knöpfe/Links | Hover | Farbe, Pfeil 3 px | 160 ms | `--kurve` |
| Galeriekachel | Hover | Schatten | 320 ms | `--kurve` |
Reduzierte Bewegung: alle Übergänge 0.01 ms, Einblenden inaktiv, Scrollen ohne Smooth.

## Barrierefreiheit (umgesetzt und geprüft)
Sprunglink, Landmarken (header/nav/main/footer), genau ein h1 je Seite, Überschriften
ohne Sprünge, Labels an allen Feldern, Fokusring 3 px Azzurro, Berührungsziele
≥ 44 px (Prüfskript im Prüfbericht), Kontraste ≥ 4.5:1 (Token-Tabelle im Designkonzept),
`lang="de-CH"`, Bilder mit beschreibendem Alt-Text, Symbole `aria-hidden`.

## Randfälle
- Kein JavaScript: Seiten vollständig lesbar, Menü nicht aufklappbar (Fussnavigation
  ersetzt es), Karte bleibt Platzhalter mit Routenlink, Formular wird als normales
  Formular ohne Aktion angezeigt.
- Lange Namen/Preise: Zeile bricht vor der Punktlinie, Betrag bleibt einzeilig.
- Fehlendes Bild im Manifest: Build bricht ab (bewusst).
- Kein localStorage: Karte lädt nur einmalig, Hinweis erscheint.
