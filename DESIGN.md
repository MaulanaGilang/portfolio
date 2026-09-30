---
version: 6.0
name: Lusion Gallery
description: "Recruiter-first portfolio for Gilang Maulana (Data Analyst → Data Engineer), restyled after lusion.co: one lavender canvas, pure black type, electric-indigo accent, a 3D data-pipeline hero in a studio frame, and a data line that draws itself down the page."
reference: "styles.refero.design Lusion extraction (tokens, theme.css, DESIGN.md), verified against the live lusion.co"
---

## Canvas and tone
- The whole page sits on one canvas, `#f0f1fa` (lavender mist). Like Lusion, there are **no section transitions**; separation comes from whitespace.
- The only dark area is the Let's Connect footer (and the case-study "Next project"). It's reached through a tall multi-stop gradient (`#f0f1fa → #dfe1ec → #a9acbf → #4a4d5d → #16171d → #0b0c10`), never a hard edge.
- Tokens are scoped to `[data-tone]`, and the nav flips to `ink` while it floats over the footer.

## Tokens
| Token | Paper | Ink |
|---|---|---|
| `--bg` | #f0f1fa | #0b0c10 |
| `--fg` | #000000 | #f0f1fa |
| `--fg-2` | #3a3d4a | #b9bbc9 |
| `--fg-3` | #5d6070 | #8e91a2 |
| `--surface` (cards) | #ffffff | #15161c |
| `--haze` (quiet fills) | #e4e6ef | #1d1f27 |
| `--accent` | #1a2ffb electric indigo | #8b97ff |
| `--pill` (dark CTA) | #2b2e3a graphite | #f0f1fa |

Acid lime `#c1ff00` appears only inside visuals: the "cleaning" blocks and the end of the data line. Shadows are the 4% "whisper" stack only.

## Type
Satoshi (Fontshare, self-hosted in `src/fonts`) stands in for Lusion's Aeonik. Weights are 400/500 only, tracking is -0.02em (display -0.035em), and display leading is 0.9. Small uppercase 12px labels are used for tags, meta and buttons.

## Shape
Cards are 15px, the hero frame is 24px, and buttons are full pills (dark graphite or white, uppercase label plus a dot).

## Signature pieces
- **Hero:** display name on the left; role, intro and CTAs on the right; below them a light studio frame with the WebGL scene (`hero/BlockScene.tsx`). It's one instanced mesh of rounded blocks: graphite raw → lime while cleaning (rejects sink and vanish) → indigo record batches on a 4 × 3 lane grid. The camera parallaxes with the pointer, and rendering pauses off-screen.
- **Data line** (`ScrollLine.tsx`): one SVG ribbon behind every section. It runs in the side gutters (never over body text), crosses in each section's empty top padding, and fades out into the footer gradient. The stroke gradient goes indigo → cyan → lime, and it draws up to ~70% of the viewport as you scroll.
- **Featured Work:** three tabs, then a 2-column grid. With an odd count, the last card spans the full width (21:9). Cards show a photoreal cover, an uppercase tag line, the title, a short description and a "View case study" pill.
- **Section header:** a big display title on the left and an uppercase blurb on the right.

## Rules kept from v5
All copy lives in `src/data/content.ts`. No em dashes in copy. Experience, Education and Certifications are collapsed by default. Reduced motion slows the 3D drift, draws the line fully, and drops transforms.
