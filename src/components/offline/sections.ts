/** The page's sections in order: the top bar and the footer both read this. */
export const sections = [
  { id: "arrival", label: "Moonwake", short: "Home" },
  { id: "favourites", label: "The Library", short: "Library" },
  { id: "records", label: "The Ledger", short: "Ledger" },
  { id: "play", label: "The Long Bridge", short: "Bridge" },
  { id: "guestbook", label: "The Long Table", short: "Table" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
