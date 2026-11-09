"use client";

import { useActionState, useState } from "react";
import { signGuestbook, type GuestbookState } from "@/app/offline/actions";

const MAX = 280;

export function GuestbookForm() {
  const [state, action, pending] = useActionState<GuestbookState, FormData>(signGuestbook, { status: "idle" });
  const [started] = useState(() => Date.now());
  const [length, setLength] = useState(0);
  const err = state.errors ?? {};

  return (
    <form action={action} className="grid max-w-[560px] gap-6" noValidate>
      {/* Hidden from people; bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="started" value={started} />

      <div className="ah-field">
        <label htmlFor="gb-name">Name</label>
        <input
          id="gb-name"
          name="name"
          maxLength={40}
          autoComplete="nickname"
          defaultValue={state.values?.name}
          aria-invalid={err.name ? "true" : undefined}
          aria-describedby={err.name ? "gb-name-error" : undefined}
        />
        {err.name && (
          <p id="gb-name-error" className="ah-error">
            {err.name}
          </p>
        )}
      </div>

      <div className="ah-field">
        <label htmlFor="gb-message">Note</label>
        <textarea
          id="gb-message"
          name="message"
          maxLength={MAX}
          defaultValue={state.values?.message}
          onChange={(e) => setLength(e.target.value.length)}
          aria-invalid={err.message ? "true" : undefined}
          aria-describedby={`gb-message-count${err.message ? " gb-message-error" : ""}`}
        />
        <p id="gb-message-count" className="ah-num text-[14px] text-[var(--ash)]">
          {length} of {MAX} characters
        </p>
        {err.message && (
          <p id="gb-message-error" className="ah-error">
            {err.message}
          </p>
        )}
      </div>

      <div className="ah-field">
        <label htmlFor="gb-rec">Recommendation (optional)</label>
        <input
          id="gb-rec"
          name="recommendation"
          maxLength={80}
          placeholder="A game, film, anime or album"
          defaultValue={state.values?.recommendation}
          aria-invalid={err.recommendation ? "true" : undefined}
          aria-describedby={err.recommendation ? "gb-rec-error" : undefined}
        />
        {err.recommendation && (
          <p id="gb-rec-error" className="ah-error">
            {err.recommendation}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="ah-button ah-button-solid">
          {pending ? "Sending note" : "Send note"}
        </button>
        <p role="status" className={state.status === "error" ? "ah-error" : "text-[15px] text-[var(--ash)]"}>
          {state.message}
        </p>
      </div>
    </form>
  );
}
