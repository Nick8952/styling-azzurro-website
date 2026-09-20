import type { Gaestebuchseite } from "@/lib/inhalt/typen";

/**
 * Gästebuch, wörtlich von https://www.styling-azzurro.ch/gästebuch/
 * (abgerufen 20.09.2026, 7 Einträge). Texte sind unverändert übernommen,
 * inklusive Schreibweise. Verlinkte E-Mail-Adressen und fremde Web-Adressen
 * der Einträge werden nicht übernommen (Datenschutz, Fremdinhalte).
 */
export const gaestebuch: Gaestebuchseite = {
  seo: {
    titel: "Gästebuch",
    beschreibung: "Einträge aus dem Gästebuch von Coiffeur Styling Azzurro in Zürich, unverändert übernommen.",
  },
  titel: "Gästebuch",
  einleitung: "Was Kundinnen und Kunden seit 2012 ins Gästebuch geschrieben haben, unverändert und in ihren eigenen Worten.",
  eintraege: [
    {
      nummer: 7,
      name: "Andrea",
      datum: "2024-01-31T08:16",
      text: "Vor gut 1,5 Monaten war ich zum ersten mal im Styling Azzurro und kann diesen Coiffeursalon nur weiterempfehlen! Einladendes Ambiente, gepflegte Erscheinung und auch die Inhaberin Frau Rullo ist sehr sympathisch. Bin definitiv Stammkunde geworden und werde meine Haare in Zukunft immer hier schneiden gehen.",
      sichtbar: true,
    },
    {
      nummer: 6,
      name: "Marie Luxor",
      datum: "2017-01-30T20:50",
      text: "Tolle Webseite! Viel Erfolg für die Zukunft und alles erdenklich Gute! Grüsse aus Deutschland",
      sichtbar: false,
      grund:
        "Eintrag ohne Bezug zum Salon, im Original mit Link auf einen fremden Online-Shop. Wird als vermutlicher Werbeeintrag nicht angezeigt; der Salon kann ihn im CMS einblenden.",
    },
    {
      nummer: 5,
      name: "Di Concilio",
      datum: "2017-01-12T15:21",
      text: "eine gute ambiente + eine sehr gute Leistung und Preis Verhältnis",
      sichtbar: true,
    },
    {
      nummer: 4,
      name: "sandra fassbind",
      datum: "2016-12-26T16:53",
      text: "liebe antonella\ndu bist und bleibst die allerbeste coiffeusin.du verstehst deine arbeit und dein gescheft ist soooogemütlich.liebe grüsse Sandra aus kloten.",
      sichtbar: true,
    },
    {
      nummer: 3,
      name: "Franziska Reich",
      datum: "2016-06-09T10:52",
      text: "Super Coiffeuse, super Homepage! Freu mi immer uf en Bsuech bi dir! Herzlich Franziska",
      sichtbar: true,
    },
    {
      nummer: 2,
      name: "Tamara Bolliger",
      datum: "2012-11-17T14:40",
      text: "Ich wünsche euch viel Freude und Erfolg mit der neuen Webpage! :)",
      sichtbar: true,
    },
    {
      nummer: 1,
      name: "styling-azzurro",
      datum: "2012-11-17T14:30",
      text: "Hallo und Willkommen auf meiner Webpage...\nIch würde mich freuen hier eure Beiträge zu lesen. =)",
      sichtbar: true,
    },
  ],
  neuerEintragTitel: "Möchten Sie etwas ins Gästebuch schreiben?",
  neuerEintragText:
    "In dieser Vorschau lassen sich Einträge nicht direkt erfassen. Schreiben Sie uns Ihren Eintrag per E-Mail; wir nehmen ihn gerne auf.",
};
