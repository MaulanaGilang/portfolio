"use client";

import Link from "next/link";
import { useLayoutEffect } from "react";
import { house } from "@/data/offline";
import { PRELOADED_KEY } from "@/lib/preloader";
import { Crest } from "./Crest";
import { sections } from "./sections";

/**
 * The top bar and the opening screen, in the manner of a universe site: a slim
 * bar with the crest and section links, then one full-screen painting with the
 * city's name set as wide as the page.
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
      <header className="ah-top">
        <a href="#arrival" className="ah-top-brand">
          <Crest className="size-7" />
          <span className="ah-label whitespace-nowrap max-[599px]:hidden">{house.name}</span>
        </a>
        <nav aria-label="Sections" className="ah-top-nav">
          {sections.slice(1).map((s) => (
            <a key={s.id} href={`#${s.id}`} className="ah-label ah-link">
              {s.label}
            </a>
          ))}
        </nav>
        <Link href="/" transitionTypes={["world-out"]} className="ah-label ah-link whitespace-nowrap">
          Back to the portfolio
        </Link>
      </header>

      <section id="arrival" aria-labelledby="arrival-title" className="ah-hero">
        {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed hero, already sized and compressed */}
        <img src="/offline/moonwake-bridge.webp" alt="" fetchPriority="high" className="ah-hero-img" />
        <h1 id="arrival-title" className="ah-hero-title">
          {house.seat}
        </h1>
        <span />
        <div className="ah-hero-foot">
          <div>
            <p className="ah-motto">{house.motto}</p>
            <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-[var(--bone)]">{house.intro}</p>
          </div>
          <p className="ah-label max-[899px]:hidden">Scroll to explore</p>
        </div>
      </section>
    </>
  );
}
