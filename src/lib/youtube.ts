// YouTube thumbnails for the Ledger's remixes. Not every video has the large
// "maxresdefault" image; for those YouTube serves a grey placeholder (with a 404),
// which a browser would happily show. So check on the server and fall back to
// "hqdefault", which every video has. Cached for a day.

const DAY = 60 * 60 * 24;

export async function bestThumbnail(id: string): Promise<string> {
  const large = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  try {
    const res = await fetch(large, { method: "HEAD", next: { revalidate: DAY } });
    if (res.ok) return large;
  } catch {
    // fall through to the standard size
  }
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
