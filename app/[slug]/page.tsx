import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bausteine } from "@/components/Bausteine";
import { Seitenkopf } from "@/components/Seitenkopf";
import { alleSeitenSlugs, ladeSeite } from "@/lib/inhalt/seiten";

type Props = { params: Promise<{ slug: string }> };

/**
 * Frei zusammengestellte Seiten aus Bausteinen (data/seiten.ts, später im
 * CMS). Im statischen Export entstehen genau die hier gelisteten Slugs.
 */
export async function generateStaticParams() {
  return (await alleSeitenSlugs()).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { seite } = await ladeSeite(slug);
  return seite ? { title: seite.seo.titel, description: seite.seo.beschreibung } : {};
}

export default async function FreieSeite({ params }: Props) {
  const { slug } = await params;
  const { seite, einstellungen, preisliste, team, gaestebuch, lageplan } = await ladeSeite(slug);
  if (!seite) notFound();
  return (
    <>
      <Seitenkopf titel={seite.titel} einleitung={seite.einleitung} />
      <Bausteine bausteine={seite.bausteine} einstellungen={einstellungen} preisliste={preisliste} team={team} gaestebuch={gaestebuch} lageplan={lageplan} />
    </>
  );
}
