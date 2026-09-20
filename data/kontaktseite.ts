import { text } from "@/lib/inhalt/text";
import type { Kontaktseite } from "@/lib/inhalt/typen";

/**
 * Kontaktseite. Die bisherige Website hatte ein Jimdo-Formular mit Captcha;
 * die Demo bereitet stattdessen eine E-Mail im eigenen Mailprogramm vor.
 */
export const kontaktseite: Kontaktseite = {
  seo: {
    titel: "Kontakt",
    beschreibung: "Kontakt zu Coiffeur Styling Azzurro, Antonella Rullo, Winterthurerstrasse 659, 8051 Zürich. Telefon 044 321 20 35, E-Mail styling.azzurro@gmx.ch.",
  },
  titel: "Kontakt",
  einleitung: "Am schnellsten erreichen Sie uns telefonisch. Für alles andere schreiben Sie uns eine E-Mail.",
  terminTitel: "Termin vereinbaren",
  terminText: text(
    "Termine vergeben wir telefonisch unter **044 321 20 35**, Montag bis Freitag von 8.00 bis 12.00 und von 13.30 bis 17.00 Uhr.",
    "Eine Online-Terminbuchung gibt es nicht."
  ),
  formularTitel: "Nachricht schreiben",
  formularText:
    "Dieses Formular öffnet Ihr E-Mail-Programm mit einer vorbereiteten Nachricht an styling.azzurro@gmx.ch. Gesendet wird erst, wenn Sie die E-Mail dort abschicken.",
};
