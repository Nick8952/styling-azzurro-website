/** Technische Daten der zur Bauzeit erzeugten Bildvarianten. */
export type Bildvariante = { breite: number; pfad: string };

export type Bildeintrag = {
  /** Breite der groessten ausgelieferten Variante. */
  breite: number;
  /** Hoehe der groessten ausgelieferten Variante. */
  hoehe: number;
  /** Pfad der Standardvariante (WebP) fuer Browser ohne <picture>-Unterstuetzung. */
  standard: string;
  varianten: { avif: Bildvariante[]; webp: Bildvariante[] };
  /** Winzige WebP-Vorschau als Data-URL, verhindert Layoutspruenge. */
  unschaerfe: string;
};

export type Bildmanifest = Record<string, Bildeintrag>;
