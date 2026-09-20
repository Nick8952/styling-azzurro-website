import type { Metadata } from "next";
import { Einblenden } from "@/components/Einblenden";
import { Karte } from "@/components/Karte";
import { Kontaktblock } from "@/components/Kontaktblock";
import { Oeffnungszeiten } from "@/components/Oeffnungszeiten";
import { Seitenkopf } from "@/components/Seitenkopf";
import { Text } from "@/components/Text";
import { ladeLageplan } from "@/lib/inhalt/seiten";
import stile from "../seite.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seite } = await ladeLageplan();
  return { title: seite.seo.titel, description: seite.seo.beschreibung };
}

export default async function Lageplanseite() {
  const { seite, einstellungen } = await ladeLageplan();
  const { kontakt } = einstellungen;
  return (
    <>
      <Seitenkopf titel={seite.titel} einleitung={seite.einleitung} />
      <div className={`inhalt ${stile.zweispaltig}`}>
        <Einblenden>
          <Karte
            einbettungsUrl={seite.karte.einbettungsUrl}
            titel={seite.karte.titel}
            adresse={`${kontakt.strasse}, ${kontakt.plz} ${kontakt.ort}`}
            routenlink={kontakt.routenlink}
          />
        </Einblenden>
        <Einblenden verzoegerung={80} className={stile.stapel}>
          <h2>{seite.anreiseTitel}</h2>
          <Text inhalt={seite.anreise} />
          <Kontaktblock kontakt={kontakt} mitAnreise={false} />
        </Einblenden>
      </div>
      <div className={`inhalt ${stile.abschnittAbstand}`}>
        <div className={stile.schmal}>
          <Oeffnungszeiten zeiten={einstellungen.oeffnungszeiten} titel="Öffnungszeiten" />
        </div>
      </div>
    </>
  );
}
