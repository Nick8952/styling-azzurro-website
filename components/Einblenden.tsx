"use client";

import { useEffect, useRef, type ReactNode } from "react";
import stile from "./Einblenden.module.css";

type Props = {
  children: ReactNode;
  /** Verzögerung in Millisekunden, für gestaffelte Gruppen. */
  verzoegerung?: number;
  className?: string;
  als?: "div" | "section" | "li" | "figure";
};

/**
 * Blendet Inhalt beim ersten Erscheinen im Sichtfenster sanft ein (Deckkraft
 * und 12 px Versatz, 320 ms). Ohne JavaScript und bei reduzierter Bewegung
 * ist der Inhalt sofort sichtbar: Die Ausblendung wird erst per Skript
 * gesetzt, nie im HTML.
 */
export function Einblenden({ children, verzoegerung = 0, className, als = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    element.classList.add(stile.bereit);
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        for (const eintrag of eintraege) {
          if (eintrag.isIntersecting) {
            element.classList.add(stile.sichtbar);
            beobachter.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    beobachter.observe(element);
    return () => beobachter.disconnect();
  }, []);

  const Element = als;
  return (
    <Element
      ref={ref as never}
      className={[stile.rahmen, className].filter(Boolean).join(" ")}
      style={verzoegerung ? { transitionDelay: `${verzoegerung}ms` } : undefined}
    >
      {children}
    </Element>
  );
}
