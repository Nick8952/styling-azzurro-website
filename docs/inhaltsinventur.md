# Inhaltsinventur: www.styling-azzurro.ch → Demo

Abgerufen am 20.09.2026 (Desktop-HTML, Sitemap `sitemap.xml`). Die Website ist ein
Jimdo-Creator-Auftritt in einer Sprache (Deutsch); keine weiteren Sprachversionen.
Mobile Varianten (`?mobile=1`) sind dieselben Inhalte.

Status: **übernommen** = auf der Demo vorhanden · **überarbeitet** = sprachlich angepasst,
Aussage gleich · **nicht übernommen** = mit Grund · **offen** = Klärung nötig.

## Seiten

| Quell-URL | Inhalt | Zielseite | Status |
|---|---|---|---|
| `/` «Herzlich Willkommen» | Adresse, «An der 9er Tramhaltestelle, Luegisland», Telefon 044 3212035, Zeiten Mo–Fr 8.00–12.00 / 13.30–17.00, Sa geschlossen (So nicht genannt), E-Mail (Cloudflare-verschleiert, dekodiert: styling.azzurro@gmx.ch), «Wir freuen uns auf Ihren Besuch, Antonella Rullo und Ida Patella», Foto Schaufenster, Link «Mit Facebook verbinden» | `/` | übernommen; Telefon als 044 321 20 35 formatiert (wie Kontaktseite); Zeiten strukturiert; Facebook als Link im Fuss |
| `/team/` «Antonella und Ida» | 7 Fotos, eines mit Bildunterschrift «Antonella Rullo» (zeigt zwei Frauen), kein Text | `/team/` | übernommen; Namen als Namensschilder, Fotos als Galerie; **keine Einzelzuordnung** (siehe offen) |
| `/mein-geschäft/` «Mein Geschäft» | reine Fotogalerie (Slider + Bildraster), ca. 25 Bilder inkl. Duplikate, kein Text | `/salon/` (Navigation «Salon», Titel «Mein Geschäft») | übernommen; Duplikate zusammengeführt (siehe Medien); Bildbeschreibungen neu |
| `/preisliste/` | ein PNG-Bild mit Logo, 3 Kategorien, 29 Positionen, 2 Hinweissätze | `/preisliste/` (+ Auszug auf `/`) | übernommen als Text/HTML, Beträge 1:1 (Test `tests/inhalte.test.mts`) |
| `/lageplan/` | Kontaktblock (Coiffeur Styling Azzurro, Rullo Antonella, Adresse, Telefon), Google-Maps-Embed (Satellit, 47.4063272/8.58051) hinter Jimdo-Cookie-Consent | `/lageplan/` | übernommen; Karte als Zwei-Klick-Einbettung ohne API-Schlüssel, Strassenkarte statt Satellit |
| `/gästebuch/` | 7 Einträge (#1–#7, 2012–2024) mit Namen, Datum, Text; Jimdo-Formular für neue Einträge | `/gaestebuch/` (+ 2 Einträge auf `/`) | 6 Einträge wörtlich sichtbar, #6 im Modell erfasst aber ausgeblendet; Schreibformular als E-Mail-Vorbereitung |
| `/kontakt/` | Kontaktblock, Jimdo-Formular (Name, E-Mail, Nachricht, Captcha, Datenschutzhinweis) | `/kontakt/` | übernommen; Formular als `mailto`-Vorbereitung, zusätzlich Telefonfeld (freiwillig) |
| `/about/` «Impressum» | **nur** Jimdo-Werbebox («Diese Seite wurde mit Jimdo Creator erstellt»), keine Betreiberangaben | `/impressum/` | neu verfasst: Demo-Betreiber (Nick Holzbecher) und dargestellter Salon getrennt; Rechtsform/UID offen |
| `/j/privacy` «Datenschutz» | Jimdo-Standardtext: Google reCAPTCHA (Formular), «Webseitenanalyse (Creator Statistiken)»; Cookie-Kategorien laut Jimdo-Modul: Notwendig (ckies_*), Funktionell (POWr, Google Maps), Performance (leer), Marketing (POWr) | `/datenschutz/` | neu verfasst für die Demo (GitHub Pages, Google Maps nach Klick, localStorage, mailto); Jimdo-Dienste bewusst nicht übernommen, weil nicht vorhanden |
| «Cookie-Richtlinie» (Jimdo-Dialog) | Kategorien s. o. | `/datenschutz-einstellungen/` | ersetzt durch eigene Einstellungsseite (ein Dienst: Google Maps) |
| `/sitemap/` | HTML-Sitemap (Jimdo) | Fuss «Seiten» | übernommen als Seitenübersicht im Fuss |
| Login/Bearbeiten/Abmelden | Jimdo-Administration | – | nicht übernommen (keine öffentliche Funktion) |
| `/impressum/`, `/datenschutz/` | existieren auf der Quellwebsite **nicht** (404) | – | nur zur Vollständigkeit geprüft |

Titel/Meta: Alle Seiten haben ein leeres `description`-Meta; Seitentitel «… - Coiffeur
Styling Azzurro». Die Demo setzt eigene Titel und Beschreibungen.

## Medien

Herkunft, Masse und Verwendung: `assets/quellen.json` (26 Dateien). Zusammengeführt,
weil gleiches Motiv mehrfach hochgeladen: Wella-Anlass (3×), Masken vor Fenster (2×),
Arbeitsplatz (2×). `header.png` ist eine leere weisse Fläche. Alle Originale sind
höchstens 1000 px breit (Jimdo); das Logo liegt nur als 250×90-JPEG vor, die Demo
verwendet die grössere Wortmarke aus dem Preislisten-Bild (freigestellt, Markenblau).

Die Fotos zeigen reale Personen (Team, Kundinnen, ein Kunde bei der Haarwäsche).
Verwendung ausschliesslich für diese Vorschau; vor produktivem Einsatz Freigabe
des Salons und der abgebildeten Personen einholen.

## Preisliste (1:1 aus dem Bild)

Damen: Föhnen 42/45/53 · Schneiden Föhnen 80/83/98, AHV 74/77 · Folineméche 85/105/130 ·
Dauerwelle 85, Langhaar 125 · Färben 62/67/85 · Tönung 50/55/65 (jeweils Kurz-/Mittellang-/Langhaar).
Herren: Waschen Schneiden Föhnen 50 · Waschen Föhnen 25 · Waschen Schneiden Föhnen AHV 45 ·
Schneiden Föhnen AHV 40. Kinder Jugendliche und Studenten: bis 6 J. 25 · 7–12 J. 30 ·
13–15 J. 40 · Herren Lehrling und Student 16–25 J. 46 · Damen Lehrtochter und Studentinnen
16–25 J. 65 · Langhaar Zuschlag 12. Hinweise: «Preise ohne Pflege- sowie Styling Produkten.
Je nach Aufwand wird der Preis angepasst.»

Anpassungen: Schreibweise «Folinemèche» (Akzent), «Schneiden und Föhnen» statt
«Schneiden Föhnen», «Styling-Produkte» mit Bindestrich. Alle Beträge sind Festpreise
gemäss Original; der Anpassungshinweis steht sichtbar über der Liste. Datenmodell
kennt zusätzlich «ab» und «auf Anfrage» für spätere Pflege.

## Gästebuch (wörtlich)

| # | Name | Datum | Übernahme |
|---|---|---|---|
| 7 | Andrea | Mi 31.01.2024 08:16 | sichtbar |
| 6 | Marie Luxor | Mo 30.01.2017 20:50 | **ausgeblendet**: kein Bezug zum Salon, im Original mit Link auf einen fremden Shop (vermutlicher Werbeeintrag); im Modell erfasst, im CMS einblendbar |
| 5 | Di Concilio | Do 12.01.2017 15:21 | sichtbar |
| 4 | sandra fassbind | Mo 26.12.2016 16:53 | sichtbar; verlinkte E-Mail-Adresse nicht übernommen |
| 3 | Franziska Reich | Do 09.06.2016 10:52 | sichtbar |
| 2 | Tamara Bolliger | Sa 17.11.2012 14:40 | sichtbar; verlinkte Jimdo-Adresse nicht übernommen |
| 1 | styling-azzurro | Sa 17.11.2012 14:30 | sichtbar (Begrüssung des Salons) |

Keine Sternebewertungen, keine Durchschnitte: gab es im Original nicht, gibt es auch
in der Demo nicht.

## Originalfassung der Rechtsseiten (zur Dokumentation)

**/about/ (Impressum):** «Diese Seite wurde mit Jimdo Creator erstellt! Mit Jimdo
Creator kann sich jeder kostenlos und ohne Vorkenntnisse eine eigene Homepage
gestalten. Design auswählen, Klick für Klick anpassen, Inhalte in Sekunden
integrieren, fertig! Jetzt unter de.jimdo.com für eine kostenlose Webseite anmelden
und sofort loslegen.» Keine Betreiberangaben.

**/j/privacy (Datenschutzerklärung), Abschnitte:** «Spamschutz mit Google reCAPTCHA»
(Datenempfänger Google Ireland Ltd., Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO) und
«Webseitenanalyse (Creator Statistiken)» (Hosting-Anbieter, gekürzte IP, Hash mit
täglichem Salt, Art. 6 Abs. 1 lit. f DSGVO). Volltext liegt in der Sitzungsablage vor
und ist über die Quell-URL abrufbar. Nichts davon trifft auf die Demo zu.

## Offene Fragen an den Kunden

1. **Bildzuordnung:** Welche Person ist Antonella Rullo, welche Ida Patella? Die
   einzige Bildunterschrift steht unter einem Zwei-Personen-Foto. Bis zur Klärung
   keine Einzelporträts mit Namen.
2. **Rollen:** nicht belegt. Antonella Rullo ist auf der Kontaktseite Ansprechperson,
   eine Kundin nennt sie «Inhaberin»; die Demo zeigt deshalb **keine Rollen**, nur die
   Ansprechperson unter dem Salonnamen. Bitte Rollen (Inhaberin, Mitarbeiterin) nennen.
3. **Rechtsform / UID:** nirgends angegeben; Zefix-Abfrage per API nicht mehr ohne
   Konto möglich. Bitte nennen (Einzelfirma? GmbH?).
4. **Gästebucheintrag #6** einblenden oder dauerhaft weglassen?
5. **Freigabe** von Fotos (insbesondere Kundin im Stuhl, Kunde bei der Haarwäsche)
   und Gästebuch-Namen für eine spätere Live-Website.
6. **Sonntag:** auf der Quellwebsite nicht genannt; die Demo zeigt Montag bis Samstag
   und lässt Sonntag weg (nichts erfunden). Bitte bestätigen, ob sonntags geschlossen.
7. **Preisliste-Stand:** Bild ist von 2022 (Dateiversion 1645388990). Sind die Preise aktuell?
8. **Logo als Vektordatei** (AI/SVG/PDF) für scharfe Darstellung.
9. **Facebook-Seite** noch aktiv? Link wird übernommen, nicht eingebettet.
