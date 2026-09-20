import assert from "node:assert/strict";
import { test } from "node:test";
import { bildmanifest } from "../lib/bilder/manifest";
import { einstellungen } from "../data/einstellungen";
import { gaestebuch } from "../data/gaestebuch";
import { preisliste } from "../data/preisliste";
import { salon } from "../data/salon";
import { seiten } from "../data/seiten";
import { startseite } from "../data/startseite";
import { team } from "../data/team";
import { alsText, text } from "../lib/inhalt/text";
import { gruppieren, preisText } from "../lib/preise";
import { datumLang, zeitenGruppiert, zeitenKurz } from "../lib/zeiten";

/* ------------------------------------------------ Preisliste = Quellbild */

test("Preisliste: 31 Positionen in 3 Kategorien wie im Original", () => {
  const anzahl = preisliste.kategorien.map((k) => k.positionen.length);
  assert.deepEqual(anzahl, [19, 4, 6]);
  assert.deepEqual(
    preisliste.kategorien.map((k) => k.titel),
    ["Damen", "Herren", "Kinder, Jugendliche und Studenten"]
  );
});

test("Preisliste: Beträge stimmen mit dem Preislisten-Bild überein", () => {
  const alle = preisliste.kategorien.flatMap((k) => k.positionen.map((p) => p.betrag));
  assert.deepEqual(alle, [
    42, 45, 53, 80, 83, 98, 74, 77, 85, 105, 130, 85, 125, 62, 67, 85, 50, 55, 65, // Damen
    50, 25, 45, 40, // Herren
    25, 30, 40, 46, 65, 12, // Kinder, Jugendliche und Studenten
  ]);
  for (const position of preisliste.kategorien.flatMap((k) => k.positionen)) {
    assert.equal(position.preisart, "fest");
    assert.ok(Number.isInteger(position.betrag));
  }
});

test("Preisliste: beide Bedingungen wörtlich vorhanden", () => {
  assert.deepEqual(preisliste.hinweise, ["Preise ohne Pflege- sowie Styling-Produkte.", "Je nach Aufwand wird der Preis angepasst."]);
});

test("preisText formatiert CHF mit zwei Nachkommastellen, ab-Preise und Anfrage", () => {
  assert.equal(preisText({ leistung: "x", preisart: "fest", betrag: 42 }), "CHF 42.00");
  assert.equal(preisText({ leistung: "x", preisart: "ab", betrag: 105 }), "ab CHF 105.00");
  assert.equal(preisText({ leistung: "x", preisart: "aufAnfrage" }), "auf Anfrage");
});

test("gruppieren fasst aufeinanderfolgende Leistungen zusammen", () => {
  const gruppen = gruppieren(preisliste.kategorien[0].positionen);
  assert.deepEqual(
    gruppen.map((g) => `${g.leistung}:${g.positionen.length}`),
    ["Föhnen:3", "Schneiden und Föhnen:5", "Folinemèche:3", "Dauerwelle:2", "Färben:3", "Tönung:3"]
  );
});

/* ------------------------------------------------------------ Gästebuch */

