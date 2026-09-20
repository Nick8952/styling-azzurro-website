import "server-only";

import { einstellungen } from "@/data/einstellungen";
import { gaestebuch } from "@/data/gaestebuch";
import { kontaktseite } from "@/data/kontaktseite";
import { lageplan } from "@/data/lageplan";
import { preisliste } from "@/data/preisliste";
import { rechtstexte } from "@/data/rechtstexte";
import { salon } from "@/data/salon";
import { seiten } from "@/data/seiten";
import { startseite } from "@/data/startseite";
import { team } from "@/data/team";
import { alleAufloesen, aufloesen } from "./bild";
import type { BausteinRoh } from "./lokal-typen";
import type { Baustein, Inhaltsquelle, Rechtstext, Seite } from "./typen";

/**
 * Lokale Inhaltsquelle. Sie liest die typisierten Dateien unter data/ und ist
 * die einzige Quelle, die im statischen Export der Demo aktiv ist.
 *
 * Bildverweise werden hier aufgelöst, damit die Komponenten nur fertige
 * Bilder sehen. Alle Methoden sind asynchron, obwohl sie es technisch nicht
 * sein müssten: So verhält sich die spätere Sanity-Quelle identisch.
 */

function bausteinAufloesen(baustein: BausteinRoh): Baustein {
  switch (baustein._type) {
    case "bildblock":
      return { ...baustein, bild: aufloesen(baustein.bild) };
    case "galerieblock":
      return { ...baustein, bilder: alleAufloesen(baustein.bilder) };
    default:
      return baustein;
  }
}

function seiteAufloesen(seite: (typeof seiten)[number]): Seite {
  return { ...seite, bausteine: seite.bausteine.map(bausteinAufloesen) };
}

export const lokaleInhaltsquelle: Inhaltsquelle = {
  async einstellungen() {
    return einstellungen;
  },

  async startseite() {
    return {
      ...startseite,
      heroBild: aufloesen(startseite.heroBild),
      teamBild: aufloesen(startseite.teamBild),
      salonBilder: alleAufloesen(startseite.salonBilder),
    };
  },

  async team() {
    return {
      ...team,
      mitglieder: team.mitglieder.map(({ bild, ...mitglied }) => ({
        ...mitglied,
        ...(bild ? { bild: aufloesen(bild) } : {}),
      })),
      bilder: alleAufloesen(team.bilder),
    };
  },

  async salon() {
    return { ...salon, galerie: alleAufloesen(salon.galerie) };
  },

  async preisliste() {
    return preisliste;
  },

  async gaestebuch() {
    return gaestebuch;
  },

  async lageplan() {
    return lageplan;
  },

  async kontaktseite() {
    return kontaktseite;
  },

  async rechtstext(art: Rechtstext["art"]) {
    return rechtstexte.find((eintrag) => eintrag.art === art) ?? null;
  },

  async seiten() {
    return seiten.map(seiteAufloesen);
  },

  async seite(slug) {
    const treffer = seiten.find((eintrag) => eintrag.slug === slug);
    return treffer ? seiteAufloesen(treffer) : null;
  },
};
