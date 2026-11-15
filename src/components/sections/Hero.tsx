"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/content";
import { useIntroDone, useIntroSettled } from "@/lib/intro";
import { PillButton } from "../ui/primitives";
import { COORDS, LocalTime } from "../ui/Readouts";

// WebGL is split out of the first load and never rendered on the server.
const DuneScene = dynamic(() => import("../hero/DuneScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The opening, one screen: a living pipeline over a dune field at dawn.
 * Raw blocks rise out of the sand, flash spice while they're sorted and ride
 * away as teal record batches; it moves from the first frame, and scrolling
 * runs it faster.
 */
export function Hero() {
  const section = useRef<HTMLElement>(null);
  const ready = useIntroDone();
  const settled = useIntroSettled();
  const reduce = useReducedMotion();
  const [onScreen, setOnScreen] = useState(true);

  // Rest the GPU once the hero has scrolled away.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={section} id="top" className="relative h-[100dvh]">
      <div className="relative h-full overflow-hidden">
        {/* Sky: Part One's mist, a pale sun behind it. The terrain fogs into the same colour at the horizon. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(42vmax 30vmax at 74% 30%, rgb(255 255 255 / 0.75), transparent 70%), linear-gradient(to bottom, #c9dad7 0%, #e6edeb 36%)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 1.6, ease }}
        >
          <DuneScene calm={!!reduce} active={onScreen && settled} />
        </motion.div>

        {/* The field's lower edge settles into one sand tone, the same one the aerial photo below rises from. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-b from-transparent to-[#e8dfcf]" />

        <div className="pointer-events-none relative container-site flex h-full flex-col justify-between pt-[clamp(104px,15vh,148px)] pb-[clamp(16px,3vh,32px)]">
          <motion.div
            className="pointer-events-auto max-w-[34rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease, delay: 0.35 }}
          >
            <p className="text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.025em]">
              {profile.role} <span className="text-fg-3">to</span> <span className="text-accent">{profile.target}</span>
            </p>
            <p className="mt-4 max-w-[38ch] text-[17px] leading-relaxed text-fg-2">{profile.intro}</p>
            <div className="mt-7">
              <PillButton href={profile.resume} external>
                Résumé
              </PillButton>
            </div>
          </motion.div>

          <div>
            <motion.p
              className="mb-[clamp(10px,1.6vh,18px)] flex justify-between gap-6 label text-fg-2 sm:justify-end sm:gap-8"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : undefined}
              transition={{ duration: 1, ease, delay: 0.6 }}
            >
              <span>{COORDS}</span>
              <LocalTime />
            </motion.p>
            {/* The name as a wordmark across the full width (MECHA-scale), in Dune Rise. */}
            {/* Sized so both words fill the measure exactly: 13.2em of Dune Rise across the container. Phones stack them. */}
            <h1 className="display text-[11vw] whitespace-nowrap md:text-[clamp(2rem,6.7vw,6.8rem)]">
              <span className="sr-only">{profile.name}, Data Analyst moving into Data Engineering</span>
              <span aria-hidden className="flex flex-col md:flex-row md:justify-between">
                {profile.name.split(" ").map((word, i) => (
                  // The reveal mask needs room above the caps: Dune Rise's glyphs rise past its 0.9 line box.
                  <span key={word} className="block shrink-0 overflow-hidden pt-[0.12em] pb-[0.04em]">
                    <motion.span
                      className="block"
                      initial={{ y: "105%" }}
                      animate={ready ? { y: "0%" } : undefined}
                      transition={{ duration: 1.2, ease, delay: 0.1 + i * 0.1 }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
