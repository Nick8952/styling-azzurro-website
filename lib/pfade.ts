/**
 * Auf GitHub Pages läuft die Demo unter einem Repository-Unterpfad
 * (z. B. /styling-azzurro-website). <Link> und der Router setzen den
 * basePath selbst; alles, was als reine Zeichenkette adressiert wird
 * (Dateien aus public/, Open-Graph-Bilder, Manifest-Symbole), braucht
 * diesen Helfer.
 */
const basisPfad = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function oeffentlicherPfad(pfad: string): string {
  const sauber = pfad.startsWith("/") ? pfad : `/${pfad}`;
  return `${basisPfad}${sauber}`;
}

export { basisPfad };
