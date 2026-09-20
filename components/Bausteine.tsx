import type { Baustein, Gaestebuchseite, Lageplan, Preisliste, Teamseite, Websiteeinstellungen } from "@/lib/inhalt/typen";
import { Bild } from "./Bild";
import { Galerie } from "./Galerie";
import { Gaestebuchliste } from "./Gaestebuchliste";
import { Karte } from "./Karte";
import { Kontaktblock } from "./Kontaktblock";
import { Oeffnungszeiten } from "./Oeffnungszeiten";
import { Preistafel } from "./Preistafel";
import { Teamvorstellung } from "./Teamvorstellung";
import { Text } from "./Text";
import stile from "./Bausteine.module.css";

type Props = {
  bausteine: readonly Baustein[];
  einstellungen: Websiteeinstellungen;
  preisliste: Preisliste;
  team: Teamseite;
  gaestebuch: Gaestebuchseite;
  lageplan: Lageplan;
};

/**
 * Stellt die Bausteine einer frei zusammengestellten Seite dar. Jeder
 * Baustein nutzt dieselben Komponenten wie die festen Seiten, damit vom CMS
 * angelegte Seiten nicht anders aussehen.
 */
export function Bausteine({ bausteine, einstellungen, preisliste, team, gaestebuch, lageplan }: Props) {
  return (
    <div className={stile.folge}>
      {bausteine.map((baustein) => {
        switch (baustein._type) {
          case "textblock":
            return (
              <section key={baustein._key} className={`inhalt ${stile.block}`}>
                {baustein.titel && <h2>{baustein.titel}</h2>}
                <Text inhalt={baustein.inhalt} className="textbreite" />
              </section>
            );
          case "bildblock":
            return (
              <figure key={baustein._key} className={[baustein.breit ? "" : "inhalt", stile.block, stile.figur].join(" ")}>
                <Bild bild={baustein.bild} sizes={baustein.breit ? "100vw" : "(min-width: 72rem) 72rem, 100vw"} className={baustein.breit ? undefined : stile.bildRund} />
                {baustein.bild.legende && <figcaption className={`inhalt klein ${stile.legende}`}>{baustein.bild.legende}</figcaption>}
              </figure>
            );
          case "galerieblock":
            return (
              <section key={baustein._key} className={`inhalt ${stile.block}`}>
                {baustein.titel && <h2>{baustein.titel}</h2>}
                <Galerie bilder={baustein.bilder} />
              </section>
            );
          case "preisauszug": {
            const kategorien = preisliste.kategorien.filter((kategorie) => baustein.kategorien.length === 0 || baustein.kategorien.includes(kategorie.titel));
            return (
              <section key={baustein._key} className={`inhalt ${stile.block}`}>
                {baustein.titel && <h2>{baustein.titel}</h2>}
                <Preistafel kategorien={kategorien} hinweise={preisliste.hinweise} waehrung={preisliste.waehrung} ebene="h3" />
              </section>
            );
          }
          case "teamblock":
            return (
              <section key={baustein._key} className={`inhalt ${stile.block}`}>
                {baustein.titel && <h2>{baustein.titel}</h2>}
                <Teamvorstellung mitglieder={team.mitglieder} />
              </section>
            );
          case "kontaktblock":
            return (
              <section key={baustein._key} className={`inhalt ${stile.block}`}>
                {baustein.titel && <h2>{baustein.titel}</h2>}
                <Kontaktblock kontakt={einstellungen.kontakt} />
              </section>
            );
          case "oeffnungszeitenblock":
            return (
              <section key={baustein._key} className={`inhalt ${stile.block}`}>
                {baustein.titel && <h2>{baustein.titel}</h2>}
                <div className={stile.schmal}>
                  <Oeffnungszeiten zeiten={einstellungen.oeffnungszeiten} />
                </div>
              </section>
            );
          case "kartenblock":
            return (
              <section key={baustein._key} className={`inhalt ${stile.block}`}>
                {baustein.titel && <h2>{baustein.titel}</h2>}
                <Karte
                  einbettungsUrl={lageplan.karte.einbettungsUrl}
                  titel={lageplan.karte.titel}
                  adresse={`${einstellungen.kontakt.strasse}, ${einstellungen.kontakt.plz} ${einstellungen.kontakt.ort}`}
                  routenlink={einstellungen.kontakt.routenlink}
                />
              </section>
            );
          case "gaestebuchauszug": {
            const eintraege = gaestebuch.eintraege.filter((eintrag) => eintrag.sichtbar && (baustein.nummern.length === 0 || baustein.nummern.includes(eintrag.nummer)));
            return (
              <section key={baustein._key} className={`inhalt ${stile.block}`}>
                {baustein.titel && <h2>{baustein.titel}</h2>}
                <Gaestebuchliste eintraege={eintraege} alsAuszug />
              </section>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
