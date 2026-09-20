import type { Metadata } from "next";
import Link from "next/link";
import { Einblenden } from "@/components/Einblenden";
import { Preistafel } from "@/components/Preistafel";
import { Seitenkopf } from "@/components/Seitenkopf";
import { ladePreisliste } from "@/lib/inhalt/seiten";
import stile from "../seite.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seite } = await ladePreisliste();
  return { title: seite.seo.titel, description: seite.seo.beschreibung };
}

export default async function Preisseite() {
  const { seite, einstellungen } = await ladePreisliste();
  const { kontakt } = einstellungen;
  return (
    <>
      <Seitenkopf titel={seite.titel} einleitung={seite.einleitung} />
      <div className={`inhalt ${stile.stapel}`}>
        <Einblenden>
          <Preistafel kategorien={seite.kategorien} hinweise={seite.hinweise} waehrung={seite.waehrung} />
        </Einblenden>
        <div className={`${stile.hinweisFlaeche} ${stile.kleinerAbstand}`}>
          <h2>Termin vereinbaren</h2>
          <p>
            {einstellungen.oeffnungszeiten.terminHinweis} <a href={kontakt.telefonLink}>{kontakt.telefon}</a>, Montag bis Freitag. Fragen zu
            einzelnen Leistungen beantworten wir gerne am Telefon oder über die <Link href="/kontakt/">Kontaktseite</Link>.
          </p>
        </div>
        <p className="klein">Quelle: {seite.quelle}.</p>
      </div>
    </>
  );
}
