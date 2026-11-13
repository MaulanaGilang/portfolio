"use client";

import { useLayoutEffect } from "react";
import { house } from "@/data/offline";
import { PRELOADED_KEY } from "@/lib/preloader";
import { sections } from "./sections";
import { TopBar, Wordmark } from "./TopBar";

/**
 * The top bar and the opening screen: one full-screen painting with the city's
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
      <TopBar brandHref="#arrival" links={[...sections.map((s) => ({ href: `#${s.id}`, label: s.short })), { href: "/offline/moonwake", label: "Codex" }]} />
      <section id="arrival" aria-labelledby="arrival-title" className="hx-hero">
        {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed hero, already sized and compressed */}
        <img src="/offline/moonwake-bridge.webp" alt="" fetchPriority="high" className="hx-bleed-img hx-hero-img" />
        <Wordmark as="h1" id="arrival-title" />
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
