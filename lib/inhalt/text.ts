import type { Markierung, RichText, TextBlock, TextSpan } from "./typen";

/**
 * Kleiner Wandler von einer knappen Schreibweise in Portable-Text-Blöcke.
 *
 * Damit bleiben die Inhaltsdateien lesbar, das Ergebnis ist aber exakt die
 * Struktur, die Sanity später liefert. Unterstützt wird bewusst wenig:
 *
 *   "## Zwischentitel"        -> h2
 *   "### Kleinerer Titel"     -> h3
 *   "- Punkt"                 -> Aufzählung
 *   "1. Punkt"                -> nummerierte Liste
 *   "> Zitat"                 -> Zitat
 *   "**fett**"                -> starke Betonung
 *   "[Text](https://...)"     -> Link (extern, wenn absolut)
 *
 * Schlüssel werden aus dem Inhalt des jeweiligen Blocks abgeleitet: gleiche
 * Zeile erzeugt immer denselben _key. Wird eine Zeile geändert, ändern sich
 * nur deren Schlüssel, nicht die aller anderen Blöcke.
 */

function schluessel(basis: string, index: number): string {
  let hash = 2166136261;
  const roh = `${basis}#${index}`;
  for (let i = 0; i < roh.length; i += 1) {
    hash ^= roh.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).padStart(7, "0").slice(0, 7);
}

function spans(zeile: string, basis: string): { children: TextSpan[]; markDefs: Markierung[] } {
  const children: TextSpan[] = [];
  const markDefs: Markierung[] = [];
  // Adressen dürfen Klammern enthalten (z. B. Wikipedia): Der Link endet an
  // der letzten schliessenden Klammer vor einem Leerzeichen oder Zeilenende.
  const muster = /\[([^\]]+)\]\((\S+?)\)(?=\s|$|[.,;:!?])|\*\*([^*]+)\*\*/g;
  let position = 0;
  let treffer: RegExpExecArray | null;
  let zaehler = 0;

  const anfuegen = (text: string, marks: string[]) => {
    if (!text) return;
    children.push({ _type: "span", _key: schluessel(basis, children.length + 100), text, marks });
  };

  while ((treffer = muster.exec(zeile)) !== null) {
    anfuegen(zeile.slice(position, treffer.index), []);
    if (treffer[1] !== undefined) {
      const markKey = schluessel(`${basis}link`, zaehler);
      const href = treffer[2];
      markDefs.push({ _type: "link", _key: markKey, href, extern: /^https?:\/\//.test(href) });
      anfuegen(treffer[1], [markKey]);
    } else {
      anfuegen(treffer[3], ["strong"]);
    }
    position = treffer.index + treffer[0].length;
    zaehler += 1;
  }
  anfuegen(zeile.slice(position), []);
  if (children.length === 0) anfuegen(zeile, []);
  return { children, markDefs };
}

/** Wandelt Textzeilen in Portable-Text-Blöcke. */
export function text(...zeilen: string[]): RichText {
  return zeilen
    .map((zeile) => zeile.trim())
    .filter(Boolean)
    .map((zeile, index): TextBlock => {
      // Schlüsselbasis ist die Zeile selbst; der Index trennt gleiche Zeilen.
      const basis = `${index}:${zeile}`;
      let style: TextBlock["style"] = "normal";
      let listItem: TextBlock["listItem"] | undefined;
      let inhalt = zeile;

      if (zeile.startsWith("### ")) {
        style = "h3";
        inhalt = zeile.slice(4);
      } else if (zeile.startsWith("## ")) {
        style = "h2";
        inhalt = zeile.slice(3);
      } else if (zeile.startsWith("> ")) {
        style = "blockquote";
        inhalt = zeile.slice(2);
      } else if (zeile.startsWith("- ")) {
        listItem = "bullet";
        inhalt = zeile.slice(2);
      } else if (/^\d+\.\s/.test(zeile)) {
        listItem = "number";
        inhalt = zeile.replace(/^\d+\.\s/, "");
      }

      const { children, markDefs } = spans(inhalt, basis);
      return {
        _type: "block",
        _key: schluessel(basis, 0),
        style,
        ...(listItem ? { listItem, level: 1 } : {}),
        children,
        markDefs,
      };
    });
}

/** Reiner Text eines Rich-Text-Feldes, z. B. für Meta-Beschreibungen. */
export function alsText(inhalt: RichText): string {
  return inhalt
    .map((block) => block.children.map((span) => span.text).join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
