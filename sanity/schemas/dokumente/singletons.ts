import { defineArrayMember, defineField, defineType } from "sanity";
import { bausteinTypen } from "../objekte/bausteine";

/**
 * Einzeldokumente (je genau eines): Website-Einstellungen, Startseite,
 * Teamseite, Salonseite, Preisliste, Gästebuchseite, Lageplan, Kontaktseite.
 * Die Studio-Struktur (sanity.config.ts) öffnet sie direkt, ohne Liste.
 */

export const websiteEinstellungen = defineType({
  name: "websiteEinstellungen",
  title: "Website-Einstellungen",
  type: "document",
  groups: [
    { name: "allgemein", title: "Allgemein", default: true },
    { name: "kontakt", title: "Kontakt" },
    { name: "zeiten", title: "Öffnungszeiten" },
    { name: "navigation", title: "Navigation" },
  ],
  fields: [
    defineField({ name: "name", title: "Name des Salons", type: "string", group: "allgemein", validation: (regel) => regel.required() }),
    defineField({ name: "kurzname", title: "Kurzname", type: "string", group: "allgemein" }),
    defineField({ name: "beschreibung", title: "Beschreibung der Website", type: "text", rows: 3, group: "allgemein", description: "Standardtext für Suchmaschinen, wenn eine Seite keinen eigenen hat.", validation: (regel) => regel.required().max(240) }),
    defineField({ name: "demohinweis", title: "Hinweis im Seitenfuss", type: "string", group: "allgemein", description: "Kennzeichnung der Vorschau. Vor dem Livegang leeren." }),
    defineField({ name: "kontakt", title: "Kontaktdaten", type: "kontakt", group: "kontakt", validation: (regel) => regel.required() }),
    defineField({ name: "oeffnungszeiten", title: "Öffnungszeiten", type: "oeffnungszeiten", group: "zeiten", validation: (regel) => regel.required() }),
    defineField({
      name: "hauptnavigation",
      title: "Hauptnavigation",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "navigationspunkt" })],
      validation: (regel) => regel.max(7).warning("Mehr als sieben Punkte passen auf dem Laptop nicht in eine Zeile."),
    }),
    defineField({
      name: "rechtsnavigation",
      title: "Rechtliche Links",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "navigationspunkt" })],
      description: "Impressum, Datenschutz und Datenschutz-Einstellungen müssen auf jeder Seite erreichbar bleiben.",
      validation: (regel) => regel.required().min(3),
    }),
  ],
  preview: { prepare: () => ({ title: "Website-Einstellungen" }) },
});

export const startseite = defineType({
  name: "startseite",
  title: "Startseite",
  type: "document",
  groups: [
    { name: "hero", title: "Kopfbereich", default: true },
    { name: "willkommen", title: "Willkommen" },
    { name: "teaser", title: "Ausschnitte" },
    { name: "seo", title: "Suchmaschinen" },
  ],
  fields: [
    defineField({ name: "heroTitel", title: "Titel", type: "string", group: "hero", validation: (regel) => regel.required().max(70) }),
    defineField({ name: "heroText", title: "Text unter dem Titel", type: "text", rows: 2, group: "hero", validation: (regel) => regel.required().max(160) }),
    defineField({ name: "heroBild", title: "Bild", type: "bild", group: "hero", validation: (regel) => regel.required() }),
    defineField({ name: "willkommenTitel", title: "Titel", type: "string", group: "willkommen", validation: (regel) => regel.required() }),
    defineField({ name: "willkommenText", title: "Text", type: "fliesstext", group: "willkommen", validation: (regel) => regel.required() }),
    defineField({ name: "grussformel", title: "Grussformel", type: "string", group: "willkommen", initialValue: "Wir freuen uns auf Ihren Besuch" }),
    defineField({ name: "unterzeichnende", title: "Unterzeichnende", type: "string", group: "willkommen", description: "Z. B. «Antonella Rullo und Ida Patella»." }),
    defineField({ name: "teamTitel", title: "Team: Titel", type: "string", group: "teaser" }),
    defineField({ name: "teamText", title: "Team: Text", type: "text", rows: 2, group: "teaser" }),
    defineField({ name: "teamBild", title: "Team: Bild", type: "bild", group: "teaser" }),
    defineField({ name: "preiseTitel", title: "Preise: Titel", type: "string", group: "teaser" }),
    defineField({ name: "preiseText", title: "Preise: Text", type: "text", rows: 2, group: "teaser" }),
    defineField({
      name: "preisAuszug",
      title: "Preise: gezeigte Leistungen",
      type: "array",
      group: "teaser",
      of: [
        defineArrayMember({
          type: "object",
          name: "preisverweis",
          fields: [
            defineField({ name: "kategorie", title: "Kategorie", type: "string", validation: (regel) => regel.required() }),
            defineField({ name: "leistung", title: "Leistung", type: "string", validation: (regel) => regel.required() }),
          ],
          preview: { select: { title: "leistung", subtitle: "kategorie" } },
        }),
      ],
      description: "Kategorie und Leistung müssen genau so in der Preisliste stehen.",
      validation: (regel) => regel.max(4),
    }),
    defineField({ name: "salonTitel", title: "Salon: Titel", type: "string", group: "teaser" }),
    defineField({ name: "salonText", title: "Salon: Text", type: "text", rows: 2, group: "teaser" }),
    defineField({ name: "salonBilder", title: "Salon: drei Bilder", type: "array", group: "teaser", of: [defineArrayMember({ type: "bild" })], validation: (regel) => regel.length(3) }),
    defineField({ name: "gaestebuchTitel", title: "Gästebuch: Titel", type: "string", group: "teaser" }),
    defineField({ name: "gaestebuchAuszug", title: "Gästebuch: Nummern der gezeigten Einträge", type: "array", group: "teaser", of: [defineArrayMember({ type: "number" })], validation: (regel) => regel.max(2) }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo", group: "seo", validation: (regel) => regel.required() }),
  ],
  preview: { prepare: () => ({ title: "Startseite" }) },
});

export const teammitglied = defineType({
  name: "teammitglied",
  title: "Teammitglied",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (regel) => regel.required() }),
    defineField({ name: "rolle", title: "Rolle", type: "string", description: "Optional, z. B. «Inhaberin». Nur, wenn zutreffend." }),
    defineField({ name: "bild", title: "Porträt", type: "bild", description: "Optional. Nur, wenn das Bild eindeutig diese Person zeigt." }),
  ],
  preview: { select: { title: "name", subtitle: "rolle", media: "bild" } },
});

