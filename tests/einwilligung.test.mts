import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";

/**
 * Einwilligungsspeicher mit nachgebautem window/localStorage. Geprüft wird
 * die Logik, nicht der Browser: Ohne Eintrag nichts erlaubt, Ablehnung wird
 * nicht gespeichert, Widerruf löscht, defekte Werte gelten als «nichts».
 */
type Speicher = Map<string, string>;
const speicher: Speicher = new Map();
const ereignisse: string[] = [];

(globalThis as unknown as { window: unknown }).window = {
  localStorage: {
    getItem: (k: string) => speicher.get(k) ?? null,
    setItem: (k: string, v: string) => speicher.set(k, v),
    removeItem: (k: string) => speicher.delete(k),
  },
  dispatchEvent: (e: { type: string }) => ereignisse.push(e.type),
  addEventListener: () => undefined,
  removeEventListener: () => undefined,
};
(globalThis as unknown as { CustomEvent: unknown }).CustomEvent = class {
  type: string;
  constructor(type: string) {
    this.type = type;
  }
};

const { SCHLUESSEL, istErteilt, lesen, speichern, widerrufen } = await import("../lib/einwilligung");

beforeEach(() => {
  speicher.clear();
  ereignisse.length = 0;
});

test("ohne Eintrag ist nichts erlaubt", () => {
  assert.equal(lesen(), null);
  assert.equal(istErteilt("googleMaps"), false);
});

test("speichern legt versionierten Eintrag mit Zeitpunkt an und meldet die Änderung", () => {
  assert.equal(speichern(["googleMaps"]), true);
  const wert = lesen();
  assert.equal(wert?.version, 1);
  assert.equal(wert?.dienste.googleMaps, true);
  assert.match(wert?.zeitpunkt ?? "", /^\d{4}-\d{2}-\d{2}T/);
  assert.equal(istErteilt("googleMaps"), true);
  assert.equal(ereignisse.length, 1);
});

test("Ablehnung (leere Liste) speichert nichts und löscht Vorhandenes", () => {
  speichern(["googleMaps"]);
  assert.equal(speichern([]), true);
  assert.equal(speicher.has(SCHLUESSEL), false);
  assert.equal(istErteilt("googleMaps"), false);
});

test("widerrufen entfernt den Eintrag", () => {
  speichern(["googleMaps"]);
  widerrufen();
  assert.equal(lesen(), null);
});

test("defekte oder veraltete Einträge gelten als keine Einwilligung", () => {
  speicher.set(SCHLUESSEL, "kein json");
  assert.equal(lesen(), null);
  speicher.set(SCHLUESSEL, JSON.stringify({ version: 0, dienste: { googleMaps: true } }));
  assert.equal(istErteilt("googleMaps"), false);
});