test("Gästebuch: 7 Einträge, Nummern 7 bis 1, Werbeeintrag ausgeblendet", () => {
  assert.equal(gaestebuch.eintraege.length, 7);
  assert.deepEqual(gaestebuch.eintraege.map((e) => e.nummer), [7, 6, 5, 4, 3, 2, 1]);
  const versteckt = gaestebuch.eintraege.filter((e) => !e.sichtbar);
  assert.equal(versteckt.length, 1);
  assert.equal(versteckt[0].nummer, 6);
  assert.ok(versteckt[0].grund);
  for (const eintrag of gaestebuch.eintraege) {
    assert.doesNotMatch(eintrag.text, /https?:\/\/|@/, "keine Adressen in Einträgen");
    assert.match(eintrag.datum, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  }
});

/* --------------------------------------------------------------- Bilder */

test("alle Bildverweise der Inhaltsdateien existieren im Manifest", () => {
  const verweise = [
    startseite.heroBild,
    startseite.teamBild,
    ...startseite.salonBilder,
    ...team.bilder,
    ...team.mitglieder.flatMap((m) => (m.bild ? [m.bild] : [])),
    ...salon.galerie,
    ...seiten.flatMap((s) =>
      s.bausteine.flatMap((b) => (b._type === "bildblock" ? [b.bild] : b._type === "galerieblock" ? b.bilder : []))
    ),
  ];
  assert.ok(verweise.length > 20);
  for (const verweis of verweise) {
    assert.ok(bildmanifest[verweis.schluessel], `Bild fehlt im Manifest: ${verweis.schluessel}`);
    assert.ok(verweis.alt.length > 10, `Alt-Text zu kurz: ${verweis.schluessel}`);
  }
});

test("Manifest: jede Variante hat AVIF und WebP, Standardpfad ist WebP", () => {
  for (const [id, eintrag] of Object.entries(bildmanifest)) {
    if (id === "logo") continue;
    assert.equal(eintrag.varianten.avif.length, eintrag.varianten.webp.length, id);
    assert.match(eintrag.standard, /\.webp$/, id);
    assert.ok(eintrag.unschaerfe.startsWith("data:image/webp;base64,"), id);
  }
});

/* ----------------------------------------------------------- Rich Text */

test("text(): Absätze, Titel, Listen, Fett und Links werden zu Portable Text", () => {
  const blocks = text("## Titel", "Ein **fetter** Satz mit [Link](https://beispiel.ch) und [intern](/kontakt/).", "- Punkt A", "- Punkt B");
  assert.equal(blocks[0].style, "h2");
  assert.equal(blocks[1].children.find((c) => c.marks?.includes("strong"))?.text, "fetter");
  const links = blocks[1].markDefs ?? [];
  assert.equal(links.length, 2);
  assert.equal(links[0]._type === "link" && links[0].extern, true);
  assert.equal(links[1]._type === "link" && links[1].extern, false);
  assert.equal(blocks[2].listItem, "bullet");
  assert.equal(blocks[3].listItem, "bullet");
  assert.equal(alsText(blocks), "Titel Ein fetter Satz mit Link und intern. Punkt A Punkt B");
});

test("text(): Schlüssel sind deterministisch und eindeutig", () => {
  const a = text("Zeile eins", "Zeile zwei", "Zeile zwei");
  const b = text("Zeile eins", "Zeile zwei", "Zeile zwei");
  assert.deepEqual(a, b);
  const keys = a.map((block) => block._key);
  assert.equal(new Set(keys).size, keys.length);
});

/* ------------------------------------------------------- Öffnungszeiten */

test("Öffnungszeiten: Mo bis Fr zusammengefasst, Sa und So geschlossen", () => {
  const gruppen = zeitenGruppiert(einstellungen.oeffnungszeiten);
  assert.deepEqual(
    gruppen.map((g) => [g.tage, g.text]),
    [
      ["Montag bis Freitag", "08.00 bis 12.00, 13.30 bis 17.00"],
      ["Samstag bis Sonntag", "geschlossen"],
    ]
  );
  assert.equal(zeitenKurz(einstellungen.oeffnungszeiten), "Mo bis Fr: 08.00 bis 12.00, 13.30 bis 17.00 | Sa bis So: geschlossen");
});

test("datumLang gibt das Datum der Gästebucheinträge auf Deutsch ohne Zeitzonenversatz aus", () => {
  assert.equal(datumLang("2024-01-31T08:16"), "Mittwoch, 31. Januar 2024");
  assert.equal(datumLang("2012-11-17T14:30"), "Samstag, 17. November 2012");
});

/* ------------------------------------------------------------ Kontakt */

test("Kontaktdaten entsprechen der Quellwebsite", () => {
  const { kontakt } = einstellungen;
  assert.equal(kontakt.telefon, "044 321 20 35");
  assert.equal(kontakt.telefonLink, "tel:+41443212035");
  assert.equal(kontakt.email, "styling.azzurro@gmx.ch");
  assert.equal(kontakt.strasse, "Winterthurerstrasse 659");
  assert.equal(kontakt.plz, "8051");
  assert.equal(team.mitglieder.map((m) => m.name).join(" und "), startseite.unterzeichnende);
});
