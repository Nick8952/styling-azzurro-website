import { EnvelopeSimpleIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import type { Kontakt } from "@/lib/inhalt/typen";
import stile from "./Kontaktblock.module.css";

type Props = {
  kontakt: Kontakt;
  /** Zusatz unter der Adresse, z. B. der ÖV-Hinweis. */
  mitAnreise?: boolean;
};

/** Direkte Kontaktwege: Telefon, E-Mail, Adresse mit Route. Jede Zeile ist ein grosszügiges Berührungsziel. */
export function Kontaktblock({ kontakt, mitAnreise = true }: Props) {
  return (
    <ul className={stile.liste}>
      <li className={stile.zeile}>
        <PhoneIcon size={24} weight="regular" aria-hidden="true" className={stile.symbol} />
        <div>
          <span className={stile.beschriftung}>Telefon</span>
          <a href={kontakt.telefonLink} className={stile.wert}>
            {kontakt.telefon}
          </a>
        </div>
      </li>
      <li className={stile.zeile}>
        <EnvelopeSimpleIcon size={24} weight="regular" aria-hidden="true" className={stile.symbol} />
        <div>
          <span className={stile.beschriftung}>E-Mail</span>
          <a href={`mailto:${kontakt.email}`} className={stile.wert}>
            {kontakt.email}
          </a>
        </div>
      </li>
      <li className={stile.zeile}>
        <MapPinIcon size={24} weight="regular" aria-hidden="true" className={stile.symbol} />
        <div>
          <span className={stile.beschriftung}>Adresse</span>
          <address className={stile.adresse}>
            {kontakt.betriebsname}
            <br />
            {kontakt.inhaberin}
            <br />
            {kontakt.strasse}
            <br />
            {kontakt.plz} {kontakt.ort}
          </address>
          {mitAnreise && <p className="klein">{kontakt.oev}</p>}
          <a href={kontakt.routenlink} rel="noopener noreferrer" target="_blank" className={`pfeillink ${stile.route}`}>
            Route planen
            <span className="nur-vorlesen"> (Google Maps, öffnet in neuem Fenster)</span>
          </a>
        </div>
      </li>
    </ul>
  );
}
