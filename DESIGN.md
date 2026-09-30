---
version: 6.0
name: Gallery-Floor
description: "Recruiter-first portfolio for Gilang Maulana (Data Analyst → Data Engineer), adapted from the Lusion style reference (styles.refero.design): a cool lavender gallery floor, pure black type, graphite pills, and dark 3D stages that carry all the colour."
design-read: "Developer portfolio for recruiters and engineering leads, in Lusion's gallery language, on Next.js 16 + Tailwind v4 + Motion + Lenis + React Three Fiber."
---

## Principle
The UI is quiet and achromatic; the dark 3D content (hero pipeline stage, project covers, final card) does the dramatic work. Everything else is a tactile object resting on the lavender canvas.

## Tokens
| Token | Paper (canvas) | Ink (stage) | Role |
|---|---|---|---|
| `--bg` | #f0f1fa lavender mist | #0b0c11 night | canvas |
| `--fg` | #000000 | #f0f1fa | all text |
| `--fg-2` | #2b2e3a graphite | #c3c6d4 | secondary text |
| `--fg-3` | #5b5f6e | #8d91a3 | meta (AA) |
| `--line` | #dcdee9 | #262833 | hairlines |
| `--surface` | #ffffff | #15161d | cards |
| `--surface-2` | #e4e6ef haze | #1d1f28 | chips, icon discs |
| `--btn` / `--btn-fg` | #2b2e3a / #fff | #f0f1fa / #000 | pill buttons |
| `--accent` | #1a2ffb electric indigo | #7d8aff | punctuation, active states, focus |
| `--gold` | #ffb81c | | the "Gold layer" highlight |

**Accents:** electric indigo is punctuation (ticks, the word "pipelines", active tab text, focus ring), never a large fill. Gold replaces Lusion's acid lime: it is indigo's complement and the medallion **Gold layer** (business-ready data). Uses: modeled packets in the hero stage, a gold wash (`mark-gold`) under key metrics, the Gold boxes in the lineage diagram, and "your data." in the final card.

## Type
General Sans (ITF, free), self-hosted, weights 400 and 500 only, tracking -0.02em everywhere.
- `display`: 400, leading 0.9 (section titles up to 7rem, finale up to 9rem).
- `heading`: 500, leading 1.1 (hero headline, card titles).
- `label`: 12-13px, 500, uppercase (nav, buttons, meta, dates).
- Body 16-18px/1.5. Monospace only for SQL table names in the lineage diagram.

## Shape
Cards 15px (`rounded-card`), pills fully round, hero stage and featured covers `--radius-stage` (clamp to 100px), project cards clamp to 64px, logos 10px tiles. Shadows: the single 4% whisper (`shadow-whisper`).

## Signatures
- "+" ticks (`<Tick/>`) around section labels and inside buttons (rotates 90° on hover).
- Header: wordmark left, availability centre, "+ Let's talk" pill and "Menu +" right; sections live in a floating white menu panel.
- Hero: "+ role +" label, three-line centred headline, two pills, then the dark 100px stage with the raw → cleaning → modeled pipeline, then "+ Scroll to explore +".
- Section headers: centred "+ LABEL (count) +" over a display title.

## Motion
Unchanged from v5: Curtain stack (lavender cards with a soft top shadow slide over pinned panels; covered panels scale to 0.94 and dim 10% toward the #d9dbe7 backdrop), Lenis, split-word reveals, scramble, magnetic pills, preloader ("Ingesting"), optional UI sound. Reduced motion respected via `MotionConfig reducedMotion="user"`.

## Rules
- No bold (600+), no em dashes in copy, no gradients or glass (the gold wash is a highlight mark, not decoration).
- Experience/Education collapsed by default; certifications grouped by issuer.
- All copy lives in `src/data/content.ts`.
