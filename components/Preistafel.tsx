import { gruppieren, preisText } from "@/lib/preise";
import type { Preiskategorie } from "@/lib/inhalt/typen";
import stile from "./Preistafel.module.css";

type Props = {
  kategorien: readonly Preiskategorie[];
  hinweise: readonly string[];
  waehrung?: string;
  /** Überschriftenebene der Kategorien: h2 auf der Preisseite, h3 in Auszügen. */
  ebene?: "h2" | "h3";
};

/**
 * Preistafel wie eine gedruckte Salon-Preisliste: Leistung, Punktlinie,
 * Betrag in Tabellenziffern. Varianten (Haarlänge, AHV, Alter) stehen
 * eingerückt unter der Leistung. Die Bedingungen erscheinen sichtbar oberhalb
 * der Kategorien, nicht im Kleingedruckten.
 */
export function Preistafel({ kategorien, hinweise, waehrung = "CHF", ebene = "h2" }: Props) {
  const Titel = ebene;
  const Untertitel = ebene === "h2" ? "h3" : "h4";
  return (
    <div className={stile.tafel}>
      {hinweise.length > 0 && (
        <p className={stile.hinweise} role="note">
          {hinweise.join(" ")}
        </p>
      )}
      <div className={stile.kategorien}>
        {kategorien.map((kategorie) => (
          <section key={kategorie.titel} className={stile.kategorie} aria-labelledby={`preise-${kategorie.titel.replace(/\W+/g, "-").toLowerCase()}`}>
            <Titel id={`preise-${kategorie.titel.replace(/\W+/g, "-").toLowerCase()}`} className={stile.kategorieTitel}>
              {kategorie.titel}
            </Titel>
            <ul className={stile.gruppen}>
              {gruppieren(kategorie.positionen).map((gruppe) => {
                const einzeln = gruppe.positionen.length === 1 && !gruppe.positionen[0].variante;
                return (
                  <li key={gruppe.leistung} className={stile.gruppe}>
                    {einzeln ? (
                      <div className={stile.zeile}>
                        <span className={stile.name}>{gruppe.leistung}</span>
                        <span className={stile.punkte} aria-hidden="true" />
                        <span className={stile.preis}>{preisText(gruppe.positionen[0], waehrung)}</span>
                      </div>
                    ) : (
                      <>
                        <Untertitel className={stile.leistung}>{gruppe.leistung}</Untertitel>
                        <ul className={stile.zeilen}>
                          {gruppe.positionen.map((position, index) => (
                            <li key={`${position.variante ?? "standard"}-${index}`} className={stile.zeile}>
                              <span className={stile.name}>{position.variante ?? gruppe.leistung}</span>
                              <span className={stile.punkte} aria-hidden="true" />
                              <span className={stile.preis}>{preisText(position, waehrung)}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {gruppe.positionen.some((position) => position.hinweis) && (
                      <p className={stile.positionHinweis}>
                        {gruppe.positionen
                          .filter((position) => position.hinweis)
                          .map((position) => position.hinweis)
                          .join(" ")}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
