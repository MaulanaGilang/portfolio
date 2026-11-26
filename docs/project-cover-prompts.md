# Project cover prompts

New covers for all six projects, made to match the portfolio's "Dune Day" look: pale mist and teal haze, warm sand, quiet stone, and one small spice-orange accent. Each cover is a calm, photographic still life of a few objects that stand for the project. No screens with text, no logos, no readable writing (image models garble text).

## Settings (Higgsfield)

| Setting | Value |
|---|---|
| Model | Nano Banana Pro |
| Resolution | 2K |
| Aspect ratio | **4:3** (the desktop cover is 4:3; phones crop it to 16:10, so keep the subject in the middle) |
| Count | 1, re-roll only if needed |
| References | None for the first cover. Once you like one, you may attach it to the others **only if their colours drift**, and add: `Use the reference image only for its lighting and colour palette, not its objects or layout.` (attached images tend to get copied) |

Cost: 6 covers × 2 credits = 12 credits, about 16 with re-rolls.

## Putting them on the site

1. Save each image as `art-inbox/covers/<name>.png`, using the name in its heading (for example `art-inbox/covers/sql-data-warehouse.png`).
2. Run `node scripts/project-covers.mjs`. It writes `public/projects/<name>-photo.webp` at the right size.
3. For the clickstream cover only: in `src/data/content.ts`, change that project's `cover` from `/projects/sql-data-warehouse-photo.webp` to `/projects/ecommerce-clickstream-photo.webp` (it borrows the warehouse photo until it has its own).
4. Check the home page and each case study, then commit and push.

---

## Shared style (already included in every prompt below)

```text
STYLE: a calm editorial still-life photograph, shot in soft, hazy, diffused daylight as if through a sandstorm haze. Colour palette taken from a desert film poster: pale mist grey-green (#e6edeb), soft teal haze (#5e8b8b), warm sand (#e7dccb), quiet stone grey, deep warm charcoal, and ONE small accent of spice orange (#d35c11) on a single object. Low contrast, gentle long shadows, fine film grain, shallow depth of field, a lot of calm empty space around the subject, composed in the centre of a 4:3 frame. Natural materials: linen, sandstone, pale oak, brushed metal, frosted glass. No people, no text, no letters, no numbers, no logos, no screens showing writing, no brand marks.
```

## 1. ecommerce-clickstream

```text
STYLE: a calm editorial still-life photograph, shot in soft, hazy, diffused daylight as if through a sandstorm haze. Colour palette taken from a desert film poster: pale mist grey-green (#e6edeb), soft teal haze (#5e8b8b), warm sand (#e7dccb), quiet stone grey, deep warm charcoal, and ONE small accent of spice orange (#d35c11) on a single object. Low contrast, gentle long shadows, fine film grain, shallow depth of field, a lot of calm empty space around the subject, composed in the centre of a 4:3 frame. Natural materials: linen, sandstone, pale oak, brushed metal, frosted glass. No people, no text, no letters, no numbers, no logos, no screens showing writing, no brand marks.

SUBJECT: A wide frosted-glass funnel held in a slim brushed-metal stand on a pale sandstone table. A large heap of fine pale sand fills the top of the funnel, and only a thin trickle of grains falls through the narrow neck into a small shallow ceramic dish below; the few grains that reach the dish are spice orange. Beside the stand, a small folded paper shopping bag in warm sand colour, and a neat row of three tiny closed parcels tied with linen string. Soft teal haze in the background.
```

## 2. sql-data-warehouse

```text
STYLE: a calm editorial still-life photograph, shot in soft, hazy, diffused daylight as if through a sandstorm haze. Colour palette taken from a desert film poster: pale mist grey-green (#e6edeb), soft teal haze (#5e8b8b), warm sand (#e7dccb), quiet stone grey, deep warm charcoal, and ONE small accent of spice orange (#d35c11) on a single object. Low contrast, gentle long shadows, fine film grain, shallow depth of field, a lot of calm empty space around the subject, composed in the centre of a 4:3 frame. Natural materials: linen, sandstone, pale oak, brushed metal, frosted glass. No people, no text, no letters, no numbers, no logos, no screens showing writing, no brand marks.

SUBJECT: Three shallow frosted-glass trays stacked in a pale oak rack, one above the other, seen from a slight angle. The bottom tray holds a rough, unsorted mix of pebbles, sand and broken shells. The middle tray holds the same pebbles washed and sorted into neat rows by size. The top tray holds only a few polished, smooth stones laid out in a precise grid, one of them spice orange. A linen cloth folded beside the rack. Soft teal haze in the background.
```

