import { text } from "@/lib/inhalt/text";
import type { Rechtstext } from "@/lib/inhalt/typen";

/**
 * Rechtstexte dieser Vorschau.
 *
 * Sie beschreiben die TATSÄCHLICH veröffentlichte Demo auf GitHub Pages, nicht
 * die bestehende Jimdo-Website des Salons und nicht einen späteren Betrieb auf
 * Vercel mit Sanity. Die bisherige Website nennt unter «Impressum» keine
 * Betreiberangaben (nur einen Jimdo-Hinweis); ihre Datenschutzerklärung
 * beschreibt Jimdo-Dienste (reCAPTCHA, Creator-Statistiken, POWr, Google Maps),
 * die diese Demo nicht verwendet. Originalfassung: docs/inhaltsinventur.md.
 *
 * Diese Texte sind nach bestem Wissen erstellt, aber nicht anwaltlich geprüft.
 */

const impressum: Rechtstext = {
  art: "impressum",
  titel: "Impressum",
  stand: "20. September 2026",
  seo: {
    titel: "Impressum",
    beschreibung: "Verantwortlich für diese Gestaltungsvorschau und Angaben zum dargestellten Salon Coiffeur Styling Azzurro, Zürich.",
  },
  inhalt: text(
    "## Verantwortlich für diese Website",
    "Diese Website ist eine unverbindliche Gestaltungsvorschau für Coiffeur Styling Azzurro. Sie wurde nicht vom Salon beauftragt, wird nicht von ihm betrieben und ist nicht seine offizielle Website. Die offizielle Website ist [www.styling-azzurro.ch](https://www.styling-azzurro.ch/).",
    "Verantwortlich für Inhalt und Veröffentlichung dieser Vorschau:",
    "Nick Holzbecher",
    "E-Mail: [holzbechernick@gmail.com](mailto:holzbechernick@gmail.com)",
    "Anfragen zu dieser Vorschau, auch zur Entfernung von Inhalten, gehen an diese Adresse und werden zeitnah bearbeitet.",

    "## Dargestellter Salon",
    "Die gezeigten Angaben beziehen sich auf:",
    "Coiffeur Styling Azzurro",
    "Antonella Rullo",
    "Winterthurerstrasse 659, 8051 Zürich",
    "Telefon: [044 321 20 35](tel:+41443212035)",
    "E-Mail: [styling.azzurro@gmx.ch](mailto:styling.azzurro@gmx.ch)",
    "Diese Angaben stammen von der Kontaktseite der bisherigen Website (abgerufen am 20. September 2026). Rechtsform und eine allfällige Unternehmens-Identifikationsnummer sind dort nicht genannt und konnten nicht geprüft werden; sie werden deshalb nicht angegeben.",

    "## Herkunft der Inhalte",
    "Texte, Fakten, Preise, Gästebucheinträge, Logo und Fotos stammen von der bestehenden Website [www.styling-azzurro.ch](https://www.styling-azzurro.ch/), abgerufen am 20. September 2026. Texte wurden sprachlich überarbeitet, ohne ihre Aussage zu verändern. Gästebucheinträge sind wörtlich übernommen. Preise, Öffnungszeiten, Leistungen und Namen wurden nicht erfunden und nicht ergänzt.",

    "## Urheberrecht",
    "Gestaltung, Aufbau und Programmierung dieser Vorschau stammen von der oben genannten verantwortlichen Person.",
    "Logo, Fotos, Name und Kennzeichen von Styling Azzurro bleiben beim Salon. Sie werden hier ausschliesslich für diese Vorschau verwendet, die für genau diesen Betrieb erstellt wurde. Auf Wunsch des Salons werden sie umgehend entfernt.",

    "## Haftung",
    "Die Angaben wurden sorgfältig recherchiert, können sich aber jederzeit ändern. Für Aktualität, Richtigkeit und Vollständigkeit wird keine Gewähr übernommen. Verbindlich sind ausschliesslich die Auskünfte des Salons selbst.",
    "Für Inhalte externer Websites, auf die verlinkt wird, sind deren Betreiber verantwortlich."
  ),
};

