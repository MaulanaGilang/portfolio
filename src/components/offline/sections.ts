/** The page's sections in order: the arrival's nav and the Moonwell both read this. */
export const sections = [
  { id: "arrival", label: "Moonwake" },
  { id: "codex", label: "Codex" },
  { id: "dossier", label: "The Archmagus" },
  { id: "records", label: "The Ledger" },
  { id: "favourites", label: "The Library" },
  { id: "play", label: "The Long Bridge" },
  { id: "guestbook", label: "The Long Table" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
