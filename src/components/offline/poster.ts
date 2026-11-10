// Marks an element for the hover poster card (see PosterHover). Plain module, so
// server components can call it.
export function posterProps(p: { title: string; poster?: string; fallback?: string; clip?: string; meta?: string }) {
  return {
    "data-poster-title": p.title,
    ...(p.poster ? { "data-poster": p.poster } : {}),
    ...(p.fallback ? { "data-poster-fallback": p.fallback } : {}),
    ...(p.clip ? { "data-poster-clip": p.clip } : {}),
    ...(p.meta ? { "data-poster-meta": p.meta } : {}),
  };
}

/** Steam store art for a game: the portrait library image, falling back to the wide header. */
export const steamArt = (appid: number) => ({
  poster: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/library_600x900.jpg`,
  fallback: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
});
