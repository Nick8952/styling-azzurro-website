"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import type { Navigationspunkt, Oeffnungszeiten } from "@/lib/inhalt/typen";
import { zeitenKurz } from "@/lib/zeiten";
import stile from "./Navigation.module.css";

type Props = {
  punkte: Navigationspunkt[];
  telefon: string;
  telefonLink: string;
  oeffnungszeiten: Oeffnungszeiten;
};

/**
 * Hauptnavigation. Ab 64 rem eine Zeile, darunter ein Menüknopf, der eine
 * Fläche unter dem Kopf aufklappt. Der Knopf zeichnet sich vom Hamburger zum
 * Kreuz; Escape schliesst, ein Seitenwechsel schliesst ebenfalls.
 */
export function Navigation({ punkte, telefon, telefonLink, oeffnungszeiten }: Props) {
  const pfad = usePathname();
  const [offen, setOffen] = useState(false);
  const flaecheId = useId();
  const knopfRef = useRef<HTMLButtonElement>(null);

  // Menü bei Seitenwechsel schliessen (Zustand während des Renderns anpassen,
  // siehe react.dev «Adjusting state when a prop changes»)
  const [letzterPfad, setLetzterPfad] = useState(pfad);
  if (pfad !== letzterPfad) {
    setLetzterPfad(pfad);
    setOffen(false);
  }

  useEffect(() => {
    if (!offen) return;
    const beiTaste = (ereignis: KeyboardEvent) => {
      if (ereignis.key === "Escape") {
        setOffen(false);
        knopfRef.current?.focus();
      }
    };
    document.addEventListener("keydown", beiTaste);
    return () => document.removeEventListener("keydown", beiTaste);
  }, [offen]);

  const aktiv = (ziel: string) => {
    const aktuell = pfad.endsWith("/") ? pfad : `${pfad}/`;
    return aktuell === ziel;
  };

  // DOM-Reihenfolge: Telefon, Menüknopf, dann die Liste. So führt Tab nach dem
  // Öffnen direkt in das Menü. Auf dem Desktop stellt CSS (order) die Liste vor den Telefonknopf.
  return (
    <nav className={stile.nav} aria-label="Hauptnavigation">

      <a className={`knopf knopf-primaer ${stile.telefon}`} href={telefonLink} aria-label={`Anrufen: ${telefon}`}>
        <PhoneIcon aria-hidden="true" size={18} weight="regular" />
        <span className={stile.telefonText}>Anrufen</span>
        <span className={stile.telefonNummer}>{telefon}</span>
      </a>

      <button
        ref={knopfRef}
        type="button"
        className={stile.menueknopf}
        aria-expanded={offen}
        aria-controls={flaecheId}
        onClick={() => setOffen((wert) => !wert)}
      >
        <span className={stile.balken} aria-hidden="true" />
        <span className="nur-vorlesen">{offen ? "Menü schliessen" : "Menü öffnen"}</span>
      </button>

      <ul className={[stile.liste, offen ? stile.offen : ""].join(" ")} id={flaecheId}>
        {punkte.map((punkt) => (
          <li key={punkt.ziel}>
            {punkt.extern ? (
              <a className={stile.link} href={punkt.ziel} rel="noopener noreferrer" target="_blank">
                {punkt.beschriftung}
              </a>
            ) : (
              <Link className={stile.link} href={punkt.ziel} aria-current={aktiv(punkt.ziel) ? "page" : undefined}>
                {punkt.beschriftung}
              </Link>
            )}
          </li>
        ))}
        <li className={stile.nurMobil}>
          <a className={stile.link} href={telefonLink}>
            Anrufen: {telefon}
          </a>
          <p className={stile.zeiten}>{zeitenKurz(oeffnungszeiten)}</p>
        </li>
      </ul>
    </nav>
  );
}
