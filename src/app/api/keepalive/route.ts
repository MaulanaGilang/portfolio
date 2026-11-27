import { pingGuestbook } from "@/lib/guestbook";

// Called once a day by Vercel Cron (vercel.json). It makes one tiny read of the
// guestbook so the free Supabase project stays active and is never paused.
// Read-only and returns nothing private, so it doesn't need a secret.
export async function GET() {
  const ok = await pingGuestbook();
  return Response.json({ ok, at: new Date().toISOString() }, { status: ok ? 200 : 502 });
}
