"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/content";
import { useIntroDone, useIntroSettled } from "@/lib/intro";
import { PillButton, Ticks } from "../ui/primitives";
import { Scramble } from "../ui/Scramble";

// WebGL is split out of the first load and never rendered on the server.
const BlockScene = dynamic(() => import("../hero/BlockScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

// Where each stage begins across the frame. Matches the shader clock:
// screen x = 0.5 + (p - 0.5) * 1.15, with cleaning from p≈0.30 and modeling from p≈0.60.
const stages = [
  { label: "Raw", at: "2%", dot: "bg-[#1b1c22]" },
  { label: "Cleaning", at: "27%", dot: "bg-lime" },
  { label: "Modeled", at: "61%", dot: "bg-accent-solid" },
];

export function Hero() {
  const frame = useRef<HTMLDivElement>(null);
  const ready = useIntroDone();
  const settled = useIntroSettled();
  const reduce = useReducedMotion();
  const [onScreen, setOnScreen] = useState(true);

  // Rest the GPU whenever the frame is scrolled out of view.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // Exactly one screen: title row, the frame fills what's left, ticks at the bottom.
    <section id="top" className="relative flex min-h-[100dvh] flex-col pt-[clamp(84px,10vh,96px)] pb-4">
      <div className="container-site flex flex-1 flex-col">
        {/* Reading order is the hierarchy: name (display) → role (heading) → intro (body) → Résumé. */}
        <div>
          {/* Optical alignment: each line is pulled left by its first glyph's side bearing
              (G 0.036em, D 0.08em, I 0.06em), so the ink, not the text box, meets the
              3D frame's left edge, the way Résumé meets its right edge. */}
          <h1 className="-ml-[0.036em] display text-[clamp(3.4rem,14vw,4.5rem)] md:text-[clamp(4rem,9vw,9rem)]">
            <span className="sr-only">{profile.name}, Data Analyst moving into Data Engineering</span>
            <span aria-hidden className="flex flex-wrap gap-x-[0.2em]">
              {profile.name.split(" ").map((word, i) => (
                // The mask's bottom room for the "g" descender stays in the layout, so the
                // hairline below always clears it.
                <span key={word} className="block overflow-hidden pb-[0.22em]">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={ready ? { y: "0%" } : undefined}
                    transition={{ duration: 1.1, ease, delay: 0.05 + i * 0.08 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          {/* One left edge for name, role and intro; a hairline separates the name from its
              supporting row, and Résumé sits on the intro's last line at the right. */}
          <motion.div
            className="mt-[clamp(4px,0.8vh,10px)] flex flex-col gap-5 border-t border-line pt-[clamp(14px,2vh,22px)] md:flex-row md:items-end md:justify-between md:gap-10"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
          >
            <div>
              {/* One clear step below the name (~38px against a 144px name). */}
              <p className="-ml-[0.08em] text-[clamp(1.5rem,2.4vw,2.375rem)] leading-[1.15] tracking-[-0.02em]">
                {profile.role} <span className="text-fg-3">→</span>{" "}
                <span className="text-accent">
                  <Scramble text={profile.target} delay={500} duration={900} play={ready} />
                </span>
              </p>
              <p className="mt-2 -ml-[0.06em] max-w-[48ch] text-[16px] leading-[1.45] text-fg-2">{profile.intro}</p>
            </div>
            <div className="shrink-0">
              <PillButton href={profile.resume} external>
                Résumé
              </PillButton>
            </div>
          </motion.div>
        </div>

        {/* Studio frame: the 3D pipeline, like Lusion's hero render. Grows to fill the rest of the screen. */}
        <motion.div
          ref={frame}
          id="hero-frame"
          className="relative mt-[clamp(16px,2.6vh,32px)] min-h-[300px] flex-1 overflow-hidden rounded-frame"
          style={{
            background: "radial-gradient(120% 95% at 50% 15%, #fafbff 0%, #e4e6ef 55%, #c7cad9 100%)",
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.2, ease, delay: 0.15 }}
        >
          <div
            aria-hidden
            className="absolute inset-x-[10%] bottom-[6%] h-[22%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(40_44_70/0.16),transparent)]"
          />
          {/* Draws one frame (compiling its shaders) under the preloader, then animates once the curtain is gone. */}
          <BlockScene calm={!!reduce} active={onScreen && settled} />

          {/* Stage markers along the top, each at the point where that stage begins. */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-4 bottom-4 md:top-5">
            {stages.map((s, i) => (
              <div key={s.label} className="absolute top-0 bottom-0" style={{ left: s.at }}>
                {i > 0 && <span className="absolute top-9 bottom-0 left-0 border-l border-dashed border-black/15" />}
                <span className="absolute top-0 left-0 inline-flex h-8 items-center gap-2 rounded-full bg-white/85 px-3 label whitespace-nowrap text-fg max-md:hidden">
                  <span className={`size-2.5 rounded-[3px] ${s.dot}`} />
                  0{i + 1} {s.label}
                </span>
              </div>
            ))}
          </div>
          {/* On phones the markers would collide, so they sit as a compact legend instead. */}
          <ul className="pointer-events-none absolute top-3 left-3 flex flex-wrap gap-1.5 md:hidden">
            {stages.map((s, i) => (
              <li key={s.label} className="inline-flex h-7 items-center gap-1.5 rounded-full bg-white/85 px-2.5 label text-fg">
                <span className={`size-2 rounded-[2px] ${s.dot}`} aria-hidden />
                0{i + 1} {s.label}
              </li>
            ))}
          </ul>
          <p className="pointer-events-none absolute right-5 bottom-4 hidden label text-fg-2 md:block">
            {profile.location} · Remote / Relocation
          </p>
        </motion.div>

        <Ticks label="Scroll to explore" className="mt-3" />
      </div>
    </section>
  );
}
