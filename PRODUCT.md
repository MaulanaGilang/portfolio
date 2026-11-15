# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Recruiters and hiring managers for data roles (Data Engineer first, Data Analyst second), scanning on a laptop between other candidates, often from outside Indonesia. Secondary: engineers and peers who open a case study to judge the work itself.
_(Inferred from the site's content and earlier sessions; not yet confirmed in an interview.)_

## Product Purpose
The personal portfolio of Gilang Maulana, a Data Analyst moving into Data Engineering. Success is a recruiter understanding within one screen who he is, what he is becoming, and how to reach him or download the résumé; and an engineer finding real, inspectable work (warehouse, ETL, dashboards, cloud backend) behind it.

## Positioning
Operations-to-pipelines: he started by fixing how a company tracked 3,000 tickets and 1,000 assets, and now builds the pipelines under the dashboards. Raw data in, trusted data out.

## Operating Context
Visitors arrive from a CV, LinkedIn or a job application, read the hero and the featured work, open one case study (`/projects/[slug]`), then email, open LinkedIn, or download the résumé. The site also hosts a separate, unlinked-from-nav world, After Hours (`/offline`), reached from the footer.

## Capabilities and Constraints
- Next.js 16 App Router, Tailwind v4, Motion, react-three-fiber; deployed on Vercel from `main`.
- All copy lives in `src/data/content.ts`; no em or en dashes in visible copy.
- Experience, Education and Certifications stay collapsed by default.
- Free tools only: no paid image generation. Visuals are code (WebGL, SVG diagrams) or free-licence assets.
- Light mode is the user's explicit choice for the portfolio.

## Brand Commitments
- Dune-inspired, futuristic, light. The Dune Rise display face (`src/fonts/DuneRise.otf`) is used on a few words only, never body text.
- Palette comes from the Dune Part One (misty teal and sand) and Dune Part Two (spice orange, rust, gold, burnt black) posters.
- Readouts (Tuban's coordinates and local time) are plain text, never narrated.
- After Hours keeps its own world; Riot's disclaimer there stays verbatim.

## Evidence on Hand
Real: roles and outcomes in `content.ts` (3,000 tickets, about 1,000 assets, 700K+ hospital records, 300K applicants), five projects with covers in `public/projects`, the warehouse architecture figure, organisation logos in `public/logos`, skill icons in `public/skills`, certificates with credential IDs. No testimonials, client logos or metrics beyond these; none may be invented.

## Product Principles
1. The first screen answers who, what next, and how to reach him.
2. Show the work, not adjectives: real outcomes, real artefacts, real links.
3. The data story (raw in, trusted out) is the one metaphor; everything else stays quiet.
4. Recruiter speed beats spectacle: nothing important is hidden behind motion.

## Accessibility & Inclusion
WCAG AA contrast on every text pairing, full keyboard access, reduced motion honoured (the 3D scene settles to its final state).
