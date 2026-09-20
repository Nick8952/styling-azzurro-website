# Designkonzept «Leuchtschrift»

**Design Read:** Neugestaltung (Overhaul bei vollständigem Inhaltserhalt) einer
Quartier-Coiffeur-Website für Stammkundschaft und Laufkundschaft in Zürich-Schwamendingen,
viele ältere Besucherinnen und Besucher; Sprache: hell, persönlich, vertrauensbildend;
Umsetzung mit nativem CSS (Token) ohne UI-Bibliothek. Dials: Varianz 5, Bewegung 3, Dichte 4.

## Woher das Design kommt

- **Der Salon** ist weiss, hell und aufgeräumt; einziger Farbakzent ist die **blaue
  Neon-Leuchtschrift** im Schaufenster und das blaue Wandbild (Mittelmeer). «Azzurro»
  ist Programm.
- **Das Logo** (Wortmarke «Coiffeur Styling Azzurro», Blau #2838f8/#1828a8 gemessen)
  bleibt unverändert und wird aus dem grössten vorhandenen Original freigestellt.
- **Die Preisliste** hängt im Original als gedrucktes Blatt aus. Die Demo macht daraus
  eine Preistafel mit Punktlinien und Tabellenziffern.
- **Die Öffnungszeiten** erscheinen als Türschild (Karte mit blauer Oberkante).

## Token

| Rolle | Wert | Kontrast auf Weiss |
|---|---|---|
| Tinte (Text) | `#12172e` | 16.9:1 |
| Text 2 (gedämpft) | `#4a5170` | 7.8:1 |
| Papier | `#ffffff` | – |
| Papier 2 (Abschnittswechsel) | `#f3f5fc` | – |
| Linie / Linie stark | `#d9def0` / `#b7bfe0` | – |
| Azzurro (Akzent, Links, Knöpfe) | `#2431d6` | 8.4:1 (Weiss auf Azzurro 8.4:1) |
| Azzurro dunkel (Hover) | `#1b26ae` | 11:1 |
| Azzurro hell (Fläche) | `#e8ebfc` | – |
| Neon (nur dekorativ) | `#5c6cff` | – |
| Fehler | `#b3261e` | 6.4:1 |

Schrift: **Figtree Variable** (300–900, kursiv), lokal aus `@fontsource-variable/figtree`.
Grössen: Text 17 px / 1.6, Lead 20 px, H3 20 px, H2 28–40 px (fluid), H1 36–60 px (fluid),
klein 15 px. Ziffern tabellarisch. Abstände im 4er-Raster (`--a-1` … `--a-10`),
Abschnitte `clamp(4rem, 6vw, 6rem)`. Formen: Knöpfe rund, Flächen 14 px, Eingaben 10 px.
Bewegung: `320 ms cubic-bezier(0.32, 0.72, 0, 1)`, nur Deckkraft/Transform; reduziert = aus.

## Signatur

**Leuchtlinie**: 3 px Neonstrich mit weichem Glanz unter jedem Seitentitel und als
Oberkante des Türschilds, als Erinnerung an die Röhre im Schaufenster. Sonst keine
Glanzeffekte, keine Verläufe, keine Schatten ausser der einen getönten Flächenschatten.

## Seitenaufbau Startseite (sieben Abschnitte, sechs Layoutfamilien)

1. Hero: Titel links, Schaufensterfoto rechts (Split 1.05/0.95)
2. Willkommen: Text + Grussformel links, Türschild rechts, auf Papier 2
3. Team: Foto mit blauer Platte links, Text rechts
4. Preise: 2×2 Preisgruppen als Karten, Bedingungen, ein Knopf
5. Salon: Mosaik 2fr/1fr (ein grosses, zwei kleine Bilder)
6. Gästebuch: zwei Zitate nebeneinander
7. Kontakt: Aufforderung links, Kontaktblock rechts

Mobil (< 64 rem) wird alles einspaltig, 16 px Rand, Reihenfolge wie oben.

## Bewusste Abweichungen von Skill-Empfehlungen

- **Kein Dark Mode** (design-taste-frontend verlangt ihn): Das Logo existiert nur auf
  Weiss, der Salon ist weiss, die Zielgruppe schätzt eine ruhige, helle Seite.
  `color-scheme: light` ist deklariert.
- **Neon-Glanz** (Skill: keine Glows): einziger Glanz ist die Leuchtlinie, weil die
  Marke tatsächlich eine Neonschrift ist. Brand-Override.
- **Blau als Akzent** trotz «Lila-Regel»: Markenfarbe, gemessen aus dem Logo.
- **Kein Eyebrow, keine Sektionsnummern, keine Gedankenstriche** in sichtbaren Texten.
