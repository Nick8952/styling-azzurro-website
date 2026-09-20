import { defineQuery } from "next-sanity";

/**
 * GROQ-Abfragen. Bilder werden mit Asset-Referenz, Zuschnitt, Masse und
 * Unschärfe-Vorschau geladen; sanity/bild.ts löst daraus das Darstellungsbild.
 */

const bildFelder = `{
  alt,
  legende,
  hotspot,
  crop,
  asset->{ _id, url, metadata { dimensions { width, height }, lqip } }
}`;

export const einstellungenAbfrage = defineQuery(`*[_type == "websiteEinstellungen" && _id == "websiteEinstellungen"][0]{
  name, kurzname, beschreibung, demohinweis,
  kontakt,
  oeffnungszeiten{ woche, sonderzeiten, terminHinweis, quelle },
  hauptnavigation, rechtsnavigation
}`);

export const startseiteAbfrage = defineQuery(`*[_type == "startseite" && _id == "startseite"][0]{
  seo, heroTitel, heroText, heroBild ${bildFelder},
  willkommenTitel, willkommenText, grussformel, unterzeichnende,
  teamTitel, teamText, teamBild ${bildFelder},
  preiseTitel, preiseText, preisAuszug,
  salonTitel, salonText, salonBilder[] ${bildFelder},
  gaestebuchTitel, gaestebuchAuszug
}`);

export const teamAbfrage = defineQuery(`*[_type == "teamseite" && _id == "teamseite"][0]{
  seo, titel, einleitung, bildhinweis,
  mitglieder[]{ name, rolle, bild ${bildFelder} },
  bilder[] ${bildFelder}
}`);

export const salonAbfrage = defineQuery(`*[_type == "salonseite" && _id == "salonseite"][0]{
  seo, titel, einleitung, galerie[] ${bildFelder}
}`);

export const preislisteAbfrage = defineQuery(`*[_type == "preisliste" && _id == "preisliste"][0]{
  seo, titel, einleitung, waehrung, hinweise, quelle,
  kategorien[]{ titel, positionen[]{ leistung, variante, preisart, betrag, hinweis } }
}`);

export const gaestebuchAbfrage = defineQuery(`{
  "seite": *[_type == "gaestebuchseite" && _id == "gaestebuchseite"][0]{ seo, titel, einleitung, neuerEintragTitel, neuerEintragText },
  "eintraege": *[_type == "gaestebucheintrag"] | order(nummer desc){ nummer, name, datum, text, sichtbar, grund }
}`);

export const lageplanAbfrage = defineQuery(`*[_type == "lageplan" && _id == "lageplan"][0]{
  seo, titel, einleitung, karteEinbettungsUrl, karteTitel, anreiseTitel, anreise
}`);

export const kontaktseiteAbfrage = defineQuery(`*[_type == "kontaktseite" && _id == "kontaktseite"][0]{
  seo, titel, einleitung, terminTitel, terminText, formularTitel, formularText
}`);

export const rechtstextAbfrage = defineQuery(`*[_type == "rechtstext" && art == $art][0]{ art, titel, stand, inhalt, seo }`);

export const seitenAbfrage = defineQuery(`*[_type == "seite" && defined(slug.current)]{
  "slug": slug.current, titel, einleitung, inNavigation, seo,
  bausteine[]{
    ...,
    _type == "bildblock" => { bild ${bildFelder} },
    _type == "galerieblock" => { bilder[] ${bildFelder} }
  }
}`);
