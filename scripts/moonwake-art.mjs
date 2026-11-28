// Converts generated Moonwake art in art-inbox/ (PNG or JPG, named by the table below)
// into the WebP files the site uses, at the right size. Images that aren't there are skipped.
// Usage: node scripts/moonwake-art.mjs
import { existsSync } from "node:fs";
import sharp from "sharp";

const P = "public/offline";
const C = `${P}/moonwake/concept`;
// name in art-inbox -> [output path, width]
const map = {
  // full-bleed scenes and Codex chapters (16:9)
  "codex-hero": [`${P}/moonwake/codex-hero.webp`, 1920],
  "codex-land": [`${P}/moonwake/codex-land.webp`, 1920],
  "codex-nature": [`${P}/moonwake/codex-nature.webp`, 1920],
  "codex-magic": [`${P}/moonwake/codex-magic.webp`, 1920],
  "codex-people": [`${P}/moonwake/codex-people.webp`, 1920],
  "codex-regalia": [`${P}/moonwake/codex-regalia.webp`, 1920],
  "codex-moonwatch": [`${P}/moonwake/codex-moonwatch.webp`, 1920],
  "codex-rule": [`${P}/moonwake/codex-rule.webp`, 1920],
  "codex-lore": [`${P}/moonwake/codex-lore.webp`, 1920],
  "moonwake-bridge": [`${P}/moonwake-bridge.webp`, 1920],
  "moonwake-courtyard": [`${P}/moonwake-courtyard.webp`, 1920],
  "moonwake-hall": [`${P}/moonwake-hall.webp`, 1920],
  "moonwake-harbour": [`${P}/moonwake-harbour.webp`, 1920],
  // concept art: wide tiles and sheets (16:9)
  "env-city": [`${C}/env-city.webp`, 1600],
  "env-hall": [`${C}/env-hall.webp`, 1600],
  "life-festival": [`${C}/life-festival.webp`, 1600],
  "life-townsfolk": [`${C}/life-townsfolk.webp`, 1600],
  "watch-soldier": [`${C}/watch-soldier.webp`, 1600],
  "wyvern": [`${C}/wyvern.webp`, 1600],
  "wyrmwatch": [`${C}/wyrmwatch.webp`, 1600],
  "still-1": [`${C}/still-1.webp`, 1600],
  "still-2": [`${C}/still-2.webp`, 1600],
  "ranks-1": [`${C}/ranks-1.webp`, 1600],
  "ranks-2": [`${C}/ranks-2.webp`, 1600],
  "arms-steel": [`${C}/arms-steel.webp`, 1600],
  "arms-stillstone": [`${C}/arms-stillstone.webp`, 1600],
  // concept art: tall tiles (3:4)
  "env-market": [`${C}/env-market.webp`, 900],
  "env-tower": [`${C}/env-tower.webp`, 900],
  "env-pool": [`${C}/env-pool.webp`, 900],
  "life-archmagus": [`${C}/life-archmagus.webp`, 900],
  "life-library": [`${C}/life-library.webp`, 900],
};

for (const [name, [out, width]] of Object.entries(map)) {
  const src = ["png", "jpg", "jpeg", "webp"].map((e) => `art-inbox/${name}.${e}`).find((f) => existsSync(f));
  if (!src) continue;
  const info = await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
  console.log(`${name} -> ${out} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
}
