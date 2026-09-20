# Skill-Matrix

Alle in dieser Sitzung installierten Skills wurden auf Relevanz geprüft. «Angewendet»
heisst: SKILL.md gelesen und Vorgaben umgesetzt; «geprüft» heisst: Beschreibung/Inhalt
gelesen, bewusst nicht angewendet. Nichts hier behauptet eine Anwendung, die nicht
stattfand.

## Ausdrücklich genannte Skills

| Skill | Relevanz | Anwendung | Durchgeführte Prüfung |
|---|---|---|---|
| frontend-design | hoch | Designkonzept mit Token-System, Signatur (Leuchtlinie), Hero als These (Schaufenster), Copy-Regeln (aktive Verben, Sentence Case) | Selbstkritik-Runde an Screenshots (Hero-Höhe, Mosaik, Nav-Umbrüche behoben) |
| design-taste-frontend | hoch | Design Read + Dials (5/3/4), Anti-Default-Regeln: kein Fraunces/Instrument Serif, keine Eyebrows, keine Gedankenstriche, ein Akzent, Formsystem dokumentiert, Hero-Stack ≤ 4 Elemente, keine Zigzag-Kette, Nav einzeilig | Pre-Flight-Liste durchgegangen; Abweichungen dokumentiert (kein Dark Mode, Neon-Glanz als Marken-Override) |
| ui-ux-pro-max | hoch | `search.py --design-system` (Ergebnis: Minimalism & Swiss Style, «kein Karte/versteckte Bewertungen» als Anti-Pattern → Karte und Gästebuch sichtbar), Suchen zu Preistabellen mobil, Consent-Bedienelementen; Checkliste: 16 px Text, 44 px Ziele, Fokus, reduzierte Bewegung | Ergebnis der Palette (Grün/Orange) bewusst verworfen: widerspricht dem Markenblau |
| high-end-visual-design | mittel | Getönte Schatten, eigene Kurve `cubic-bezier(0.32,0.72,0,1)`, Hamburger-Morph, grosszügige Abschnittsabstände | Doppelrand-Karten, Glas-Pille, Eyebrows und Blur-Reveals nicht übernommen (Konflikt mit ruhiger Gestaltung und design-taste-frontend) |
| redesign-existing-projects | hoch | Audit der Jimdo-Seite (Preisliste als Bild, leeres Impressum, Duplikate, kein Alt-Text), Erhalt aller Inhalte und Informationswege, 404, Sprunglink, Fokus, aktive Navigation | Fix-Prioritätenliste (Font, Farbe, Zustände, Layout) abgearbeitet |
| design:design-system | hoch | Token-Architektur (Farbe, Typo, Abstände, Radius, Bewegung, Ebenen) in `globals.css`; Komponentenzustände in `docs/design-handoff.md` | Audit: keine rohen Hex-Werte in Komponenten (grep) |
| design:ux-copy | hoch | CTA «Anrufen: 044 321 20 35», «Preise ansehen», «E-Mail vorbereiten», «Google Maps laden»; Fehlermeldungen mit Was/Wie («Bitte geben Sie Ihren Namen an.»); keine falschen Bestätigungen | Copy-Selbstaudit aller sichtbaren Strings (Screenshots) |
| design:accessibility-review | hoch | WCAG-2.1-AA-Punkte: Kontrast (Tabelle), Tastatur (Tab-Reihenfolge, Escape), Fokus sichtbar, 44-px-Ziele, Labels, `<dialog>`-Fokusfalle, Landmarken | Skriptgestützter Audit (`a11y.mjs`) über 11 Seiten: 0 fehlende Labels, 0 Überschriftensprünge, Fokusring überall; zwei Zielgrössen-Fehler behoben |
| design:design-critique | hoch | Kritik der 1440/390-Screenshots: Hero-Leerraum, Grid-Blowout beim Mosaik, Nav-Wortumbrüche, «Standard»-Beschriftung, leerer Telefonknopf (CSS-Reihenfolge) | alle gefundenen Punkte behoben, Ergebnis in `docs/pruefbericht.md` |
| design:design-handoff | hoch | `docs/design-handoff.md`: Token, Komponenten, Zustände, Breakpoints, Bewegung, Randfälle | – |
| full-output-enforcement | hoch | keine Platzhalter, keine «…»-Auslassungen, alle Seiten und Skripte vollständig | Suche nach TODO/… im Repo (keine Treffer) |

## Weitere geprüfte Skills

