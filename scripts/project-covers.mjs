// Converts project covers in art-inbox/covers/ (PNG, JPG or WebP, named by project slug)
// into the site's cover files, public/projects/<slug>-photo.webp, at 1800 px wide.
// Prompts and settings: docs/project-cover-prompts.md. Usage: node scripts/project-covers.mjs
import { existsSync } from "node:fs";
import sharp from "sharp";

const slugs = [
  "ecommerce-clickstream",
  "sql-data-warehouse",
  "fraud-applicant-analysis",
  "hr-specialist-monitoring",
  "cohort-analysis-revofin",
  "fit-tourism-backend",
];

for (const slug of slugs) {
  const src = ["png", "jpg", "jpeg", "webp"].map((e) => `art-inbox/covers/${slug}.${e}`).find((f) => existsSync(f));
  if (!src) continue;
  const out = `public/projects/${slug}-photo.webp`;
  const info = await sharp(src).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
  console.log(`${slug} -> ${out} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
}
