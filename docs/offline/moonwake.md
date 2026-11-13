# Moonwake: rework plan

Status: **built** (all six phases, November 2026), then reworked twice. `/offline` now follows the structure of a saga site (huxleysaga.com, structure and layout only): a black top bar, the city's name across a full-screen painting, a saga line, two feature images that open out as they scroll in, a Story block, a framed character panel with a thumbnail strip, a quote carousel, list sections (Library, Long Bridge, Long Table), big-number Ledger rows, four framed stats, Now Playing cards, and a footer with the wordmark across the page. Type is Arcane Nine (wordmark and titles, `src/fonts/ArcaneNine.otf`) and Geist Mono (everything else). The Moonwell rail, fixed scenes and on-page Codex described below were removed; the Codex lives at `/offline/moonwake`, reached from "Open the Codex", "Discover more" and the top bar (the map and the dragon easter egg were removed), and ends with concept-art mosaics (Environments, Life in Moonwake, The Moonwatch) in `public/offline/moonwake/concept/`, listed in `conceptGalleries` in `src/data/codex.ts`. This is the current design for `/offline` and replaces the Dune direction in [design.md](design.md). Content, live Steam stats, posters, guestbook and the portfolio link all carried over.

Where things live: crest `src/components/offline/Crest.tsx` (source `assets/moonwake/crest.svg`), Codex text `src/data/codex.ts`, page content `src/data/offline.ts`, rail `Moonwell.tsx`, cursor light and mist `Lamp.tsx`, familiar `Wyvern.tsx`, scenes `public/offline/moonwake-*.webp`, styles `src/app/offline/offline.css`.

## 1. Decisions

| Area | Decision |
|---|---|
| World | **Moonwake**, a coastal cliff-city of House Maulana in Runeterra, where the spirit world and arcane craft meet. Fan work under Riot's fan content policy: Riot's region names are used, Riot's art, logos and fonts are not |
| Mood | Quiet, deep, held. Candle and moonlight, mist off the water, a slow heartbeat underneath |
| Crest | Wine-red circle, thin black border, silver crescent with horns down, centred: [assets/moonwake/crest.svg](assets/moonwake/crest.svg) |
| Motto | *Quiet, eternal, and ours.* |
| Fonts | **Arcane Nine** (Chequered Ink, supplied by Gilang; check its licence) for the wordmark and titles, **Geist Mono** (SIL OFL) for everything else on the saga pages. Cinzel stays loaded only as the fallback while Arcane Nine loads |
| Ranks | Albion's shared twelve, then Moonwake's own nine (section 4) |
| Place names on the page | Riot's regions as written: Ionian spirit-villages, the Noxian outpost, Piltover-style trade cities |
| Disclaimer | Required by Riot's fan content policy. Shown in the After Hours footer, verbatim: "House Maulana isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc." The page stays free: no ads, no sales |

## 2. Design system (current: the saga system)

One system for both pages: After Hours (`/offline`) and the Moonwake page (`/offline/moonwake`), joined by the "saga" view transition (`SagaPage`, rules in `globals.css`). Structure and layout follow a saga site (huxleysaga.com); no assets, text or fonts were taken from it. Styles: the "After Hours: a saga site" block of `src/app/offline/offline.css`, plus the map, chapter and concept-art blocks after it.

### Colour

| Token | Value | Role |
|---|---|---|
| `--basalt` | `#0A0809` | Page |
| `--hx-panel` / `--hx-panel-2` | `#0D0B0C` / `#141113` | Framed panels, list rows; the second for hover and highlight |
| `--hx-border` | bone at 12% | Every hairline and frame |
| `--bone` | `#ECE7E1` | Primary text, titles, marks |
| `--hx-grey` | `#9A9294` | Secondary text, labels |
| `--lamp` | `#B8306E` | Red-violet: light only (glows, link hover) |
| `--house` | `#5A0F1E` | Wine: active button fill, blank poster cards |

### Type

