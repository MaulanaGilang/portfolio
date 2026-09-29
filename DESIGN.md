---
version: 5.0
name: Raw-to-Refined
description: "Recruiter-first portfolio for Gilang Maulana (Data Analyst → Data Engineer). Lusion-inspired motion (smooth scroll, whole-page tone shifts, playful micro-details) on a strict paper + ink + cobalt system. One showpiece: a WebGL data-pipeline hero."
design-read: "Developer portfolio for recruiters and engineering leads, with a bold-typographic Lusion-style language, leaning toward Next.js 16 + Tailwind v4 + Motion + Lenis + React Three Fiber."
dials: { DESIGN_VARIANCE: 7, MOTION_INTENSITY: 7, VISUAL_DENSITY: 4 }
---

## Tone system (no theme toggle)
Two tones, scoped per section: every section declares `data-tone` and the tokens are defined on `[data-tone]`, so colours are static (never animated at runtime; an earlier whole-page crossfade cost 20-95 ms of style recalc per frame).

Sections meet through the **Curtain** stack (`components/Curtain.tsx`): each panel scrolls until its bottom meets the viewport bottom, pins (sticky, negative top), and the next panel slides over it as a card with rounded top corners while the covered panel scales to 0.94 and dims (transform/opacity only). Consecutive same-tone sections share a panel. Progress is computed from page scroll plus each panel's in-flow marker, because sticky elements report their pinned position; same-page anchors use `naturalTop()` for the same reason. The nav takes the tone of the panel under it.

| Section | Tone |
|---|---|
| Hero | paper |
| About | ink |
| Experience, Education | paper |
| Projects | ink |
| Skills & Certifications | paper |
| Connect + footer | ink |
| Case-study pages | paper |

## Tokens
| Token | Paper | Ink |
|---|---|---|
| `--bg` | #F2F2EF | #0E0F12 |
| `--fg` | #0E0F12 | #F2F2EF |
| `--fg-2` (secondary text) | #4A4B50 | #A9AAB0 |
| `--fg-3` (meta, AA) | #6A6B70 | #8B8C92 |
| `--line` | #D9D9D4 | #25262B |
| `--surface` | #E8E8E4 | #17181C |
| `--accent` (text/links) | #2F5BFF | #7B96FF |
| `--accent-solid` (fills) | #2F5BFF | #2F5BFF |

Cobalt is the only accent: links, the active tab, focus rings, the "refined" particles, and the primary button. No second accent.

## Type
- Geist Sans (variable) for everything. Display is weight 500, tracking -0.045em, leading 0.9.
- Geist Mono for dates, durations, credential IDs, and tags.
- Scale: hero name `clamp(3.5rem, 12.5vw, 13rem)`, section title `clamp(2.75rem, 7vw, 6.5rem)`, statement `clamp(1.75rem, 3.6vw, 3.25rem)`, body 1rem/1.6 at max 65ch.
- Emphasis uses the same family in cobalt, never a serif.

## Shape
Cards and images use 14px corners (`rounded-card`). Buttons, tabs, and chips are full pills. Logos sit in 10px tiles.

## Motion
- Lenis smooth scroll, plus the tone crossfade (600ms).
- Split-word reveals on section titles. Scramble text on the hero role and nav hover.
- Magnetic buttons and social icons (fine pointers only).
- A preloader on the first visit of each session.
- Synthesized UI sound (Web Audio), off by default, toggled in the nav.
- Everything collapses to static under `prefers-reduced-motion`.

## Rules
- Zero em or en dashes in visible copy. Date ranges use " - ".
- No eyebrows above section titles. The only small label is the hero availability line.
- Experience and Education rows are collapsed by default. Certifications are grouped by issuer and collapsed.
- Projects: three centered tabs, Data Engineering is the default, and each card links to `/projects/[slug]`.
- All copy lives in `src/data/content.ts`.
