"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shows a poster that follows the cursor when pointing at any element marked
 * with data-poster-title (Favourites, Now playing, Steam lists). One card for
 * the whole page, driven by event delegation, so the lists can stay server
 * components. Mark an element with:
 *   data-poster-title   title shown on the placeholder card
 *   data-poster         image URL (optional)
 *   data-poster-fallback  second image to try if the first fails (optional)
 *   data-poster-clip    muted clip URL, played instead of the image (optional)
 *   data-poster-meta    small label on the placeholder card (optional)
 * (posterProps in ./poster builds these attributes.)
 * Decoration only: hidden from assistive tech, mouse only, nothing on touch.
 */
type Shown = { title: string; poster?: string; fallback?: string; clip?: string; meta?: string };

export function PosterHover() {
  const [shown, setShown] = useState<Shown | null>(null);
  const [src, setSrc] = useState<string | undefined>();
  const card = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let current: Element | null = null;
    const place = () => {
      const el = card.current;
      if (!el) return;
      const { x, y } = last.current;
      const left = Math.min(x + 24, innerWidth - el.offsetWidth - 12);
      const top = Math.min(Math.max(12, y - el.offsetHeight / 2), innerHeight - el.offsetHeight - 12);
      el.style.translate = `${left}px ${top}px`;
    };
    const over = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last.current = { x: e.clientX, y: e.clientY };
      const target = (e.target as Element).closest?.("[data-poster-title]") ?? null;
      if (target === current) return place();
      current = target;
      if (!target) return setShown(null);
      const d = (target as HTMLElement).dataset;
      setShown({ title: d.posterTitle!, poster: d.poster, fallback: d.posterFallback, clip: d.posterClip, meta: d.posterMeta });
      setSrc(d.poster);
    };
    const hide = () => {
      current = null;
      setShown(null);
    };
    addEventListener("pointermove", over, { passive: true });
    document.addEventListener("pointerleave", hide);
    addEventListener("scroll", hide, { passive: true });
    return () => {
      removeEventListener("pointermove", over);
      document.removeEventListener("pointerleave", hide);
      removeEventListener("scroll", hide);
    };
  }, []);

  // Position the card as soon as it mounts, before the next pointer move.
  useEffect(() => {
    if (!shown) return;
    const el = card.current;
    if (!el) return;
    const { x, y } = last.current;
    el.style.translate = `${Math.min(x + 24, innerWidth - el.offsetWidth - 12)}px ${Math.min(Math.max(12, y - el.offsetHeight / 2), innerHeight - el.offsetHeight - 12)}px`;
  }, [shown]);

  if (!shown) return null;
  return (
    <div ref={card} aria-hidden className="ah-preview ah-frame">
      {shown.clip ? (
        <video src={shown.clip} poster={src} autoPlay muted loop playsInline />
      ) : src ? (
        // eslint-disable-next-line @next/next/no-img-element -- posters come from several hosts; a hover card needs no optimisation
        <img
          src={src}
          alt=""
          onError={() => setSrc(src === shown.fallback ? undefined : shown.fallback)}
        />
      ) : (
        // No artwork: a placeholder card in the house style.
        <div className="ah-preview-blank">
          <span className="ah-label">{shown.meta ?? ""}</span>
          <span className="ah-wide text-[17px] leading-tight text-[var(--cream)]">{shown.title}</span>
          <span />
        </div>
      )}
    </div>
  );
}
