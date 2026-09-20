import Link from "next/link";
import { oeffentlicherPfad } from "@/lib/pfade";
import type { Navigationspunkt, Websiteeinstellungen } from "@/lib/inhalt/typen";
import { Navigation } from "./Navigation";
import stile from "./Kopf.module.css";

type Props = {
  einstellungen: Websiteeinstellungen;
  zusatznavigation: Navigationspunkt[];
};

/**
 * Seitenkopf: Wortmarke links, Navigation, Telefon als wichtigste Handlung.
 * Auf schmalen Bildschirmen klappt die Navigation über den Menüknopf aus
 * (components/Navigation.tsx).
 */
export function Kopf({ einstellungen, zusatznavigation }: Props) {
  const punkte = [...einstellungen.hauptnavigation, ...zusatznavigation];
  return (
    <header className={stile.kopf}>
      <a className="sprunglink" href="#hauptinhalt">
        Zum Inhalt springen
      </a>
      <div className={`inhalt ${stile.zeile}`}>
        <Link href="/" className={stile.marke} aria-label={`${einstellungen.name}, zur Startseite`}>
          {/* Wortmarke: statische PNG-Datei aus public/, bewusst ohne next/image
              (statischer Export ohne Bildserver, Unterpfad über oeffentlicherPfad). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={oeffentlicherPfad("/bilder/logo-792.png")}
            srcSet={`${oeffentlicherPfad("/bilder/logo-396.png")} 396w, ${oeffentlicherPfad("/bilder/logo-792.png")} 792w`}
            sizes="(min-width: 48rem) 200px, 160px"
            width={792}
            height={216}
            alt=""
            decoding="async"
            fetchPriority="high"
          />
        </Link>
        <Navigation punkte={punkte} telefon={einstellungen.kontakt.telefon} telefonLink={einstellungen.kontakt.telefonLink} oeffnungszeiten={einstellungen.oeffnungszeiten} />
      </div>
    </header>
  );
}
