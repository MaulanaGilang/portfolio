// Steam data for /offline, read on the server and cached for a day.
// The key comes from the STEAM_API_KEY environment variable (set in Vercel). It is only
// ever read here, on the server: never prefix it with NEXT_PUBLIC_, and never log a URL
// that contains it.

const STEAM_ID = "76561198294058313"; // Gilang's public Steam ID (not a secret)
const DAY = 60 * 60 * 24;
const API = "https://api.steampowered.com/IPlayerService";

type OwnedGame = { appid: number; name?: string; playtime_forever: number; playtime_2weeks?: number };
type RecentGame = { appid: number; name: string; playtime_2weeks: number; playtime_forever: number };

export type SteamStats = {
  gameCount: number;
  totalHours: number;
  mostPlayed: { appid: number; name: string; hours: number }[];
  recent: { appid: number; name: string; hours: number }[];
  fetchedAt: string;
};

const hours = (minutes: number) => Math.round(minutes / 60);

// During a deploy build a Steam outage must not fail the build: fall back to dashes.
// During the daily refresh, failing instead makes Next keep serving the last good page.
const building = process.env.NEXT_PHASE === "phase-production-build";

function failed(message: string): null {
  console.error(message);
  if (building) return null;
  throw new Error(message);
}

async function call<T>(method: string, params: Record<string, string>): Promise<T | null> {
  const key = process.env.STEAM_API_KEY;
  if (!key) return null; // not configured: show dashes, nothing to retry
  const qs = new URLSearchParams({ key, steamid: STEAM_ID, format: "json", ...params });
  let res: Response;
  try {
    res = await fetch(`${API}/${method}/v1/?${qs}`, { next: { revalidate: DAY } });
  } catch {
    return failed(`Steam ${method} request failed`);
  }
  if (!res.ok) return failed(`Steam ${method} failed with status ${res.status}`);
  return ((await res.json()) as { response?: T }).response ?? null;
}

/**
 * Library size, lifetime hours, most played and the last two weeks. Returns null
 * when the key is missing or the profile's game details are private (the page then
 * shows dashes). If Steam is down during a daily refresh it throws, so the previous
 * page, with the last good numbers, stays up.
 */
export async function getSteamStats(): Promise<SteamStats | null> {
  const [owned, recent] = await Promise.all([
    call<{ game_count?: number; games?: OwnedGame[] }>("GetOwnedGames", {
      include_appinfo: "1",
      include_played_free_games: "1",
    }),
    call<{ games?: RecentGame[] }>("GetRecentlyPlayedGames", {}),
  ]);
  const games = owned?.games;
  if (!games?.length) return null;

  const byTime = [...games].sort((a, b) => b.playtime_forever - a.playtime_forever);
  return {
    gameCount: owned?.game_count ?? games.length,
    totalHours: hours(games.reduce((sum, g) => sum + g.playtime_forever, 0)),
    mostPlayed: byTime
      .filter((g) => g.playtime_forever > 0)
      .slice(0, 5)
      .map((g) => ({ appid: g.appid, name: g.name ?? `App ${g.appid}`, hours: hours(g.playtime_forever) })),
    recent: (recent?.games ?? [])
      .slice(0, 5)
      .map((g) => ({ appid: g.appid, name: g.name, hours: Math.max(1, hours(g.playtime_2weeks)) })),
    fetchedAt: new Date().toISOString(),
  };
}