| Role | Face | Size |
|---|---|---|
| Wordmark (MOONWAKE) | Arcane Nine, one span per letter, spread edge to edge | `15.4vw` |
| Titles (`.hx-h1`, `.hx-h2`) | Arcane Nine | `clamp(44px, 5.6vw, 84px)`, `clamp(30px, 2.6vw, 40px)` |
| Card and cell titles (`.hx-h3`) | Geist Mono, uppercase | 17 to 21px |
| Text (`.hx-small`, `.hx-small-white`) | Geist Mono, uppercase, tracked 0.1em | 13px |
| Lede and quotes | Geist Mono, uppercase | `clamp(22px, 2.2vw, 32px)`; quotes up to 76px |
| Big numbers | Geist Mono 300 | up to 92px |

### Marks

- **Ticked hairline** (`.hx-rule`): a 1px line with brighter 8px ticks at both ends. Opens every section.
- **Crosshairs** (`.hx-plus-*`): small + marks in the corners of full-bleed paintings.
- **Dot mark** (`.hx-dot-mark`): a 4px square under titles and inside captions.
- **Bracket link** (`.hx-bracket`): `[ Learn more ]`.
- **Square dot** in the top bar before the first link.

### Components

| Component | Where |
|---|---|
| Top bar (`TopBar`): links left, crest and house centre, "Back to the portfolio" right, 40px on a hairline | Both pages |
| Hero: painting with the wordmark across the top, two corner captions | Both pages |
| Saga line (`.hx-intro`): title plus large grey lede | Both pages |
| Feature block: inset image that opens to full width on scroll, title bottom left | After Hours |
| Story block: centred over a full-bleed painting, line running down | After Hours |
| Framed entry (`.hx-char`): image cell, name cell, text cell, two-column fact cells | Characters; every Codex chapter (alternating sides) |
| List (`.hx-list`): dot, key, value, end column on panel rows | Library, Long Bridge, Long Table, chapter index |
| Big-number rows (`.hx-events`), framed stats (`.hx-stats`), cards (`.hx-card`) | Ledger, Stats, Now Playing |
| Rank grid (`.hx-ranks`): three columns; Moonwake's own nine highlighted | The Moonwatch chapter |
| Concept mosaic (`ConceptGallery`): 4-column grid, double-width tiles, lift and frame on hover with a mono caption; titles kept on touch | Moonwake page |
| Footer (`SagaFooter`): painting with a framed quote, wordmark across the page, link columns, the familiar, Riot's disclaimer | Both pages |

### Motion

- Wordmark letters flicker in one by one on load.
- Feature images open from an inset frame, story paintings drift, and the right-edge scroll bar fills (CSS scroll-driven animations; static where unsupported).
- Page to page: the old page closes into black, the new one opens from the middle like a shutter.
- Reduced motion: all of it is off and everything shows complete.

## 3. Signature pieces (original plan, partly superseded)

| Piece | What it does |
|---|---|
| **The Moonwell** (replaces the thorn rail) | A slim vertical well on the left. Its water drains as you scroll and slowly refills when you stop, like magic that runs low and is refilled. Section markers sit on it; the current one is lit red-violet |
| **Lamp in the fog** | A soft red-violet light follows the cursor through slow drifting mist, faintly lighting silver details. Mouse only |
| **Intro** | The crest's crescent rises over still water; the well fills to the brim as the page settles. Replaces the grain effect |
| **Quiet Hour transition** | Crossing to or from the portfolio: fade to silence (black), then the moon rises |
| **Wyvern familiar** | A small wyvern (two legs, two wings) asleep in the footer; hover and it opens one eye. Decoration only |
| **Scenes** | Four new backgrounds, crossfading as you scroll: the Long Bridge in mist, the Moonwell courtyard, the Hall of Names, the harbour under the red-violet aurora |

## 4. The Moonwatch ranks

Shared (from Albion Online): Mercenary, Recruit, Scout, Guard, Footman, Skirmisher, Legionnaire, Man at Arms, Knight Errant, Knight Defender, Knight Champion, Knight Commander.

Moonwake's own:

| # | Rank | Meaning |
|---|---|---|
| 13 | Wellborn | First touched by the pool |
| 14 | Tidecaller | Can draw water-magic |
| 15 | Mistweaver | Shapes fog; the first real spells |
| 16 | Moonwarden | Guards the city at night |
| 17 | Lampbearer | Trusted to carry the red-violet light |
| 18 | Wellkeeper | Feeds and refills the pool |
| 19 | Stormbinder | Holds back the sea at the cliffs |
| 20 | Warden of the Still Pool | Keeper of the house's magic |
| 21 | Archmagus of the Coast | Rules the city and holds the well |