export const teamseite = defineType({
  name: "teamseite",
  title: "Team",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string", validation: (regel) => regel.required() }),
    defineField({ name: "einleitung", title: "Einleitung", type: "text", rows: 2 }),
    defineField({ name: "mitglieder", title: "Teammitglieder", type: "array", of: [defineArrayMember({ type: "teammitglied" })], validation: (regel) => regel.required().min(1) }),
    defineField({ name: "bilder", title: "Gemeinsame Fotos", type: "array", of: [defineArrayMember({ type: "bild" })] }),
    defineField({ name: "bildhinweis", title: "Hinweis zu den Fotos", type: "string" }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo", validation: (regel) => regel.required() }),
  ],
  preview: { prepare: () => ({ title: "Team" }) },
});

export const salonseite = defineType({
  name: "salonseite",
  title: "Mein Geschäft",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string", validation: (regel) => regel.required() }),
    defineField({ name: "einleitung", title: "Einleitung", type: "text", rows: 2 }),
    defineField({ name: "galerie", title: "Bilder", type: "array", of: [defineArrayMember({ type: "bild" })], validation: (regel) => regel.required().min(1) }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo", validation: (regel) => regel.required() }),
  ],
  preview: { prepare: () => ({ title: "Mein Geschäft" }) },
});

export const preisliste = defineType({
  name: "preisliste",
  title: "Preisliste",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string", validation: (regel) => regel.required() }),
    defineField({ name: "einleitung", title: "Einleitung", type: "text", rows: 2 }),
    defineField({ name: "waehrung", title: "Währung", type: "string", initialValue: "CHF", readOnly: true }),
    defineField({ name: "kategorien", title: "Kategorien", type: "array", of: [defineArrayMember({ type: "preiskategorie" })], validation: (regel) => regel.required().min(1) }),
    defineField({
      name: "hinweise",
      title: "Bedingungen",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Erscheinen sichtbar über den Preisen, z. B. «Je nach Aufwand wird der Preis angepasst.»",
    }),
    defineField({ name: "quelle", title: "Herkunft der Preise", type: "string", description: "Intern, erscheint klein unter der Liste." }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo", validation: (regel) => regel.required() }),
  ],
  preview: { prepare: () => ({ title: "Preisliste" }) },
});

export const gaestebuchseite = defineType({
  name: "gaestebuchseite",
  title: "Gästebuch (Seite)",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string", validation: (regel) => regel.required() }),
    defineField({ name: "einleitung", title: "Einleitung", type: "text", rows: 2 }),
    defineField({ name: "neuerEintragTitel", title: "Titel für «neuer Eintrag»", type: "string" }),
    defineField({ name: "neuerEintragText", title: "Text für «neuer Eintrag»", type: "text", rows: 3 }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo", validation: (regel) => regel.required() }),
  ],
  preview: { prepare: () => ({ title: "Gästebuch (Seite)" }) },
});

