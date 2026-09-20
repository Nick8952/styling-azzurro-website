import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Preisposition: eine Zeile der Preisliste. «ab»-Preise und «auf Anfrage»
 * sind eigene Preisarten, damit ein Festpreis nie stillschweigend aus einem
 * Richtwert wird. Beträge in Franken mit höchstens zwei Nachkommastellen.
 */
export const preisposition = defineType({
  name: "preisposition",
  title: "Preisposition",
  type: "object",
  fields: [
    defineField({
      name: "leistung",
      title: "Leistung",
      type: "string",
      description: "Z. B. «Schneiden und Föhnen». Gleiche Leistungen untereinander werden als Gruppe angezeigt.",
      validation: (regel) => regel.required().max(80),
    }),
    defineField({
      name: "variante",
      title: "Variante",
      type: "string",
      description: "Optional: Haarlänge, Tarifgruppe oder Alter, z. B. «Kurzhaar», «AHV Mittellanghaar», «bis 6 Jahre».",
      validation: (regel) => regel.max(60),
    }),
    defineField({
      name: "preisart",
      title: "Preisart",
      type: "string",
      options: {
        list: [
          { title: "Fester Preis", value: "fest" },
          { title: "Ab-Preis (nach oben offen)", value: "ab" },
          { title: "Auf Anfrage (kein Betrag)", value: "aufAnfrage" },
        ],
        layout: "radio",
      },
      initialValue: "fest",
      validation: (regel) => regel.required(),
    }),
    defineField({
      name: "betrag",
      title: "Betrag in CHF",
      type: "number",
      hidden: ({ parent }) => parent?.preisart === "aufAnfrage",
      validation: (regel) =>
        regel.min(0).precision(2).custom((wert, kontext) => {
          const preisart = (kontext.parent as { preisart?: string } | undefined)?.preisart;
          if (preisart !== "aufAnfrage" && (wert === undefined || wert === null)) return "Bei festen und Ab-Preisen ist ein Betrag nötig.";
          if (preisart === "aufAnfrage" && wert !== undefined && wert !== null) return "«Auf Anfrage» hat keinen Betrag.";
          return true;
        }),
    }),
    defineField({ name: "hinweis", title: "Hinweis zur Position", type: "string", description: "Optional, erscheint klein unter der Zeile.", validation: (regel) => regel.max(140) }),
  ],
  preview: {
    select: { leistung: "leistung", variante: "variante", betrag: "betrag", preisart: "preisart" },
    prepare: ({ leistung, variante, betrag, preisart }) => ({
      title: variante ? `${leistung}: ${variante}` : leistung,
      subtitle: preisart === "aufAnfrage" ? "auf Anfrage" : `${preisart === "ab" ? "ab " : ""}CHF ${Number(betrag ?? 0).toFixed(2)}`,
    }),
  },
});

export const preiskategorie = defineType({
  name: "preiskategorie",
  title: "Preiskategorie",
  type: "object",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string", description: "Z. B. «Damen», «Herren».", validation: (regel) => regel.required().max(60) }),
    defineField({
      name: "positionen",
      title: "Positionen",
      type: "array",
      of: [defineArrayMember({ type: "preisposition" })],
      validation: (regel) => regel.required().min(1),
    }),
  ],
  preview: {
    select: { title: "titel", positionen: "positionen" },
    prepare: ({ title, positionen }) => ({ title, subtitle: `${(positionen ?? []).length} Positionen` }),
  },
});