## 3. fraud-applicant-analysis

```text
STYLE: a calm editorial still-life photograph, shot in soft, hazy, diffused daylight as if through a sandstorm haze. Colour palette taken from a desert film poster: pale mist grey-green (#e6edeb), soft teal haze (#5e8b8b), warm sand (#e7dccb), quiet stone grey, deep warm charcoal, and ONE small accent of spice orange (#d35c11) on a single object. Low contrast, gentle long shadows, fine film grain, shallow depth of field, a lot of calm empty space around the subject, composed in the centre of a 4:3 frame. Natural materials: linen, sandstone, pale oak, brushed metal, frosted glass. No people, no text, no letters, no numbers, no logos, no screens showing writing, no brand marks.

SUBJECT: A loose fan of completely blank matte cards, the size and shape of credit cards, in sand, stone and mist tones, spread across a pale linen surface. The cards are gently sorted into three small groups. One single card sits apart from the rest, marked only by a small spice-orange tab clipped to its edge. A brass magnifying glass rests across the group nearest the camera. The cards have no chips, no numbers, no logos and no writing. Soft teal haze in the background.
```

## 4. hr-specialist-monitoring

```text
STYLE: a calm editorial still-life photograph, shot in soft, hazy, diffused daylight as if through a sandstorm haze. Colour palette taken from a desert film poster: pale mist grey-green (#e6edeb), soft teal haze (#5e8b8b), warm sand (#e7dccb), quiet stone grey, deep warm charcoal, and ONE small accent of spice orange (#d35c11) on a single object. Low contrast, gentle long shadows, fine film grain, shallow depth of field, a lot of calm empty space around the subject, composed in the centre of a 4:3 frame. Natural materials: linen, sandstone, pale oak, brushed metal, frosted glass. No people, no text, no letters, no numbers, no logos, no screens showing writing, no brand marks.

SUBJECT: A stethoscope in deep charcoal and brushed metal, loosely coiled on a pale oak desk. Next to it, a long strip of pale heart-monitor paper unrolls across the desk, printed only with a fine grid and one calm heartbeat line in soft teal. A clipboard holds a single sheet showing a simple row of blank vertical bars of different heights, no labels, one bar spice orange. A small sandstone cup of pencils at the edge. Soft teal haze in the background.
```

## 5. cohort-analysis-revofin

```text
STYLE: a calm editorial still-life photograph, shot in soft, hazy, diffused daylight as if through a sandstorm haze. Colour palette taken from a desert film poster: pale mist grey-green (#e6edeb), soft teal haze (#5e8b8b), warm sand (#e7dccb), quiet stone grey, deep warm charcoal, and ONE small accent of spice orange (#d35c11) on a single object. Low contrast, gentle long shadows, fine film grain, shallow depth of field, a lot of calm empty space around the subject, composed in the centre of a 4:3 frame. Natural materials: linen, sandstone, pale oak, brushed metal, frosted glass. No people, no text, no letters, no numbers, no logos, no screens showing writing, no brand marks.

SUBJECT: A shallow pale oak tray seen from a high three-quarter angle, holding small matte ceramic cups arranged in a staircase triangle: the top row has six cups, each row below has one cup fewer, all rows aligned to the left. Each cup is filled with fine sand, and the fill level falls slightly from left to right along every row. One cup in the top row is glazed spice orange. A few loose coins of plain, unmarked brushed metal lie beside the tray. Soft teal haze in the background.
```

## 6. fit-tourism-backend

```text
STYLE: a calm editorial still-life photograph, shot in soft, hazy, diffused daylight as if through a sandstorm haze. Colour palette taken from a desert film poster: pale mist grey-green (#e6edeb), soft teal haze (#5e8b8b), warm sand (#e7dccb), quiet stone grey, deep warm charcoal, and ONE small accent of spice orange (#d35c11) on a single object. Low contrast, gentle long shadows, fine film grain, shallow depth of field, a lot of calm empty space around the subject, composed in the centre of a 4:3 frame. Natural materials: linen, sandstone, pale oak, brushed metal, frosted glass. No people, no text, no letters, no numbers, no logos, no screens showing writing, no brand marks.

SUBJECT: A folded paper map lies open on a pale sandstone table, showing only the soft shapes of a chain of tropical islands in sand and teal on pale mist water, with no names, no labels and no grid numbers. A few small map pins stand in the islands, one of them spice orange. Beside the map, a small closed matte charcoal metal box like a compact home server with one tiny teal status light, a brass compass, and a coil of linen string. Soft teal haze in the background.
```
