# Offline page: requirements

Status: draft for review. Nothing here is built yet.
Companion docs: [design.md](design.md), [architecture.md](architecture.md).

## 1. Purpose

The portfolio shows Gilang at work. This page shows the rest: favourite games, music, films and anime, in a world Gilang made. It is a personal page first and a quiet proof of skill second, because its live stats run on a real data pipeline.

## 2. Audience

| Who | What they want | How the page serves them |
|---|---|---|
| Friends and teammates | Gilang's IDs, and what is on rotation right now | Play with me, Now playing, Top 3 |
| Curious visitors | A sense of who Gilang is | Banner, Character sheet, Top 3 |
| Recruiters who find it | Personality, and evidence of craft | Everything stays work-safe; the pipeline is linkable as a project |

## 3. Decisions already made

| Decision | Outcome |
|---|---|
| One site or two | One site, a separate page at `/offline` with its own look |
| Entry point | One small link in the portfolio footer, not in the main nav |
| Base design | Dune-inspired feudal sci-fi |
| House colours | Maroon and silver |
| House name | House Maulana. Motto to be decided |
| House emblem | A rose inside a thorn ring, on a striped maroon and silver cloth (see [design.md](design.md)) |
| Footer link | After Hours |
| Cost | Free services only, with no exceptions |
| Spotify | Profile link only. No Premium, so no Spotify API |
| Music data | Last.fm, fed by scrobbling from Spotify |
| Accounts shown | Spotify, Discord, Riot ID, Instagram, Steam |
| Riot rank | Not included |
| Quest log | Not included |
| AniList | Not included. Anime stays manual in Top 3 |
| Hot takes | Not included |
| Top artists | Not included in Records |
| Letterboxd | Not in the accounts list; the film log stays manual unless an account is added |

## 4. Scope

Priority: **P1** needed for launch, **P2** soon after launch.

| ID | Section | Priority | Data |
|---|---|---|---|
| S1 | Arrival: banner, house name, motto | P1 | Manual |
| S2 | Character sheet | P1 | Manual |
| S3 | Top 3 per genre | P1 | Manual |
| S5 | Trophy room | P1 | Manual, some from Steam |
| S6 | Play with me and accounts | P1 | Manual |
| S7 | Records (live stats) | P1 | Pipeline |
| S8 | Now playing | P1 | Last.fm live, Steam daily, the rest manual |
| S9 | Guestbook | P2 | Database |

## 5. Functional requirements

### S1 Arrival
- **FR-1.1** The first screen shows the house banner and the name House Maulana. The motto joins them once decided, and the layout must work without it.
- **FR-1.2** The emblem forms from silver grains as the page opens, once, then stays still.
- **FR-1.3** A link back to the portfolio is visible without scrolling.

### S2 Character sheet
- **FR-2.1** Shows name, title, class, main roles, a few attributes and languages.
- **FR-2.2** Attributes are written as words or real numbers. No invented scores presented as fact.
- **FR-2.3** Languages: Indonesian native, English B2, Mandarin elementary (HSK 1), Spanish elementary (A1).
- **FR-2.4** The tone is a chill gamer, not a ranked grinder.

### S3 Top 3
- **FR-3.1** Categories at launch: games, movies, anime. The list is data-driven, so adding series or books needs no code.
- **FR-3.2** Each category holds about 3 genres. Each genre holds exactly 3 ranked picks.
- **FR-3.3** Each pick shows title, cover art, rank and one short line on why it made the list.
- **FR-3.4** One category shows at a time, so the section stays short.
- **FR-3.5** Ranking here is a true sequence, so numbered markers are allowed.

### S5 Trophy room
- **FR-5.1** Shows best achievements and most-played games.
- **FR-5.2** Most-played comes from Steam data. Other trophies are written by hand.
- **FR-5.3** Riot rank does not appear.

