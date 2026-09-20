import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Bausteine für frei zusammengestellte Seiten. Begrenzter Satz: jeder
 * Baustein entspricht einer bestehenden Komponente (components/Bausteine.tsx).
 */

export const textblock = defineType({
  name: "textblock",
  title: "Text",
  type: "object",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string" }),
    defineField({ name: "inhalt", title: "Text", type: "fliesstext", validation: (regel) => regel.required() }),
  ],
  preview: { select: { title: "titel" }, prepare: ({ title }) => ({ title: title || "Text", subtitle: "Baustein Text" }) },
});

export const bildblock = defineType({
  name: "bildblock",
  title: "Bild",
  type: "object",
  fields: [
    defineField({ name: "bild", title: "Bild", type: "bild", validation: (regel) => regel.required() }),
    defineField({ name: "breit", title: "Über die volle Breite", type: "boolean", initialValue: false }),
  ],
  preview: { select: { media: "bild", title: "bild.alt" }, prepare: ({ media, title }) => ({ media, title: title || "Bild", subtitle: "Baustein Bild" }) },
});

export const galerieblock = defineType({
  name: "galerieblock",
  title: "Bildergalerie",
  type: "object",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string" }),
    defineField({ name: "bilder", title: "Bilder", type: "array", of: [defineArrayMember({ type: "bild" })], validation: (regel) => regel.required().min(1) }),
  ],
  preview: { select: { title: "titel", bilder: "bilder" }, prepare: ({ title, bilder }) => ({ title: title || "Bildergalerie", subtitle: `${(bilder ?? []).length} Bilder` }) },
});

export const preisauszug = defineType({
  name: "preisauszug",
  title: "Preise",
  type: "object",
  description: "Zeigt die Preisliste oder einzelne Kategorien daraus. Die Preise selbst werden im Dokument «Preisliste» gepflegt.",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string" }),
    defineField({
      name: "kategorien",
      title: "Nur diese Kategorien",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Titel der Kategorien, z. B. «Damen». Leer = alle.",
    }),
  ],
  preview: { select: { title: "titel" }, prepare: ({ title }) => ({ title: title || "Preise", subtitle: "Baustein Preise" }) },
});

const einfacherBaustein = (name: string, titel: string) =>
  defineType({
    name,
    title: titel,
    type: "object",
    fields: [defineField({ name: "titel", title: "Titel", type: "string" })],
    preview: { select: { title: "titel" }, prepare: ({ title }) => ({ title: title || titel, subtitle: `Baustein ${titel}` }) },
  });

export const teamblock = einfacherBaustein("teamblock", "Team");
export const kontaktblock = einfacherBaustein("kontaktblock", "Kontakt");
export const oeffnungszeitenblock = einfacherBaustein("oeffnungszeitenblock", "Öffnungszeiten");
export const kartenblock = einfacherBaustein("kartenblock", "Karte (Google Maps, nach Einwilligung)");

export const gaestebuchauszug = defineType({
  name: "gaestebuchauszug",
  title: "Gästebuch-Auszug",
  type: "object",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string" }),
    defineField({
      name: "nummern",
      title: "Nur diese Einträge (Nummern)",
      type: "array",
      of: [defineArrayMember({ type: "number" })],
      description: "Leer = alle sichtbaren Einträge.",
    }),
  ],
  preview: { select: { title: "titel" }, prepare: ({ title }) => ({ title: title || "Gästebuch-Auszug", subtitle: "Baustein Gästebuch" }) },
});

export const bausteinTypen = ["textblock", "bildblock", "galerieblock", "preisauszug", "teamblock", "kontaktblock", "oeffnungszeitenblock", "kartenblock", "gaestebuchauszug"];
