"use client";

import { useId, useState, type FormEvent } from "react";
import stile from "./Kontaktformular.module.css";

type Props = {
  empfaenger: string;
  betreffVorgabe?: string;
  /** Beschriftung des Nachrichtenfelds, z. B. «Ihr Gästebucheintrag». */
  nachrichtBeschriftung?: string;
  hinweis: string;
};

type Fehler = Partial<Record<"name" | "email" | "nachricht", string>>;

/**
 * Formular, das keine Daten sendet: Es setzt aus den Eingaben eine E-Mail
 * zusammen und öffnet sie im E-Mail-Programm der Besucherin (mailto). Der
 * Knopf sagt genau das. Es gibt keine Versandbestätigung, weil nichts
 * versendet wurde.
 */
export function Kontaktformular({ empfaenger, betreffVorgabe = "", nachrichtBeschriftung = "Ihre Nachricht", hinweis }: Props) {
  const id = useId();
  const [fehler, setFehler] = useState<Fehler>({});
  const [vorbereitet, setVorbereitet] = useState(false);
  const [mailto, setMailto] = useState<string>("");

  const pruefen = (daten: FormData): Fehler => {
    const neu: Fehler = {};
    const name = String(daten.get("name") ?? "").trim();
    const email = String(daten.get("email") ?? "").trim();
    const nachricht = String(daten.get("nachricht") ?? "").trim();
    if (!name) neu.name = "Bitte geben Sie Ihren Namen an.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) neu.email = "Diese E-Mail-Adresse sieht unvollständig aus, z. B. name@beispiel.ch.";
    if (!nachricht) neu.nachricht = "Bitte schreiben Sie eine Nachricht.";
    return neu;
  };

  const absenden = (ereignis: FormEvent<HTMLFormElement>) => {
    ereignis.preventDefault();
    const formular = ereignis.currentTarget;
    const daten = new FormData(formular);
    const neu = pruefen(daten);
    setFehler(neu);
    if (Object.keys(neu).length > 0) {
      const erstes = Object.keys(neu)[0];
      (formular.elements.namedItem(erstes) as HTMLElement | null)?.focus();
      return;
    }
    const name = String(daten.get("name")).trim();
    const email = String(daten.get("email") ?? "").trim();
    const telefon = String(daten.get("telefon") ?? "").trim();
    const nachricht = String(daten.get("nachricht")).trim();
    const betreff = betreffVorgabe ? `${betreffVorgabe} von ${name}` : `Anfrage von ${name}`;
    const zeilen = [nachricht, "", `Name: ${name}`];
    if (email) zeilen.push(`E-Mail: ${email}`);
    if (telefon) zeilen.push(`Telefon: ${telefon}`);
    const adresse = `mailto:${empfaenger}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(zeilen.join("\n"))}`;
    setMailto(adresse);
    setVorbereitet(true);
    window.location.href = adresse;
  };

  return (
    <form className={stile.formular} onSubmit={absenden} noValidate>
      <div className="feld">
        <label htmlFor={`${id}-name`}>Name</label>
        <input id={`${id}-name`} name="name" type="text" autoComplete="name" required aria-invalid={fehler.name ? "true" : undefined} aria-describedby={fehler.name ? `${id}-name-fehler` : undefined} />
        {fehler.name && (
          <p id={`${id}-name-fehler`} className="fehler">
            {fehler.name}
          </p>
        )}
      </div>

      <div className={stile.zweispaltig}>
        <div className="feld">
          <label htmlFor={`${id}-email`}>E-Mail (freiwillig)</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" inputMode="email" aria-invalid={fehler.email ? "true" : undefined} aria-describedby={fehler.email ? `${id}-email-fehler` : `${id}-email-hilfe`} />
          {fehler.email ? (
            <p id={`${id}-email-fehler`} className="fehler">
              {fehler.email}
            </p>
          ) : (
            <p id={`${id}-email-hilfe`} className="hilfe">
              Ihre Absenderadresse steht ohnehin in der E-Mail.
            </p>
          )}
        </div>
        <div className="feld">
          <label htmlFor={`${id}-telefon`}>Telefon (freiwillig)</label>
          <input id={`${id}-telefon`} name="telefon" type="tel" autoComplete="tel" inputMode="tel" aria-describedby={`${id}-telefon-hilfe`} />
          <p id={`${id}-telefon-hilfe`} className="hilfe">
            Falls wir Sie zurückrufen sollen.
          </p>
        </div>
      </div>

      <div className="feld">
        <label htmlFor={`${id}-nachricht`}>{nachrichtBeschriftung}</label>
        <textarea id={`${id}-nachricht`} name="nachricht" rows={6} required aria-invalid={fehler.nachricht ? "true" : undefined} aria-describedby={fehler.nachricht ? `${id}-nachricht-fehler` : undefined} />
        {fehler.nachricht && (
          <p id={`${id}-nachricht-fehler`} className="fehler">
            {fehler.nachricht}
          </p>
        )}
      </div>

      <p className="klein">{hinweis}</p>

      <div className="knopfreihe">
        <button type="submit" className="knopf knopf-primaer">
          E-Mail vorbereiten
        </button>
      </div>

      <p className={stile.status} role="status" aria-live="polite">
        {vorbereitet && (
          <>
            Ihr E-Mail-Programm sollte sich jetzt geöffnet haben. Falls nicht:{" "}
            <a href={mailto}>E-Mail von Hand öffnen</a> oder direkt an{" "}
            <a href={`mailto:${empfaenger}`}>{empfaenger}</a> schreiben. Gesendet ist die Nachricht erst, wenn Sie sie dort abschicken.
          </>
        )}
      </p>
    </form>
  );
}