export const gaestebucheintrag = defineType({
  name: "gaestebucheintrag",
  title: "Gästebucheintrag",
  type: "document",
  fields: [
    defineField({ name: "nummer", title: "Nummer", type: "number", description: "Laufende Nummer, höchste = neuster Eintrag.", validation: (regel) => regel.required().integer().positive() }),
    defineField({ name: "name", title: "Name", type: "string", validation: (regel) => regel.required() }),
    defineField({ name: "datum", title: "Datum und Uhrzeit", type: "datetime", validation: (regel) => regel.required() }),
    defineField({ name: "text", title: "Text", type: "text", rows: 5, description: "Wörtlich, wie eingereicht.", validation: (regel) => regel.required() }),
    defineField({ name: "sichtbar", title: "Auf der Website anzeigen", type: "boolean", initialValue: true }),
    defineField({ name: "grund", title: "Grund, falls nicht angezeigt", type: "string", hidden: ({ parent }) => parent?.sichtbar !== false }),
  ],
  orderings: [{ title: "Neuste zuerst", name: "neuste", by: [{ field: "nummer", direction: "desc" }] }],
  preview: { select: { title: "name", subtitle: "text", sichtbar: "sichtbar" }, prepare: ({ title, subtitle, sichtbar }) => ({ title: sichtbar === false ? `${title} (ausgeblendet)` : title, subtitle }) },
});

export const lageplan = defineType({
  name: "lageplan",
  title: "Lageplan",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string", validation: (regel) => regel.required() }),
    defineField({ name: "einleitung", title: "Einleitung", type: "text", rows: 2 }),
    defineField({
      name: "karteEinbettungsUrl",
      title: "Google-Maps-Einbettungsadresse",
      type: "url",
      description: "Adresse mit output=embed. Wird erst nach Einwilligung geladen.",
      validation: (regel) => regel.required().uri({ scheme: ["https"] }),
    }),
    defineField({ name: "karteTitel", title: "Beschreibung der Karte", type: "string", description: "Für Vorleseprogramme.", validation: (regel) => regel.required() }),
    defineField({ name: "anreiseTitel", title: "Anreise: Titel", type: "string", initialValue: "Anreise" }),
    defineField({ name: "anreise", title: "Anreise: Text", type: "fliesstext" }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo", validation: (regel) => regel.required() }),
  ],
  preview: { prepare: () => ({ title: "Lageplan" }) },
});

export const kontaktseite = defineType({
  name: "kontaktseite",
  title: "Kontakt",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string", validation: (regel) => regel.required() }),
    defineField({ name: "einleitung", title: "Einleitung", type: "text", rows: 2 }),
    defineField({ name: "terminTitel", title: "Termin: Titel", type: "string" }),
    defineField({ name: "terminText", title: "Termin: Text", type: "fliesstext" }),
    defineField({ name: "formularTitel", title: "Formular: Titel", type: "string" }),
    defineField({ name: "formularText", title: "Formular: Erklärung", type: "text", rows: 3 }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo", validation: (regel) => regel.required() }),
  ],
  preview: { prepare: () => ({ title: "Kontakt" }) },
});

export const rechtstext = defineType({
  name: "rechtstext",
  title: "Rechtstext",
  type: "document",
  fields: [
    defineField({
      name: "art",
      title: "Art",
      type: "string",
      options: { list: [{ title: "Impressum", value: "impressum" }, { title: "Datenschutzerklärung", value: "datenschutz" }], layout: "radio" },
      validation: (regel) => regel.required(),
    }),
    defineField({ name: "titel", title: "Titel", type: "string", validation: (regel) => regel.required() }),
    defineField({ name: "stand", title: "Stand", type: "string", description: "Z. B. «20. September 2026».", validation: (regel) => regel.required() }),
    defineField({ name: "inhalt", title: "Text", type: "fliesstext", validation: (regel) => regel.required() }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo", validation: (regel) => regel.required() }),
  ],
  preview: { select: { title: "titel", subtitle: "stand" } },
});

export const seite = defineType({
  name: "seite",
  title: "Seite",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string", validation: (regel) => regel.required() }),
    defineField({
      name: "slug",
      title: "Adresse",
      type: "slug",
      options: { source: "titel", maxLength: 60 },
      description: "Teil der Web-Adresse, z. B. «leistungen» ergibt /leistungen/.",
      validation: (regel) => regel.required(),
    }),
    defineField({ name: "einleitung", title: "Einleitung", type: "text", rows: 2 }),
    defineField({ name: "inNavigation", title: "In der Hauptnavigation zeigen", type: "boolean", initialValue: false }),
    defineField({
      name: "bausteine",
      title: "Bausteine",
      type: "array",
      of: bausteinTypen.map((typ) => defineArrayMember({ type: typ })),
      description: "Reihenfolge per Ziehen ändern.",
      validation: (regel) => regel.required().min(1),
    }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo", validation: (regel) => regel.required() }),
  ],
  preview: { select: { title: "titel", subtitle: "slug.current" } },
});
