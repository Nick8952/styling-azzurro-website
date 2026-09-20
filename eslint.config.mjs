import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const konfiguration = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: ["out/**", ".next/**", "node_modules/**", "assets/**", "public/**"],
  },
];

export default konfiguration;
