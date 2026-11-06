# Offline page: design

Status: draft for review. This document is for `/offline` only. The portfolio keeps its own [DESIGN.md](../../DESIGN.md).

## 1. Direction

**Subject:** the private archive of a noble house in a far-future empire, kept by its last working heir.
**Character:** severe, ceremonial, quietly funny.
**World:** basalt halls, one shaft of light, dry air, heavy cloth, polished metal.
**The one bright element:** the house banner. Everything else stays quiet.
**Signature:** the thorn rail. A thorned stem from the emblem runs down the page, and its thorns are the section links.

Lusion's world is bright and weightless. This one is dark and heavy. A visitor should feel they have walked out of an office and into a hall.

## 2. What we took from the references

| Reference | Taken | Left behind |
|---|---|---|
| Dune films (production design, per [Patrice Vermette's interviews](https://www.sciencefocus.com/future-technology/dune-patrice-vermette)) | Bunker and ziggurat scale, huge empty space, one light source | Every name, logo and costume |
| [Dune: Awakening](https://www.duneawakening.com/) | Wide capitals, gold-on-black restraint, near-black framing a single subject | Ornate button frames, the sand and gold palette |
| [EVE Online](https://www.eveonline.com/) | Thin corner brackets, fine lines around data | Cyan accent, marketing layout |
| [legencymedia.com](https://legencymedia.com/) | One object drawn in ordered dither dots | The planet subject, the bright canvas |
| [The Blue Desert](https://www.awwwards.com/sites/the-blue-desert) (Awwwards Site of the Day) | A lone journey told through scroll | Its illustrated style |
| Dribbble [heraldry](https://dribbble.com/tags/heraldry-logo) and [rose](https://dribbble.com/tags/rose-logo) tags | Flat single-colour crests that survive small sizes | Shields, wreaths, ornate badges |

Dune's own banners are simple in the books: Atreides is [described as black and green](https://www.crwflags.com/fotw/flags/fic~dune.html) and Harkonnen as orange. Severity is the style, so the banner stays two colours.

## 3. The house banner

**Concept: a rose guarded by its own thorns.** A large rose sits inside a thorn ring on a central silver stripe, with thin stripes beside it and angled rails down both edges. This design was chosen by Gilang from an AI-generated image and recoloured to maroon and silver.

| File | Use |
|---|---|
| [assets/house-banner-cloth.png](assets/house-banner-cloth.png) | Woven cloth version, with folds and fringe. For the Arrival screen and the share image |
| [assets/house-banner-flat.png](assets/house-banner-flat.png) | Two-colour version in the exact palette. Stripes and rails are redrawn straight; the sigil still needs tracing into the vector master |

| Part | Decision |
|---|---|
| Field | Maroon `#5A0F1E`, wide cloth |
| Motifs | One wide central silver stripe, two thin stripes beside it, angled rails on both edges |
| Spires | A thin spire with a small diamond above and below the ring, cut through the stripe in maroon |
| Emblem | Silver `#C9CDD3`, one flat colour |
| Rose | Seen from above, petals around a spiral heart. The spiral is what makes it a rose: an earlier side-on version read as a lotus |
| Thorns | One clean closed ring touching the rose's petals, with long thorns radiating outward |
| Text | None on the banner. The name is set in type beside it |

**Rules.** Two colours only. No sword, shield or leaves. Never add a gradient or a glow to the flat version. Minimum size 48px tall; below that, use the rose head alone. The silver emblem may sit on Basalt without the cloth.

**Shape.** The source image is landscape, so the Arrival screen shows it as a wide hanging cloth rather than a tall standard.

## 4. Colour

| Token | Hex | Role |
|---|---|---|
| Basalt | `#120E0E` | Page background, warm near-black taken from the maroon |
| Stone | `#1E1817` | Raised surfaces |
| House | `#5A0F1E` | Maroon. Surfaces only: banner, selected tab, active states |
| Wine | `#8E2A3C` | Hairlines and focus halos on maroon. Not for text |
| Silver | `#C9CDD3` | Emblem, rail, headings |
| Bone | `#ECE7E1` | Body text |
| Ash | `#9A9496` | Secondary text |

Measured contrast:

| Pair | Ratio | Use |
|---|---|---|
| Bone on Basalt | 15.60 | Body |
| Silver on Basalt | 12.02 | Headings |
| Ash on Basalt | 6.44 | Secondary text |
| Bone on Stone | 14.26 | Text on cards |
| Ash on Stone | 5.88 | Secondary on cards |
| Silver on House | 8.65 | Text on maroon |
| Bone on House | 11.23 | Text on maroon |
| House on Basalt | 1.39 | **Never for text or icons** |
| Wine on Basalt | 2.33 | **Never for text**; decorative only |

No sand, no gold. Those belong to the films. Maroon and silver make this house its own.

## 5. Type

| Role | Face | Notes |
|---|---|---|
| Display | Marcellus (SIL Open Font License, self-hosted) | Letterforms from Roman inscriptions: carved, ceremonial. Regular weight only, wide tracking on capitals, house name and section titles only |
| Text and data | Satoshi (already in the project) | Keeps one thread to the portfolio. Tabular figures for all numbers |

Scale: 16 body, 20 lead, 28 small heading, 44 section title, `clamp(56px, 11vw, 168px)` house name. Line length under 70 characters. Reading text is sentence case. Capitals are reserved for the display face, so there are no small all-caps labels above headings.

## 6. Layout

**Concept: a descent.** One narrow column of content, set off-centre to the right of the rail, with very large gaps between sections. Sections are separated by space and darkness, not by dividers.

```
+----------------------------------------------------+
|  rose                                     Portfolio|
|   |                                                |
|   |          +--------+                            |
|   |          | BANNER |     HOUSE MAULANA          |
|   <          |        |     motto, once decided    |
|   |          |  rose  |                            |
|   |          |  and   |                            |
|   <          | thorns |                            |
|   |          +---V----+                            |
|   |                                                |
|   <       Character sheet                          |
|   |       ...                                      |
```

- **Thorn rail.** Fixed on the left on desktop: a thin silver stem with one thorn per section. Thorns are real links, labelled on hover and focus. The current thorn fills in. Scroll progress runs down the stem. It is a small, fixed nav, not a decorative line across content.
- **Phones.** The rail becomes a slim bar at the top showing the current section, opening a list.
- **Banner placement.** Hangs from the very top edge of the screen, cut by nothing, as the single large object in the hall.

### Sections

| Section | Treatment |
|---|---|
| Arrival | The banner and House Maulana, with the motto once decided. Nothing else competes |
| Character sheet | Two columns of label and value on bare Basalt, like an entry in a house register. Not a card grid |
| Now playing | One line of type per medium, music first. Only the music line updates live, with a small Last.fm credit |
| Records | The one data-rich moment after the banner. A large hours-per-month chart in silver with the current month in maroon-backed silver; ranked lists beside it, thin fine lines, corner brackets borrowed from EVE |
| Top 3 | Category switch, then genres. Cover art in silver and maroon duotone, turning full colour on hover or focus, so the page keeps its palette while every cover stays recognisable |
| Trophy room | A short ranked wall, deliberately sparse |
| Play with me | Steam, Riot ID, Discord, Spotify and Instagram as large rows with a copy action or profile link, and usual hours in WIB |
| Guestbook | Approved notes as plain lines, then a short form |
| Footer | Rose head, link back to the portfolio |

## 7. Motion

One orchestrated moment: on load, silver grains settle into the emblem over about two seconds, then everything is still. It reuses the dither idea already in the portfolio's About and Connect scenes.

- Cursor: grains near the pointer part slightly over the emblem, as in the prism and plane.
- Scroll: the rail fills. Nothing else animates on scroll.
- Sections do not fade or slide in. Darkness and space do the pacing.
- Hover and focus: colour changes only.
- No fluid cursor here. It belongs to the portfolio.
- Reduced motion: the emblem is complete on arrival and the rail still tracks position.

## 8. Entering and leaving

The portfolio footer gets one line of text, in the same style as "Back to top": **After Hours**. Clicking it fades the page to black, the banner rises from below, and the URL changes without a full reload. Returning reverses it. A direct visit to `/offline` starts at Arrival with the grain moment.
## 9. Writing

Plain sentences with a dry edge. The world lives in the banner and the arrival, not in every label, so section names stay clear: Character sheet, Now playing, Records, Top 3, Trophy room, Play with me, Guestbook.

| Instead of | Write |
|---|---|
| Chronicles of the Heir | Records |
| Summon this warrior | Copy Steam ID |
| The Archives are sealed | Music data updated 3 hours ago |

Errors say what happened and what to do, for example "That message is over 280 characters. Shorten it and send again."

## 10. Avoid

Sand and gold palette. Any Dune font, logo, name or quote. Parchment textures. Swords, shields and leafy wreaths. Glowing edges. Small uppercase labels. Monospace labels. Identical card grids. Motion on every section. A second bright element competing with the banner.

## 11. Next design step

Trace the sigil into a clean vector. Then mock up the Arrival screen and one Records block before building, to judge Marcellus at real size and the maroon against Basalt on a real screen.
