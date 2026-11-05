# Offline page: final structure

Status: draft for review. Nothing here is built yet. Every service below is free. Details are in [requirements.md](requirements.md), [design.md](design.md) and [architecture.md](architecture.md).

## Sitemap

```
/                         Portfolio, unchanged
|  Footer link: "After Hours" ---+
/projects/[slug]                 |
                                 v
/offline                  House Maulana, one long page
|  "Portfolio" link returns to /
/api/offline/now          Current track, cached 60 seconds
/api/offline/revalidate   Called by the daily pipeline
```

## Page order

```
+-----------------------------------------------------+
| 1  ARRIVAL         Banner, House Maulana, motto     |
|                    Link back to the portfolio       |
+-----------------------------------------------------+
| 2  CHARACTER SHEET Name, title, class, roles,       |
|                    attributes, languages            |
+-----------------------------------------------------+
| 3  NOW PLAYING     Music (live), game, show, book   |
+-----------------------------------------------------+
| 4  RECORDS         Steam hours per month chart      |
|                    Top tracks, most-played games    |
|                    Last refreshed time              |
+-----------------------------------------------------+
| 5  TOP 3           Switch: Games / Movies / Anime   |
|                    3 genres, 3 ranked picks each    |
+-----------------------------------------------------+
| 6  TROPHY ROOM     Best achievements, most played   |
+-----------------------------------------------------+
| 7  PLAY WITH ME    Steam, Riot ID, Discord,         |
|                    Spotify, Instagram               |
|                    Usual hours in WIB               |
+-----------------------------------------------------+
| 8  GUESTBOOK       Approved notes, short form       |
+-----------------------------------------------------+
| 9  FOOTER          Rose head, Last.fm credit,       |
|                    back to the portfolio            |
+-----------------------------------------------------+
```

The thorn rail stays fixed on the left, with one thorn per section. On phones it becomes a slim bar at the top.

## Where each section's data comes from

| Section | Source | Updates | Launch |
|---|---|---|---|
| Arrival | Manual | On deploy | P1 |
| Character sheet | Manual | On deploy | P1 |
| Now playing | Last.fm, Steam, manual | Music about every minute, Steam daily | P1 |
| Records | Last.fm, Steam, through the pipeline | Daily | P1 |
| Top 3 | Manual | On deploy | P1 |
| Trophy room | Manual, Steam | On deploy, daily | P1 |
| Play with me | Manual, optional Lanyard status | On deploy | P1 |
| Guestbook | Supabase | After approval | P2 |
