"use client";

import { useState } from "react";
import type { Character } from "@/data/offline";

/**
 * A framed profile: portrait on the left, name, bio and info cells on the right,
 * and a strip of thumbnails with arrows underneath to switch between characters.
 */
export function CharacterPanel({ characters }: { characters: Character[] }) {
  const [i, setI] = useState(0);
  const n = characters.length;
  const c = characters[i];

  return (
    <div className="hx-chars">
      <article className="hx-char" aria-live="polite">
        <div className="hx-char-media">
          {/* eslint-disable-next-line @next/next/no-img-element -- concept art, already sized */}
          <img key={c.id} src={c.image} alt="" style={c.focus ? { objectPosition: c.focus } : undefined} />
        </div>
        <div className="hx-char-name">
          <h3 className="hx-h1">{c.name}</h3>
        </div>
        <div className="hx-char-bio">
          {c.bio.map((p) => (
            <p key={p} className="hx-small">
              {p}
            </p>
          ))}
        </div>
        <dl className="hx-char-cells">
          {c.cells.map((cell) => (
            <div key={cell.label}>
              <dt className="hx-small">{cell.label}</dt>
              <dd className="hx-small-white">{cell.value}</dd>
            </div>
          ))}
        </dl>
      </article>

      <div className="hx-strip">
        <div className="hx-strip-arrows">
          <button type="button" className="hx-arrow" aria-label="Previous character" onClick={() => setI((i - 1 + n) % n)}>
            <span aria-hidden>‹</span>
          </button>
          <button type="button" className="hx-arrow" aria-label="Next character" onClick={() => setI((i + 1) % n)}>
            <span aria-hidden>›</span>
          </button>
        </div>
        <ul className="hx-strip-list" aria-label="Characters">
          {characters.map((x, k) => (
            <li key={x.id}>
              <button type="button" className="hx-thumb" aria-current={k === i ? "true" : undefined} onClick={() => setI(k)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={x.image} alt="" loading="lazy" style={x.focus ? { objectPosition: x.focus } : undefined} />
                <span className="hx-small-white truncate">{x.name.replace(/^The /, "")}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
