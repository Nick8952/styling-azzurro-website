# Coiffeur Styling Azzurro: Verkaufs-Demo

Unverbindlicher Gestaltungsvorschlag für den Coiffeursalon Styling Azzurro,
Winterthurerstrasse 659, 8051 Zürich. Inhalte 1:1 von www.styling-azzurro.ch.

- Live-Demo: https://nick8952.github.io/styling-azzurro-website/
- Stack: Next.js 16 (App Router, TypeScript), CSS-Token, statischer Export auf GitHub Pages
- Sanity (CMS) und Vercel (Hosting) sind vorbereitet, nicht angelegt: `docs/sanity-vercel-einrichtung.md`

```
npm install
npm run dev                   # http://localhost:3000
npm run build                 # statischer Export nach out/
npm run vorschau -- --pfad /styling-azzurro-website   # wie GitHub Pages
npm run typecheck && npm run lint && npm test
```

Anleitung für Claude Code / Codex: `CLAUDE.md`. Alle Dokumente: `docs/`.