| Skill | Relevanz | Ergebnis |
|---|---|---|
| vercel:nextjs (+ metadata, font, hydration, suspense) | hoch | Metadata-API, `generateStaticParams`, keine `useSearchParams`, Client-Inseln, `usePathname` nur in statischer Route |
| security-and-hardening | hoch | Threat Model (Boundaries: mailto-Eingaben, iframe, externe Links), keine Secrets im Repo (Export-Prüfung), `rel="noopener noreferrer"`, `referrerPolicy`, Workflow-Berechtigungen minimal, Datenminimierung (kein Tracking, Rejection wird nicht gespeichert) |
| frontend-ui-engineering | hoch | Komponenten < 200 Zeilen, Zustände (leer/Fehler/vorbereitet), semantisches HTML, Container/Presentational-Trennung (`lib/inhalt/seiten.ts`) |
| ci-cd-and-automation | mittel | Quality Gates im Workflow: typecheck, lint, test, build, export-Prüfung; gepinnte Node-Version, npm cache |
| test-driven-development | mittel | 18 Tests (`node:test`): Preisdaten, Gästebuch, Manifest, Portable-Text-Wandler, Zeiten, Einwilligungslogik |
| code-review-and-quality | mittel | Codex-Reviews (2 Runden), siehe `docs/codex-review.md` |
| source-driven-development | mittel | Versionen gegen npm-Registry geprüft (Next 16.3.5, React 19.3.0, Sanity 6.15, next-sanity 13.3.4); Sanity-Bildformate gegen Typdefinitionen (`fm` ohne AVIF) |
| shipping-and-launch | mittel | Live-Prüfung nach Deploy (`scripts/live-pruefen.mjs`), Rollback = vorheriger Commit/Workflow-Run |
| performance-optimization | mittel | AVIF/WebP-Varianten, `sizes`, LQIP, lokale Schrift, keine externen Requests, `fetchPriority` fürs Hero |
| documentation-and-adrs | mittel | Entscheidungen in `docs/designkonzept.md`, `docs/codex-review.md`, CLAUDE.md |
| planning-and-task-breakdown, incremental-implementation | niedrig | implizit (Infrastruktur → Inhalte → Komponenten → Seiten → QA) |
| api-and-interface-design | mittel | Inhaltsschnittstelle `Inhaltsquelle` mit stabilen Typen, Adapter austauschbar |
| deprecation-and-migration | niedrig | Weiterleitungstabelle alter URLs in `docs/umstellungs-checkliste.md` |
| git-workflow-and-versioning | niedrig | ein aussagekräftiger Commit je Schritt, Attribution |
| browser-testing-with-devtools | – | Chrome-DevTools-MCP nicht konfiguriert; stattdessen puppeteer-core gegen lokalen Chrome (Screenshots, DOM-Audits, Consent-Flows) |
| imagegen, imagegen-frontend-web, imagegen-frontend-mobile, image-to-code, banner-design | – | nicht verwendet: nur Originalbilder erlaubt, keine Bildgenerierung abgestimmt |
| brandkit, brand, design (Logo/CIP) | – | nicht verwendet: bestehendes Logo bleibt, keine neue Marke |
| pdf | – | nicht verwendet: Preisliste liegt als PNG vor, keine PDFs auf der Quellwebsite |
| find-skills | – | keine Fähigkeitslücke; nichts nachinstalliert |
| minimalist-ui, gpt-taste, industrial-brutalist-ui, stitch-design-taste | – | Stilvorgaben passen nicht (Brutalismus, GSAP-Pinning, Stitch-Format); nicht vermischt |
| design-taste-frontend-v1 | – | nicht zusätzlich zur aktuellen Version verwendet |
| ui-styling (shadcn/Tailwind) | – | nicht verwendet: natives CSS, kein Tailwind, keine Komponentenbibliothek |
| dataviz, slides, design-system (Slides), artifact-* | – | keine Diagramme, Präsentationen oder Artefakte gefordert |
| vercel:deploy/env/status/bootstrap, vercel:* (AI, Workflow, Storage …) | – | Vercel wird in dieser Phase nicht eingerichtet |
| constraint-driven-development, doubt-driven-development, interview-me, idea-refine, spec-driven-development | niedrig | Brief war vollständig; Codex übernahm die adversariale Zweitmeinung |
| observability-and-instrumentation | – | statische Seite ohne Server; kein Tracking gewollt |
| debugging-and-error-recovery | mittel | angewendet bei SVG-Breite 0 (CSS-Ladereihenfolge) und Grid-Blowout |
| code-simplification, simplify, code-review (Befehl) | – | nicht separat aufgerufen |
| context-engineering, using-agent-skills, memory, update-config, keybindings-help, loop, schedule, claude-api, run, init, security-review, anthropic-skills:* | – | Werkzeug-/Sitzungs-Skills ohne Bezug zur Website |
