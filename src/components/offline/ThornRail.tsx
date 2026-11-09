"use client";

import Link from "next/link";
import { motion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { sections, type SectionId } from "./sections";

// A four-point thorn, the same shape as the diamonds on the banner's spires.
const THORN = "M14 2C15.5 9 19 12.5 26 14C19 15.5 15.5 19 14 26C12.5 19 9 15.5 2 14C9 12.5 12.5 9 14 2Z";

/**
 * Section navigation. On desktop, a fixed stem down the left edge with one
 * thorn per section; scroll progress fills the stem. On phones, a slim bar at
 * the top that names the current section and opens the list.
 */
export function ThornRail() {
  const [current, setCurrent] = useState<SectionId>("arrival");
  const { scrollYProgress } = useScroll();
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id as SectionId);
      },
      // A thin band across the middle of the screen decides which section is current.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  const label = sections.find((s) => s.id === current)?.label;

  return (
    <>
      <nav aria-label="Sections" className="ah-rail">
        <div className="relative">
        <span aria-hidden className="ah-rail-stem">
          <motion.span className="ah-rail-fill" style={{ scaleY: scrollYProgress }} />
        </span>
        <ol>
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="ah-thorn" aria-current={current === s.id ? "true" : undefined}>
                <svg viewBox="0 0 28 28" aria-hidden>
                  <path className="ah-thorn-shape" d={THORN} />
                </svg>
                <span className="ah-thorn-label ah-label">{s.label}</span>
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
                <Link href="/">Back to the portfolio</Link>
              </li>
            </ol>
          </nav>
        </details>
      </div>
    </>
  );
}
