# Moonwake: rework plan

Status: **built** (all six phases, November 2026), then reworked twice. `/offline` now follows the structure of a saga site (huxleysaga.com, structure and layout only): a black top bar, the city's name across a full-screen painting, a saga line, two feature images that open out as they scroll in, a Story block, a framed character panel with a thumbnail strip, a quote carousel, list sections (Library, Long Bridge, Long Table), big-number Ledger rows, four framed stats, Now Playing cards, and a footer with the wordmark across the page. Type is Arcane Nine (wordmark and titles, `src/fonts/ArcaneNine.otf`) and Geist Mono (everything else). The Moonwell rail, fixed scenes and on-page Codex described below were removed; the Codex lives at `/offline/moonwake`, reached through the map that opens when the dragon in the footer is woken, and ends with concept-art mosaics (Environments, Life in Moonwake, The Moonwatch) in `public/offline/moonwake/concept/`, listed in `conceptGalleries` in `src/data/codex.ts`. This is the current design for `/offline` and replaces the Dune direction in [design.md](design.md). Content, live Steam stats, posters, guestbook and the portfolio link all carried over.

Where things live: crest `src/components/offline/Crest.tsx` (source `assets/moonwake/crest.svg`), Codex text `src/data/codex.ts`, page content `src/data/offline.ts`, rail `Moonwell.tsx`, cursor light and mist `Lamp.tsx`, familiar `Dragon.tsx`, scenes `public/offline/moonwake-*.webp`, styles `src/app/offline/offline.css`.

## 1. Decisions

| Area | Decision |
|---|---|
| World | **Moonwake**, a coastal cliff-city of House Maulana in Runeterra, where the spirit world and arcane craft meet. Fan work under Riot's fan content policy: Riot's region names are used, Riot's art, logos and fonts are not |
| Mood | Quiet, deep, held. Candle and moonlight, mist off the water, a slow heartbeat underneath |
| Crest | Wine-red circle, thin black border, silver crescent with horns down, centred: [assets/moonwake/crest.svg](assets/moonwake/crest.svg) |
| Motto | *Quiet, eternal, and ours.* |
| Fonts | **Cinzel Decorative** for "Moonwake" only; **Cinzel** for titles; **Cormorant SC** for labels; **Cormorant Garamond italic** for the motto; **Satoshi** for body. All open licence |
| Ranks | Albion's shared twelve, then Moonwake's own nine (section 4) |
| Place names on the page | Riot's regions as written: Ionian spirit-villages, the Noxian outpost, Piltover-style trade cities |
| Disclaimer | Required by Riot's fan content policy. Shown in the After Hours footer, verbatim: "House Maulana isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc." The page stays free: no ads, no sales |

## 2. Design system

### Colour

| Token | Hex | Role |
|---|---|---|
| Night | `#0A0809` | Page |
| Wine | `#5A0F1E` | House colour: crest, active states, large surfaces |
| Moon | `#C9CDD3` | Silver: inlay lines, titles, icons |
| Cream | `#F0E8D6` | Body text, cloth |
| Lamp | `#B8306E` | Red-violet magic. **Light only**: glows, halos, the lit marker. Never a flat fill, never text |
| Abyss | `#16303A` | The well's depth: scene tints and shadows only |

### Type scale

| Role | Face | Size |
|---|---|---|
| House name | Cinzel Decorative | `clamp(48px, 8vw, 128px)` |
| Section title | Cinzel | 32 to 44px, tracked 0.08em |
| Label | Cormorant SC | 14 to 15px, tracked 0.12em |
| Motto, quotes | Cormorant Garamond italic | 22 to 28px |
| Body | Satoshi | 16 to 18px |

### Components

- **Panel:** carved stone with silver inlay. Dark fill, thin double silver line, small crescent notches at two corners. No glass blur.
- **Divider:** one flat silver line (the pool surface) with a tiny crescent at its centre.
- **Button:** wine fill, silver hairline. On hover a red-violet glow rises from below, slowly.
- **Link:** cream; on hover a silver underline draws in from the left.

### Motion

- Slow and weighted: 0.8 to 1.5 s, long ease-out. Nothing snaps.
- One heartbeat: the crest and lamp glows breathe every ~4 s, very faintly.
- Reduced motion: everything is still and complete; the well shows its level without animating.

## 3. Signature pieces

| Piece | What it does |
|---|---|
| **The Moonwell** (replaces the thorn rail) | A slim vertical well on the left. Its water drains as you scroll and slowly refills when you stop, like magic that runs low and is refilled. Section markers sit on it; the current one is lit red-violet |
| **Lamp in the fog** | A soft red-violet light follows the cursor through slow drifting mist, faintly lighting silver details. Mouse only |
| **Intro** | The crest's crescent rises over still water; the well fills to the brim as the page settles. Replaces the grain effect |
| **Quiet Hour transition** | Crossing to or from the portfolio: fade to silence (black), then the moon rises |
| **Dragon familiar** | A small dragon curled asleep in a corner; hover and it opens one eye |
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
| 3 | **The Archmagus** | Gilang Maulana, Archmagus of the Coast; all-rounder mage; dragon familiar; languages; Now playing (with posters) | Moonwell courtyard |
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
| Dragon familiar | Small vector drawing | Free |
| Fonts | Google Fonts through `next/font` | Free |

## 7. Build phases

| Phase | Work |
|---|---|
| 1 | Design tokens, fonts, panels, dividers; swap the Dune styles out |
| 2 | Arrival with the crest and new intro; Quiet Hour transition |
| 3 | The Moonwell rail and the lamp cursor |
| 4 | Codex section with tabs and content |
| 5 | Rename and restyle the other sections; four new scenes |
| 6 | Dragon easter egg, polish, accessibility and reduced-motion pass |

Each phase is checked in the browser on desktop and phone before the next.

## 8. Open items

- Optional: real names for the Codex characters beyond Gilang Maulana I and Yuki.
