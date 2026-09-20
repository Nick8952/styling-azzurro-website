import type { Metadata } from "next";
import { Einblenden } from "@/components/Einblenden";
import { Galerie } from "@/components/Galerie";
import { Seitenkopf } from "@/components/Seitenkopf";
import { Teamvorstellung } from "@/components/Teamvorstellung";
import { ladeTeam } from "@/lib/inhalt/seiten";
import stile from "../seite.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seite } = await ladeTeam();
  return { title: seite.seo.titel, description: seite.seo.beschreibung };
}

export default async function Teamseite() {
  const { seite } = await ladeTeam();
  return (
    <>
      <Seitenkopf titel={seite.titel} einleitung={seite.einleitung} />
      <div className={`inhalt ${stile.stapel}`}>
        <Einblenden>
          <Teamvorstellung mitglieder={seite.mitglieder} />
        </Einblenden>
        {seite.bildhinweis && <p className="klein">{seite.bildhinweis}</p>}
        <Einblenden verzoegerung={60}>
          <Galerie bilder={seite.bilder} />
        </Einblenden>
      </div>
    </>
  );
}
