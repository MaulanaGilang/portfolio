"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { sections, type SectionId } from "./sections";

// Moonwake's magic is a well that runs low and must be refilled. The rail is that well:
// scrolling draws water from it, and when the reader stops it slowly fills again.
const DRAIN_PER_SCREEN = 0.18; // share of the well spent per screen height scrolled
const REFILL_PER_SECOND = 0.12; // slow: nothing Moonwake does is fast
const REFILL_DELAY_MS = 900; // a pause before the water starts to return
const FLOOR = 0.12; // the well never runs completely dry

// A small horns-down crescent, the house moon.
const CRESCENT = "M2 12A8 8 0 0 1 18 12A8 6.2 0 0 0 2 12Z";

/**
 * Section navigation. On desktop, a fixed well down the left edge with a crescent
 * per section; the current one is lit red-violet. On phones, a slim bar at the top
 * that names the current section and opens the list.
 */
export function Moonwell() {
  const [current, setCurrent] = useState<SectionId>("arrival");
  const well = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);

  // Which section is on screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  // The water level, written straight to a CSS variable so it never re-renders React.
  useEffect(() => {
    const el = well.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--level", "1");
      return;
    }
    let level = 1;
    let lastY = scrollY;
    let lastScroll = 0;
    let raf = 0;
    let prev = performance.now();
    const set = () => el.style.setProperty("--level", level.toFixed(4));
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (now - lastScroll > REFILL_DELAY_MS && level < 1) {
        level = Math.min(1, level + REFILL_PER_SECOND * dt);
        set();
      }
      raf = level < 1 ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      const dy = Math.abs(scrollY - lastY);
      lastY = scrollY;
      lastScroll = performance.now();
      level = Math.max(FLOOR, level - (dy / innerHeight) * DRAIN_PER_SCREEN);
      set();
      if (!raf) {
        prev = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    set();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const label = sections.find((s) => s.id === current)?.label;

  return (
    <>
      <nav aria-label="Sections" className="ah-rail">
        <div className="ah-well-frame">
          <span ref={well} aria-hidden className="ah-well">
            <span className="ah-well-water" />
          </span>
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="ah-mark" aria-current={current === s.id ? "true" : undefined}>
                  <svg viewBox="0 0 20 14" aria-hidden>
                    <path d={CRESCENT} />
                  </svg>
                  <span className="ah-mark-label ah-label">{s.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <div className="ah-rail-mobile">
        <details ref={menu}>
          <summary>
            <span className="ah-label text-[var(--cream)]">
              <span className="sr-only">Current section: </span>
              {label}
            </span>
            <span className="ah-label">Sections</span>
          </summary>
          <nav aria-label="Sections">
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={current === s.id ? "true" : undefined}
                    onClick={() => menu.current?.removeAttribute("open")}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/" transitionTypes={["world-out"]}>Back to the portfolio</Link>
              </li>
            </ol>
          </nav>
        </details>
      </div>
    </>
  );
}
