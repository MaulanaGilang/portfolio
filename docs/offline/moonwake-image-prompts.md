# Moonwake image prompts (round 2)

Everything you need to generate the remaining Moonwake art on your own and put it on the site: the new Archmagus (0), images 1 to 14, the two armoury sheets (15, 16), the two Still sheets and the two rank sheets. Changing the Ledger (games, shows, remixes, favourites) is at the end.

### Order to work in

1. **0. life-archmagus** first: `codex-rule` (4) and `ranks-2` attach it.
2. **1 to 14**, any order.
3. **15 and 16**, the armoury sheets.
4. **still-1, still-2, ranks-1, ranks-2**.

Tick them off here as you go:

| # | File | Shows in |
|---|---|---|
| 0 | life-archmagus | Archmagus character card, concept art |
| 1 | moonwake-hall | Codex "The Keep", Hall of Names tile |
| 2 | codex-magic | Codex "Magic" |
| 3 | codex-people | Codex "People" |
| 4 | codex-rule | Codex "Rule" |
| 5 | codex-lore | Codex "Lore" |
| 6 | codex-nature | Codex "Nature" |
| 7 | codex-regalia | Codex "Regalia" |
| 8 | wyrmwatch | Characters, concept art |
| 9 | env-city | Concept art, Moonwake page footer |
| 10 | env-market | Concept art |
| 11 | env-tower | Concept art |
| 12 | env-pool | Concept art |
| 13 | life-townsfolk | Characters, concept art |
| 14 | life-library | Characters, concept art |
| 15 | arms-steel | Concept art: weapons sheet, the steel |
| 16 | arms-stillstone | Concept art: weapons sheet, the glowing pieces |
| | still-1, still-2 | Concept art, the Still card |
| | ranks-1, ranks-2 | Concept art |

## Setup (same for every image)

- **Site:** higgsfield.ai, Image.
- **Model:** Nano Banana Pro. **Resolution:** 2K. **Count:** 1 (re-roll only if needed).
- **Aspect:** as listed per image (16:9 or 3:4).
- **Prompt:** copy the whole grey block. Every block already starts with the shared STYLE text, unchanged.
- **References:** attach only the files listed under each image, nothing else.

### Reference files

| Tag | File |
|---|---|
| [city] | `art-inbox/codex-hero.png` (or `public/offline/moonwake/codex-hero.webp`) |
| [crest] | `docs/offline/assets/moonwake/crest.png` |
| [archmagus] | `art-inbox/life-archmagus.png` (or `public/offline/moonwake/concept/life-archmagus.webp`) |
| [guard] | `art-inbox/watch-soldier.png` (or `public/offline/moonwake/concept/watch-soldier.webp`) |
| [wyvern] | `art-inbox/wyvern.png` (or `public/offline/moonwake/concept/wyvern.webp`) |

### Lessons from round 1 (read this, it saves credits)

1. **The model copies the layout of any image you attach.** Attach the city only when the picture should show the same city. For a brand-new composition, attach nothing but the crest.
2. **Edits can't move big things.** Raising walls or moving buildings by "editing" an image fails every time. Small edits (swap an emblem, remove one sword, recolour a weapon) work.
3. **Banners come out wrong unless the crest is attached.** Every prompt with banners lists [crest].
4. **"NSFW" flags are false alarms**: credits are refunded. They come from realistic face photos and shapes like a circle with a long rectangle. Remove that reference and try again.
5. **Re-roll before you rewrite.** Change the prompt only after the same problem appears twice.
6. **Want it sharper?** Use Upscale (2 credits) on a finished image instead of regenerating at 4K: it keeps the picture exactly.

### Putting the images on the site

1. Download each image and save it in `art-inbox/` with the exact name in its heading (for example `art-inbox/moonwake-hall.png`).
2. In the project folder run `node scripts/moonwake-art.mjs`. It converts everything in `art-inbox` to the right size and WebP and overwrites the site's files.
3. Check the pages locally (`npm run dev`, then `/offline` and `/offline/moonwake`), then commit and push.

The rank sheets (`ranks-1`, `ranks-2`) and the armoury sheets (`arms-steel`, `arms-stillstone`) are already wired into the concept gallery and appear automatically once their files exist. Everything else replaces an existing image.

