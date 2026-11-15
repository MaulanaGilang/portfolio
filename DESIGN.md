---
name: Dune Day
description: "Gilang Maulana's portfolio as one day over a dune field: Dune Part One's misty dawn at the top, Part Two's spice dusk at the end."
colors:
  mist: "#e6edeb"
  frost: "#f4f7f6"
  haze: "#d3e0dd"
  sand: "#e7dccb"
  ink: "#221e1d"
  stone: "#4f5a55"
  meta: "#5b6762"
  caladan-teal: "#5e8b8b"
  teal-ink: "#3f6b6b"
  spice: "#a8360e"
  spice-fill: "#d35c11"
  on-spice: "#fff6ec"
  night: "#170504"
  ember: "#2a0a06"
  rust: "#93280e"
  sun: "#ea7d0c"
  gold: "#f7ac09"
  pale-gold: "#efc650"
  night-fg: "#efe6d8"
  night-fg-2: "#c9a98c"
  night-meta: "#a88a72"
typography:
  wordmark:
    fontFamily: "Dune Rise, Satoshi, sans-serif"
    fontSize: "clamp(2rem, 6.7vw, 6.8rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.02em"
  heading:
    fontFamily: "Dune Rise, Satoshi, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.02em"
  statement:
    fontFamily: "Satoshi, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.4rem, 2.1vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Satoshi, ui-sans-serif, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  media: "4px"
  pill: "9999px"
spacing:
  gutter: "clamp(16px, 4.5vw, 80px)"
  section: "clamp(72px, 8vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.frost}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 16px 0 20px"
  button-primary-hover:
    backgroundColor: "{colors.spice-fill}"
    textColor: "{colors.on-spice}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "48px"
  nav-link-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.mist}"
    rounded: "{rounded.pill}"
    height: "40px"
  tag:
    backgroundColor: "{colors.haze}"
    textColor: "{colors.stone}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "28px"
---

# Design System: Dune Day

v8, November 2026. Replaces v7 "Imperial Instrument" (sand canvas, bracket controls), which the owner rejected as a font swap on the old layout. Product truth lives in `PRODUCT.md`; the home page's direction contract lives in `.impeccable/surfaces/`.

## Overview

The page is one day over a dune field. It opens at dawn in Dune Part One's mist: a full-bleed WebGL dune field with a living data pipeline running over it. Raw blocks rise out of the sand, tumble, flash spice while they're sorted, and ride away as teal record batches in ordered lanes, from the first frame. That is the whole story ("raw data in, trusted data out"), acted out before it is written.

From there the page is calm and light: large Satoshi headings, hairline ledgers, real project covers. At the end the day turns. A dusk band warms from sand through Part Two's spice and rust while a sun sinks behind dune ridges, and the footer is night.

References, all used for structure and grammar only, never assets: yinger.dev (the code-made 3D opening and readouts), MECHA (the full-width wordmark), INVERSA (small mono labels over landscape), Terminal Industries (the dusk). The palette is sampled from the Dune Part One and Part Two posters.

## Colors

Strategy: restrained light canvas plus one accent, then one deliberate theme turn at the footer.

### Day (Part One)
- **Mist** `#e6edeb`: the page. The hero's fog fades to exactly this colour at the horizon.
- **Frost** `#f4f7f6`: raised fills (skill logo discs, lineage panel).
- **Haze** `#d3e0dd`: image wells and tags.
- **Sand** `#e7dccb`: the Skills band and case-study Result panel.
- **Ink** `#221e1d` (13.9:1 on mist), **Stone** `#4f5a55` secondary (6.0:1), **Meta** `#5b6762` for labels (5.0:1 on mist; not on haze or sand).
- **Caladan teal** `#5e8b8b` for marks only (3.2:1). As text use **Teal ink** `#3f6b6b` (5.0:1): the second line of the About headline.

### Accent
- **Spice** `#a8360e` (5.5:1) for text: the target role, highlighted words, hover on links.
- **Spice fill** `#d35c11` for fills: button hover, bullet dots, focus rings, selection, blocks in flight.

### Night (Part Two)
`#170504` ground, `#efe6d8` text, `#c9a98c` secondary, `#a88a72` meta, **Sun** `#ea7d0c` accent (7.0:1), **Pale gold** `#efc650` for the closing wordmark (12.1:1). Rust `#93280e` and `#6c1f0e` live only in the dusk band.

### Named rules
- **One accent per tone.** Spice by day, sun by night. No other hue joins.
- **The turn happens once.** Mist to night only through the dusk band, never a hard edge, never twice.

## Typography

- **Dune Rise** (`src/fonts/DuneRise.otf`, a fan recreation of the film title; check its licence before relying on it commercially): the name (hero wordmark and nav), the one-word section headings (PROJECTS, EXPERIENCE, EDUCATION, CERTIFICATES, SKILLS), the preloader's "Ingesting", and "Let's talk" in the footer. Capitals, single words or the name only; never body, never a sentence. About keeps its Satoshi sentence headline.
- **Satoshi** 400/500: everything read. The About headline, project and case-study titles at 500 and -0.035em; statement and body 400.
- **Geist Mono** 400: data only. Dates, coordinates, local time, categories, years, credential IDs. Sentence case, tabular figures, never as a costume eyebrow.

