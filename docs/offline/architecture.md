# Offline page: architecture

Status: draft for review. Nothing here is built yet. Checked against Next.js 16.3.6's bundled docs and each service's documentation in November 2026.

## 1. Overview

```
 Last.fm --+                                        +--> gold views --> /offline (cached page)
           |--> GitHub Actions, daily (Python ETL) --+
 Steam ----+        bronze -> silver -> gold         +--> revalidate call
                       Supabase Postgres

 Spotify --scrobbles--> Last.fm (free account connection, no Spotify API)
 Last.fm recent track --> /api/offline/now (cached 60s) --> Now playing line
 Visitor --> Server Action --> guestbook (pending) --> approved --> page
```

Three paths, each with one job:

| Path | Freshness | Serves |
|---|---|---|
| Static content | On deploy | Banner, character sheet, Top 3, trophies, accounts |
| Batch pipeline | Daily | Records, most-played games |
| Hot path | About a minute | The music line in Now playing |

**Why a pipeline and not direct API calls?** Steam only reports lifetime and recent playtime, so daily snapshots build history that does not exist anywhere else, such as hours per month. Storing Last.fm plays alongside it lets one set of views cover both sources. It also makes this a real data engineering project, using the same medallion layering as the SQL Data Warehouse case study.

## 2. Routing and layouts

The current `src/app/layout.tsx` holds the portfolio's Nav, Preloader, FluidCursor and sound. These must not reach `/offline`.

**Decision: one thin root layout, with a separate layout for each side.**

```
src/app/
  layout.tsx               html, body, fonts, SmoothScroll only
  globals.css              stays; shared base
  icon.tsx, apple-icon.tsx stay
  (work)/
    layout.tsx             Nav, Preloader, FluidCursor, SoundBridge
    page.tsx               moved, URL still /
    opengraph-image.tsx    moved
    projects/[slug]/       moved, URL unchanged
  offline/
    layout.tsx             offline theme, thorn rail
    offline.css
    page.tsx
    opengraph-image.tsx
  api/offline/
    now/route.ts
    revalidate/route.ts
```

Route groups do not change URLs, so every existing link keeps working.

| Option | Verdict |
|---|---|
| **Thin root plus per-side layouts** | **Chosen.** Client-side navigation is kept, so the transition in design section 8 is possible; the normal 404 keeps working |
| Two root layouts | Rejected. Next's docs say crossing root layouts forces a full page load, and a shared 404 then needs the experimental `global-not-found` flag |
| Hiding the chrome by checking the path | Rejected. Portfolio code would still load on `/offline`, breaking NFR-1 |

**Details to handle:**
- The page background sits on `html`, so `/offline` needs a rule such as `:root:has([data-world="offline"])` to stop lavender showing at overscroll.
- `themeColor` moves into each side's metadata.
- The `preloaderScript` in `<head>` moves with the Preloader into `(work)`, or stays if inline scripts cannot live there. Check during phase 1.
- This move touches the live portfolio, so it ships alone and is regression-checked first.

## 3. Front end

| Concern | Decision |
|---|---|
| Sections | Server Components by default. Client components only for the emblem, thorn rail, category switch, Now playing and copy buttons |
| Emblem | Generalise `src/components/dither/DitherCanvas.tsx` with a `banner` scene sampling the emblem as a mask. One WebGL2 canvas, no Three.js |
| Fallback | Inline SVG renders first, so the emblem exists with no JavaScript, no WebGL and under reduced motion |
| Manual content | Typed file `src/data/offline.ts`, mirroring `src/data/content.ts` |
| Fonts | Michroma through `next/font/google` (downloaded at build, served from the site), loaded only in the offline layout |
| Cover art | Downloaded into `public/offline/covers`, served through `next/image`. Avoids hotlinking and makes the duotone reliable |
| Chart | Hand-built SVG from gold data. No chart library for one chart |

No new front-end dependency is needed apart from the database driver.

## 4. Data store

**Decision: Supabase Postgres, free plan.** One store for the warehouse and the guestbook.

