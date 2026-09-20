import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Gemeinsame Objekttypen. Feldnamen sind deutsch, damit Studio, GROQ-Abfragen
 * und Inhaltsdateien dieselben Begriffe verwenden.
 */

export const seo = defineType({
  name: "seo",
  title: "Suchmaschinen",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "titel",
      title: "Seitentitel",
      type: "string",
      description: "Erscheint im Browser-Tab und in Suchergebnissen. 50 bis 60 Zeichen sind ideal.",
      validation: (regel) => regel.required().max(70),
    }),
    defineField({
      name: "beschreibung",
      title: "Beschreibung",
      type: "text",
      rows: 3,
      description: "Kurzer Text unter dem Titel in Suchergebnissen. 120 bis 160 Zeichen.",
      validation: (regel) => regel.required().min(50).max(200),
    }),
  ],
});

/** Bild mit Pflicht-Bildbeschreibung. Ohne Beschreibung kein Bild. */
export const bild = defineType({
  name: "bild",
  title: "Bild",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Bildbeschreibung",
      type: "string",
      description: "Beschreibt, was auf dem Bild zu sehen ist, für Menschen, die es nicht sehen können. Keine Namen von Personen ohne deren Einverständnis.",
      validation: (regel) => regel.required().min(10).max(220),
    }),
    defineField({
      name: "legende",
      title: "Bildlegende",
      type: "string",
      description: "Optional. Erscheint sichtbar unter dem Bild.",
    }),
  ],
});

/** Fliesstext: Absätze, Zwischentitel, Listen, Zitate, Fett, Links. Bewusst klein gehalten. */
export const fliesstext = defineType({
  name: "fliesstext",
  title: "Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Absatz", value: "normal" },
        { title: "Zwischentitel", value: "h2" },
        { title: "Kleiner Zwischentitel", value: "h3" },
        { title: "Kleinster Zwischentitel", value: "h4" },
        { title: "Zitat", value: "blockquote" },
      ],
      lists: [
        { title: "Aufzählung", value: "bullet" },
        { title: "Nummeriert", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Fett", value: "strong" },
          { title: "Kursiv", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Adresse",
                type: "string",
                description: "Vollständige Adresse (https://…), interne Seite (/preisliste/), E-Mail (mailto:…) oder Telefon (tel:…).",
                validation: (regel) =>
                  regel.required().custom((wert) =>
                    typeof wert === "string" && /^(\/(?!\/)|https?:\/\/|mailto:|tel:)/i.test(wert)
                      ? true
                      : "Erlaubt sind /seite/, https://…, mailto:… und tel:…"
                  ),
              }),
              defineField({ name: "extern", title: "In neuem Fenster öffnen", type: "boolean", initialValue: false }),
            ],
          },
        ],
      },
    }),
  ],
});

