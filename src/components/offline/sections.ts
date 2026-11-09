/** The page's sections in order: the arrival HUD's nav and the thorn rail both read this. */
export const sections = [
  { id: "arrival", label: "House" },
  { id: "dossier", label: "Dossier" },
  { id: "now", label: "Now playing" },
  { id: "records", label: "Records" },
  { id: "favourites", label: "Favourites" },
  { id: "trophies", label: "Trophies" },
  { id: "play", label: "Play with me" },
  { id: "guestbook", label: "Guestbook" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
