"use client";

import Link from "next/link";
import { useLayoutEffect } from "react";
import { house } from "@/data/offline";
import { PRELOADED_KEY } from "@/lib/preloader";
import { Crest } from "./Crest";
import { sections } from "./sections";

/**
 * The top bar and the opening screen: section links on the left, the house in the
 * centre, the way home on the right; then one full-screen painting with the city's
 * name set across the top, its letters arriving one by one.
 */
export function Arrival() {
  useLayoutEffect(() => {
    // The visitor is already inside the site: crossing to the portfolio must not replay its loader.
    document.documentElement.dataset.preloaded = "";
    try {
      sessionStorage.setItem(PRELOADED_KEY, "1");
    } catch {}
  }, []);

  return (
    <>
      <header className="hx-nav">
        <nav aria-label="Sections" className="hx-nav-links">
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="hx-navlink">
              {i === 0 && <span aria-hidden className="hx-navdot" />}
              {s.short}
            </a>
          ))}
        </nav>
        <a href="#arrival" className="hx-nav-brand" aria-label={`${house.name}, back to the top`}>
          <Crest className="size-[18px]" />
          <span>{house.name}</span>
        </a>
        <Link href="/" transitionTypes={["world-out"]} className="hx-navlink hx-nav-home">
          Back to the portfolio
        </Link>
      </header>

      <section id="arrival" aria-labelledby="arrival-title" className="hx-hero">
        {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed hero, already sized and compressed */}
        <img src="/offline/moonwake-bridge.webp" alt="" fetchPriority="high" className="hx-bleed-img hx-hero-img" />
        <h1 id="arrival-title" className="hx-mark" aria-label={house.seat}>
          {house.seat.split("").map((ch, k) => (
            <span key={k} aria-hidden style={{ animationDelay: `${[3, 0, 5, 1, 6, 2, 4, 7][k % 8] * 110}ms` }}>
              {ch}
            </span>
          ))}
        </h1>
        <div className="hx-hero-foot">
          <p className="hx-small-white">A quiet cliff-city of {house.name}</p>
          <p className="hx-small-white">
            <span aria-hidden>⌄ </span>Scroll to explore
          </p>
        </div>
      </section>
    </>
  );
}