After the new Archmagus is on the site, tell Claude (or edit it yourself): two captions still describe the old staff as "the black polearm with the red-violet orb" (the Archmagus card's Focus line in `src/data/offline.ts` and the concept-art caption in `src/data/codex.ts`).

Cost: 21 images at 2 credits = 42 credits without re-rolls. Budget about 52.

**Do the Archmagus (0) first.** It replaces the old design completely, and `codex-rule` (4) and `ranks-2` attach [archmagus], so they must use the new one: save it as `art-inbox/life-archmagus.png` before generating those.

---

## 0. life-archmagus (new design, replaces the old one)

Aspect **3:4**. Attach: **nothing**. The staff is described in words. If the shape comes out wrong, attach a tight crop of **only the staff head** from the reference painting (no figure, no cloak, no watermark), because a full reference gets its pose and red cloak copied. Do NOT attach the old Archmagus image. Shows in: the Archmagus character card and concept art.

The staff follows the new reference: a long plain shaft whose upper part is wrapped in overlapping scale-plates that curl over into a hooked crook cradling a glowing orb. It is recoloured to Moonwake: black first, with silver edges and a red-violet orb.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: Fantasy character design, fully clothed, full-length view of the Archmagus of the Coast, ruler of the city of Moonwake, standing in a moonlit stone courtyard beside a still pool at night. A calm young man with a warm Southeast Asian brown complexion, short neat black hair, and a composed, quiet expression; an ordinary, generic face. He wears long layered robes in wine red and black with fine silver embroidery, a high collar and a cream undershirt. In one hand he holds a tall staff standing on the ground, almost as tall as he is, its top reaching just below the top of his head. THE STAFF: a long, straight, slender shaft of matte black wood with a few thin silver bands, plain on the lower half. Along the upper part, overlapping curved black scale-plates spiral around the shaft, each plate edged with a fine line of silver, growing larger as they climb; at the top the plated shaft curls forward and over into a hooked crook, like the curled head of a sea serpent, its scales flaring into short silver-tipped spines. Held inside the curl of the crook is a round glowing orb of red-violet light, glass-clear with a brighter core, casting red-violet light on the black scales around it and on his hand. The staff is mostly black, with silver only as thin edges and bands; the only glow is the red-violet orb. Mist around his feet, wisteria hanging overhead, the moon reflected in the pool. No emblems or crests on the robes or staff. No text.
```

---

## 1. moonwake-hall

Aspect **16:9**. Attach: [city], [crest]. Shows in: the Codex "The Keep" chapter and the Hall of Names tile.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: The Hall of Names inside the Keep, a long vaulted hall carved from dark rock, in the same dark gothic stone as the city in the first reference image. The walls are covered floor to ceiling in rows of carved names inlaid with silver, drawn as abstract decorative glyphs, not readable letters, glinting in candlelight. Rows of tall candles, a long wine-red runner down the stone floor, wine-red banners hanging from the vaults, each banner bearing the crest from the second reference image (a wine-red circle with a thin black border, a wide silver crescent with its horns pointing DOWN arching over a smaller full silver moon). A tall window at the far end shows the moonlit sea. No people. Reverent and quiet. The lower left of the frame is calm and darker.
```

## 2. codex-magic

Aspect **16:9**. Attach: [city]. Shows in: Codex "Magic" chapter.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A young apprentice mage in a cream knitted sweater and a dark wine cloak kneels at the edge of the Still Pool, a round pool in an enclosed courtyard of dark gothic stone arcades inside the Keep, at night. She lifts one hand; a thin thread of red-violet light rises from the perfectly still water to her fingers and spreads into glowing mist around her. The moon is reflected in the pool, wisteria hangs over the arches, candles glow in stone niches. Wonder and quiet concentration. Same dark stone architecture as the city in the reference image. Fully clothed character, seen from the side.
```

## 3. codex-people

Aspect **16:9**. Attach: [city]. Shows in: Codex "People" chapter.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: Early morning on the stone quay of the harbour at the foot of the island's sheer cliff, from the reference image. Fisherfolk in cream knitted sweaters haul nets from a boat, a smith works at an open forge built against the cliff, a scribe with ink-stained hands carries scrolls, an old woman and a child sit on crates. Two neighbours greet each other with a hand on the heart. Behind them the cliff road and the wooden cargo lift climb up to the city walls. Mist lifting off the water, warm cream morning light against cool blue shadows. Lived-in and kind. Fully clothed characters, painted in the same style as the environment.
```

## 4. codex-rule

Aspect **16:9**. Attach: [archmagus], [guard], [crest]. Shows in: Codex "Rule" chapter.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: The council chamber of the Keep at night. Around a round dark wooden table sit four people: the Archmagus from the first reference image (same face, hair and skin tone, wine-and-black robes, his tall black staff leaning against his chair: a slender black shaft whose top is wrapped in silver-edged black scale-plates curling into a hooked crook that holds a glowing red-violet orb); his wife, a calm woman with long black hair in cream and silver; the commander of the city guard in the armour from the second reference image, helmet on the table; and the Keeper of the Pool, an elder in grey robes. On the table: a sea chart, stacks of silver coins and candles. A tall window shows the moonlit sea. A wine-red banner on the wall bears the crest from the third reference image (horns-down silver crescent over a full silver moon in a wine-red circle). Fully clothed characters.
```

## 5. codex-lore

Aspect **16:9**. Attach: nothing. Shows in: Codex "Lore" chapter.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A legend painted like a memory. On a bare, wild rocky island in the sea, long before any city stood there, a man and a woman in travelling cloaks stand hand in hand at the edge of a small round pool glowing red-violet. Above them, two moons are aligned one above the other in a deep slate sky. Wind in their cloaks, mist at their feet, the empty cliff top around them, the mainland coast far away. A soft vignette fades to dark at the edges like an old painting. Fully clothed figures seen from behind.
```

## 6. codex-nature

Aspect **16:9**. Attach: [city]. Shows in: Codex "Nature" chapter.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A wild garden on the mainland cliff top at night, looking across the water at the island city from the reference image in the distance. In the foreground: moonvine with pale softly glowing flowers, black blackthorn hedges, wild salt-roses and an ancient twisted wisteria. A calico cat sits on a low stone wall, watching the sea. Glowing petals drift in the air. Far over the water, a faint pale ghostly shape in the mist. A red-violet aurora above.
```

## 7. codex-regalia

Aspect **16:9**. Attach: [archmagus], [crest]. Shows in: Codex "Regalia" chapter.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A still life of the regalia of House Maulana on a dark wooden table in candlelight, no people: the wine-and-black ceremonial robe with silver thread from the first reference image draped on a stand, a folded cream knitted sweater, a sea-leather belt, a light silver-plated shoulder guard, spools of pale thread, silver coins, and a silver signet ring shaped like the crest from the second reference image (horns-down crescent arching over a full moon) resting on wine velvet. Stone wall behind, one candle-lit window.
```

## 8. wyrmwatch

Aspect **16:9**. Attach: [city], [wyvern], [guard], [crest]. Shows in: Characters and concept art.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: The Wyrmwatch at dusk: two huge armoured war wyverns, the same design as the second reference image (slate-grey scales, two legs, wings as arms, wine-red quilted padding, steel barding, one saddle each), glide past the sheer cliffs and ring walls of the island city from the first reference image. Each carries one rider in the guard armour from the third reference image, plain steel, holding a rifle. The giant bridge and the harbour far below, the sea glowing with the last light. A wine-red pennant on one saddle bears the crest from the fourth reference image. Each wyvern has exactly one head, two legs and two wings.
```

## 9. env-city

Aspect **16:9**. Attach: [city], [crest]. Shows in: concept art "Moonwake at dawn" and the Moonwake page footer.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: The same island city as the first reference image, at DAWN, seen from lower down at sea level near the harbour, looking up the sheer cliff. First warm cream light touches the top of the Keep and the ring wall while the cliff and the harbour are still in blue shadow. Fishing boats heading out, mist lifting off the water, the giant bridge crossing to the mainland on the left, an airship leaving the sky port. Wine-red banners on the walls bear the crest from the second reference image.
```

## 10. env-market

Aspect **3:4**. Attach: [city], [crest]. Shows in: concept art "Lantern stairs".

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A market street inside the city at night that is a steep stone stairway climbing between tall dark gothic houses, the same architecture as the first reference image, toward the inner ring wall. Hanging lanterns all along it glowing warm cream, small stalls of spices, fish and silver, a few cloaked townsfolk, moonvine on the walls, the moon in a slice of sky above. A small wine-red banner bears the crest from the second reference image. Vertical composition.
```

## 11. env-tower

Aspect **3:4**. Attach: [city]. Shows in: concept art "The watchtower".

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: The slender watchtower on top of the Keep of the city in the reference image, on a storm night, seen from below. Rain lashing, one lit window high up, huge waves breaking against the island's sheer cliff far below, lightning and a red-violet aurora tearing across the clouds. Vertical composition, the tower tall and thin against the sky.
```

## 12. env-pool

Aspect **3:4**. Attach: nothing. Shows in: concept art "The Moonwell".

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: The Moonwell, a vast dark cavern deep under the island city, holding a perfectly still underground lake. The lake bed is set with pale stones glowing red-violet from below, lighting the cavern walls. Worn stone steps lead down to the water's edge, where a single robed keeper with a silver vessel and a lantern stands, tiny against the cavern. Vertical composition.
```

## 13. life-townsfolk

Aspect **16:9**. Attach: [city]. Shows in: Characters "The Townsfolk" and concept art.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: The people of Moonwake standing side by side on a street inside the city from the reference image, in the evening, with clear space between them: a fisherwoman in a cream knitted sweater and oilskin, a broad smith in a leather apron, a thin scribe with ink-stained fingers, a white-haired elder with a cane, and a child holding a lantern. Dark gothic houses and lantern light behind them. Fully clothed characters, painted in the same style as the environment.
```

## 14. life-library

Aspect **3:4**. Attach: nothing. Shows in: Characters "The Cat" and concept art.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Full-bleed image, edge to edge: no border, no frame, no paper, no sketch or pencil lines, not an illustration on a page. Rich matte-painting environments with visible soft brushstrokes, clean graphic shapes, slightly stylised architecture with exaggerated tall verticals, crisp painted detail up close and soft atmospheric haze in the distance. Cinematic lighting with strong colour contrast: cool slate-blue shadows against warm cream candlelight and glowing red-violet magic, luminous painted skies with sculpted clouds, volumetric light shafts and floating glowing particles. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, moonlit slate blue, red-violet glow. Mood: quiet, deep, held. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: The library of the Keep at night: tall dark wooden shelves full of books and scrolls, a deep stone window seat where a calico cat sleeps on the windowsill in the moonlight, two scribes reading by candlelight at a long desk, a wooden ladder, dust drifting in the light from the gothic window. Vertical composition, the cat in the upper part of the frame.
```

## 15. arms-steel

Aspect **16:9**. Attach: [guard] (for the style and the longsword). Shows in: concept art "The armoury: steel". Nothing on this sheet glows: in Moonwake the stone goes only in the weapons on sheet 16.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Clean, crisp painted detail, visible soft brushstrokes, clean graphic shapes. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, red-violet glow. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A weapon design sheet of the city guard's armoury on a plain warm-grey painted background, in the same painted style as the reference image (use it only for the art style and the longsword). Laid out flat in a neat row, side by side with clear empty space between them, nothing overlapping, each shown whole: a tall spear with a leaf-shaped head, a short arming sword in its scabbard, a round wooden shield with a plain steel rim and boss, a halberd, the longsword from the reference image, a heater shield painted plain wine red, and a huge two-handed greatsword. Blackened steel with plain silver fittings, wine-red leather grips and wrappings, dark wood hafts. Practical and plain: no gems, no glowing parts, no engravings, no emblems. Evenly lit. No people. No labels, no text.
```

## 16. arms-stillstone

Aspect **16:9**. Attach: [guard] (for the rifle). Shows in: concept art "The armoury: stillstone". These are the glowing pieces: each has a core of stillstone, the pale stone from the Moonwell that soaks up magic and fires it back.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Clean, crisp painted detail, visible soft brushstrokes, clean graphic shapes. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, red-violet glow. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A weapon design sheet of the city's stillstone arms on a plain warm-grey painted background, in the same painted style as the reference image. Laid out in a neat row, side by side with clear empty space between them, nothing overlapping, each shown whole: the long rifle with the glowing crystal tube from the reference image; a heavy single-shot pistol with a short glowing tube under the barrel; a short black wand tipped with a small glowing stone; a glaive (a long pole with a broad curved blade) whose cutting edge glows faintly; a tall staff topped with a caged lantern holding a glowing stone; and a long ceremonial sword with a glowing line along the groove of its blade. In front of them, three raw uncut pieces of stillstone: pale, milky, almost white stone, one dull and empty, one half full, one glowing bright. Every glowing part is pale stone lit red-violet from inside, set behind blackened steel and silver housings with thin channels where the light runs. Evenly lit. No people. No labels, no text.
```

---

## still-1 (The Still, I to VI)

Aspect **16:9**. Attach: [guard] (for the art style only). Shows in: concept art and the Still character card. Regions: I Noxus, II Piltover, III Zaun, IV Ionia, V Demacia, VI Freljord.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Clean, crisp painted detail, visible soft brushstrokes, clean graphic shapes. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, red-violet glow. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A character lineup design sheet on a plain warm-grey painted background, in the same painted style and sheet layout as the reference image (use it only for the art style and background, not for armour): SIX members of the Still, an elite unit gathered from different lands, standing in a row, full body, front view, with clear empty space between them, nothing overlapping. Every figure wears the same long black hooded cloak with silver trim over their clothes, hood up, face in shadow; under the open cloak each wears the armour and clothing of their own homeland, so all twelve look different but read as one unit. Left to right: (I) from a brutal militaristic empire: heavy blackened iron plate with red accents and spiked pauldrons, a massive two-handed executioner's axe with a hooked blade; (II) from a gleaming city of inventors: tailored brass-buttoned coat and a top-hat-like hood brim, a long brass sniper rifle with a scope and a glowing BLUE crystal core; (III) from a polluted undercity: patched leather, goggles and a breathing mask, a chunky chemical grenade launcher with glowing GREEN canisters on the belt; (IV) from a serene land of spirits and martial arts: flowing layered silks and light lacquered armour, a single long curved sword in a sheath at the hip; (V) from a noble kingdom of knights: polished white-and-gold plate, a tall tower shield of pale grey-white stone and a flanged mace; (VI) from a frozen north: heavy furs and leather, braided hair visible under the hood, a heavy recurve bow carved from pale blue ice, not glowing. ONLY II's blue core and III's green canisters glow; everything else is plain iron, steel, wood, stone or ice. Fully clothed characters. No labels, no text.
```

## still-2 (The Still, VII to XII)

Aspect **16:9**. Attach: [guard] (for the art style only). Shows in: concept art. Regions: VII Shurima, VIII Bilgewater, IX Shadow Isles, X Targon, XI Ixtal, XII the Void.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Clean, crisp painted detail, visible soft brushstrokes, clean graphic shapes. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, red-violet glow. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A character lineup design sheet on a plain warm-grey painted background, in the same painted style and sheet layout as the reference image (use it only for the art style and background, not for armour): SIX more members of the Still, an elite unit gathered from different lands, standing in a row, full body, front view, with clear empty space between them, nothing overlapping. Every figure wears the same long black hooded cloak with silver trim over their clothes, hood up, face in shadow; under the open cloak each wears the armour and clothing of their own homeland, so all twelve look different but read as one unit. Left to right: (VII) from a desert empire of sun and gold: light gold-and-white desert armour and wrapped cloth, holding a large golden four-bladed throwing glaive; (VIII) from a lawless pirate port: a weathered sea coat and bandolier, a heavy harpoon gun with a coiled chain over the shoulder and a cutlass at the hip; (IX) from a cursed island of the dead: tattered grey robes and rusted chains, a long chain-sickle and a hanging lantern leaking glowing sickly GREEN black mist; (X) from a sacred mountain of the stars: bronze-and-gold armour with star motifs, a long spear and a round bronze shield; (XI) from a hidden jungle of elemental magic: jade and feathered jungle gear with gold bands, a long blowpipe with a quiver of darts and an obsidian knife; (XII) from beyond reality: dark armour partly overgrown with alien purple-black chitin, the right forearm ending in a long curved blade of the same chitin with a faint PURPLE glow. ONLY IX's mist and XII's blade glow; everything else is plain metal, wood, gold or leather. Fully clothed characters. No labels, no text.
```

## ranks-1 (Ranks 1 to 7: the soldiers)

Aspect **16:9**. Attach: [guard], [crest]. Shows in: concept art "Ranks: the soldiers".

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Clean, crisp painted detail, visible soft brushstrokes, clean graphic shapes. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, red-violet glow. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A rank lineup design sheet of the city guard on a plain warm-grey painted background: SEVEN soldiers standing in a row, full body, front view, from lowest rank on the left to highest on the right, with clear empty space between them, nothing overlapping. Their gear grows heavier and finer from left to right, all in the palette and style of the guard in the first reference image (dark steel, wine-red cloth, plain armour, no gems). (1) Recruit: padded cloth jacket, plain wine tabard, open steel cap, a spear. (2) Watchman: mail shirt, wine tabard, round wooden shield and an arming sword. (3) Rifleman: leather and mail, steel cap, the rifle with the glowing crystal tube from the reference image. (4) Sergeant: half plate over mail, open helmet, a halberd. (5) Knight: full dark plate, visored great helm, wine tabard, longsword, exactly like the reference guard. (6) Knight Captain: ornate dark plate with silver edging, short wine cape, a greatsword. (7) Knight Commander: the finest plate with silver detail, long wine cloak, longsword at the hip and the crystal rifle on the back, a small crest from the second reference image on the cloak clasp. Only the rifles' crystal tubes glow. No labels.
```

## ranks-2 (Ranks 8 to 12: the mage path)

Aspect **16:9**. Attach: [archmagus], [guard]. Shows in: concept art "Ranks: the mage path".

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Clean, crisp painted detail, visible soft brushstrokes, clean graphic shapes. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, red-violet glow. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A rank lineup design sheet of the mage path on a plain warm-grey painted background: FIVE figures standing in a row, full body, front view, from lowest rank on the left to highest on the right, with clear empty space between them, nothing overlapping. Robes grow richer from left to right, in wine red, black and silver. (8) Mistweaver: a hooded robe over mail, faint red-violet mist curling at the feet, a short wand in one hand and a dagger at the belt. (9) Moonwarden: an armoured robe with steel shoulder plates, a glaive (a long pole with a curved blade) with a faintly glowing edge. (10) Lampbearer: a ceremonial wine robe, holding a tall staff topped with a glowing red-violet lantern. (11) Warden of the Still Pool: high black-and-silver robes, a long ceremonial blade held point-down, faint glow along its fuller. (12) Archmagus of the Coast: the man from the first reference image, exactly as he is: same face, hair and skin tone, wine-and-black robes with silver thread, holding his staff exactly as in that image: almost his own height, a slender black shaft whose upper part is wrapped in silver-edged black scale-plates curling into a hooked crook that holds a glowing red-violet orb. The armour pieces follow the second reference image, plain with no gems. Fully clothed characters. No labels.
```

---

# Changing the Ledger (no images needed)

Everything in the Ledger on `/offline` lives in one file: `src/data/offline.ts`. Edit it, save, then commit and push; Vercel puts it live in about a minute. You can do this on github.com too, even from your phone: open the file, tap the pencil icon, edit, then "Commit changes".

Keep the punctuation exactly as in the lines around it: each entry is wrapped in `{ }`, text goes in double quotes, and every entry ends with a comma.

### Now playing: games (`nowPlaying`, the "Playing" block)

- **A Steam game:** open its Steam store page. The number in the link is its ID (store.steampowered.com/app/**761890**/Albion_Online). The cover and your hours come from Steam on their own.
  ```ts
  { title: "Albion Online", steamAppId: 761890 },
  ```
- **A game not on Steam:** give it a poster, either a full image link or a file you put in `public/offline/posters/`.
  ```ts
  { title: "League of Legends", poster: "/offline/posters/league-of-legends.webp" },
  ```

### Now playing: shows (`nowPlaying`, the "Watching" block)

Find the show on themoviedb.org, right-click the poster, choose "Copy image address", and change the size part right after `/t/p/` (for example `original` or `w600_and_h900_bestv2`) to `w500` so it loads faster.

```ts
{ title: "Arcane", poster: "https://image.tmdb.org/t/p/w500/87C0wecB8bHb1PsrKBI4kJiEkgV.jpg" },
```

To stop showing something, delete its line.

### Top remixes (`remixes`)

The order is the ranking: the first line is #1. Up to five are shown. `id` is the part of the YouTube link after `watch?v=` or `youtu.be/`; the thumbnail is fetched on its own. Copy the title and channel from the video page.

```ts
{ id: "agneRtEe-t8", title: "Ariana Grande - bye [Altare Remix]", channel: "Altare" },
```

### Favourites (`favourites`)

Three lists (Games, Movies, Anime), unranked. Each entry has a title, a year and a poster link (TMDB, MyAnimeList or Wikipedia).

```ts
{ title: "Dune", year: 2021, poster: "https://image.tmdb.org/t/p/w500/v1tRXZ4JtD2Iv6fjkPvT4GiwslV.jpg" },
```

### What updates by itself

- **Recently played and On repeat** come from ListenBrainz (keep its Spotify connection on).
- **Steam hours** come from Steam.
- **Guestbook notes** appear once you tick "approved" in Supabase (Table Editor > guestbook).

None of these need code changes.
