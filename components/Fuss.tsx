import Link from "next/link";
import { FacebookLogoIcon } from "@phosphor-icons/react/dist/ssr";
import type { Navigationspunkt, Websiteeinstellungen } from "@/lib/inhalt/typen";
import { Oeffnungszeiten } from "./Oeffnungszeiten";
import stile from "./Fuss.module.css";

type Props = {
  einstellungen: Websiteeinstellungen;
  zusatznavigation: Navigationspunkt[];
};

/**
 * Seitenfuss: Kontakt, Öffnungszeiten, Seitenübersicht und die rechtlichen
 * Links, die auf jeder Seite erreichbar sein müssen (Impressum, Datenschutz,
 * Datenschutz-Einstellungen). Dazu die Demo-Kennzeichnung.
 */
export function Fuss({ einstellungen, zusatznavigation }: Props) {
  const { kontakt, oeffnungszeiten } = einstellungen;
  const punkte = [...einstellungen.hauptnavigation, ...zusatznavigation];
  return (
    <footer className={stile.fuss}>
      <div className={`inhalt ${stile.raster}`}>
        <div className={stile.spalte}>
          <h2 className={stile.titel}>{einstellungen.name}</h2>
          <address className={stile.adresse}>
            {kontakt.inhaberin}
            <br />
            {kontakt.strasse}
            <br />
            {kontakt.plz} {kontakt.ort}
          </address>
          <ul className={stile.kontaktliste}>
            <li>
              <a href={kontakt.telefonLink}>{kontakt.telefon}</a>
            </li>
            <li>
              <a href={`mailto:${kontakt.email}`}>{kontakt.email}</a>
            </li>
            {kontakt.facebook && (
              <li>
                <a href={kontakt.facebook} rel="noopener noreferrer" target="_blank" className={stile.facebook}>
                  <FacebookLogoIcon aria-hidden="true" size={20} weight="regular" />
                  Facebook
                  <span className="nur-vorlesen"> (öffnet in neuem Fenster)</span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className={stile.spalte}>
          <h2 className={stile.titel}>Öffnungszeiten</h2>
          <Oeffnungszeiten zeiten={oeffnungszeiten} kompakt />
          <p className={`klein ${stile.termin}`}>{oeffnungszeiten.terminHinweis}</p>
        </div>

        <nav className={stile.spalte} aria-label="Seitenübersicht">
          <h2 className={stile.titel}>Seiten</h2>
          <ul className={stile.linkliste}>
            <li>
              <Link href="/">Willkommen</Link>
            </li>
            {punkte.map((punkt) => (
              <li key={punkt.ziel}>
                <Link href={punkt.ziel}>{punkt.beschriftung}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`inhalt ${stile.unten}`}>
        <nav aria-label="Rechtliches">
          <ul className={stile.rechtsliste}>
            {einstellungen.rechtsnavigation.map((punkt) => (
              <li key={punkt.ziel}>
                <Link href={punkt.ziel}>{punkt.beschriftung}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className={`klein ${stile.demo}`}>
          {einstellungen.demohinweis} Die aktuelle Website des Salons:{" "}
          <a href={kontakt.website} rel="noopener noreferrer" target="_blank">
            www.styling-azzurro.ch
          </a>
        </p>
      </div>
    </footer>
  );
}
