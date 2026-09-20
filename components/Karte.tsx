"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr";
import { speichern, widerrufen } from "@/lib/einwilligung";
import { useEinwilligung } from "@/lib/einwilligung-hook";
import stile from "./Karte.module.css";

type Props = {
  einbettungsUrl: string;
  titel: string;
  adresse: string;
  routenlink: string;
};

/**
 * Google-Maps-Karte mit Zwei-Klick-Freigabe. Vor der Freigabe wird nichts
 * von Google geladen; der Platzhalter erklärt, was beim Laden passiert.
 * Die Zustimmung gilt einmalig für diesen Seitenaufruf oder, auf Wunsch,
 * dauerhaft (localStorage). Widerruf entfernt das Iframe sofort.
 */
export function Karte({ einbettungsUrl, titel, adresse, routenlink }: Props) {
  const { bereit, einwilligung } = useEinwilligung();
  const gemerkt = bereit && einwilligung?.dienste.googleMaps === true;
  const [einmalig, setEinmalig] = useState(false);
  const [merken, setMerken] = useState(false);
  const [speicherFehler, setSpeicherFehler] = useState(false);
  const merkenId = useId();

  const geladen = gemerkt || einmalig;

  const laden = () => {
    setSpeicherFehler(false);
    if (merken) {
      const ok = speichern(["googleMaps"]);
      if (!ok) {
        setSpeicherFehler(true);
        setEinmalig(true);
      }
    } else {
      setEinmalig(true);
    }
  };

  const entfernen = () => {
    if (gemerkt) widerrufen();
    setEinmalig(false);
  };

  return (
    <div className={stile.rahmen}>
      {geladen ? (
        <>
          <iframe
            className={stile.karte}
            src={einbettungsUrl}
            title={titel}
            loading="lazy"
            referrerPolicy="no-referrer"
            allowFullScreen
          />
          <div className={stile.leiste}>
            <p className="klein">
              Karte von Google Maps geladen.
              {gemerkt ? " Ihre Zustimmung ist in diesem Browser gespeichert." : " Nur für diesen Seitenaufruf."}
            </p>
            <button type="button" className="knopf knopf-leise" onClick={entfernen}>
              {gemerkt ? "Zustimmung widerrufen" : "Karte entfernen"}
            </button>
          </div>
        </>
      ) : (
        <div className={stile.platzhalter} role="region" aria-label="Karte, noch nicht geladen">
          <MapPinIcon size={40} weight="light" aria-hidden="true" className={stile.symbol} />
          <p className={stile.adresse}>{adresse}</p>
          <p className={stile.erklaerung}>
            Die Karte kommt von Google Maps. Beim Laden stellt Ihr Browser eine Verbindung zu Google her und übermittelt dabei Ihre
            IP-Adresse; Google kann eigene Cookies setzen. Einzelheiten stehen in der{" "}
            <Link href="/datenschutz/">Datenschutzerklärung</Link>.
          </p>
          <div className={stile.aktionen}>
            <button type="button" className="knopf knopf-primaer" onClick={laden} disabled={!bereit}>
              Google Maps laden
            </button>
            <a className="knopf knopf-sekundaer" href={routenlink} rel="noopener noreferrer" target="_blank">
              Route in Google Maps öffnen
              <span className="nur-vorlesen"> (öffnet in neuem Fenster)</span>
            </a>
          </div>
          <div className={stile.merken}>
            <input id={merkenId} type="checkbox" checked={merken} onChange={(ereignis) => setMerken(ereignis.target.checked)} />
            <label htmlFor={merkenId}>Zustimmung in diesem Browser merken (lokaler Speicher, kein Cookie)</label>
          </div>
          {speicherFehler && (
            <p className="klein" role="alert">
              Ihr Browser erlaubt kein Speichern. Die Karte wird nur für diesen Aufruf geladen.
            </p>
          )}
          <p className="klein">
            Gespeicherte Entscheidungen verwalten Sie unter <Link href="/datenschutz-einstellungen/">Datenschutz-Einstellungen</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
