// Listening data for /offline from ListenBrainz (free, public, no key), which records
// Gilang's Spotify plays. Read on the server and cached with the page.

const USER = "maulll"; // public ListenBrainz username (not a secret)
const API = `https://api.listenbrainz.org/1`;
const HOUR = 60 * 60;

type Track = { name: string; artist: string; cover?: string };

export type Listening = {
  /** The last few plays, newest first. */
  recent: (Track & { at: string })[];
  /** This week's most played track. */
  onRepeat?: Track & { plays: number };
  topArtists: { name: string; plays: number }[];
  topTracks: (Track & { plays: number })[];
};

const coverUrl = (mbid?: string | null, size = 250) => (mbid ? `https://coverartarchive.org/release/${mbid}/front-${size}` : undefined);

/** Not every release has art; keep the URL only if the Cover Art Archive actually serves it. */
async function checked(url?: string) {
  if (!url) return undefined;
  try {
    const res = await fetch(url, { method: "HEAD", next: { revalidate: HOUR } });
    return res.ok ? url : undefined;
  } catch {
    return undefined;
  }
}

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
type Recordings = {
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

/** Recent plays, this week's top track, and this month's top tracks and artists. Null when there is nothing yet. */
export async function getListening(): Promise<Listening | null> {
  const [artists, tracks, week, listens] = await Promise.all([
    get<Artists>(`/stats/user/${USER}/artists?range=month&count=3`),
    get<Recordings>(`/stats/user/${USER}/recordings?range=month&count=3`),
    get<Recordings>(`/stats/user/${USER}/recordings?range=week&count=1`),
    get<Listens>(`/user/${USER}/listens?count=5`),
  ]);

  const recent = await Promise.all(
    (listens?.payload?.listens ?? []).map(async (l) => ({
      name: l.track_metadata.track_name,
      artist: l.track_metadata.artist_name,
      at: new Date(l.listened_at * 1000).toISOString(),
      cover: await checked(coverUrl(l.track_metadata.mbid_mapping?.caa_release_mbid)),
    })),
  );

  const top = week?.payload?.recordings?.[0];
  const onRepeat = top && {
    name: top.track_name,
    artist: top.artist_name,
    plays: top.listen_count,
    cover: await checked(coverUrl(top.caa_release_mbid, 500)),
  };

  const data: Listening = {
    recent,
    onRepeat,
    topArtists: (artists?.payload?.artists ?? []).map((a) => ({ name: a.artist_name, plays: a.listen_count })),
    topTracks: (tracks?.payload?.recordings ?? []).map((t) => ({
      name: t.track_name,
      artist: t.artist_name,
      plays: t.listen_count,
      cover: coverUrl(t.caa_release_mbid, 500),
    })),
  };
  return data.recent.length || data.onRepeat || data.topArtists.length || data.topTracks.length ? data : null;
}
