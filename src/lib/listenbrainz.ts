// Listening data for /offline from ListenBrainz (free, public, no key), which records
// Gilang's Spotify plays. Read on the server and cached with the page.

const USER = "maulll"; // public ListenBrainz username (not a secret)
const API = `https://api.listenbrainz.org/1`;
const HOUR = 60 * 60;

export type Listening = {
  topArtists: { name: string; plays: number }[];
  topTracks: { name: string; artist: string; plays: number; cover?: string }[];
  last?: { name: string; artist: string; at: string; cover?: string };
};

const cover = (mbid?: string | null) => (mbid ? `https://coverartarchive.org/release/${mbid}/front-500` : undefined);

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: HOUR } });
    // 204: stats not computed yet (ListenBrainz builds them daily).
    if (!res.ok || res.status === 204) return null;
    return (await res.json()) as T;
  } catch {
    console.error(`ListenBrainz ${path.split("?")[0]} request failed`);
    return null;
  }
}

type Artists = { payload?: { artists?: { artist_name: string; listen_count: number }[] } };
type Tracks = {
  payload?: { recordings?: { track_name: string; artist_name: string; listen_count: number; caa_release_mbid?: string | null }[] };
};
type Listens = {
  payload?: {
    listens?: {
      listened_at: number;
      track_metadata: { track_name: string; artist_name: string; mbid_mapping?: { caa_release_mbid?: string | null } };
    }[];
  };
};

/** Top artists and tracks this month, and the last track played. Null when there is nothing yet. */
export async function getListening(): Promise<Listening | null> {
  const [artists, tracks, listens] = await Promise.all([
    get<Artists>(`/stats/user/${USER}/artists?range=month&count=3`),
    get<Tracks>(`/stats/user/${USER}/recordings?range=month&count=3`),
    get<Listens>(`/user/${USER}/listens?count=1`),
  ]);
  const l = listens?.payload?.listens?.[0];
  const data: Listening = {
    topArtists: (artists?.payload?.artists ?? []).map((a) => ({ name: a.artist_name, plays: a.listen_count })),
    topTracks: (tracks?.payload?.recordings ?? []).map((t) => ({
      name: t.track_name,
      artist: t.artist_name,
      plays: t.listen_count,
      cover: cover(t.caa_release_mbid),
    })),
    last: l && {
      name: l.track_metadata.track_name,
      artist: l.track_metadata.artist_name,
      at: new Date(l.listened_at * 1000).toISOString(),
      cover: cover(l.track_metadata.mbid_mapping?.caa_release_mbid),
    },
  };
  return data.topArtists.length || data.topTracks.length || data.last ? data : null;
}
