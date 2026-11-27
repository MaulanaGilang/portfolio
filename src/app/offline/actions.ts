"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { addNote } from "@/lib/guestbook";

export type GuestbookState = {
  status: "idle" | "error" | "saved";
  message?: string;
  errors?: Partial<Record<"name" | "message" | "recommendation", string>>;
  values?: { name: string; message: string; recommendation: string };
};

const LIMITS = { name: 40, message: 280, recommendation: 80 };
const MIN_MS_ON_PAGE = 3000;

/**
 * Validates a guestbook note and stores it, unapproved, in Supabase (lib/guestbook.ts).
 * It appears on the page once approved in the Supabase dashboard. The sender's IP is
 * only kept as a salted hash, so the database can refuse a second note within two minutes.
 */
export async function signGuestbook(_prev: GuestbookState, form: FormData): Promise<GuestbookState> {
  const text = (k: string) => String(form.get(k) ?? "").trim();
  const values = { name: text("name"), message: text("message"), recommendation: text("recommendation") };

  // Bots fill the hidden field or post instantly. Answer as if all went well and drop the note.
  const started = Number(form.get("started"));
  if (text("website") || !Number.isFinite(started) || Date.now() - started < MIN_MS_ON_PAGE) {
    return { status: "saved", message: "Thanks. Your note will appear once it's approved." };
  }

  const errors: GuestbookState["errors"] = {};
  if (!values.name) errors.name = "Add a name, or a nickname.";
  else if (values.name.length > LIMITS.name) errors.name = `Keep the name under ${LIMITS.name} characters.`;
  if (!values.message) errors.message = "Write a short note before sending.";
  else if (values.message.length > LIMITS.message)
    errors.message = `That note is over ${LIMITS.message} characters. Shorten it and send again.`;
  if (values.recommendation.length > LIMITS.recommendation)
    errors.recommendation = `Keep the recommendation under ${LIMITS.recommendation} characters.`;
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "";
  const ipHash = ip ? createHash("sha256").update(`moonwake-long-table:${ip}`).digest("hex") : undefined;

  const result = await addNote({ ...values, ipHash });
  if (result === "saved") return { status: "saved", message: "Thanks. Your note will appear once it's approved." };
  if (result === "limited")
    return { status: "error", message: "You've just left a note. Wait a couple of minutes before sending another.", values };
  return { status: "error", message: "Your note couldn't be sent just now. Try again in a moment.", values };
}
