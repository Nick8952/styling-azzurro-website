"use client";

import { useSyncExternalStore } from "react";
import { SCHLUESSEL, beobachten, lesen, type Einwilligung } from "./einwilligung";

const SERVER = "server";

function abonnieren(rueckruf: () => void) {
  return beobachten(rueckruf);
}

function momentaufnahme(): string | null {
  try {
    return window.localStorage.getItem(SCHLUESSEL);
  } catch {
    return null;
  }
}

function serverMomentaufnahme(): string {
  return SERVER;
}

/**
 * Liest die gespeicherte Einwilligung reaktiv. `bereit` ist erst nach der
 * Hydration true; bis dahin gilt «nichts erlaubt», damit Server- und
 * Client-HTML übereinstimmen und vor dem ersten Lesen nichts geladen wird.
 */
export function useEinwilligung(): { bereit: boolean; einwilligung: Einwilligung | null } {
  const roh = useSyncExternalStore(abonnieren, momentaufnahme, serverMomentaufnahme);
  if (roh === SERVER) return { bereit: false, einwilligung: null };
  return { bereit: true, einwilligung: roh ? lesen() : null };
}
