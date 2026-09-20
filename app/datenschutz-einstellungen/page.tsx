import type { Metadata } from "next";
import { Einwilligungsverwaltung } from "@/components/Einwilligungsverwaltung";
import { Seitenkopf } from "@/components/Seitenkopf";

export const metadata: Metadata = {
  title: "Datenschutz-Einstellungen",
  description: "Externe Inhalte erlauben oder ablehnen und nachsehen, was diese Website in Ihrem Browser gespeichert hat.",
};

export default function Einstellungsseite() {
  return (
    <>
      <Seitenkopf
        titel="Datenschutz-Einstellungen"
        einleitung="Hier sehen Sie, was diese Website in Ihrem Browser speichert, und entscheiden über externe Inhalte. Änderungen wirken sofort."
      />
      <div className="inhalt">
        <Einwilligungsverwaltung />
      </div>
    </>
  );
}
