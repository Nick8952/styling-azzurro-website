import { datumLang } from "@/lib/zeiten";
import type { Gaestebucheintrag } from "@/lib/inhalt/typen";
import stile from "./Gaestebuchliste.module.css";

type Props = {
  eintraege: readonly Gaestebucheintrag[];
  /** Zweispaltig als Auszug (Startseite) statt als Liste. */
  alsAuszug?: boolean;
};

/**
 * Gästebucheinträge, wörtlich und mit Datum. Zeilenumbrüche der Originale
 * bleiben erhalten. Keine Sterne, keine Durchschnitte: Es gab nie welche.
 */
export function Gaestebuchliste({ eintraege, alsAuszug = false }: Props) {
  return (
    <ol className={[stile.liste, alsAuszug ? stile.auszug : ""].join(" ")} reversed={!alsAuszug}>
      {eintraege.map((eintrag) => (
        <li key={eintrag.nummer} className={stile.eintrag}>
          <blockquote className={stile.zitat}>
            <p className={stile.text}>{eintrag.text}</p>
            <footer className={stile.fuss}>
              <cite className={stile.name}>{eintrag.name}</cite>
              <time dateTime={eintrag.datum} className={stile.datum}>
                {datumLang(eintrag.datum)}
              </time>
            </footer>
          </blockquote>
        </li>
      ))}
    </ol>
  );
}
