import "server-only";

import { inhalt } from "./index";
import type { Gaestebucheintrag, Preisposition, Rechtstext } from "./typen";

/**
 * Seitenbauer: Sie stellen pro Route genau die Daten zusammen, die die Route
 * braucht. Seitenkomponenten rufen ausschliesslich diese Funktionen auf,
 * Darstellungskomponenten bekommen alles über Eigenschaften. Damit wandern
 * spätere Sanity-Abfragen nicht in den Komponentenbaum.
 */

export async function ladeRahmen() {
  const [einstellungen, seiten] = await Promise.all([inhalt.einstellungen(), inhalt.seiten()]);
  // Freie Seiten erscheinen hinten in der Navigation, ausser sie sind in den
  // Einstellungen bereits an einer bestimmten Stelle eingeordnet.
  const bekannt = new Set(einstellungen.hauptnavigation.map((punkt) => punkt.ziel));
  const zusatznavigation = seiten
    .filter((seite) => seite.inNavigation && !bekannt.has(`/${seite.slug}/`))
    .map((seite) => ({ beschriftung: seite.titel, ziel: `/${seite.slug}/` }));
  return { einstellungen, zusatznavigation };
}

export async function ladeStartseite() {
  const [einstellungen, seite, preisliste, gaestebuch] = await Promise.all([
    inhalt.einstellungen(),
    inhalt.startseite(),
    inhalt.preisliste(),
    inhalt.gaestebuch(),
  ]);

  // Preisauszug: die auf der Startseite genannten Leistungen mit allen Varianten.
  const preisAuszug = seite.preisAuszug
    .map(({ kategorie, leistung }) => {
      const positionen: Preisposition[] =
        preisliste.kategorien
          .find((eintrag) => eintrag.titel === kategorie)
          ?.positionen.filter((position) => position.leistung === leistung) ?? [];
      return { kategorie, leistung, positionen };
    })
    .filter((eintrag) => eintrag.positionen.length > 0);

  const gaestebuchAuszug: Gaestebucheintrag[] = seite.gaestebuchAuszug
    .map((nummer) => gaestebuch.eintraege.find((eintrag) => eintrag.nummer === nummer && eintrag.sichtbar))
    .filter((eintrag): eintrag is Gaestebucheintrag => Boolean(eintrag));

  return { einstellungen, seite, preisAuszug, preishinweise: preisliste.hinweise, gaestebuchAuszug };
}

export async function ladeTeam() {
  const [einstellungen, seite] = await Promise.all([inhalt.einstellungen(), inhalt.team()]);
  return { einstellungen, seite };
}

export async function ladeSalon() {
  const [einstellungen, seite] = await Promise.all([inhalt.einstellungen(), inhalt.salon()]);
  return { einstellungen, seite };
}

export async function ladePreisliste() {
  const [einstellungen, seite] = await Promise.all([inhalt.einstellungen(), inhalt.preisliste()]);
  return { einstellungen, seite };
}

export async function ladeGaestebuch() {
  const [einstellungen, seite] = await Promise.all([inhalt.einstellungen(), inhalt.gaestebuch()]);
  return { einstellungen, seite: { ...seite, eintraege: seite.eintraege.filter((eintrag) => eintrag.sichtbar) } };
}

export async function ladeLageplan() {
  const [einstellungen, seite] = await Promise.all([inhalt.einstellungen(), inhalt.lageplan()]);
  return { einstellungen, seite };
}

export async function ladeKontakt() {
  const [einstellungen, seite] = await Promise.all([inhalt.einstellungen(), inhalt.kontaktseite()]);
  return { einstellungen, seite };
}

export async function ladeRechtstext(art: Rechtstext["art"]) {
  const [einstellungen, seite] = await Promise.all([inhalt.einstellungen(), inhalt.rechtstext(art)]);
  return { einstellungen, seite };
}

export async function ladeSeite(slug: string) {
  const [einstellungen, seite, preisliste, team, gaestebuch, lageplan] = await Promise.all([
    inhalt.einstellungen(),
    inhalt.seite(slug),
    inhalt.preisliste(),
    inhalt.team(),
    inhalt.gaestebuch(),
    inhalt.lageplan(),
  ]);
  return { einstellungen, seite, preisliste, team, gaestebuch, lageplan };
}

export async function alleSeitenSlugs() {
  return (await inhalt.seiten()).map((seite) => seite.slug);
}
