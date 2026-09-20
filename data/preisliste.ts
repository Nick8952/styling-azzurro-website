import type { Preisliste, Preisposition } from "@/lib/inhalt/typen";

/**
 * Preisliste, 1:1 aus dem Preislisten-Bild der bisherigen Website übernommen
 * (https://www.styling-azzurro.ch/preisliste/, PNG, abgerufen 20.09.2026).
 * Beträge in CHF. Reihenfolge wie im Original.
 */
const fest = (leistung: string, variante: string | undefined, betrag: number): Preisposition => ({
  leistung,
  ...(variante ? { variante } : {}),
  preisart: "fest",
  betrag,
});

export const preisliste: Preisliste = {
  seo: {
    titel: "Preisliste",
    beschreibung:
      "Alle Preise von Coiffeur Styling Azzurro in Zürich: Föhnen, Schneiden, Färben, Tönung, Dauerwelle und Folinemèche für Damen, Herren, Kinder, Jugendliche und Studenten.",
  },
  titel: "Preisliste",
  einleitung: "Übersichtlich und ohne Überraschungen: unsere Preise für Damen, Herren, Kinder und Jugendliche.",
  waehrung: "CHF",
  kategorien: [
    {
      titel: "Damen",
      positionen: [
        fest("Föhnen", "Kurzhaar", 42),
        fest("Föhnen", "Mittellanghaar", 45),
        fest("Föhnen", "Langhaar", 53),
        fest("Schneiden und Föhnen", "Kurzhaar", 80),
        fest("Schneiden und Föhnen", "Mittellanghaar", 83),
        fest("Schneiden und Föhnen", "Langhaar", 98),
        fest("Schneiden und Föhnen", "AHV Kurzhaar", 74),
        fest("Schneiden und Föhnen", "AHV Mittellanghaar", 77),
        fest("Folinemèche", "Kurzhaar", 85),
        fest("Folinemèche", "Mittellanghaar", 105),
        fest("Folinemèche", "Langhaar", 130),
        fest("Dauerwelle", undefined, 85),
        fest("Dauerwelle", "Langhaar", 125),
        fest("Färben", "Kurzhaar", 62),
        fest("Färben", "Mittellanghaar", 67),
        fest("Färben", "Langhaar", 85),
        fest("Tönung", "Kurzhaar", 50),
        fest("Tönung", "Mittellanghaar", 55),
        fest("Tönung", "Langhaar", 65),
      ],
    },
    {
      titel: "Herren",
      positionen: [
        fest("Waschen, Schneiden und Föhnen", undefined, 50),
        fest("Waschen und Föhnen", undefined, 25),
        fest("Waschen, Schneiden und Föhnen", "AHV", 45),
        fest("Schneiden und Föhnen", "AHV", 40),
      ],
    },
    {
      titel: "Kinder, Jugendliche und Studenten",
      positionen: [
        fest("Haarschnitt", "bis 6 Jahre", 25),
        fest("Haarschnitt", "7 bis 12 Jahre", 30),
        fest("Haarschnitt", "13 bis 15 Jahre", 40),
        fest("Herren: Lehrlinge und Studenten", "16 bis 25 Jahre", 46),
        fest("Damen: Lehrtöchter und Studentinnen", "16 bis 25 Jahre", 65),
        fest("Langhaar-Zuschlag", undefined, 12),
      ],
    },
  ],
  hinweise: ["Preise ohne Pflege- sowie Styling-Produkte.", "Je nach Aufwand wird der Preis angepasst."],
  quelle: "Preisliste der bisherigen Website www.styling-azzurro.ch/preisliste/ (Stand 20.09.2026)",
};