- Holds real history, and gives bronze, silver and gold schemas in actual SQL.
- Free projects [pause after about a week of low activity](https://supabase.com/kb/faqs/platform/free-project-pausing). The daily pipeline write keeps it active.
- The site connects from the server with the `postgres` driver through the pooled connection string (with prepared statements off for transaction mode). The browser never touches the database, and the Data API stays unused.

Rejected: a `data` branch of JSON files (no real SQL, and the raw data would be public in the repo) and Vercel Cron (the job needs Python and a warehouse, not a web route).

### Schema

```
bronze.raw_snapshot     id, source, endpoint, fetched_at, payload jsonb
silver.lastfm_rank      snapshot_date, period, rank, name, artist, playcount
silver.lastfm_play      played_at, name, artist, album
silver.steam_game_day   snapshot_date, appid, name, minutes_total, minutes_2weeks
gold.music_top          view: latest rankings
gold.steam_month        view: minutes per game per month, from day-over-day change
gold.steam_top          view: most-played games
gold.summary            view: headline figures and last_refreshed_at
public.guestbook_entry  id, name, message, recommendation, status, ip_hash, created_at
```

`status` is `pending`, `approved` or `rejected`. Row Level Security is on for every table with no public policies, so only the server role can reach them.

## 5. Sources

| Source | Status | What the docs say | Used for |
|---|---|---|---|
| Last.fm | Available, **subject to approval** | API key only, no user login. `user.getRecentTracks` (includes `nowplaying="true"`) and `user.getTopTracks`. Terms: non-commercial use; credit and link to Last.fm; respect HTTP caching; 100 MB storage cap; delete data if access ends; no logos without approval; about 1 request a second. **Clause 2.7 says public pages must be approved in writing first** | Records, Now playing |
| Spotify | Link only | The API [requires Premium in Development Mode](https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide), so it is not used. Spotify connects to Last.fm from the Last.fm account settings | Play with me |
| Lanyard | Optional | Free. Join its Discord server, then `GET api.lanyard.rest/v1/users/:id` with no auth. Returns public presence and a `spotify` object. Exposes status publicly, so it stays off by default | Discord status; backup for the music line |
| Steam | Available | [Needs an API key](https://steamcommunity.com/dev); [100,000 calls a day](https://steamcommunity.com/dev/apiterms). `GetOwnedGames` [only works if game details are visible](https://partner.steamgames.com/doc/webapi/IPlayerService), so the profile must be public | Records, Trophy room, Now playing |
| Letterboxd | Not planned | Not in the accounts list. If an account is added, the [API is not granted for personal projects](https://letterboxd.com/api-beta/), so it would use the public feed at `letterboxd.com/{username}/rss/` | None |
| Riot | Excluded | Rank is out of scope. The Riot ID is a manual string | None |
| Discord, Instagram | Manual | Plain handle and link, with no API | Play with me |

**If Last.fm says no or never replies:** drop the connector and keep music as a manual list. Lanyard can still drive the live line, but Records loses its top tracks. The rest of the design is unaffected, because sections read gold views and not a source directly.

**To confirm when building:** that connecting Spotify to Last.fm is free (the pages mention no paid tier, but this is inferred from their silence; check `last.fm/settings/applications`); that Lanyard's `spotify` object needs Spotify shown in Discord (also inferred); the public Steam host (`api.steampowered.com`; the page read was the partner reference); and image hostnames for `next/image`.

## 6. Pipeline

```
pipeline/
  connectors/lastfm.py, steam.py
  load_bronze.py                    store raw JSON unchanged
  transform/*.sql                   bronze -> silver -> gold
  run.py                            orchestrates, one connector failing does not stop others
.github/workflows/offline-pipeline.yml
```

- **Schedule:** daily through GitHub Actions, in a quiet hour. Scheduled runs can start late, which does not matter here.
- **Idempotent:** a key of source, endpoint and date means a rerun replaces that day's rows.
- **Isolated failures:** each connector runs independently. Failures are recorded, and gold views keep the last good data.
- **Finish step:** on success it calls `/api/offline/revalidate` so the page picks up new data.
- **Retention:** bronze kept 90 days, silver and gold kept indefinitely. Comfortably inside the free plan at this volume.

**Known risk.** GitHub [disables scheduled workflows](https://docs.github.com/actions/managing-workflow-runs/disabling-and-enabling-a-workflow) in public repos after a period with no repository activity (commonly reported as 60 days). If that happens, the database goes quiet and pauses too. Mitigation: `summary.last_refreshed_at` is displayed on the page, so staleness is visible, and a failed or stale run sends an email. Re-enabling takes one click.

## 7. Serving and caching

This project does not enable Cache Components, so it uses the time-based model.

| Item | Method |
|---|---|
| `/offline` page | Static with `revalidate` of one day, plus on-demand `revalidatePath` from the pipeline. If regeneration fails, the last good page keeps serving |
| Database outage | Queries are wrapped: on failure a section renders its last cached data, or hides. Never an error |
| `/api/offline/now` | Calls Last.fm at most once per 60 seconds through the server cache, however many visitors there are |
| Client polling | Every 60 seconds, only when the section is on screen and the tab is visible |
| `/api/offline/revalidate` | POST only, requires a secret header |

## 8. Guestbook

- **Write:** a Server Action validates length and type, then inserts as `pending`.
- **Spam:** a hidden field, a minimum time on page, and one post per hour per salted IP hash. Add Cloudflare Turnstile only if spam appears.
- **Moderate:** Gilang changes `status` in the Supabase table editor. An admin screen is not worth building for this volume.
- **Display:** approved rows only, rendered as plain text. Links are not rendered.
- **Privacy:** IP hashes are cleared after 30 days by the pipeline.

## 9. Secrets

| Name | Where | Purpose |
|---|---|---|
| `LASTFM_API_KEY`, `LASTFM_USER` | GitHub, Vercel | Last.fm |
| `STEAM_API_KEY`, `STEAM_ID` | GitHub | Steam |
| `DATABASE_URL` | GitHub, Vercel | Postgres |
| `REVALIDATE_SECRET` | GitHub, Vercel | Pipeline to site |
| `IP_HASH_SALT` | Vercel | Guestbook |

The repo is public, so workflow logs are public too. Never print a response containing a token. All server-only modules import `server-only`. No variable uses the `NEXT_PUBLIC_` prefix.

## 10. Performance budget

| Item | Budget |
|---|---|
| WebGL canvases running at once | 1, paused when off screen |
| Three.js on `/offline` | None |
| JavaScript for the page, compressed | Under 120 KB beyond the framework |
| Largest Contentful Paint | The SVG banner, under 2.5s |
| Cover images | About 12 per visible category, lazy loaded |

The portfolio's intro stall came from the GPU being saturated, so the emblem only runs while it is on screen and does no work once settled.

## 11. Delivery plan

| Phase | Work | Done when |
|---|---|---|
| 0 | Approve documents, vectorise the banner, email Last.fm, mock up Arrival | Look approved |
| 1 | Layout refactor, on its own | Portfolio unchanged in a side-by-side check |
| 2 | Static page: all manual sections, banner, thorn rail | Reviewed on desktop and phone |
| 3 | Supabase schema, Last.fm and Steam connectors, Actions | A week of clean daily runs |
| 4 | Records and Now playing on real data | Survives each source being off |
| 5 | Guestbook | Spam and moderation tested |
| 6 | Footer link and transition, launch checks | Requirements section 10 met |

Phase 2 can launch on its own, since it needs no pipeline. Phases 1 to 2 do not depend on Last.fm's reply. Connecting Spotify to Last.fm early is worth doing, because scrobbles only start from that day.

## 12. Risks

| Risk | Impact | Response |
|---|---|---|
| Last.fm refuses or ignores the approval request | No live music data | Manual music lists; Lanyard for the live line if wanted |
| Spotify-to-Last.fm scrobbling stops or lags | Music stats go stale | Gold keeps the last data; the refresh time is visible |
| Actions schedule is disabled | Data goes stale | Visible timestamp, one-click re-enable |
| Supabase pauses or removes a long-paused project | Data at risk | Daily writes; occasional `pg_dump` backup |
| Trademark concern over the Dune look | Takedown or embarrassment | No Dune names, logos, fonts or quotes; original emblem |
| Cover art rights | Low for a personal page | Credit sources; replace on request |
| Layout refactor breaks the portfolio | High, it is the live CV | Isolated phase, checked before anything else lands |

## 13. Free stack

Every part runs at no cost. Nothing depends on a paid plan.

| Need | Service | Why it stays free |
|---|---|---|
| Hosting | Vercel Hobby | Personal, non-commercial site |
| Daily pipeline | GitHub Actions | Standard runners are free on public repos |
| Database | Supabase free plan | Tiny data volume; daily writes prevent pausing |
| Music | Last.fm | Free account and API key, subject to approval |
| Games | Steam Web API | Free key, 100,000 calls a day |
| Presence (optional) | Lanyard | Free public API |
| Failure alerts | GitHub's built-in email | Included |
| Spam guard (only if needed) | Cloudflare Turnstile | Free tier |
| Fonts | Michroma, Satoshi | Open licence; Satoshi is already in the project |
