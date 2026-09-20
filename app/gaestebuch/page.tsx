import type { Metadata } from "next";
import { Einblenden } from "@/components/Einblenden";
import { Gaestebuchliste } from "@/components/Gaestebuchliste";
import { Kontaktformular } from "@/components/Kontaktformular";
import { Seitenkopf } from "@/components/Seitenkopf";
import { ladeGaestebuch } from "@/lib/inhalt/seiten";
import stile from "../seite.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seite } = await ladeGaestebuch();
  return { title: seite.seo.titel, description: seite.seo.beschreibung };
}

export default async function Gaestebuchseite() {
  const { seite, einstellungen } = await ladeGaestebuch();
  return (
    <>
      <Seitenkopf titel={seite.titel} einleitung={seite.einleitung} />
      <div className={`inhalt ${stile.zweispaltig}`}>
        <Einblenden>
          <p className="klein" style={{ marginBottom: "var(--a-4)" }}>
            {seite.eintraege.length} Einträge, neuste zuerst.
          </p>
          <Gaestebuchliste eintraege={seite.eintraege} />
        </Einblenden>
        <Einblenden verzoegerung={80} className={stile.stapel}>
          <h2>{seite.neuerEintragTitel}</h2>
          <p>{seite.neuerEintragText}</p>
          <Kontaktformular
            empfaenger={einstellungen.kontakt.email}
            betreffVorgabe="Gästebucheintrag"
            nachrichtBeschriftung="Ihr Gästebucheintrag"
            hinweis="Der Knopf öffnet Ihr E-Mail-Programm mit dem vorbereiteten Eintrag. Gesendet wird erst, wenn Sie die E-Mail dort abschicken. Der Salon entscheidet, ob und wie der Eintrag veröffentlicht wird."
          />
        </Einblenden>
      </div>
    </>
  );
}