const datenschutz: Rechtstext = {
  art: "datenschutz",
  titel: "Datenschutzerklärung",
  stand: "20. September 2026",
  seo: {
    titel: "Datenschutzerklärung",
    beschreibung:
      "Welche Daten diese Gestaltungsvorschau bearbeitet: Hosting auf GitHub Pages, Google Maps nur nach Einwilligung, Kontakt per E-Mail. Keine Cookies, kein Tracking.",
  },
  inhalt: text(
    "Diese Erklärung beschreibt die Datenbearbeitung dieser Gestaltungsvorschau. Sie gilt nicht für die offizielle Website [www.styling-azzurro.ch](https://www.styling-azzurro.ch/) und nicht für Coiffeur Styling Azzurro als Betrieb.",
    "Sie ist nach bestem Wissen erstellt, aber nicht anwaltlich geprüft.",

    "## Verantwortliche Person",
    "Nick Holzbecher, [holzbechernick@gmail.com](mailto:holzbechernick@gmail.com). Anfragen zu Ihren Daten richten Sie bitte an diese Adresse.",

    "## Hosting: GitHub Pages",
    "Diese Website ist eine rein statische Website und wird von GitHub Pages ausgeliefert, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf einer Seite übermittelt Ihr Browser technisch notwendige Daten an GitHub, darunter Ihre IP-Adresse, Datum und Uhrzeit, die aufgerufene Adresse, den Referrer und Angaben zu Browser und Betriebssystem.",
    "Diese Bearbeitung liegt bei GitHub und ist für den Abruf der Website unvermeidbar. Auf Umfang, Dauer und Zweck dieser Protokollierung habe ich keinen Einfluss und erhalte davon keine Auswertung. Angaben dazu macht GitHub in seiner [Datenschutzerklärung](https://docs.github.com/de/site-policy/privacy-policies/github-privacy-statement). Weil GitHub die Daten in den USA bearbeiten kann, findet eine Bekanntgabe ins Ausland statt.",

    "## Keine Cookies, kein Tracking",
    "Diese Website setzt keine Cookies, bindet keine Analyse- oder Werbedienste ein und lädt beim Seitenaufruf keine Inhalte von fremden Servern nach. Schriften, Bilder und Programmcode liegen vollständig auf dem Server dieser Website.",
    "Deshalb erscheint beim Seitenaufruf kein Einwilligungsbanner: Ohne Ihr Zutun wird nichts geladen, worin Sie einwilligen müssten. Der einzige Dienst, der eine Einwilligung braucht, ist die Karte auf der Seite «Lageplan» (siehe unten).",

    "## Google Maps nur nach Einwilligung",
    "Auf der Seite «Lageplan» kann eine Karte von Google Maps angezeigt werden. Sie wird nicht automatisch geladen. Stattdessen sehen Sie einen Platzhalter mit der Schaltfläche «Google Maps laden». Erst wenn Sie diese betätigen, lädt Ihr Browser die Karte von Google und übermittelt dabei Ihre IP-Adresse und Angaben zu Ihrem Browser an Google. Google kann dabei in der eingebetteten Karte eigene Cookies setzen und Daten in den USA bearbeiten.",
    "Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, beziehungsweise Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. [Datenschutzerklärung von Google](https://policies.google.com/privacy).",
    "Sie können die Karte einmalig laden oder Ihre Zustimmung merken lassen. Im zweiten Fall speichert diese Website Ihre Entscheidung im lokalen Speicher Ihres Browsers (localStorage, Schlüssel «styling-azzurro-einwilligung», ohne Cookie, ohne Übermittlung an einen Server). Diese Speicherung geschieht nur, wenn Sie sie ausdrücklich wählen.",
    "Ihre Zustimmung können Sie jederzeit unter [Datenschutz-Einstellungen](/datenschutz-einstellungen/) widerrufen. Der Widerruf entfernt die Karte sofort von der Seite und löscht die gespeicherte Entscheidung. Daten, die Google bei einem früheren Laden der Karte bereits erhalten hat, kann diese Website nicht zurückholen.",
    "Ohne Karte bleibt der Weg zum Salon trotzdem auffindbar: Adresse, Tramhaltestelle und ein Routenlink stehen als Text auf derselben Seite.",

    "## Kontaktformular und Gästebuch",
    "Das Kontaktformular sendet nichts an einen Server. Es setzt aus Ihren Eingaben eine E-Mail zusammen und öffnet damit Ihr eigenes E-Mail-Programm. Erst wenn Sie dort selbst auf «Senden» drücken, geht die Nachricht an den Salon. Ihre Eingaben verlassen den Browser bis dahin nicht und werden nirgends gespeichert.",
    "Neue Gästebucheinträge lassen sich in dieser Vorschau ebenfalls nur per E-Mail einreichen; es gibt keine Kommentarfunktion und keinen Dienst, der Eingaben speichert.",
    "Was nach dem Versand mit Ihrer E-Mail geschieht, liegt bei Ihrem E-Mail-Anbieter und beim Empfänger.",

    "## Gästebucheinträge auf dieser Website",
    "Die angezeigten Gästebucheinträge wurden von den jeweiligen Personen öffentlich auf der bisherigen Website des Salons veröffentlicht und sind hier wörtlich wiedergegeben. E-Mail-Adressen und fremde Web-Adressen aus den Einträgen werden nicht übernommen. Wer einen eigenen Eintrag entfernt haben möchte, schreibt an die oben genannte verantwortliche Person.",

    "## Links zu externen Diensten",
    "Diese Website verlinkt auf externe Angebote. Ein solcher Link überträgt erst dann Daten, wenn Sie ihn anklicken:",
    "- Facebook-Seite des Salons (Meta Platforms Ireland Ltd.)",
    "- Google Maps für die Routenplanung (öffnet in einem neuen Fenster)",
    "- Telefon- und E-Mail-Links, die Ihr Telefon- oder E-Mail-Programm öffnen",
    "Sobald Sie einen dieser Links öffnen, gilt die Datenschutzerklärung des jeweiligen Anbieters.",

    "## Ihre Rechte",
    "Nach dem Schweizer Datenschutzgesetz (DSG) haben Sie gegenüber der verantwortlichen Person insbesondere das Recht auf Auskunft über bearbeitete Personendaten sowie auf Berichtigung oder Löschung. Soweit die Datenschutz-Grundverordnung der EU (DSGVO) auf Sie anwendbar ist, kommen die dort vorgesehenen Rechte hinzu, unter anderem Einschränkung der Bearbeitung, Datenübertragbarkeit und Widerspruch.",
    "Da diese Vorschau selbst keine Personendaten speichert, betreffen solche Anfragen praktisch nur E-Mails, die Sie mir schreiben. Richten Sie sie an [holzbechernick@gmail.com](mailto:holzbechernick@gmail.com).",
    "Sie können sich ausserdem beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten ([EDÖB](https://www.edoeb.admin.ch/)) melden.",

    "## Änderungen",
    "Diese Erklärung beschreibt den Stand dieser Vorschau. Geht die Website später unter der Domain des Salons live, wechselt das Hosting zu Vercel oder kommt das Redaktionssystem Sanity dazu, muss sie angepasst werden. Was dann zu ergänzen ist, steht in der Projektdokumentation (docs/umstellungs-checkliste.md) und wird vor einem Livegang umgesetzt."
  ),
};

export const rechtstexte: Rechtstext[] = [impressum, datenschutz];