## 5. Page structure

| # | Section | Contents | Scene |
|---|---|---|---|
| 1 | **Moonwake** | Crest, house name, motto, one line of intro | Long Bridge |
| 2 | **Codex** | Tabs: Land, Nature, Magic, People, Regalia, The Keep, The Moonwatch, Rule, Lore. Each tab: a short paragraph and a few facts | Long Bridge |
| 3 | **The Archmagus** | Gilang Maulana, Archmagus of the Coast; all-rounder mage; wyvern familiar; languages; Now playing (with posters) | Moonwell courtyard |
| 4 | **The Ledger** | Live Steam stats, most played, last two weeks, playlists | Hall of Names |
| 5 | **The Library** | Favourites: games, movies, anime (with posters) | Hall of Names |
| 6 | **The Long Bridge** | Accounts and play hours | Harbour |
| 7 | **The Long Table** | Guestbook | Harbour |

### Codex content (from Gilang's answers)

| Tab | Covers |
|---|---|
| Land | Cliff-city over deep water, one bridge in and out; mist, long cool autumns, storms; the Long Bridge, the Still Pool, the Hall of Names; neighbours |
| Nature | Moonvine, blackthorn, salt-roses, the old wisteria; the calico cat as sacred animal; cliff-wraiths, sirens, things on the bridge; glowing petals and the red-violet aurora |
| Magic | The Moonwell under the city; red-violet like a lamp in fog; limited, must be refilled; the pool chooses; the Quiet Hour, once a year |
| People | A few thousand: fisherfolk, smiths, scribes; greeting and "We're here"; Moonwake Night (24 March), the Long Table, the Day of Names; spiced food; strings, gamelan-like tones, drums |
| Regalia | Wine, black, silver, cream; cream sweaters day to day, silver-threaded ceremony; moonvine thread, sea-leather; the crescent-over-pool ring; light silver-plated armour |
| The Keep | Carved from the cliff; pale stone, black timber, silver inlay; the long table and the hearth; library, moonvine garden, watchtower, the hidden room |
| The Moonwatch | Ranks (section 4); patient, defensive fighting; the Still, twelve who never speak; battle cry "Quiet."; the Bridge Stand |
| Rule | Archmagus of the Coast; council of three; allies and rivals; the house code |
| Lore | Founding by Gilang Maulana I and Yuki; the Long Silence; the Lamp; the prophecy; today's threats |

## 6. Assets to make

| Asset | How | Cost |
|---|---|---|
| Crest | Done (vector) | Free |
| Four scenes | FLUX.2 on Higgsfield, recoloured to the palette | About 4 credits |
| Wyvern familiar | Mask image (`public/offline/wyvern.png`) | Free |
| Fonts | Google Fonts through `next/font` | Free |

## 7. Build phases

| Phase | Work |
|---|---|
| 1 | Design tokens, fonts, panels, dividers; swap the Dune styles out |
| 2 | Arrival with the crest and new intro; Quiet Hour transition |
| 3 | The Moonwell rail and the lamp cursor |
| 4 | Codex section with tabs and content |
| 5 | Rename and restyle the other sections; four new scenes |
| 6 | Familiar, polish, accessibility and reduced-motion pass |

Each phase is checked in the browser on desktop and phone before the next.

## 8. Open items

- Optional: real names for the Codex characters beyond Gilang Maulana I and Yuki.

## 9. Military look: the Stillstone Order

Chosen November 2026 over Trench Crusade, Lantern Watch, Tide Knights and other directions. The bed of the Moonwell yields **stillstone**, pale stone that soaks up magic, stores it and glows red-violet as it fills (Moonwake's own material, deliberately different from Demacia's petricite: it gives magic back). The Moonwatch are knights in dark plate set with stillstone panels, wine surcoats, one crescent (horns down) on the chest. The armoury is knightly steel plus discharge weapons with stillstone cores. Each of the Still carries one stillstone relic with a different stored spell (roster: `stillRoster` in `src/data/codex.ts`). Art: `public/offline/moonwake/concept/` (`watch-soldier`, `arms-steel`, `arms-stillstone`, `still-1`, `still-2`), generated with GPT Image through Figma (file: Moonwake concept art).
