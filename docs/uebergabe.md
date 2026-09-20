# Übergabe

- **Demo:** https://nick8952.github.io/styling-azzurro-website/ (öffentlich, ohne Login, `noindex`)
- **Repository:** https://github.com/Nick8952/styling-azzurro-website (public, GitHub Pages über Actions)
- **Dokumente:** `docs/inhaltsinventur.md`, `docs/designkonzept.md`, `docs/design-handoff.md`,
  `docs/inhalte-pflegen.md`, `docs/sanity-vercel-einrichtung.md`, `docs/umstellungs-checkliste.md`,
  `docs/skill-matrix.md`, `docs/pruefbericht.md`, `docs/codex-review.md`, `CLAUDE.md`

## Einschränkungen der Demo (offen kommuniziert)

**Gästebuch.** Die Jimdo-Website hatte eine Schreibfunktion. Die Demo ist statisch und
speichert nichts: Neue Einträge werden als vorbereitete E-Mail an styling.azzurro@gmx.ch
eingereicht; der Salon entscheidet und trägt sie ein (jetzt in `data/gaestebuch.ts`,
später im Studio). Es gibt bewusst keinen Drittdienst für Kommentare. Eintrag #6 ist
ausgeblendet (vermutlicher Werbeeintrag), im Modell aber vorhanden.

**Termine.** Wie bisher ausschliesslich telefonisch (044 321 20 35). Es gibt keine
Online-Buchung, und die Demo behauptet keine. Das Kontaktformular sendet nichts selbst,
sondern öffnet eine vorbereitete E-Mail («E-Mail vorbereiten»).

**Karte.** Google Maps lädt erst nach Klick. Ohne Zustimmung bleiben Adresse,
Tramhaltestelle und ein externer Routenlink.

**Bilder.** Alle Originale sind höchstens 1000 px breit (Jimdo-Auslieferung); auf sehr
grossen, hochauflösenden Bildschirmen wirken Hero und Galerie weicher als mit
Originaldateien. Logo nur als Pixelgrafik vorhanden.

## Offene Unternehmensangaben und Materialien (beim Kunden einholen)

1. Zuordnung der Fotos zu Antonella Rullo / Ida Patella; Rollen beider (Demo zeigt keine)
2. Rechtsform und ggf. UID für das Impressum; wer ist Inhaberin/Betreiberin?
3. Aktualität der Preisliste (Bild von 2022); Sonntag (wird mangels Angabe nicht gezeigt)
4. Logo als Vektordatei; grössere Originalfotos, idealerweise aktuelle Aufnahmen des Salons
5. Freigaben: Fotos von Kundinnen/Kunden, Gästebuch-Namen, Eintrag #6 ja/nein
6. Facebook-Seite: weiterhin aktiv?
7. Wunsch nach echtem Formularversand oder Online-Terminbuchung (dann Anbieter + Datenschutz)

## Offene Angaben des Demo-Betreibers (Nick)

- Postadresse im Impressum: nicht öffentlich auffindbar, deshalb nur Name + E-Mail.
  Für eine spätere Live-Website ist der Salon Betreiber; für die Demo empfiehlt sich
  die Ergänzung der Adresse in `data/rechtstexte.ts`.

## Rechtliche Prüfpunkte

- Impressum/Datenschutzerklärung sind nach bestem Wissen verfasst, **nicht anwaltlich geprüft**.
- Schweizer DSG: Auskunft/Berichtigung/Löschung genannt, EDÖB genannt. DSGVO nur «soweit anwendbar».
- Google-Maps-Einbettung: Zwei-Klick-Lösung; Cookies im Iframe liegen bei Google und
  lassen sich von der Website nicht löschen (so beschrieben).
- Verwendung von Fotos realer Personen und Gästebuch-Namen in einer öffentlichen Demo:
  `noindex` ist kein Schutz; Freigabe einholen oder Demo nach dem Verkaufsgespräch
  auf privat stellen (GitHub Pages ist dann nicht mehr erreichbar; Alternative: Repo
  behalten, Pages deaktivieren).

## Unabhängige Kundenübergabe

- Der Kunde braucht **kein GitHub-Konto**: Inhalte pflegt er später im Sanity Studio
  (E-Mail-Login). Bis dahin pflegt Nick die `data/`-Dateien.
- Eigentum: Repository kann per GitHub «Transfer» an ein Kundenkonto übergeben werden;
  Sanity-Projekt und Vercel-Projekt können ebenfalls übertragen werden (Owner-Rolle).
- Export/Backup: Git-Repository = vollständiger Quellcode + aufbereitete Bilder;
  Originale in `assets/original/` separat sichern (nicht im Git). Nach Sanity-Umstieg:
  `npx sanity dataset export production backup.tar.gz`.
- Wartung: vierteljährlich `npm outdated`, `npm audit`, `npm run typecheck && npm run lint && npm test`,
  Deploy prüfen (`npm run live:pruefen -- <URL>`). Next-Major-Upgrades mit `npx @next/codemod`.

## Kosten

GitHub Pages: kostenlos (public Repo). Sanity Free-Plan: für einen Salon ausreichend
(3 Benutzer, 500k API-Requests/Monat). Vercel Hobby: kostenlos für nicht-kommerzielle
Nutzung; für eine Kundenwebsite ist der Pro-Plan vorgesehen (Vercel-Nutzungsbedingungen prüfen).
