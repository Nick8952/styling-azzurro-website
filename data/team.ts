import { bild } from "@/lib/inhalt/bild";
import type { TeamseiteRoh } from "@/lib/inhalt/lokal-typen";

/**
 * Team. Rollen werden nicht angegeben: Die Quellwebsite nennt keine; «Inhaberin»
 * sagt nur eine Kundin im Gästebuch. Belegt sind genau zwei Namen (Startseite: «Antonella Rullo und Ida
 * Patella», Kontaktseite: «Rullo Antonella» als Ansprechperson). Die bisherige
 * Teamseite beschriftet nur ein Foto, und dieses zeigt beide Frauen. Welches
 * Gesicht zu welchem Namen gehört, ist damit nicht belegt. Deshalb keine
 * Einzelporträts mit Namen, sondern gemeinsame Fotos.
 */
export const team: TeamseiteRoh = {
  seo: {
    titel: "Antonella und Ida",
    beschreibung: "Antonella Rullo und Ida Patella: das Team von Coiffeur Styling Azzurro an der Winterthurerstrasse 659 in Zürich.",
  },
  titel: "Antonella und Ida",
  einleitung: "Antonella Rullo und Ida Patella freuen sich auf Ihren Besuch.",
  mitglieder: [
    { name: "Antonella Rullo" },
    { name: "Ida Patella" },
  ],
  bilder: [
    bild("team-selfie", "Antonella Rullo und Ida Patella, Selfie mit Sonnenbrille im Haar"),
    bild("team-im-salon-a", "Antonella und Ida nebeneinander im Salon vor dem Spiegel"),
    bild("team-nah", "Antonella und Ida, Nahaufnahme mit Brille und offenem Haar"),
    bild("team-fenster", "Antonella und Ida mit Schutzmasken vor dem Schaufenster"),
    bild("team-ausflug", "Antonella und Ida bei einem Ausflug im Freien"),
    bild("team-anlass", "Antonella und Ida bei einem Anlass vor einer roten Wand"),
    bild("team-masken-salon", "Antonella und Ida mit Schutzmasken vor dem Produkteregal"),
    bild("team-portrait", "Porträt einer der beiden Coiffeusen im weissen Rollkragenpullover"),
    bild("haarwaesche", "Haarwäsche am Waschplatz, Kunde und Coiffeuse zeigen Daumen hoch"),
  ],
  bildhinweis: "Die Fotos stammen von der bisherigen Website und zeigen Antonella und Ida gemeinsam.",
};
