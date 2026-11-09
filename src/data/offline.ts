/**
 * Content for /offline (After Hours).
 *
 * DUMMY DATA. Every title, handle, number and note below is a placeholder so
 * the page can be built and reviewed. Replace it with real content; the live
 * parts (music, Steam, guestbook) will come from the pipeline later.
 */

export const house = {
  name: "House Maulana",
  /** Leave empty until the motto is decided; the arrival screen works without it. */
  motto: "",
  intro: "Games, music, films and anime. The side of Gilang Maulana that isn't on the CV.",
};

export const characterSheet: { label: string; value: string }[] = [
  { label: "Name", value: "Gilang Maulana" },
  { label: "Title", value: "Heir of House Maulana" },
  { label: "Class", value: "Data engineer by day, chill gamer by night" },
  { label: "Main roles", value: "Support, strategist" },
  { label: "Home", value: "Tuban, East Java" },
  { label: "Plays", value: "For fun, not for rank" },
  {
    label: "Languages",
    value: "Indonesian (native), English (B2), Mandarin (elementary, HSK 1), Spanish (elementary, A1)",
  },
];

export type Medium = "music" | "game" | "show" | "book";

export const nowPlaying: { medium: Medium; verb: string; title: string; by?: string }[] = [
  { medium: "music", verb: "Listening to", title: "Placeholder Track", by: "Placeholder Artist" },
  { medium: "game", verb: "Playing", title: "Placeholder Game" },
  { medium: "show", verb: "Watching", title: "Placeholder Series" },
  { medium: "book", verb: "Reading", title: "Placeholder Book", by: "Placeholder Author" },
];

export const records = {
  /** Headline figures for the record book. */
  totals: [
    { label: "Hours played this year", value: "445" },
    { label: "Games in library", value: "128" },
    { label: "Tracks played this year", value: "9,312" },
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
  topTracks: [
    { title: "Placeholder Track A", artist: "Artist One", plays: 142 },
    { title: "Placeholder Track B", artist: "Artist Two", plays: 118 },
    { title: "Placeholder Track C", artist: "Artist Three", plays: 97 },
    { title: "Placeholder Track D", artist: "Artist One", plays: 83 },
    { title: "Placeholder Track E", artist: "Artist Four", plays: 71 },
  ],
  topGames: [
    { title: "Placeholder Game A", hours: 612 },
    { title: "Placeholder Game B", hours: 340 },
    { title: "Placeholder Game C", hours: 205 },
    { title: "Placeholder Game D", hours: 148 },
    { title: "Placeholder Game E", hours: 96 },
  ],
};

/** Things Gilang likes, in three categories. Unranked, any length. */
export const favourites: { id: string; label: string; items: { title: string; year: number }[] }[] = [
  {
    id: "games",
    label: "Games",
    items: [
      { title: "Placeholder Game A", year: 2018 },
      { title: "Placeholder Game B", year: 2020 },
      { title: "Placeholder Game C", year: 2022 },
      { title: "Placeholder Game D", year: 2024 },
    ],
  },
  {
    id: "movies",
    label: "Movies",
    items: [
      { title: "Placeholder Film A", year: 2014 },
      { title: "Placeholder Film B", year: 2019 },
      { title: "Placeholder Film C", year: 2021 },
      { title: "Placeholder Film D", year: 2024 },
    ],
  },
  {
    id: "anime",
    label: "Anime",
    items: [
      { title: "Placeholder Series A", year: 2013 },
      { title: "Placeholder Series B", year: 2016 },
      { title: "Placeholder Series C", year: 2020 },
      { title: "Placeholder Series D", year: 2023 },
    ],
  },
];

export const trophies: { title: string; detail: string }[] = [
  { title: "Placeholder achievement", detail: "Where and when it happened, in one line." },
  { title: "Placeholder achievement", detail: "Where and when it happened, in one line." },
  { title: "Placeholder achievement", detail: "Where and when it happened, in one line." },
];

export type Account = {
  service: "Steam" | "Riot ID" | "Discord" | "Spotify" | "Instagram";
  handle: string;
  /** Profile link, when the service has public profiles. */
  href?: string;
};

export const accounts: Account[] = [
  { service: "Steam", handle: "placeholder-steam", href: "https://steamcommunity.com/" },
  { service: "Riot ID", handle: "Placeholder#0000" },
  { service: "Discord", handle: "placeholder.discord" },
  { service: "Spotify", handle: "Placeholder", href: "https://open.spotify.com/" },
  { service: "Instagram", handle: "@placeholder", href: "https://www.instagram.com/" },
];

export const playHours = {
  when: "Weeknights 20:00 to 23:00, weekends whenever",
  zone: "WIB, UTC+7",
  queue: ["Placeholder Game A", "Placeholder Game B", "Placeholder Game C"],
};

export const guestbook: { name: string; message: string; recommendation?: string; date: string }[] = [
  { name: "Placeholder visitor", message: "A short placeholder note left by a visitor.", date: "2026-10-28" },
  {
    name: "Another visitor",
    message: "Another placeholder note, a little longer, to show how two lines wrap on the page.",
    recommendation: "A placeholder recommendation",
    date: "2026-11-02",
  },
  { name: "Third visitor", message: "Short one.", date: "2026-11-06" },
];
