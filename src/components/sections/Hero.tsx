"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { profile } from "@/data/content";
import { useIntroDone } from "@/lib/intro";
import { PillButton, Tick } from "../ui/primitives";
import { Scramble } from "../ui/Scramble";

// WebGL is split out of the first load and never rendered on the server.
const PipelineScene = dynamic(() => import("../hero/PipelineScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;
const headline = ["Turning raw data", "into pipelines", "teams can trust."];

/**
 * Lusion's hero pattern: a short centred headline on the lavender canvas, then
 * a large dark "stage" with 100px corners where the 3D (here, the data
 * pipeline) does all the chromatic work.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroDone();
  const reduce = useReducedMotion();
  const [onScreen, setOnScreen] = useState(true);
  // The hero is the first curtain panel (pinned from the start), so measure progress
  // from the page scroll: 0 at the top, 1 once the next card has fully covered it.
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (y) => Math.min(1, y / (ref.current?.offsetHeight || 1)));
  const stageScale = useTransform(progress, [0, 1], [1, 0.97]);

  useMotionValueEvent(progress, "change", (v) => {
    const next = v < 0.995;
    if (next !== onScreen) setOnScreen(next);
  });

  return (
    <section
      ref={ref}
      id="top"
      data-tone="paper"
      // One screen plus the curtain radius: the next card overlaps the hero by that radius.
      className="relative flex min-h-[calc(100dvh+var(--radius-curtain))] flex-col pt-28 pb-[calc(var(--radius-curtain)+1.25rem)] md:pt-32"
    >
      <div className="container-site flex flex-col items-center text-center">
        <motion.p
          className="label flex items-center gap-3 text-fg-2"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Tick />
          <span>
            {profile.role} <span className="text-fg-3">→</span>{" "}
            <span className="text-accent">
              <Scramble text={profile.target} delay={700} duration={900} play={ready} />
            </span>
          </span>
          <Tick />
        </motion.p>

        <h1 className="heading mt-6 text-[clamp(2.4rem,5.4vw,5rem)] leading-[1.02]">
          <span className="sr-only">
            {profile.name}, {profile.role} moving into {profile.target}. {headline.join(" ")}
          </span>
          <span aria-hidden className="block">
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={ready ? { y: "0%" } : undefined}
                  transition={{ duration: 1.1, ease, delay: 0.05 + i * 0.08 }}
                >
                  {i === 1 ? (
                    <>
                      into <span className="text-accent">pipelines</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.div
          className="mt-7 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease, delay: 0.35 }}
        >
          <PillButton href="#projects">View projects</PillButton>
          <PillButton href={profile.resume} external variant="outline">
            Résumé
          </PillButton>
        </motion.div>
      </div>

      {/* The stage: dark, 100px corners, the pipeline bleeding to its edges. */}
      <div className="container-site mt-8 flex min-h-[300px] flex-1 md:mt-10">
        <motion.div
          data-tone="ink"
          style={{ scale: stageScale }}
          className="relative flex-1 overflow-hidden rounded-[var(--radius-stage)] bg-bg text-fg"
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        >
          <PipelineScene scroll={progress} calm={!!reduce} active={onScreen} />
          <StageLabels show={ready} />
        </motion.div>
      </div>

      <p className="label mt-5 flex items-center justify-center gap-3 text-fg-2">
        <Tick />
        Scroll to explore
        <Tick />
      </p>
    </section>
  );
}

/** Stage markers for the pipeline: where raw data gets cleaned, then modeled. */
function StageLabels({ show }: { show: boolean }) {
  const stages = [
    { at: "6%", label: "Raw" },
    { at: "29%", label: "Cleaning" },
    { at: "67%", label: "Modeled" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[clamp(20px,3.4vw,44px)] bottom-[clamp(48px,6vw,80px)] hidden md:block">
      {stages.map((s, i) => (
        <motion.div
          key={s.label}
          className="absolute top-0 bottom-0"
          style={{ left: s.at }}
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 0.8 + i * 0.12 }}
        >
          {i > 0 && <span className="absolute inset-y-8 left-0 border-l border-dashed border-fg/15" />}
          <span className="label absolute top-0 left-2 flex items-center gap-2 whitespace-nowrap text-fg-3">
            <span className={i === 2 ? "text-gold" : i === 1 ? "text-accent" : "text-fg-2"}>0{i + 1}</span>
            {s.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
