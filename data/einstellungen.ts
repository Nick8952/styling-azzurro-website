import type { Websiteeinstellungen } from "@/lib/inhalt/typen";

/**
 * Website-Einstellungen. Alle Angaben stammen von www.styling-azzurro.ch
 * (Stand 20.09.2026), siehe docs/inhaltsinventur.md. Nichts davon ist erfunden.
 */
export const einstellungen: Websiteeinstellungen = {
  name: "Coiffeur Styling Azzurro",
  kurzname: "Styling Azzurro",
  beschreibung:
    "Coiffeur Styling Azzurro an der Winterthurerstrasse 659 in Zürich: Antonella Rullo und Ida Patella schneiden, föhnen, färben und stylen für Damen, Herren und Kinder. Termine telefonisch unter 044 321 20 35.",
  kontakt: {
    betriebsname: "Coiffeur Styling Azzurro",
    inhaberin: "Antonella Rullo",
    strasse: "Winterthurerstrasse 659",
    plz: "8051",
    ort: "Zürich",
    quartier: "Zürich-Schwamendingen",
    land: "Schweiz",
    telefon: "044 321 20 35",
    telefonLink: "tel:+41443212035",
    email: "styling.azzurro@gmx.ch",
    website: "https://www.styling-azzurro.ch/",
    facebook: "https://www.facebook.com/CoiffeurStylingAzzurro/",
    routenlink: "https://www.google.com/maps/dir/?api=1&destination=Winterthurerstrasse+659%2C+8051+Z%C3%BCrich",
    oev: "Tram 9, Haltestelle Luegisland",
  },
  oeffnungszeiten: {
    woche: [
      { tag: "Montag", geschlossen: false, zeiten: [{ von: "08.00", bis: "12.00" }, { von: "13.30", bis: "17.00" }] },
      { tag: "Dienstag", geschlossen: false, zeiten: [{ von: "08.00", bis: "12.00" }, { von: "13.30", bis: "17.00" }] },
      { tag: "Mittwoch", geschlossen: false, zeiten: [{ von: "08.00", bis: "12.00" }, { von: "13.30", bis: "17.00" }] },
      { tag: "Donnerstag", geschlossen: false, zeiten: [{ von: "08.00", bis: "12.00" }, { von: "13.30", bis: "17.00" }] },
      { tag: "Freitag", geschlossen: false, zeiten: [{ von: "08.00", bis: "12.00" }, { von: "13.30", bis: "17.00" }] },
      { tag: "Samstag", geschlossen: true, zeiten: [] },
      { tag: "Sonntag", geschlossen: true, zeiten: [] },
    ],
    sonderzeiten: [],
    terminHinweis: "Termine vereinbaren Sie telefonisch.",
    quelle: "Startseite der bisherigen Website (Montag bis Freitag 8.00 bis 12.00 und 13.30 bis 17.00 Uhr, Samstag geschlossen). Sonntag ist dort nicht genannt und wird als geschlossen angezeigt.",
  },
  hauptnavigation: [
    { beschriftung: "Team", ziel: "/team/" },
    { beschriftung: "Salon", ziel: "/salon/" },
    { beschriftung: "Leistungen", ziel: "/leistungen/" },
    { beschriftung: "Preisliste", ziel: "/preisliste/" },
    { beschriftung: "Lageplan", ziel: "/lageplan/" },
    { beschriftung: "Gästebuch", ziel: "/gaestebuch/" },
    { beschriftung: "Kontakt", ziel: "/kontakt/" },
  ],
  rechtsnavigation: [
    { beschriftung: "Impressum", ziel: "/impressum/" },
    { beschriftung: "Datenschutz", ziel: "/datenschutz/" },
    { beschriftung: "Datenschutz-Einstellungen", ziel: "/datenschutz-einstellungen/" },
  ],
  demohinweis:
    "Unverbindlicher Gestaltungsvorschlag für Coiffeur Styling Azzurro, erstellt von Nick Holzbecher. Kein Angebot des Salons.",
};
