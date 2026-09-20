/**
 * Einwilligungsspeicher für externe Inhalte (zurzeit nur Google Maps).
 *
 * Gespeichert wird ausschliesslich im localStorage des Browsers, ohne Cookie
 * und ohne Übermittlung, und nur dann, wenn die Besucherin ihre Zustimmung
 * ausdrücklich merken lässt. Eine Ablehnung wird nicht gespeichert: Ohne
 * Eintrag wird nichts Externes geladen. Widerruf = Eintrag löschen.
 *
 * Läuft nur im Browser; alle Funktionen sind gegen fehlenden Speicher
 * (privater Modus, deaktivierter Speicher) abgesichert.
 */

export const SCHLUESSEL = "styling-azzurro-einwilligung";
export const VERSION = 1;
export const EREIGNIS = "styling-azzurro:einwilligung";

export type Dienst = "googleMaps";

export type Einwilligung = {
  version: number;
  dienste: Partial<Record<Dienst, true>>;
  zeitpunkt: string;
};

export const DIENSTE: { id: Dienst; name: string; anbieter: string; zweck: string }[] = [
  {
    id: "googleMaps",
    name: "Google Maps",
    anbieter: "Google Ireland Limited / Google LLC",
    zweck: "Zeigt auf der Seite «Lageplan» eine interaktive Karte. Beim Laden erhält Google Ihre IP-Adresse und Browserangaben und kann eigene Cookies setzen.",
  },
];

export function lesen(): Einwilligung | null {
  try {
    const roh = window.localStorage.getItem(SCHLUESSEL);
    if (!roh) return null;
    const wert = JSON.parse(roh) as Einwilligung;
    if (!wert || wert.version !== VERSION || typeof wert.dienste !== "object") return null;
    return wert;
  } catch {
    return null;
  }
}

export function istErteilt(dienst: Dienst): boolean {
  return lesen()?.dienste[dienst] === true;
}

function melden() {
  window.dispatchEvent(new CustomEvent(EREIGNIS));
}

/** Speichert die Zustimmung für die genannten Dienste. Leere Liste = alles löschen. */
export function speichern(dienste: Dienst[]): boolean {
  try {
    if (dienste.length === 0) {
      window.localStorage.removeItem(SCHLUESSEL);
      melden();
      return true;
    }
    const wert: Einwilligung = {
      version: VERSION,
      dienste: Object.fromEntries(dienste.map((dienst) => [dienst, true])),
      zeitpunkt: new Date().toISOString(),
    };
    window.localStorage.setItem(SCHLUESSEL, JSON.stringify(wert));
    melden();
    return true;
  } catch {
    return false;
  }
}

export function widerrufen(): boolean {
  return speichern([]);
}

/** Ruft `rueckruf` bei jeder Änderung auf, auch aus anderen Tabs. Gibt die Abmeldefunktion zurück. */
export function beobachten(rueckruf: () => void): () => void {
  const beiSpeicher = (ereignis: StorageEvent) => {
    if (ereignis.key === null || ereignis.key === SCHLUESSEL) rueckruf();
  };
  window.addEventListener(EREIGNIS, rueckruf);
  window.addEventListener("storage", beiSpeicher);
  return () => {
    window.removeEventListener(EREIGNIS, rueckruf);
    window.removeEventListener("storage", beiSpeicher);
  };
}
