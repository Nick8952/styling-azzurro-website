import { bild, fliesstext, kontakt, navigationspunkt, oeffnungszeiten, seo, sonderzeit, tageszeit, zeitfenster } from "./objekte/gemeinsam";
import { preiskategorie, preisposition } from "./objekte/preise";
import { bildblock, gaestebuchauszug, galerieblock, kartenblock, kontaktblock, oeffnungszeitenblock, preisauszug, teamblock, textblock } from "./objekte/bausteine";
import {
  gaestebucheintrag,
  gaestebuchseite,
  kontaktseite,
  lageplan,
  preisliste,
  rechtstext,
  salonseite,
  seite,
  startseite,
  teammitglied,
  teamseite,
  websiteEinstellungen,
} from "./dokumente/singletons";

/** Alle Schemas des Studios. */
export const schemaTypes = [
  // Dokumente (je genau eines)
  websiteEinstellungen,
  startseite,
  teamseite,
  salonseite,
  preisliste,
  gaestebuchseite,
  lageplan,
  kontaktseite,
  // Dokumente (mehrere)
  gaestebucheintrag,
  rechtstext,
  seite,
  // Objekte
  seo,
  bild,
  fliesstext,
  navigationspunkt,
  kontakt,
  zeitfenster,
  tageszeit,
  sonderzeit,
  oeffnungszeiten,
  preisposition,
  preiskategorie,
  teammitglied,
  // Bausteine
  textblock,
  bildblock,
  galerieblock,
  preisauszug,
  teamblock,
  kontaktblock,
  oeffnungszeitenblock,
  kartenblock,
  gaestebuchauszug,
];

/** Dokumenttypen, von denen es genau eines gibt; ihre _id ist gleich dem Typnamen. */
export const einzeldokumente = ["websiteEinstellungen", "startseite", "teamseite", "salonseite", "preisliste", "gaestebuchseite", "lageplan", "kontaktseite"];
