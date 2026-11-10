/**
 * Content for /offline (After Hours).
 *
 * Identity, now playing, favourites and accounts are real. Still placeholders:
 * the record book (Steam hours, totals, top tracks: they come from the Steam
 * pipeline and the Spotify data export) and the guestbook notes.
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
export const nowPlaying: { medium: Medium; verb: string; titles: string[] }[] = [
  { medium: "game", verb: "Playing", titles: ["League of Legends", "Albion Online"] },
  { medium: "show", verb: "Watching", titles: ["Arcane", "Cyberpunk: Edgerunners"] },
];

export const records = {
  /** Headline figures for the record book. */
  totals: [
    { label: "Hours played this year", value: "445" },
    { label: "Games in library", value: "128" },
    { label: "Playlists", value: "3" },
  ],
  /** ISO time of the last pipeline run. */
  refreshedAt: "2026-11-09T06:00:00+07:00",
  /** Steam hours per month, oldest first. The last entry is the current month. */
  hoursByMonth: [
    { month: "Dec", hours: 34 },
    { month: "Jan", hours: 51 },
    { month: "Feb", hours: 28 },
    { month: "Mar", hours: 19 },
    { month: "Apr", hours: 42 },
    { month: "May", hours: 37 },
    { month: "Jun", hours: 63 },
    { month: "Jul", hours: 58 },
    { month: "Aug", hours: 24 },
    { month: "Sep", hours: 31 },
    { month: "Oct", hours: 46 },
    { month: "Nov", hours: 12 },
  ],
  topGames: [
    { title: "Placeholder Game A", hours: 612 },
    { title: "Placeholder Game B", hours: 340 },
    { title: "Placeholder Game C", hours: 205 },
    { title: "Placeholder Game D", hours: 148 },
    { title: "Placeholder Game E", hours: 96 },
  ],
};

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
