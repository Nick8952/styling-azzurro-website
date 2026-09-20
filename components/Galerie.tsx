"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import type { Bild as Bildtyp } from "@/lib/inhalt/typen";
import { Bild } from "./Bild";
import stile from "./Galerie.module.css";

type Props = {
  bilder: Bildtyp[];
  /** Ohne Vergrösserung: reine Bildwand (z. B. Team). */
  ohneVergroesserung?: boolean;
};

/**
 * Bildwand mit Vergrösserung. Querformate belegen zwei Spalten, damit das
 * Raster ohne leere Zellen aufgeht. Die Vergrösserung nutzt <dialog>:
 * Fokus bleibt im Dialog, Escape schliesst, Pfeiltasten blättern.
 */
export function Galerie({ bilder, ohneVergroesserung = false }: Props) {
  const [aktiv, setAktiv] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const ausloeserRef = useRef<HTMLElement | null>(null);

  const oeffnen = (index: number, ausloeser: HTMLElement) => {
    ausloeserRef.current = ausloeser;
    setAktiv(index);
  };

  const schliessen = useCallback(() => {
    setAktiv(null);
  }, []);

  const blaettern = useCallback(
    (richtung: 1 | -1) => {
      setAktiv((wert) => (wert === null ? null : (wert + richtung + bilder.length) % bilder.length));
    },
    [bilder.length]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (aktiv !== null && !dialog.open) dialog.showModal();
    if (aktiv === null && dialog.open) {
      dialog.close();
      ausloeserRef.current?.focus();
    }
  }, [aktiv]);

  useEffect(() => {
    if (aktiv === null) return;
    const beiTaste = (ereignis: KeyboardEvent) => {
      if (ereignis.key === "ArrowRight") blaettern(1);
      if (ereignis.key === "ArrowLeft") blaettern(-1);
    };
    document.addEventListener("keydown", beiTaste);
    return () => document.removeEventListener("keydown", beiTaste);
  }, [aktiv, blaettern]);

  return (
    <>
      <ul className={stile.wand}>
        {bilder.map((bild, index) => {
          const quer = bild.breite > bild.hoehe;
          return (
            <li key={`${bild.src}-${index}`} className={quer ? stile.quer : undefined}>
              {ohneVergroesserung ? (
                <figure className={stile.figur}>
                  <Bild bild={bild} sizes="(min-width: 64rem) 18rem, (min-width: 40rem) 33vw, 50vw" className={stile.bild} />
                  {bild.legende && <figcaption className={stile.legende}>{bild.legende}</figcaption>}
                </figure>
              ) : (
                <button
                  type="button"
                  className={stile.knopf}
                  onClick={(ereignis) => oeffnen(index, ereignis.currentTarget)}
                  aria-label={`${bild.alt}. Vergrössern`}
                >
                  <Bild bild={bild} sizes="(min-width: 64rem) 18rem, (min-width: 40rem) 33vw, 50vw" className={stile.bild} />
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {!ohneVergroesserung && (
        <dialog
          ref={dialogRef}
          className={stile.dialog}
          aria-label="Vergrössertes Bild"
          onClose={schliessen}
          onClick={(ereignis) => {
            // Klick auf den Hintergrund (Dialog oder seine Innenfläche, nicht auf Bild/Knöpfe) schliesst
            const ziel = ereignis.target as HTMLElement;
            if (ziel === dialogRef.current || ziel.classList.contains(stile.dialogInhalt)) schliessen();
          }}
        >
          {aktiv !== null && (
            <div className={stile.dialogInhalt}>
              <figure className={stile.gross}>
                {/* Beschreibung steht in der Bildlegende; das Bild selbst bleibt für Vorleser stumm, sonst hört man sie doppelt. */}
                <Bild bild={{ ...bilder[aktiv], alt: "" }} sizes="100vw" className={stile.grossBild} />
                <figcaption className={stile.grossLegende}>
                  {bilder[aktiv].alt}
                  <span className={stile.zaehler}>
                    {" "}
                    ({aktiv + 1} von {bilder.length})
                  </span>
                </figcaption>
              </figure>
              <div className={stile.steuerung}>
                <button type="button" className={stile.steuerKnopf} onClick={() => blaettern(-1)} aria-label="Vorheriges Bild">
                  <CaretLeftIcon size={22} aria-hidden="true" />
                </button>
                <button type="button" className={stile.steuerKnopf} onClick={() => blaettern(1)} aria-label="Nächstes Bild">
                  <CaretRightIcon size={22} aria-hidden="true" />
                </button>
              </div>
              <button type="button" className={`${stile.steuerKnopf} ${stile.schliessen}`} onClick={schliessen} aria-label="Schliessen">
                <XIcon size={22} aria-hidden="true" />
              </button>
            </div>
          )}
        </dialog>
      )}
    </>
  );
}
