/**
 * Content for /offline (After Hours).
 *
 * Hand-written content. Steam numbers are live, from src/lib/steam.ts. The
 * guestbook holds one example note until the database is connected.
 */

export const house = {
  name: "House Maulana",
  /** The house's seat: a cliff-city over deep water. */
  seat: "Moonwake",
  motto: "Quiet, eternal, and ours.",
  intro: "Games, music, films and anime. The side of Gilang Maulana that isn't on the CV.",
};

export const characterSheet: { label: string; value: string }[] = [
  { label: "Name", value: "Gilang Maulana" },
  { label: "Title", value: "Archmagus of the Coast, ruler of Moonwake" },
  { label: "Class", value: "All-rounder mage. By day a data person, by night a chill gamer" },
  { label: "Main roles", value: "Mage, Support" },
  { label: "Familiar", value: "A dragon" },
  { label: "Focus", value: "A black staff with a crescent head and a red-violet light: the Lamp, carried into the world" },
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

/** One person (or animal) of Moonwake for the character panel. Gilang is added first by the page, from characterSheet. */
export type Character = { id: string; name: string; image: string; bio: string[]; cells: { label: string; value: string }[] };

export const characters: Character[] = [
  {
    id: "moonwatch",
    name: "The Moonwatch",
    image: "/offline/moonwake/concept/watch-soldiers.webp",
    bio: [
      "The city's guard, in light silver-plated armour over wine-red cloth. They fight patiently and defensively, and their most famous battle is one they never had to start: the Bridge Stand.",
      "Their battle cry is a single word. \"Quiet.\"",
    ],
    cells: [
      { label: "Class", value: "City guard" },
      { label: "Ranks", value: "Twenty-one, Mercenary to Archmagus" },
    ],
  },
  {
    id: "still",
    name: "The Still",
    image: "/offline/moonwake/concept/watch-still.webp",
    bio: ["Twelve guards in black hooded cloaks who never speak. They stand where the Archmagus stands, and nobody in Moonwake has heard any of them say a word."],
    cells: [
      { label: "Class", value: "Silent guard" },
      { label: "Number", value: "Always twelve" },
    ],
  },
  {
    id: "townsfolk",
    name: "The Townsfolk",
    image: "/offline/moonwake/concept/life-townsfolk.webp",
    bio: ["A few thousand fisherfolk, smiths and scribes. They eat spiced food, play strings, gongs and drums, and greet each other with two words: \"We're here.\""],
    cells: [
      { label: "Class", value: "Citizens" },
      { label: "Feasts", value: "Moonwake Night, the Long Table, the Day of Names" },
    ],
  },
  {
    id: "calico",
    name: "The Calico",
    image: "/offline/moonwake/concept/life-library.webp",
    bio: ["The sacred animal of Moonwake. The crest-cats are treated like minor nobility, go wherever they like, and are especially fond of the library windowsills."],
    cells: [
      { label: "Class", value: "Sacred animal" },
      { label: "Rank", value: "Minor nobility, unofficially" },
    ],
  },
];
