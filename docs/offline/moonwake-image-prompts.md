# Moonwake image prompts (round 2)

Everything you need to generate the remaining Moonwake art on your own and put it on the site. Images 1 to 14, the two Still sheets and the two rank sheets.

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

The rank sheets (`ranks-1`, `ranks-2`) are already wired into the concept gallery and appear automatically once their files exist. Everything else replaces an existing image.

Cost: 18 images at 2 credits = 36 credits without re-rolls. Budget about 45.

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

SUBJECT: The council chamber of the Keep at night. Around a round dark wooden table sit four people: the Archmagus from the first reference image (same face, middle-part black hair, wine-and-black robes, his black polearm with the red-violet orb leaning against his chair); his wife, a calm woman with long black hair in cream and silver; the commander of the city guard in the armour from the second reference image, helmet on the table; and the Keeper of the Pool, an elder in grey robes. On the table: a sea chart, stacks of silver coins and candles. A tall window shows the moonlit sea. A wine-red banner on the wall bears the crest from the third reference image (horns-down silver crescent over a full silver moon in a wine-red circle). Fully clothed characters.
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

---

## still-1 (The Still, I to VI)

Aspect **16:9**. Attach: [guard]. Shows in: concept art and the Still character card.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Clean, crisp painted detail, visible soft brushstrokes, clean graphic shapes. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, red-violet glow. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A character lineup design sheet on a plain warm-grey painted background: SIX members of the Still, silent elite guards, standing in a row, full body, front view, with clear empty space between them, nothing overlapping. All six wear the same long black hooded cloak with silver trim, hoods up, faces hidden in shadow, dark plain steel armour under the cloak like the reference image (no gems). Left to right: (I) a huge two-handed greatsword, sheathed on the back, the hilt rising above the shoulder; (II) paired curved daggers, one in each hand; (III) a long marksman rifle with a glowing red-violet crystal core, like the rifle in the reference image; (IV) a long spear with a small wine-red pennant; (V) a huge rectangular tower shield and a short sword; (VI) a harpoon with a coiled chain over the shoulder. Only III's rifle core glows; every other weapon is plain steel, wood or leather. Fully clothed characters. No labels.
```

## still-2 (The Still, VII to XII)

Aspect **16:9**. Attach: [guard]. Shows in: concept art.

```text
STYLE: a frame from a high-budget animated fantasy series that blends 3D models with hand-painted textures. Clean, crisp painted detail, visible soft brushstrokes, clean graphic shapes. Colour palette: deep wine red (#5A0F1E), near-black, silver, warm cream, red-violet glow. No text, no letters, no logos, no watermark, no modern objects.

SUBJECT: A character lineup design sheet on a plain warm-grey painted background: SIX more members of the Still, silent elite guards, standing in a row, full body, front view, with clear empty space between them, nothing overlapping. All six wear the same long black hooded cloak with silver trim, hoods up, faces hidden in shadow, dark plain steel armour under the cloak like the reference image (no gems). Left to right: (VII) a huge two-handed war hammer; (VIII) a sword wreathed in glowing red-violet water that trails from the blade; (IX) two flintlock pistols in a belt and a cutlass in hand, a former privateer; (X) armoured gauntlets only, no weapon, a grappler's stance; (XI) a heavy crossbow; (XII) a lantern-censer on a chain pouring glowing red-violet mist. Only VIII's water and XII's mist glow; every other weapon is plain steel, wood or leather. Fully clothed characters. No labels.
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

SUBJECT: A rank lineup design sheet of the mage path on a plain warm-grey painted background: FIVE figures standing in a row, full body, front view, from lowest rank on the left to highest on the right, with clear empty space between them, nothing overlapping. Robes grow richer from left to right, in wine red, black and silver. (8) Mistweaver: a hooded robe over mail, faint red-violet mist curling at the feet, a short wand in one hand and a dagger at the belt. (9) Moonwarden: an armoured robe with steel shoulder plates, a glaive (a long pole with a curved blade) with a faintly glowing edge. (10) Lampbearer: a ceremonial wine robe, holding a tall staff topped with a glowing red-violet lantern. (11) Warden of the Still Pool: high black-and-silver robes, a long ceremonial blade held point-down, faint glow along its fuller. (12) Archmagus of the Coast: the man from the first reference image, exactly as he is: same face, middle-part black hair, wine-and-black robes with silver thread, holding his black polearm with the glowing red-violet orb. The armour pieces follow the second reference image, plain with no gems. Fully clothed characters. No labels.
```
