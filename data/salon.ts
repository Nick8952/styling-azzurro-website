import { bild } from "@/lib/inhalt/bild";
import type { SalonseiteRoh } from "@/lib/inhalt/lokal-typen";

/**
 * Seite «Mein Geschäft» der bisherigen Website: dort eine reine Fotogalerie
 * ohne Text. Bildbeschreibungen sind neu und beschreiben nur, was zu sehen ist.
 */
export const salon: SalonseiteRoh = {
  seo: {
    titel: "Mein Geschäft",
    beschreibung: "Der Salon von Coiffeur Styling Azzurro in Zürich: helle Arbeitsplätze, Waschplatz, Produkteregal und das blaue Leuchtschild im Schaufenster.",
  },
  titel: "Mein Geschäft",
  einleitung: "Hell, ruhig und persönlich: ein Blick in den Salon an der Winterthurerstrasse.",
  galerie: [
    bild("schaufenster-neon", "Schaufenster des Salons mit blauer Leuchtschrift «Styling Azzurro»"),
    bild("salon-uebersicht", "Salon mit Frisierplätzen, Waschsessel und Wandbild einer weissen Mühle am Meer"),
    bild("salon-arbeitsplatz", "Frisierplatz mit beleuchtetem Spiegel und schwarzem Stuhl"),
    bild("salon-waschplatz", "Waschplatz mit weissem Waschbecken und Spiegel"),
    bild("salon-empfang", "Empfang mit Produkteregal und Spiegelwand"),
    bild("salon-spiegelplatz", "Frisierplatz mit Blumen vor dem beleuchteten Spiegel"),
    bild("salon-innen-neon", "Wartebereich mit zwei Sesseln und der Leuchtschrift von innen, weihnachtlich geschmückt"),
    bild("produkte-regal-a", "Beleuchtetes Regal mit Haarpflegeprodukten"),
    bild("produkte-regal-b", "Regal mit Pflege- und Stylingprodukten"),
    bild("kundin-im-stuhl", "Kundin sitzt lächelnd im Frisierstuhl"),
    bild("frisur-locken-a", "Lange Locken, Ansicht von hinten"),
    bild("frisur-locken-b", "Frisch gestylte Locken, Ansicht von hinten"),
    bild("hund-im-salon", "Kleiner Hund auf dem Holzboden des Salons"),
    bild("herz-dekoration", "Herzförmige Dekoration mit Hasenfiguren vor dem Salon"),
    bild("team-im-salon-b", "Antonella und Ida im Salon"),
  ],
};
