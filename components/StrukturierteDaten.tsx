import type { Websiteeinstellungen } from "@/lib/inhalt/typen";
import { absolut } from "@/lib/seite-url";

type Props = {
  einstellungen: Websiteeinstellungen;
};

const tagKurz: Record<string, string> = {
  Montag: "Mo",
  Dienstag: "Tu",
  Mittwoch: "We",
  Donnerstag: "Th",
  Freitag: "Fr",
  Samstag: "Sa",
  Sonntag: "Su",
};

/**
 * schema.org HairSalon ausschliesslich mit belegten Angaben: Name, Adresse,
 * Telefon, E-Mail, Öffnungszeiten, Facebook. Keine Bewertungen, keine
 * Preisspanne, kein Gründungsjahr: nichts davon ist belegt.
 */
export function StrukturierteDaten({ einstellungen }: Props) {
  const { kontakt, oeffnungszeiten } = einstellungen;
  const daten = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: einstellungen.name,
    url: absolut("/"),
    telephone: "+41443212035",
    email: kontakt.email,
    image: absolut("/opengraph-image.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: kontakt.strasse,
      postalCode: kontakt.plz,
      addressLocality: kontakt.ort,
      addressCountry: "CH",
    },
    openingHoursSpecification: oeffnungszeiten.woche
      .filter((tag) => !tag.geschlossen)
      .flatMap((tag) =>
        tag.zeiten.map((fenster) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${
            { Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" }[tagKurz[tag.tag]]
          }`,
          opens: fenster.von.replace(".", ":"),
          closes: fenster.bis.replace(".", ":"),
        }))
      ),
    ...(kontakt.facebook ? { sameAs: [kontakt.facebook, kontakt.website] } : { sameAs: [kontakt.website] }),
  };
  // «<» wird maskiert, damit ein CMS-Text wie «</script>» das Element nie beenden kann.
  const json = JSON.stringify(daten).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
