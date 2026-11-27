// The Long Table's notes, stored in Supabase (project "portfolio-guestbook").
//
// Security lives in the database, not here: with this public (publishable) key
// anyone may only add a note, which always starts unapproved, and read approved
// notes. Approving, editing and deleting happen in the Supabase dashboard
// (Table Editor > guestbook > tick "approved"). Rules: supabase/guestbook.sql.
// The key is meant to be public, like a site's analytics ID, so it is safe here.

const URL = "https://kiombecbwocfeclgojmo.supabase.co/rest/v1/guestbook";
const KEY = "sb_publishable_PtpowbVpdm8YYKGvByJ4_w_5PZeHjez";
const FIVE_MIN = 300;

export type Note = { name: string; message: string; recommendation?: string; date: string };

/** Approved notes, newest first. Refreshed every five minutes; empty if the database can't be reached. */
export async function getApprovedNotes(): Promise<Note[]> {
  try {
    const res = await fetch(`${URL}?select=name,message,recommendation,created_at&approved=eq.true&order=created_at.desc&limit=50`, {
      headers: { apikey: KEY },
      next: { revalidate: FIVE_MIN },
    });
    if (!res.ok) return [];
    const rows = (await res.json()) as { name: string; message: string; recommendation: string | null; created_at: string }[];
    return rows.map((r) => ({ name: r.name, message: r.message, recommendation: r.recommendation ?? undefined, date: r.created_at }));
  } catch {
    return [];
  }
}

/** Adds an unapproved note. "limited" means the same sender posted in the last two minutes (or the hourly cap is hit). */
export async function addNote(note: { name: string; message: string; recommendation?: string; ipHash?: string }) {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { apikey: KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({
        name: note.name,
        message: note.message,
        recommendation: note.recommendation || null,
        ip_hash: note.ipHash ?? null,
      }),
      cache: "no-store",
    });
    if (res.ok) return "saved" as const;
    if (res.status === 401 || res.status === 403) return "limited" as const;
    return "failed" as const;
  } catch {
    return "failed" as const;
  }
}
