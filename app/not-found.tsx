import Link from "next/link";
import type { Metadata } from "next";
import stile from "./nichtgefunden.module.css";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
};

/** 404: knapp, freundlich, mit den Wegen, die wirklich weiterhelfen. */
export default function NichtGefunden() {
  return (
    <div className={`inhalt ${stile.seite}`}>
      <p className={stile.code} aria-hidden="true">
        404
      </p>
      <h1 className="leuchtlinie">Diese Seite gibt es nicht</h1>
      <p className="lead">Vielleicht ein Tippfehler in der Adresse, vielleicht ein alter Link. Hier geht es weiter:</p>
      <ul className={stile.liste}>
        <li>
          <Link href="/">Zur Startseite</Link>
        </li>
        <li>
          <Link href="/preisliste/">Zur Preisliste</Link>
        </li>
        <li>
          <Link href="/kontakt/">Zum Kontakt</Link>
        </li>
      </ul>
    </div>
  );
}
