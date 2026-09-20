import { text } from "@/lib/inhalt/text";
import type { Lageplan } from "@/lib/inhalt/typen";

/**
 * Lageplan. Die bisherige Website bettet Google Maps ein (Satellitenansicht,
 * Koordinaten 47.4063272, 8.58051). Die Einbettung hier verwendet dieselbe
 * Adresse ohne API-Schlüssel und wird erst nach Einwilligung geladen.
 */
export const lageplan: Lageplan = {
  seo: {
    titel: "Lageplan",
    beschreibung: "So finden Sie Coiffeur Styling Azzurro: Winterthurerstrasse 659, 8051 Zürich, Tram 9 bis Luegisland.",
  },
  titel: "Lageplan",
  einleitung: "Winterthurerstrasse 659, 8051 Zürich, an der Tramhaltestelle Luegisland.",
  karte: {
    anbieter: "google",
    einbettungsUrl: "https://www.google.com/maps?q=Winterthurerstrasse%20659%2C%208051%20Z%C3%BCrich&ll=47.4063272,8.58051&z=17&output=embed",
    titel: "Google-Maps-Karte: Winterthurerstrasse 659, 8051 Zürich",
  },
  anreiseTitel: "Anreise",
  anreise: text(
    "Mit dem Tram: Linie 9 bis zur Haltestelle Luegisland.",
    "Mit dem Auto: Winterthurerstrasse 659, 8051 Zürich."
  ),
};
