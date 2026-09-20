import type { Metadata } from "next";
import Link from "next/link";
import { Einblenden } from "@/components/Einblenden";
import { Galerie } from "@/components/Galerie";
import { Seitenkopf } from "@/components/Seitenkopf";
import { ladeSalon } from "@/lib/inhalt/seiten";
import stile from "../seite.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seite } = await ladeSalon();
  return { title: seite.seo.titel, description: seite.seo.beschreibung };
}

export default async function Salonseite() {
  const { seite, einstellungen } = await ladeSalon();
  return (
    <>
      <Seitenkopf titel={seite.titel} einleitung={seite.einleitung} />
      <div className={`inhalt ${stile.stapel}`}>
        <Einblenden>
          <Galerie bilder={seite.galerie} />
        </Einblenden>
        <div className={`${stile.hinweisFlaeche} ${stile.kleinerAbstand}`}>
          <h2>So finden Sie uns</h2>
          <p>
            {einstellungen.kontakt.strasse}, {einstellungen.kontakt.plz} {einstellungen.kontakt.ort}. {einstellungen.kontakt.oev}.{" "}
            <Link href="/lageplan/">Zum Lageplan</Link>
          </p>
        </div>
      </div>
    </>
  );
}
