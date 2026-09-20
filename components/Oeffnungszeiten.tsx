import { zeitenGruppiert } from "@/lib/zeiten";
import type { Oeffnungszeiten as Zeiten } from "@/lib/inhalt/typen";
import stile from "./Oeffnungszeiten.module.css";

type Props = {
  zeiten: Zeiten;
  /** Kompakt: Tage zusammengefasst, ohne Rahmen (Fuss). */
  kompakt?: boolean;
  titel?: string;
};

/**
 * Öffnungszeiten als Türschild: alle sieben Tage untereinander, Zeiten in
 * Tabellenziffern, geschlossene Tage gedämpft. Sonderzeiten darunter.
 */
export function Oeffnungszeiten({ zeiten, kompakt = false, titel }: Props) {
  if (kompakt) {
    return (
      <dl className={stile.kompakt}>
        {zeitenGruppiert(zeiten).map((gruppe) => (
          <div key={gruppe.tage} className={stile.kompaktZeile}>
            <dt>{gruppe.tage}</dt>
            <dd className={gruppe.geschlossen ? stile.geschlossen : undefined}>{gruppe.text}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <div className={stile.schild}>
      {titel && <h3 className={stile.titel}>{titel}</h3>}
      <dl className={stile.liste}>
        {zeiten.woche.map((tag) => (
          <div key={tag.tag} className={stile.zeile}>
            <dt>{tag.tag}</dt>
            <dd className={tag.geschlossen ? stile.geschlossen : undefined}>
              {tag.geschlossen || tag.zeiten.length === 0
                ? "geschlossen"
                : tag.zeiten.map((fenster, index) => (
                    <span key={index} className={stile.fenster}>
                      {fenster.von} bis {fenster.bis}
                    </span>
                  ))}
            </dd>
          </div>
        ))}
      </dl>
      {zeiten.sonderzeiten.length > 0 && (
        <dl className={stile.sonder}>
          {zeiten.sonderzeiten.map((sonder) => (
            <div key={sonder.datum} className={stile.zeile}>
              <dt>{sonder.bezeichnung}</dt>
              <dd className={sonder.geschlossen ? stile.geschlossen : undefined}>
                {sonder.geschlossen ? "geschlossen" : sonder.zeiten.map((f) => `${f.von} bis ${f.bis}`).join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      )}
      <p className={stile.termin}>{zeiten.terminHinweis}</p>
    </div>
  );
}
