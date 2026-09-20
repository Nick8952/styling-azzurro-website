type Props = {
  titel: string;
  einleitung?: string;
};

/** Einheitlicher Kopf jeder Unterseite: Titel mit Leuchtlinie, darunter die Einleitung. */
export function Seitenkopf({ titel, einleitung }: Props) {
  return (
    <div className="inhalt seitenkopf">
      <h1 className="leuchtlinie">{titel}</h1>
      {einleitung && <p className="lead">{einleitung}</p>}
    </div>
  );
}
