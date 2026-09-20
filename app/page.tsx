import Link from "next/link";
import type { Metadata } from "next";
import { Bild } from "@/components/Bild";
import { Einblenden } from "@/components/Einblenden";
import { Gaestebuchliste } from "@/components/Gaestebuchliste";
import { Kontaktblock } from "@/components/Kontaktblock";
import { Oeffnungszeiten } from "@/components/Oeffnungszeiten";
import { StrukturierteDaten } from "@/components/StrukturierteDaten";
import { Text } from "@/components/Text";
import { ladeStartseite } from "@/lib/inhalt/seiten";
import { preisText } from "@/lib/preise";
import stile from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seite } = await ladeStartseite();
  return { title: { absolute: seite.seo.titel }, description: seite.seo.beschreibung };
}

export default async function Startseite() {
  const { einstellungen, seite, preisAuszug, preishinweise, gaestebuchAuszug } = await ladeStartseite();
  const { kontakt } = einstellungen;

  return (
    <>
      <StrukturierteDaten einstellungen={einstellungen} />

      {/* Hero: Titel links, Schaufenster rechts. Ein Bild, zwei Handlungen. */}
      <section className={`inhalt ${stile.hero}`} aria-labelledby="hero-titel">
        <div className={stile.heroText}>
          <h1 id="hero-titel" className="leuchtlinie">
            {seite.heroTitel}
          </h1>
          <p className="lead">{seite.heroText}</p>
          <div className="knopfreihe">
            <a className="knopf knopf-primaer" href={kontakt.telefonLink}>
              Anrufen: {kontakt.telefon}
            </a>
            <Link className="knopf knopf-sekundaer" href="/preisliste/">
              Preise ansehen
            </Link>
          </div>
        </div>
        <div className={stile.heroBild}>
          <Bild bild={seite.heroBild} sizes="(min-width: 64rem) 46vw, 100vw" prioritaet className={stile.heroBildRahmen} />
        </div>
      </section>

      {/* Willkommen: Text und Türschild */}
      <section className="abschnitt abschnitt-wash" aria-labelledby="willkommen-titel">
        <div className={`inhalt ${stile.willkommen}`}>
          <Einblenden className={stile.willkommenText}>
            <h2 id="willkommen-titel">{seite.willkommenTitel}</h2>
            <Text inhalt={seite.willkommenText} />
            <p className={stile.gruss}>
              {seite.grussformel}
              <br />
              <span className="betont">{seite.unterzeichnende}</span>
            </p>
          </Einblenden>
          <Einblenden verzoegerung={80} className={stile.schild}>
            <Oeffnungszeiten zeiten={einstellungen.oeffnungszeiten} titel="Öffnungszeiten" />
          </Einblenden>
        </div>
      </section>

      {/* Team: Foto mit blauer Platte, Text daneben */}
      <section className="abschnitt" aria-labelledby="team-titel">
        <div className={`inhalt ${stile.team}`}>
          <Einblenden className={stile.teamBild}>
            <Bild bild={seite.teamBild} sizes="(min-width: 64rem) 40vw, 100vw" seitenverhaeltnis="4 / 5" className={stile.teamBildRahmen} />
          </Einblenden>
          <Einblenden verzoegerung={80} className={stile.teamText}>
            <h2 id="team-titel">{seite.teamTitel}</h2>
            <p className="lead">{seite.teamText}</p>
            <Link href="/team/" className="pfeillink">
              Team kennenlernen
            </Link>
          </Einblenden>
        </div>
      </section>

      {/* Preise: Auszug als Preistafel */}
      <section className="abschnitt abschnitt-wash" aria-labelledby="preise-titel">
        <div className="inhalt">
          <Einblenden className={stile.abschnittKopf}>
            <h2 id="preise-titel">{seite.preiseTitel}</h2>
            <p className="lead textbreite">{seite.preiseText}</p>
          </Einblenden>
          <ul className={stile.preisraster}>
            {preisAuszug.map((gruppe, index) => (
              <Einblenden key={`${gruppe.kategorie}-${gruppe.leistung}`} als="li" verzoegerung={index * 60} className={stile.preisgruppe}>
                <p className={stile.preisKategorie}>{gruppe.kategorie}</p>
                <h3 className={stile.preisLeistung}>{gruppe.leistung}</h3>
                <ul className={stile.preiszeilen}>
                  {gruppe.positionen.map((position, i) => (
                    <li key={i} className={stile.preiszeile}>
                      <span>{position.variante ?? gruppe.leistung}</span>
                      <span className={stile.punkte} aria-hidden="true" />
                      <span className={stile.preis}>{preisText(position)}</span>
                    </li>
                  ))}
                </ul>
              </Einblenden>
            ))}
          </ul>
          <p className={`klein ${stile.preishinweis}`}>{preishinweise.join(" ")}</p>
          <div className="knopfreihe">
            <Link href="/preisliste/" className="knopf knopf-primaer">
              Preise ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Salon: Mosaik aus drei Bildern */}
      <section className="abschnitt" aria-labelledby="salon-titel">
        <div className="inhalt">
          <Einblenden className={stile.abschnittKopf}>
            <h2 id="salon-titel">{seite.salonTitel}</h2>
            <p className="lead textbreite">{seite.salonText}</p>
          </Einblenden>
          <div className={stile.mosaik}>
            {seite.salonBilder.map((bild, index) => (
              <Einblenden key={bild.src} verzoegerung={index * 70} className={index === 0 ? stile.mosaikGross : stile.mosaikKlein}>
                <Bild
                  bild={bild}
                  sizes={index === 0 ? "(min-width: 64rem) 60vw, 100vw" : "(min-width: 64rem) 30vw, 50vw"}
                  seitenverhaeltnis={index === 0 ? "4 / 3" : "1 / 1"}
                  className={stile.mosaikBild}
                />
              </Einblenden>
            ))}
          </div>
          <Link href="/salon/" className="pfeillink">
            Alle Bilder vom Salon
          </Link>
        </div>
      </section>

      {/* Gästebuch */}
      {gaestebuchAuszug.length > 0 && (
        <section className="abschnitt abschnitt-wash" aria-labelledby="gaestebuch-titel">
          <div className="inhalt">
            <Einblenden className={stile.abschnittKopf}>
              <h2 id="gaestebuch-titel">{seite.gaestebuchTitel}</h2>
            </Einblenden>
            <Einblenden verzoegerung={60}>
              <Gaestebuchliste eintraege={gaestebuchAuszug} alsAuszug />
            </Einblenden>
            <Link href="/gaestebuch/" className={`pfeillink ${stile.nachLink}`}>
              Alle Einträge lesen
            </Link>
          </div>
        </section>
      )}

      {/* Kontakt */}
      <section className="abschnitt" aria-labelledby="kontakt-titel">
        <div className={`inhalt ${stile.kontakt}`}>
          <Einblenden>
            <h2 id="kontakt-titel">Termin? Rufen Sie an</h2>
            <p className="lead">{einstellungen.oeffnungszeiten.terminHinweis} Wir freuen uns auf Sie.</p>
            <div className="knopfreihe">
              <a className="knopf knopf-primaer" href={kontakt.telefonLink}>
                Anrufen: {kontakt.telefon}
              </a>
              <Link className="knopf knopf-sekundaer" href="/kontakt/">
                Kontakt aufnehmen
              </Link>
            </div>
          </Einblenden>
          <Einblenden verzoegerung={80}>
            <Kontaktblock kontakt={kontakt} />
          </Einblenden>
        </div>
      </section>
    </>
  );
}
