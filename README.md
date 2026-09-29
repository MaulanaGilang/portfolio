# Gilang Maulana · Portfolio

Personal portfolio: Data Analyst → Data Engineer. Built with Next.js 16, Tailwind CSS v4, Motion, Lenis and React Three Fiber (WebGL data-pipeline hero).

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The page reloads as you save files.

## Where to edit things

| What | Where |
|---|---|
| All text: name, intro, About, experience, education, projects, skills, certifications | `src/data/content.ts` |
| Links: email, GitHub, LinkedIn, résumé | `profile` at the top of `src/data/content.ts` |
| Project cover images | `public/projects/<slug>.webp` (about 1800×1200) |
| Company / issuer logos | `public/logos/` (square PNG) |
| Skill icons | `public/skills/<name>.svg` (monochrome, from simple-icons) |
| Colours, fonts, spacing | `src/app/globals.css` and `DESIGN.md` |

**Add a project:** copy an entry in the `projects` array in `src/data/content.ts`, give it a new `slug`, and add its cover image to `public/projects/`. The card and its case-study page (`/projects/<slug>`) are generated automatically.

**Add an experience, certificate or skill:** add an entry to the matching array in the same file. Order in the file is the order on the page (newest first).

Copy rule: avoid em dashes (—); use a normal hyphen for date ranges ("Jan 2025 - May 2025").

## Publish changes

The site deploys from GitHub to Vercel. Every push to `main` goes live automatically in about a minute:

```bash
git add .
git commit -m "Update resume link"
git push
```

Before pushing, `npm run build` checks that everything compiles.
