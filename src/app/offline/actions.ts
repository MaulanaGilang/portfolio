"use server";

export type GuestbookState = {
  status: "idle" | "error" | "saved";
  message?: string;
  errors?: Partial<Record<"name" | "message" | "recommendation", string>>;
  values?: { name: string; message: string; recommendation: string };
};

const LIMITS = { name: 40, message: 280, recommendation: 80 };
const MIN_MS_ON_PAGE = 3000;

/**
 * Validates a guestbook note. The database is not connected yet, so a valid
 * note is not stored: the visitor is told so plainly. Wiring the insert (as
 * "pending", for approval) is phase 5 in docs/offline/architecture.md.
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

  return {
    status: "error",
    message: "The guestbook isn't connected yet, so your note wasn't saved. Try again in a few weeks.",
    values,
  };
}
