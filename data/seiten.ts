import { text } from "@/lib/inhalt/text";
import type { SeiteRoh } from "@/lib/inhalt/lokal-typen";

/**
 * Frei zusammengestellte Seiten aus Bausteinen. Genau so legt der Salon
 * später im CMS eigene Seiten an und ordnet Bausteine um, ohne Code.
 *
 * Die Seite «Leistungen» fasst zusammen, was die Preisliste der bisherigen
 * Website an Leistungen nennt. Sie enthält keine Angaben, die dort nicht
 * stehen. Verfügbare Bausteine: siehe lib/inhalt/typen.ts (Baustein).
 */
export const seiten: SeiteRoh[] = [
  {
    slug: "leistungen",
    titel: "Leistungen",
    einleitung: "Was wir für Damen, Herren, Kinder und Jugendliche anbieten. Die Preise dazu stehen auf der Preisliste.",
    inNavigation: true,
    seo: {
      titel: "Leistungen",
      beschreibung: "Föhnen, Schneiden, Folinemèche, Dauerwelle, Färben und Tönung für Damen; Waschen, Schneiden und Föhnen für Herren; Haarschnitte für Kinder und Jugendliche.",
    },
    bausteine: [
      {
        _type: "textblock",
        _key: "damen",
        titel: "Damen",
        inhalt: text(
          "- Föhnen",
          "- Schneiden und Föhnen, auch zum AHV-Tarif",
          "- Folinemèche",
          "- Dauerwelle",
          "- Färben",
          "- Tönung",
          "Die Preise richten sich nach der Haarlänge (Kurzhaar, Mittellanghaar, Langhaar). Alle Beträge: [Preisliste](/preisliste/)."
        ),
      },
      {
        _type: "textblock",
        _key: "herren",
        titel: "Herren",
        inhalt: text(
          "- Waschen, Schneiden und Föhnen",
          "- Waschen und Föhnen",
          "- Waschen, Schneiden und Föhnen zum AHV-Tarif",
          "- Schneiden und Föhnen zum AHV-Tarif"
        ),
      },
      {
        _type: "textblock",
        _key: "kinder",
        titel: "Kinder, Jugendliche und Studenten",
        inhalt: text(
          "- Haarschnitt bis 6 Jahre",
          "- Haarschnitt 7 bis 12 Jahre",
          "- Haarschnitt 13 bis 15 Jahre",
          "- Lehrlinge, Lehrtöchter, Studentinnen und Studenten von 16 bis 25 Jahren",
          "- Langhaar-Zuschlag",
          "Preise ohne Pflege- sowie Styling-Produkte. Je nach Aufwand wird der Preis angepasst."
        ),
      },
      { _type: "kontaktblock", _key: "kontakt", titel: "Termin vereinbaren" },
      { _type: "oeffnungszeitenblock", _key: "zeiten", titel: "Öffnungszeiten" },
    ],
  },
];