### S6 Play with me and accounts
- **FR-6.1** Lists Steam, Riot ID, Discord, Spotify and Instagram.
- **FR-6.2** Shows usual play hours in WIB, and the games Gilang will queue for.
- **FR-6.3** A handle can be copied in one click, with visible confirmation. Spotify, Instagram and Steam also link to the profile.
- **FR-6.4** Only handles Gilang has approved appear. No exact location.
- **FR-6.5** Optional: a live online or in-game status beside Discord, through Lanyard. It exposes presence publicly, so it stays off unless Gilang turns it on.

### S7 Records
- **FR-7.1** Shows top tracks from Last.fm, and Steam hours and recent games. No top artists list.
- **FR-7.2** Shows a history no single service offers, for example Steam hours per month, built from daily snapshots.
- **FR-7.3** Shows when the data last refreshed.
- **FR-7.4** If a source fails, the last good data stays on screen. The section never shows an error to visitors.
- **FR-7.5** Music data carries the credit and link to Last.fm that its API terms require.

### S8 Now playing
- **FR-8.1** Shows the current track from Last.fm, or the most recent one when nothing is playing.
- **FR-8.2** Also shows the current game, show and book. Steam fills games; the rest are manual.
- **FR-8.3** Updates about once a minute, only while the section is on screen and the tab is visible.

### S9 Guestbook
- **FR-9.1** A visitor leaves a name, a message and optionally a recommendation.
- **FR-9.2** Nothing appears publicly until Gilang approves it.
- **FR-9.3** Plain text only, no links rendered, 280 characters at most.
- **FR-9.4** Spam is limited with a hidden field, a time check and a per-visitor limit.

## 6. Non-functional requirements

| ID | Area | Requirement |
|---|---|---|
| NFR-1 | Isolation | The page must not change or slow the portfolio. Its code and styles load only on `/offline` |
| NFR-2 | Smoothness | Scrolling and the opening moment hold 60fps on a mid-range laptop. At most one WebGL canvas runs at a time |
| NFR-3 | Load | Largest Contentful Paint under 2.5s on a mid-range phone on 4G |
| NFR-4 | Responsive | Works from 360px wide up, reordered for one column, not shrunk |
| NFR-5 | Accessibility | WCAG 2.2 AA contrast, full keyboard use, visible focus, real headings |
| NFR-6 | Reduced motion | The emblem appears complete and nothing moves on its own |
| NFR-7 | Security | No token or key reaches the browser, the repo or a log |
| NFR-8 | Privacy | Stores no visitor data beyond guestbook entries; IP-derived values are hashed and deleted after 30 days |
| NFR-9 | Resilience | The page renders fully if the database, Last.fm or Steam are down |
| NFR-10 | Cost | Free tiers only, no exceptions. Nothing in the design may depend on a paid plan |
| NFR-11 | Work-safe | Nothing Gilang would not want a recruiter to read |
| NFR-12 | Originality | Inspired by Dune, not copied. No Dune name, logo, font, quotes or character names |

## 7. Out of scope

Riot rank, quest log, hot takes, a top artists list, AniList, accounts or logins for visitors, comments on individual picks, a blog, a separate domain at launch.

## 8. What Gilang needs to provide

- The motto
- Character sheet content: title, class, roles, attributes
- Top 3 lists with a line per pick, and the genres for each category
- Trophies worth showing
- Handles and links to show, and usual play hours
- A public Steam profile, with game details set to public
- A free Last.fm account connected to Spotify, and a free Last.fm API key
- A short email to Last.fm asking for written approval of this public page (see Q2)

## 9. Open questions

| ID | Question | Why it matters |
|---|---|---|
| Q2 | Will Last.fm approve the page? | Clause 2.7 of its API terms says public pages using the services need prior written approval. If it refuses or never replies, music falls back to manual lists, with Lanyard as an option for the live line |
| Q3 | What is the motto? | It appears on the first screen. The page can launch without it |

## 10. Acceptance for launch

- All P1 sections work with real content, on desktop and phone
- The portfolio home page is unchanged, including its intro timing and scroll behaviour
- Turning off the database and each API leaves a complete page
- A secret scan of the repo and pipeline logs finds nothing
- Keyboard-only and reduced-motion passes are clean
