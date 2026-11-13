"use client";

import { useState } from "react";

const QUOTES = [
  { text: "Quiet, eternal, and ours.", by: "The motto of House Maulana" },
  { text: "Never raise your voice. Never break a promise.", by: "The house code" },
  { text: "Quiet.", by: "The battle cry of the Moonwatch" },
];

/** A full-bleed quote with arrows and dots, one quote at a time. */
export function QuoteReel() {
  const [i, setI] = useState(0);
  const n = QUOTES.length;
  const q = QUOTES[i];
  return (
    <section aria-roledescription="carousel" aria-label="Sayings of the house" className="hx-quote">
      {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed backdrop */}
      <img src="/offline/moonwake/codex-moonwatch.webp" alt="" loading="lazy" className="hx-bleed-img" />
      <div className="hx-quote-copy">
        <blockquote key={i} className="hx-quote-text" aria-live="polite">
          &ldquo;{q.text}&rdquo;
        </blockquote>
        <p className="hx-small mt-4">{q.by}</p>
        <div className="hx-quote-nav">
          <button type="button" className="hx-arrow" aria-label="Previous saying" onClick={() => setI((i - 1 + n) % n)}>
            ‹
          </button>
          <div className="flex gap-1.5" role="group" aria-label="Choose a saying">
            {QUOTES.map((x, k) => (
              <button
                key={x.text}
                type="button"
                className="hx-dot"
                aria-label={`Saying ${k + 1} of ${n}`}
                aria-current={k === i ? "true" : undefined}
                onClick={() => setI(k)}
              />
            ))}
          </div>
          <button type="button" className="hx-arrow" aria-label="Next saying" onClick={() => setI((i + 1) % n)}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
