import Link from "next/link";
import type { ReactNode } from "react";
import type { Markierung, RichText, TextBlock, TextSpan } from "@/lib/inhalt/typen";

type Props = {
  inhalt: RichText;
  className?: string;
};

/**
 * Erlaubte Linkziele: interne Pfade, https/http (extern, neues Fenster), mailto und
 * tel. Alles andere wird nicht verlinkt. «Extern» wird aus der Adresse abgeleitet,
 * nicht aus einem gesetzten Flag, damit ein vergessenes Häkchen im CMS nichts ändert.
 */
function linkArt(href: string): "intern" | "extern" | "protokoll" | "keiner" {
  if (/^\/(?!\/)/.test(href) || href.startsWith("#")) return "intern";
  if (/^https?:\/\//i.test(href)) return "extern";
  if (/^(mailto|tel):/i.test(href)) return "protokoll";
  return "keiner";
}

function span(eintrag: TextSpan, markDefs: Markierung[]): ReactNode {
  let knoten: ReactNode = eintrag.text;
  // Harte Zeilenumbrüche innerhalb eines Blocks bleiben erhalten.
  if (eintrag.text.includes("\n")) {
    const teile = eintrag.text.split("\n");
    knoten = teile.map((teil, index) => (
      <span key={index}>
        {teil}
        {index < teile.length - 1 && <br />}
      </span>
    ));
  }
  for (const mark of eintrag.marks ?? []) {
    if (mark === "strong") {
      knoten = <strong key={`${eintrag._key}-strong`}>{knoten}</strong>;
    } else if (mark === "em") {
      knoten = <em key={`${eintrag._key}-em`}>{knoten}</em>;
    } else {
      const definition = markDefs.find((eintrag) => eintrag._key === mark);
      if (definition?._type === "link") {
        const art = linkArt(definition.href);
        if (art === "intern") {
          knoten = (
            <Link key={mark} href={definition.href}>
              {knoten}
            </Link>
          );
        } else if (art === "extern") {
          knoten = (
            <a key={mark} href={definition.href} rel="noopener noreferrer" target="_blank">
              {knoten}
            </a>
          );
        } else if (art === "protokoll") {
          knoten = (
            <a key={mark} href={definition.href}>
              {knoten}
            </a>
          );
        }
        // unbekanntes Protokoll (javascript:, data:, //…): bleibt reiner Text
      } else if (definition?._type === "telefon") {
        knoten = (
          <a key={mark} href={`tel:${definition.nummer.replace(/[^\d+]/g, "")}`}>
            {knoten}
          </a>
        );
      }
    }
  }
  return knoten;
}

function block(eintrag: TextBlock): ReactNode {
  const kinder = eintrag.children.map((kind) => <span key={kind._key}>{span(kind, eintrag.markDefs ?? [])}</span>);
  switch (eintrag.style) {
    case "h2":
      return <h2 key={eintrag._key}>{kinder}</h2>;
    case "h3":
      return <h3 key={eintrag._key}>{kinder}</h3>;
    case "h4":
      return <h4 key={eintrag._key}>{kinder}</h4>;
    case "blockquote":
      return <blockquote key={eintrag._key}>{kinder}</blockquote>;
    default:
      return <p key={eintrag._key}>{kinder}</p>;
  }
}

/**
 * Stellt Portable-Text-Blöcke als HTML dar. Aufeinanderfolgende Listenpunkte
 * werden zu einer Liste zusammengefasst. Interne Links laufen über <Link>,
 * damit der Repository-Unterpfad stimmt.
 */
export function Text({ inhalt, className }: Props) {
  const ausgabe: ReactNode[] = [];
  let liste: { art: "bullet" | "number"; punkte: ReactNode[]; key: string } | null = null;

  const listeAbschliessen = () => {
    if (!liste) return;
    const punkte = liste.punkte;
    ausgabe.push(liste.art === "number" ? <ol key={liste.key}>{punkte}</ol> : <ul key={liste.key}>{punkte}</ul>);
    liste = null;
  };

  for (const eintrag of inhalt) {
    if (eintrag.listItem) {
      if (!liste || liste.art !== eintrag.listItem) {
        listeAbschliessen();
        liste = { art: eintrag.listItem, punkte: [], key: `liste-${eintrag._key}` };
      }
      liste.punkte.push(
        <li key={eintrag._key}>{eintrag.children.map((kind) => <span key={kind._key}>{span(kind, eintrag.markDefs ?? [])}</span>)}</li>
      );
    } else {
      listeAbschliessen();
      ausgabe.push(block(eintrag));
    }
  }
  listeAbschliessen();

  return <div className={["fliesstext", className].filter(Boolean).join(" ")}>{ausgabe}</div>;
}