export const navigationspunkt = defineType({
  name: "navigationspunkt",
  title: "Navigationspunkt",
  type: "object",
  fields: [
    defineField({ name: "beschriftung", title: "Beschriftung", type: "string", validation: (regel) => regel.required().max(24) }),
    defineField({
      name: "ziel",
      title: "Ziel",
      type: "string",
      description: "Interne Seite mit Schrägstrichen, z. B. /preisliste/, oder vollständige Adresse.",
      validation: (regel) => regel.required(),
    }),
    defineField({ name: "extern", title: "Externer Link", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "beschriftung", subtitle: "ziel" } },
});

export const kontakt = defineType({
  name: "kontakt",
  title: "Kontaktdaten",
  type: "object",
  fields: [
    defineField({ name: "betriebsname", title: "Name des Salons", type: "string", validation: (regel) => regel.required() }),
    defineField({ name: "ansprechperson", title: "Ansprechperson", type: "string", description: "Name, der unter dem Salonnamen erscheint (Kontakt, Fuss, Impressum).", validation: (regel) => regel.required() }),
    defineField({ name: "strasse", title: "Strasse und Nummer", type: "string", validation: (regel) => regel.required() }),
    defineField({ name: "plz", title: "PLZ", type: "string", validation: (regel) => regel.required().regex(/^\d{4}$/, { name: "vierstellige PLZ" }) }),
    defineField({ name: "ort", title: "Ort", type: "string", validation: (regel) => regel.required() }),
    defineField({ name: "quartier", title: "Quartier", type: "string", description: "Optional, z. B. Zürich-Schwamendingen." }),
    defineField({ name: "land", title: "Land", type: "string", initialValue: "Schweiz", validation: (regel) => regel.required() }),
    defineField({
      name: "telefon",
      title: "Telefon (Anzeige)",
      type: "string",
      description: "So, wie die Nummer angezeigt wird, z. B. 044 321 20 35. Der Anruflink wird daraus automatisch gebildet.",
      validation: (regel) => regel.required(),
    }),
    defineField({ name: "email", title: "E-Mail", type: "string", validation: (regel) => regel.required().email() }),
    defineField({ name: "website", title: "Bisherige Website", type: "url" }),
    defineField({ name: "facebook", title: "Facebook-Seite", type: "url" }),
    defineField({
      name: "routenlink",
      title: "Routenlink",
      type: "url",
      description: "Google-Maps-Adresse für «Route planen». Öffnet extern, bettet nichts ein.",
      validation: (regel) => regel.required(),
    }),
    defineField({ name: "oev", title: "Anreise mit dem ÖV", type: "string", description: "Z. B. «Tram 9, Haltestelle Luegisland».", validation: (regel) => regel.required() }),
  ],
});

const zeitMuster = /^([01]\d|2[0-3])\.[0-5]\d$/;

export const zeitfenster = defineType({
  name: "zeitfenster",
  title: "Zeitfenster",
  type: "object",
  fields: [
    defineField({ name: "von", title: "Von", type: "string", description: "Format HH.MM, z. B. 08.00", validation: (regel) => regel.required().regex(zeitMuster, { name: "Uhrzeit HH.MM" }) }),
    defineField({ name: "bis", title: "Bis", type: "string", description: "Format HH.MM, z. B. 12.00", validation: (regel) => regel.required().regex(zeitMuster, { name: "Uhrzeit HH.MM" }) }),
  ],
  preview: { select: { von: "von", bis: "bis" }, prepare: ({ von, bis }) => ({ title: `${von} bis ${bis}` }) },
});

const wochentage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

export const tageszeit = defineType({
  name: "tageszeit",
  title: "Wochentag",
  type: "object",
  fields: [
    defineField({ name: "tag", title: "Tag", type: "string", options: { list: wochentage.map((tag) => ({ title: tag, value: tag })) }, validation: (regel) => regel.required() }),
    defineField({ name: "geschlossen", title: "Geschlossen", type: "boolean", initialValue: false }),
    defineField({
      name: "zeiten",
      title: "Zeitfenster",
      type: "array",
      of: [defineArrayMember({ type: "zeitfenster" })],
      hidden: ({ parent }) => Boolean(parent?.geschlossen),
      validation: (regel) =>
        regel.custom((wert, kontext) => {
          const geschlossen = (kontext.parent as { geschlossen?: boolean } | undefined)?.geschlossen;
          if (!geschlossen && (!wert || wert.length === 0)) return "Mindestens ein Zeitfenster angeben oder «Geschlossen» wählen.";
          return true;
        }),
    }),
  ],
  preview: {
    select: { tag: "tag", geschlossen: "geschlossen", zeiten: "zeiten" },
    prepare: ({ tag, geschlossen, zeiten }) => ({
      title: tag,
      subtitle: geschlossen ? "geschlossen" : (zeiten ?? []).map((z: { von: string; bis: string }) => `${z.von} bis ${z.bis}`).join(", "),
    }),
  },
});

export const sonderzeit = defineType({
  name: "sonderzeit",
  title: "Sonderöffnungszeit",
  type: "object",
  fields: [
    defineField({ name: "bezeichnung", title: "Bezeichnung", type: "string", description: "Z. B. «Heiligabend» oder «Betriebsferien».", validation: (regel) => regel.required() }),
    defineField({ name: "datum", title: "Datum", type: "date", validation: (regel) => regel.required() }),
    defineField({ name: "geschlossen", title: "Geschlossen", type: "boolean", initialValue: true }),
    defineField({ name: "zeiten", title: "Zeitfenster", type: "array", of: [defineArrayMember({ type: "zeitfenster" })], hidden: ({ parent }) => Boolean(parent?.geschlossen) }),
  ],
  preview: { select: { title: "bezeichnung", subtitle: "datum" } },
});

export const oeffnungszeiten = defineType({
  name: "oeffnungszeiten",
  title: "Öffnungszeiten",
  type: "object",
  fields: [
    defineField({
      name: "woche",
      title: "Wochentage",
      type: "array",
      of: [defineArrayMember({ type: "tageszeit" })],
      description: "Nur Tage aufführen, zu denen eine Angabe vorliegt (z. B. Montag bis Samstag).",
      validation: (regel) =>
        regel
          .required()
          .min(1)
          .max(7)
          .custom((wert) => {
            const tage = (wert ?? []).map((eintrag) => (eintrag as { tag?: string }).tag);
            return new Set(tage).size === tage.length ? true : "Jeder Wochentag höchstens einmal.";
          }),
    }),
    defineField({ name: "sonderzeiten", title: "Sonderöffnungszeiten", type: "array", of: [defineArrayMember({ type: "sonderzeit" })] }),
    defineField({ name: "terminHinweis", title: "Hinweis zur Terminvereinbarung", type: "string", initialValue: "Termine vereinbaren Sie telefonisch.", validation: (regel) => regel.required() }),
    defineField({ name: "quelle", title: "Herkunft der Angaben", type: "string", description: "Intern. Woher die Zeiten stammen." }),
  ],
});
