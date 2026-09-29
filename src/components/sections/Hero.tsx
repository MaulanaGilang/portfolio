"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { profile } from "@/data/content";
import { useIntroDone } from "@/lib/intro";
import { PillButton } from "../ui/primitives";
import { Scramble } from "../ui/Scramble";

// WebGL is split out of the first load and never rendered on the server.
const PipelineScene = dynamic(() => import("../hero/PipelineScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroDone();
  const reduce = useReducedMotion();
  const [onScreen, setOnScreen] = useState(true);
  // The hero is the first curtain panel (pinned from the start), so measure progress
  // from the page scroll: 0 at the top, 1 once the About card has fully covered it.
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (y) => Math.min(1, y / (ref.current?.offsetHeight || 1)));
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3]);
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  // The hero stays pinned under the curtain, so "off-screen" means fully covered.
  // Rest the GPU once the About card has slid all the way over it.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.995;
    if (next !== onScreen) setOnScreen(next);
  });

  const show = ready;

  return (
    <section
      ref={ref}
      id="top"
      data-tone="paper"
      // One screen plus the curtain radius: the About card overlaps the hero by that radius,
      // so the extra strip keeps the card below the fold on load and the content clear of it.
      className="relative flex min-h-[calc(100dvh+var(--radius-curtain))] flex-col justify-end overflow-hidden pt-24 pb-[calc(var(--radius-curtain)+2rem)] md:pb-[calc(var(--radius-curtain)+2.5rem)]"
    >
      <motion.div className="absolute inset-0" style={{ opacity: sceneOpacity }}>
        <PipelineScene scroll={scrollYProgress} calm={!!reduce} active={onScreen} />
        <StageLabels show={show} />
      </motion.div>

      <div className="container-site pointer-events-none relative">
        <motion.div style={{ y: nameY }}>
          <h1 className="display text-[clamp(3.6rem,17.5vw,6rem)] md:text-[clamp(4.5rem,min(11.6vw,19dvh),12.5rem)]">
            <span className="sr-only">{profile.name}, Data Analyst moving into Data Engineering</span>
            <span aria-hidden className="flex flex-wrap gap-x-[0.22em]">
              {profile.name.split(" ").map((word, i) => (
                <span key={word} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={show ? { y: "0%" } : undefined}
                    transition={{ duration: 1.1, ease, delay: 0.05 + i * 0.08 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>
        </motion.div>

        <motion.div
          className="pointer-events-auto mt-6 grid gap-6 border-t border-line pt-6 md:mt-8 md:grid-cols-12 md:items-end"
          initial={{ opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease, delay: 0.35 }}
        >
          <div className="md:col-span-7">
            <p className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium tracking-tight">
              {profile.role} <span className="text-fg-3">→</span>{" "}
              <span className="text-accent">
                <Scramble text={profile.target} delay={500} duration={900} play={show} />
              </span>
            </p>
            <p className="mt-2 max-w-[46ch] text-fg-2">{profile.intro}</p>
          </div>
          <div className="flex flex-col gap-4 md:col-span-5 md:items-end">
            <p className="font-mono text-xs text-fg-3">
              {profile.location} · {profile.availability}
            </p>
            <div className="flex flex-wrap gap-3">
              <PillButton href="#projects">View projects</PillButton>
              <PillButton href={profile.resume} external variant="outline">
                Résumé
              </PillButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Stage markers for the pipeline: where raw data gets cleaned, then modeled. */
function StageLabels({ show }: { show: boolean }) {
  const stages = [
    { at: "4%", label: "raw" },
    { at: "28%", label: "cleaning" },
    { at: "67%", label: "modeled" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-20 bottom-[42%] hidden md:block">
      {stages.map((s, i) => (
        <motion.div
          key={s.label}
          className="absolute top-0 bottom-0"
          style={{ left: s.at }}
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 0.6 + i * 0.12 }}
        >
          {i > 0 && <span className="absolute inset-y-6 left-0 border-l border-dashed border-fg/15" />}
          <span className="absolute top-0 left-2 rounded-full bg-bg/80 px-2 py-0.5 font-mono text-[11px] whitespace-nowrap text-fg-3">
            0{i + 1} {s.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