Hierarchy: wordmark, then section heading (`heading` utility, Dune Rise; the twin Education and Certificates columns step down to `clamp(1.75rem, 3.4vw, 3.4rem)` so CERTIFICATES fits half the measure and a 390px phone), then statement, then body 16-17px, then label 12px. The hero wordmark is sized so both words exactly fill the measure (13.2em of Dune Rise across the container); phones stack the words at 11vw.

## Layout

- Container: max 1600px, gutter `clamp(16px, 4.5vw, 80px)`. Sections pad `clamp(72px, 8vw, 128px)`.
- Order: Hero (one screen), About (opens on the Part One photo band), Selected work, Experience, Education with Certificates, Skills (sand), Dusk band, footer.
- No eyebrows, no section numbers. A heading and one line of context, stacked.
- Each section uses its own layout family: split thesis and facts (About), index list with a pinned cover (Work), dated ledger (Experience), twin ledgers (Education), grouped logo grid on sand (Skills), large link rows (footer).

## Elevation & Depth

Flat. Hairlines (`rgb(34 30 29 / 0.14)`, strong `0.32`) separate rows; fills separate bands. Depth belongs to the 3D scene and the dusk band only. The sun's glow is the one soft shadow on the page.

## Shapes

Media and panels 4px. Every control is a pill (buttons, nav links, tags, the round disclosure toggle, the round arrow badges). Nothing in between.

## Components

### Buttons
`PillButton`: solid ink pill with a round arrow badge that lifts on hover; hover fills spice. Ghost: hairline pill. One label per intent: "Résumé" and "Let's talk".

### Navigation
Pill links in Satoshi 15px; the active section is an ink pill. The name (Dune Rise) appears in the nav only after the hero wordmark has scrolled away. Mobile: a full-screen menu of large Satoshi links.

### Ledgers (`EntryCard` / `EntryRow`)
Hairline rows, a mono date column on wide screens, logo + organisation, then collapsible roles with a round plus/minus toggle. Collapsed by default; "Expand all" per group.

### Selected work index
Big titles (Satoshi 500, fg-3 until active) with category and year in mono; the desktop cover is pinned and cross-fades to the active project, and is named for the morph into the case-study hero.

### Signature: the dune field (`hero/DuneScene.tsx`)
Procedural transverse dunes displaced on the CPU and baked into a half-float height texture, so blocks and sand sit exactly on the surface. Shaded in Part One light: a low sun, sun-warm faces, teal lee shadows deepening in the troughs, wind ripples running parallel to the crests (masked off the slip faces, fading with distance), fine grain against banding, and mist pooling low. About 4,000 sand grains (1,800 on phones) skim downwind off the crests. The pipeline is about 1,300 rounded blocks (520 on phones), instances of one mesh on a shared clock (the v6 engine, rebuilt for the dunes): raw sand-coloured blocks rise out of the sand at the left and tumble, keepers flash spice in the middle while rejects sink back, and record batches ride level in 4 by 3 teal lanes on the right (top row pale), held just above the highest sand along their path and in front of it (computed once on the CPU) so no crest cuts through or hides a lane. The pointer pushes blocks aside; scrolling eases the clock up to about twice its pace (never a lurch) and the camera lifts as the hero leaves. Reduced motion slows the clock to a drift. No textures beyond the baked heights.

### The Part One band (`sections/AerialBand.tsx`)
The first photograph: soft pale dunes under a hazy teal sky, no people (`public/about/teal-haze.webp`, Brianda Maldonado on Unsplash, Unsplash License; credited on the band, origin in its `.json` sidecar), chosen for its match to the Dune Part One poster. Full bleed at `object-position 50% 52%`, drifting ±7% slower than the page, rising out of the hero's sand tone `#e8dfcf` through mist and dissolving into the mist canvas, with the About headline set on the sand at its lower edge.

### Signature: the dusk (`sections/Dusk.tsx`)
The second and last photograph: a dune ridge burning orange against black shadow under a dark sky (`public/about/dusk-ridge.webp`, Edwin Rodriguez on Unsplash, Unsplash License; credited on the band, origin in its `.json` sidecar), chosen for its match to the Dune Part Two poster and shown ungraded at `object-position 50% 55%`. It rises out of the Skills sand through a warm horizon glow (`#e7dccb` to `#ebc496` to sun at 42%), drifts ±6%, and dissolves into the night footer. Both bands clip with `clip-path: inset(0)` and keep their fades on their own layers (`z-[1]`, `will-change`) so no photo row bleeds at a fractional edge.

## Motion

Exponential ease-outs (`cubic-bezier(0.16, 1, 0.3, 1)`). One continuous moment (the hero pipeline, sped up by scrolling) and two photo bands that drift on scroll; everything else is a short reveal or a hover. Reduced motion: the pipeline drifts slowly, still photos, instant reveals.

## Do's and Don'ts

### Do
- Keep Dune Rise to the name, one-word section headings and the closing words.
- Keep the readouts plain: coordinates and local time, never labelled or narrated.
- Use real covers and real outcomes from `content.ts`.

### Don't
- Don't add eyebrows, section numbers, brackets or grid overlays (v7's language).
- Don't put spice text on haze or sand below 4.5:1, or teal as body text.
- Don't add a second accent, a custom cursor, or generated imagery. Photography stays to the two credited bands (Part One and the dusk).
- Don't use em or en dashes in copy.
