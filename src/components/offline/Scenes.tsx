"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { SectionId } from "./sections";

/**
 * The fixed backdrop. Each part of the page has its own place in the house, and
 * the scene crossfades as the reader moves between them:
 * courtyard (arrival, dossier), hall (records), glasshouse (favourites),
 * balcony (play, guestbook).
 */
const scenes: { src: string; sections: SectionId[] }[] = [
  { src: "/offline/scene-courtyard.webp", sections: ["arrival", "dossier", "now"] },
  { src: "/offline/scene-hall.webp", sections: ["records"] },
  { src: "/offline/scene-glasshouse.webp", sections: ["favourites"] },
  { src: "/offline/scene-balcony.webp", sections: ["play", "guestbook"] },
];

export function Scenes() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = scenes.findIndex((s) => s.sections.includes(e.target.id as SectionId));
          if (i >= 0) setActive(i);
        }
      },
      // The section crossing the middle of the screen decides the scene.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of scenes) for (const id of s.sections) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <div className="ah-scene" aria-hidden>
      {scenes.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt=""
          fill
          sizes="100vw"
          // Already compressed 1920px WebP (~100 KB): serve as is, no optimiser round trip.
          unoptimized
          priority={i === 0}
          // The later scenes load right away at low priority, so a crossfade never reveals an empty frame.
          {...(i > 0 ? { loading: "eager" as const, fetchPriority: "low" as const } : {})}
          className="ah-scene-img"
          data-active={i === active ? "" : undefined}
        />
      ))}
    </div>
  );
}
