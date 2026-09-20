import type { CSSProperties } from "react";
import { oeffentlicherPfad } from "@/lib/pfade";
import type { Bild as Bildtyp } from "@/lib/inhalt/typen";
import stile from "./Bild.module.css";

type Props = {
  bild: Bildtyp;
  /** sizes-Angabe für den Browser, z. B. "(min-width: 64rem) 40vw, 100vw". */
  sizes: string;
  /** Bild oberhalb der Falz: sofort laden, hohe Priorität (LCP). */
  prioritaet?: boolean;
  /** Erzwungenes Seitenverhältnis des Rahmens, z. B. "4 / 3". Sonst das des Bildes. */
  seitenverhaeltnis?: string;
  /** Ausschnittposition bei erzwungenem Verhältnis. */
  position?: string;
  className?: string;
};

/**
 * Responsives Bild aus den zur Bauzeit erzeugten Varianten (AVIF, WebP) mit
 * Unschärfe-Vorschau. Der Rahmen reserviert den Platz, damit nichts springt.
 * Bilder aus einem CMS (absolut = true) bekommen keinen Unterpfad.
 */
export function Bild({ bild, sizes, prioritaet = false, seitenverhaeltnis, position, className }: Props) {
  const pfad = (p: string) => (bild.absolut ? p : oeffentlicherPfad(p));
  const srcset = (varianten: Bildtyp["varianten"]["avif"]) =>
    varianten.map((variante) => `${pfad(variante.pfad)} ${variante.breite}w`).join(", ");

  const stil: CSSProperties = {
    aspectRatio: seitenverhaeltnis ?? `${bild.breite} / ${bild.hoehe}`,
    ...(bild.unschaerfe ? { backgroundImage: `url(${bild.unschaerfe})` } : {}),
  };

  return (
    <span className={[stile.rahmen, className].filter(Boolean).join(" ")} style={stil}>
      <picture>
        {bild.varianten.avif.length > 0 && <source type="image/avif" srcSet={srcset(bild.varianten.avif)} sizes={sizes} />}
        {bild.varianten.webp.length > 0 && <source type="image/webp" srcSet={srcset(bild.varianten.webp)} sizes={sizes} />}
        <img
          src={pfad(bild.src)}
          width={bild.breite}
          height={bild.hoehe}
          alt={bild.alt}
          loading={prioritaet ? "eager" : "lazy"}
          decoding={prioritaet ? "sync" : "async"}
          fetchPriority={prioritaet ? "high" : "auto"}
          sizes={sizes}
          style={position ? { objectPosition: position } : undefined}
        />
      </picture>
    </span>
  );
}
