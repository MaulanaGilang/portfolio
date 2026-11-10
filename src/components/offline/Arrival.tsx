"use client";

import Link from "next/link";
import { useLayoutEffect } from "react";
import { house } from "@/data/offline";
import { PRELOADED_KEY } from "@/lib/preloader";
import { Crest } from "./Crest";
import { sections } from "./sections";

/**
 * The first screen: Moonwake. The crest fills in, the moon rises inside it,
 * then everything is still. The animation is pure CSS (.ah-crest-rise).
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
    <section id="arrival" aria-labelledby="arrival-title" className="ah-hud">
      <div className="ah-frame ah-hud-frame">
        <div className="ah-hud-top">
          <p className="ah-label">{house.name}</p>
          <Link href="/" transitionTypes={["world-out"]} className="ah-label ah-link max-[899px]:hidden">
            Back to the portfolio
          </Link>
        </div>

        <div className="ah-hud-body">
          <div className="ah-arrival-copy">
            <p className="ah-label mb-4">The other side of Gilang Maulana</p>
            <h1 id="arrival-title" className="ah-name">
              {house.seat}
            </h1>
            <p className="ah-motto mt-5">{house.motto}</p>
          </div>

          <div className="ah-emblem">
            <Crest rise title="The House Maulana crest: a silver crescent moon, horns down, on a wine-red circle" />
          </div>
        </div>

        <div className="ah-hud-bottom">
          <nav aria-label="Jump to a section" className="ah-hud-nav">
            {sections.slice(1).map((s) => (
              <a key={s.id} href={`#${s.id}`} className="ah-label">
                {s.label}
              </a>
            ))}
          </nav>
          <div>
            <p className="ah-label mb-3">About</p>
            <p className="text-[15px] leading-relaxed text-[var(--bone)]">{house.intro}</p>
            <Link href="/" transitionTypes={["world-out"]} className="ah-label ah-link mt-4 inline-block min-[900px]:hidden">
              Back to the portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
