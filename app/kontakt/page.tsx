import type { Metadata } from "next";
import { Einblenden } from "@/components/Einblenden";
import { Kontaktblock } from "@/components/Kontaktblock";
import { Kontaktformular } from "@/components/Kontaktformular";
import { Oeffnungszeiten } from "@/components/Oeffnungszeiten";
import { Seitenkopf } from "@/components/Seitenkopf";
import { Text } from "@/components/Text";
import { ladeKontakt } from "@/lib/inhalt/seiten";
import stile from "../seite.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seite } = await ladeKontakt();
  return { title: seite.seo.titel, description: seite.seo.beschreibung };
}

export default async function Kontaktseite() {
  const { seite, einstellungen } = await ladeKontakt();
  const { kontakt } = einstellungen;
  return (
    <>
      <Seitenkopf titel={seite.titel} einleitung={seite.einleitung} />
      <div className={`inhalt ${stile.zweispaltig}`}>
        <Einblenden className={stile.stapel}>
          <h2>{seite.terminTitel}</h2>
          <a href={kontakt.telefonLink} className={stile.nummer}>
            {kontakt.telefon}
          </a>
          <Text inhalt={seite.terminText} />
          <Kontaktblock kontakt={kontakt} />
        </Einblenden>
        <Einblenden verzoegerung={80} className={stile.stapel}>
          <div className={stile.schmal}>
            <Oeffnungszeiten zeiten={einstellungen.oeffnungszeiten} titel="Öffnungszeiten" />
          </div>
        </Einblenden>
      </div>
      <div className={`inhalt ${stile.abschnittAbstand}`}>
        <div className={stile.stapel}>
          <h2>{seite.formularTitel}</h2>
          <p className="textbreite">{seite.formularText}</p>
          <Kontaktformular empfaenger={kontakt.email} hinweis="Pflichtfelder: Name und Nachricht. Alles andere ist freiwillig." />
        </div>
      </div>
    </>
  );
}
