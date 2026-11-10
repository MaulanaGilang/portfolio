"use client";

import { useEffect, useRef, useState } from "react";
import type { Favourite } from "@/data/offline";

type Shown = { item: Favourite; category: string };

/**
 * Three unranked lists. Pointing at a title shows its poster, or a short muted
 * clip when one is set, in a card that follows the cursor. The preview is
 * decoration: every title is readable without it, and nothing shows on touch.
 */
export function Favourites({ categories }: { categories: { id: string; label: string; items: Favourite[] }[] }) {
  const [shown, setShown] = useState<Shown | null>(null);
  const card = useRef<HTMLDivElement>(null);

  // Follow the pointer without re-rendering on every move.
  useEffect(() => {
    if (!shown) return;
    const move = (e: PointerEvent) => {
      const el = card.current;
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const left = Math.min(e.clientX + 24, innerWidth - w - 12);
      const top = Math.min(Math.max(12, e.clientY - h / 2), innerHeight - h - 12);
      el.style.translate = `${left}px ${top}px`;
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, [shown]);

  return (
    <>
      <div className="ah-grid ah-grid-3">
        {categories.map((c) => (
          <div key={c.id} className="ah-frame ah-panel">
            <div className="ah-panel-head">
              <h3 className="ah-label">{c.label}</h3>
              <p className="ah-label">
                {c.items.length} {c.items.length === 1 ? "title" : "titles"}
              </p>
            </div>
            <ul className="ah-rows">
              {c.items.map((it) => (
                <li
                  key={it.title}
                  className="ah-fav !grid-cols-[1fr_auto]"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setShown({ item: it, category: c.label })}
                  onPointerLeave={() => setShown(null)}
                >
                  <span className="text-[var(--bone)]">{it.title}</span>
                  <span className="ah-num text-[14px] text-[var(--ash)]">{it.year}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {shown && (
        <div ref={card} aria-hidden className="ah-preview ah-frame">
          {shown.item.clip ? (
            <video src={shown.item.clip} poster={shown.item.poster} autoPlay muted loop playsInline />
          ) : shown.item.poster ? (
            // eslint-disable-next-line @next/next/no-img-element -- posters come from anywhere; no optimisation needed for a hover card
            <img src={shown.item.poster} alt="" />
          ) : (
            // No artwork yet: a placeholder card in the house style.
            <div className="ah-preview-blank">
              <span className="ah-label">{shown.category}</span>
              <span className="ah-wide text-[17px] leading-tight text-[var(--cream)]">{shown.item.title}</span>
              <span className="ah-label">{shown.item.year}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
