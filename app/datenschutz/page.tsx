import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Seitenkopf } from "@/components/Seitenkopf";
import { Text } from "@/components/Text";
import { ladeRechtstext } from "@/lib/inhalt/seiten";
import stile from "../seite.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seite } = await ladeRechtstext("datenschutz");
  return seite ? { title: seite.seo.titel, description: seite.seo.beschreibung } : {};
}

export default async function Datenschutzseite() {
  const { seite } = await ladeRechtstext("datenschutz");
  if (!seite) notFound();
  return (
    <>
      <Seitenkopf titel={seite.titel} />
      <div className="inhalt">
        <Text inhalt={seite.inhalt} className={stile.rechtstext} />
        <p className={`klein ${stile.stand}`}>Stand: {seite.stand}</p>
      </div>
    </>
  );
}
