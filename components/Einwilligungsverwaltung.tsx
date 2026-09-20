"use client";

import { useId, useState } from "react";
import { DIENSTE, speichern, type Dienst } from "@/lib/einwilligung";
import { useEinwilligung } from "@/lib/einwilligung-hook";
import stile from "./Einwilligungsverwaltung.module.css";

/**
 * Datenschutz-Einstellungen: zeigt, was tatsächlich gespeichert ist, und
 * erlaubt Zustimmung und Widerruf für jeden externen Dienst. Gleichwertige
 * Knöpfe für «Alle erlauben» und «Alle ablehnen», keine Vorauswahl.
 */
export function Einwilligungsverwaltung() {
  const { bereit, einwilligung: gespeichert } = useEinwilligung();
  // Häkchen folgen dem gespeicherten Stand, bis die Besucherin selbst etwas ändert.
  const [eigeneAuswahl, setEigeneAuswahl] = useState<Record<Dienst, boolean> | null>(null);
  const auswahl: Record<Dienst, boolean> = eigeneAuswahl ?? { googleMaps: gespeichert?.dienste.googleMaps === true };
  const [meldung, setMeldung] = useState<string>("");
  const basisId = useId();

  const anwenden = (dienste: Dienst[]) => {
    setEigeneAuswahl(null);
    const ok = speichern(dienste);
    if (!ok) {
      setMeldung("Speichern nicht möglich: Ihr Browser erlaubt keinen lokalen Speicher. Es bleibt bei «nichts erlaubt».");
      return;
    }
    setMeldung(dienste.length === 0 ? "Gespeichert: keine externen Dienste erlaubt. Eine allfällige Karte wurde entfernt." : `Gespeichert: ${dienste.map((d) => DIENSTE.find((e) => e.id === d)?.name).join(", ")} erlaubt.`);
  };

  const zeitpunkt = gespeichert?.zeitpunkt ? new Date(gespeichert.zeitpunkt).toLocaleString("de-CH") : null;

  return (
    <div className={stile.verwaltung}>
      <section className={stile.block} aria-labelledby={`${basisId}-notwendig`}>
        <h2 id={`${basisId}-notwendig`}>Notwendig</h2>
        <p>
          Diese Website setzt keine Cookies und nutzt keine Analyse- oder Werbedienste. Notwendig ist nur der Abruf der Seiten
          selbst vom Server (GitHub Pages). Das lässt sich nicht abschalten und braucht keine Einwilligung.
        </p>
      </section>

      <section className={stile.block} aria-labelledby={`${basisId}-extern`}>
        <h2 id={`${basisId}-extern`}>Externe Inhalte</h2>
        <p>Diese Dienste werden nur geladen, wenn Sie es ausdrücklich erlauben. Ohne Ihre Zustimmung wird nichts von ihnen abgerufen.</p>
        <ul className={stile.dienste}>
          {DIENSTE.map((dienst) => (
            <li key={dienst.id} className={stile.dienst}>
              <div className={stile.schalter}>
                <input
                  id={`${basisId}-${dienst.id}`}
                  type="checkbox"
                  checked={auswahl[dienst.id]}
                  disabled={!bereit}
                  onChange={(ereignis) => setEigeneAuswahl({ ...auswahl, [dienst.id]: ereignis.target.checked })}
                />
                <label htmlFor={`${basisId}-${dienst.id}`}>
                  <span className={stile.dienstName}>{dienst.name}</span>
                  <span className="klein">Anbieter: {dienst.anbieter}</span>
                </label>
              </div>
              <p className={`klein ${stile.zweck}`}>{dienst.zweck}</p>
            </li>
          ))}
        </ul>
        <div className="knopfreihe">
          <button type="button" className="knopf knopf-primaer" disabled={!bereit} onClick={() => anwenden(DIENSTE.map((d) => d.id))}>
            Alle erlauben
          </button>
          <button type="button" className="knopf knopf-primaer" disabled={!bereit} onClick={() => anwenden([])}>
            Alle ablehnen
          </button>
          <button
            type="button"
            className="knopf knopf-sekundaer"
            disabled={!bereit}
            onClick={() => anwenden(DIENSTE.filter((d) => auswahl[d.id]).map((d) => d.id))}
          >
            Auswahl speichern
          </button>
        </div>
        <p className={stile.meldung} role="status" aria-live="polite">
          {meldung}
        </p>
      </section>

      <section className={stile.block} aria-labelledby={`${basisId}-stand`}>
        <h2 id={`${basisId}-stand`}>Was in Ihrem Browser gespeichert ist</h2>
        {!bereit ? (
          <p>Wird gelesen …</p>
        ) : gespeichert ? (
          <dl className={stile.stand}>
            <div>
              <dt>Schlüssel</dt>
              <dd>
                <code>styling-azzurro-einwilligung</code> (localStorage, kein Cookie)
              </dd>
            </div>
            <div>
              <dt>Erlaubt</dt>
              <dd>{Object.keys(gespeichert.dienste).map((id) => DIENSTE.find((d) => d.id === id)?.name ?? id).join(", ") || "nichts"}</dd>
            </div>
            <div>
              <dt>Gespeichert am</dt>
              <dd>{zeitpunkt}</dd>
            </div>
          </dl>
        ) : (
          <p>Nichts. Es ist keine Entscheidung gespeichert und es wird nichts Externes geladen.</p>
        )}
      </section>
    </div>
  );
}
