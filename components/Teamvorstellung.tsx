import type { Teammitglied } from "@/lib/inhalt/typen";
import { Bild } from "./Bild";
import stile from "./Teamvorstellung.module.css";

type Props = {
  mitglieder: readonly Teammitglied[];
};

/**
 * Namen des Teams als Namensschilder. Einzelporträts erscheinen nur, wenn die
 * Zuordnung belegt ist (Feld `bild`); für Styling Azzurro ist das nicht der
 * Fall, deshalb stehen die Namen allein.
 */
export function Teamvorstellung({ mitglieder }: Props) {
  return (
    <ul className={stile.liste}>
      {mitglieder.map((mitglied) => (
        <li key={mitglied.name} className={stile.schild}>
          {mitglied.bild && <Bild bild={mitglied.bild} sizes="(min-width: 48rem) 20rem, 100vw" className={stile.bild} seitenverhaeltnis="4 / 5" />}
          <p className={stile.name}>{mitglied.name}</p>
          {mitglied.rolle && <p className={stile.rolle}>{mitglied.rolle}</p>}
        </li>
      ))}
    </ul>
  );
}
