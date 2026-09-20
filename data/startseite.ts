import { bild } from "@/lib/inhalt/bild";
import { text } from "@/lib/inhalt/text";
import type { StartseiteRoh } from "@/lib/inhalt/lokal-typen";

/**
 * Startseite. Texte folgen der Seite «Herzlich Willkommen» der bisherigen
 * Website; sprachlich überarbeitet, inhaltlich unverändert.
 */
export const startseite: StartseiteRoh = {
  seo: {
    titel: "Coiffeur Styling Azzurro, Zürich",
    beschreibung:
      "Coiffeur Styling Azzurro an der Winterthurerstrasse 659, 8051 Zürich, an der Tramhaltestelle Luegisland. Antonella Rullo und Ida Patella freuen sich auf Ihren Besuch. Termine unter 044 321 20 35.",
  },
  heroTitel: "Herzlich willkommen bei Styling Azzurro",
  heroText: "Ihr Coiffeur an der Winterthurerstrasse 659 in Zürich, direkt an der Tramhaltestelle Luegisland.",
  heroBild: bild("schaufenster-neon-quer", "Schaufenster des Salons mit blauer Leuchtschrift «Styling Azzurro»"),
  willkommenTitel: "Für einen Termin rufen Sie uns an",
  willkommenText: text(
    "Sie finden uns an der Winterthurerstrasse 659, 8051 Zürich, an der Tramhaltestelle Luegisland der Linie 9.",
    "Für einen Termin erreichen Sie uns telefonisch unter 044 321 20 35, Montag bis Freitag von 8.00 bis 12.00 und von 13.30 bis 17.00 Uhr. Samstag ist der Salon geschlossen."
  ),
  grussformel: "Wir freuen uns auf Ihren Besuch",
  unterzeichnende: "Antonella Rullo und Ida Patella",
  teamTitel: "Antonella und Ida",
  teamText: "Zwei Coiffeusen, die ihren Salon persönlich führen. Lernen Sie das Team kennen.",
  teamBild: bild("team-im-salon-a", "Antonella und Ida nebeneinander im Salon vor dem Spiegel"),
  preiseTitel: "Klare Preise",
  preiseText: "Föhnen, Schneiden, Färben, Tönung, Dauerwelle und Folinemèche für Damen, Herren und Kinder. Ein Auszug; die vollständige Liste finden Sie auf der Preisseite.",
  preisAuszug: [
    { kategorie: "Damen", leistung: "Schneiden und Föhnen" },
    { kategorie: "Damen", leistung: "Färben" },
    { kategorie: "Herren", leistung: "Waschen, Schneiden und Föhnen" },
    { kategorie: "Kinder, Jugendliche und Studenten", leistung: "Haarschnitt" },
  ],
  salonTitel: "Mein Geschäft",
  salonText: "Helle Arbeitsplätze, ein ruhiger Wartebereich und das blaue Leuchtschild im Schaufenster.",
  salonBilder: [
    bild("salon-uebersicht", "Salon mit Frisierplätzen, Waschsessel und Wandbild einer weissen Mühle am Meer"),
    bild("salon-spiegelplatz", "Frisierplatz mit Blumen vor dem beleuchteten Spiegel"),
    bild("salon-empfang", "Empfang mit Produkteregal und Spiegelwand"),
  ],
  gaestebuchTitel: "Aus dem Gästebuch",
  gaestebuchAuszug: [7, 4],
};
