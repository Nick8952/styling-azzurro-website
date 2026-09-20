# Checkliste: von der Demo zur Kundenwebsite

## Pfade und Hosting
- [ ] Deploy-Ziel gewählt: Vercel (`DEPLOY_TARGET=vercel`, kein `basePath`) oder weiterhin
      statischer Export ohne Unterpfad (`NEXT_PUBLIC_BASE_PATH` leer)
- [ ] `NEXT_PUBLIC_SITE_URL` auf die Kundendomain gesetzt (Open Graph, JSON-LD, Canonical)
- [ ] GitHub-Pages-Deploy abgeschaltet, sobald die neue Adresse steht

## Domain
- [ ] `styling-azzurro.ch` und `www.` bei Vercel eingetragen, DNS beim Registrar umgestellt
- [ ] Jimdo-Website erst abschalten, wenn die Weiterleitungen stehen

## Weiterleitungen bisheriger Adressen (in `next.config.ts` `redirects()` oder `vercel.json`)
| alt | neu |
|---|---|
| `/mein-geschäft/` (und `/mein-gesch%C3%A4ft/`) | `/salon/` |
| `/gästebuch/` (und `/g%C3%A4stebuch/`) | `/gaestebuch/` |
| `/about/` | `/impressum/` |
| `/j/privacy` | `/datenschutz/` |
| `/sitemap/` | `/` |
| `/team/`, `/preisliste/`, `/lageplan/`, `/kontakt/` | unverändert |

## SEO
- [ ] `robots: { index: true, follow: true }` in `app/layout.tsx`
- [ ] `app/sitemap.ts` ergänzen (alle Routen + freie Seiten)
- [ ] Canonical-URLs prüfen (`metadataBase` + Domain)
- [ ] Google Business Profile auf die neue Adresse zeigen lassen
- [ ] Meta-Beschreibungen mit dem Kunden gegenlesen

## Datenschutz und Rechtstexte
- [ ] Impressum: Betreiber = Salon (Name, Rechtsform, Adresse, E-Mail; UID falls vorhanden),
      Demo-Betreiber-Abschnitt entfernen
- [ ] Datenschutzerklärung: Hosting Vercel (USA/EU, Logs), Sanity-CDN für Bilder, Studio-Logins
      (nur Redaktion), Google Maps unverändert nach Klick, Kontakt per E-Mail
- [ ] Falls ein echtes Formular mit Versand gewünscht: Anbieter wählen, DPA, Erklärung ergänzen
- [ ] Gästebuch: Freigabe der bestehenden Einträge, Prozess für neue Einträge (E-Mail → Studio)
- [ ] Fotofreigaben der abgebildeten Personen
- [ ] Rechtstexte juristisch prüfen lassen (Texte sind nicht anwaltlich geprüft)

## Inhalte
- [ ] Preise vom Kunden bestätigen lassen (Bild von 2022)
- [ ] Rolle/Bildzuordnung Antonella / Ida klären, Einzelporträts einpflegen
- [ ] Logo als Vektor einsetzen (`assets/original/`, `npm run bilder` bzw. Sanity-Upload)
- [ ] Sonderöffnungszeiten (Feiertage, Ferien) im Studio pflegen
- [ ] Demohinweis im Fuss leeren (`websiteEinstellungen.demohinweis`)

## Technik
- [ ] `npm audit`, Abhängigkeiten aktualisieren, `npm run typecheck && npm run lint && npm test`
- [ ] Lighthouse/echte Geräte prüfen (Demo wurde nur mit Chrome-Emulation getestet)
- [ ] Backup: `npx sanity dataset export production backup.tar.gz` regelmässig
