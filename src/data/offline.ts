/**
 * Content for /offline (After Hours).
 *
 * Hand-written content. Steam numbers are live, from src/lib/steam.ts. The
 * guestbook holds one example note until the database is connected.
 */

export const house = {
  name: "House Maulana",
  /** Leave empty until the motto is decided; the arrival screen works without it. */
  motto: "",
  intro: "Games, music, films and anime. The side of Gilang Maulana that isn't on the CV.",
};

export const characterSheet: { label: string; value: string }[] = [
  { label: "Name", value: "Gilang Maulana" },
  { label: "Class", value: "Data person by day, chill gamer by night" },
  { label: "Main roles", value: "Mage, Support" },
  { label: "Home", value: "Tuban, East Java" },
  { label: "Plays", value: "For fun, not for rank" },
  {
    label: "Languages",
    value: "Indonesian (native), English (B2), Mandarin (elementary, HSK 1), Spanish (elementary, A1)",
  },
];

export type Medium = "game" | "show";

/** What's on rotation. A music line joins when there is a live music source. */
export const nowPlaying: { medium: Medium; verb: string; titles: { title: string; poster?: string; steamAppId?: number }[] }[] = [
  {
    medium: "game",
    verb: "Playing",
    titles: [
      // No portrait key art found publicly; shows the placeholder card.
      { title: "League of Legends" },
      { title: "Albion Online", steamAppId: 761890 },
    ],
  },
  {
    medium: "show",
    verb: "Watching",
    titles: [
      // Posters from TMDB.
      { title: "Arcane", poster: "https://image.tmdb.org/t/p/w500/87C0wecB8bHb1PsrKBI4kJiEkgV.jpg" },
      { title: "Cyberpunk: Edgerunners", poster: "https://image.tmdb.org/t/p/w500/v3JuB15WybKmxDeT1hWdK3j6eSJ.jpg" },
    ],
  },
];

export type Favourite = {
  title: string;
  year: number;
  /** Poster image shown on hover: a path under /public or a full URL. */
  poster?: string;
  /** Optional short muted clip (mp4/webm) shown on hover instead of the poster. */
  clip?: string;
};

/** Things Gilang likes, in three categories. Unranked, any length. */
export const favourites: { id: string; label: string; items: Favourite[] }[] = [
  {
    id: "games",
    label: "Games",
    items: [
      // Box art from Wikipedia.
      { title: "Warcraft III", year: 2002, poster: "https://upload.wikimedia.org/wikipedia/en/6/66/WarcraftIII.jpg" },
    ],
  },
  {
    id: "movies",
    label: "Movies",
    items: [
      // Posters from TMDB (themoviedb.org).
      { title: "Dune", year: 2021, poster: "https://image.tmdb.org/t/p/w500/v1tRXZ4JtD2Iv6fjkPvT4GiwslV.jpg" },
      { title: "Dune: Part Two", year: 2024, poster: "https://image.tmdb.org/t/p/w500/uOYAbN3F5n3ne8TzWjzVEvQ7XGX.jpg" },
    ],
  },
  {
    id: "anime",
    label: "Anime",
    items: [
      // Season 6 key visual from MyAnimeList.
      { title: "Kingdom, Season 6", year: 2025, poster: "https://cdn.myanimelist.net/images/anime/1145/150403l.jpg" },
    ],
  },
];

export type Account = {
  service: "Steam" | "Riot ID" | "Discord" | "Spotify" | "Instagram";
  handle: string;
  /** Profile link, when the service has public profiles. */
  href?: string;
  /** What the copy button copies, when it isn't the handle (e.g. a profile link). */
  copy?: string;
};

export const accounts: Account[] = [
  { service: "Steam", handle: "triplemjr", href: "https://steamcommunity.com/id/triplemjr/", copy: "https://steamcommunity.com/id/triplemjr/" },
  { service: "Riot ID", handle: "TripleM#3005" },
  { service: "Discord", handle: "maugyii" },
  {
    service: "Spotify",
    handle: "Spotify profile",
    href: "https://open.spotify.com/user/31jr75kuegwewafsef26ewqbsjsm",
    copy: "https://open.spotify.com/user/31jr75kuegwewafsef26ewqbsjsm",
  },
  { service: "Instagram", handle: "@_gilang.maulana", href: "https://www.instagram.com/_gilang.maulana" },
];

export const playHours = {
  when: "Usually online 19:00 to 22:00",
  zone: "WIB, UTC+7",
};

/** Spotify playlists, one per language. Links only: listening stats need an API that is not free. */
export const playlists: { label: string; language: string; href: string }[] = [
  { label: "ID", language: "Indonesian", href: "https://open.spotify.com/playlist/7fGWquLuhRvHNYyZaSFk4P" },
  { label: "EN", language: "English", href: "https://open.spotify.com/playlist/34QW9zNjxERkn58z4RyCje" },
  { label: "JP", language: "Japanese", href: "https://open.spotify.com/playlist/2BYAYUUn34MrJu8YgC2NYR" },
];

/**
 * Approved guestbook notes. Until the database is connected this holds one
 * example, marked as such on the page, to show what a note looks like.
 */
export const guestbook: { name: string; message: string; recommendation?: string; date: string; example?: boolean }[] = [
  {
    name: "Rizky",
    message: "Found this from your portfolio footer. Didn't expect a whole fortress back here. Add me on Riot, I'll carry you in ARAM.",
    recommendation: "Frieren: Beyond Journey's End",
    date: "2026-11-08",
    example: true,
  },
];
