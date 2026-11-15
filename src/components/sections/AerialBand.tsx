"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Dune Part One in a photograph: soft pale dunes under a hazy teal sky
 * (Unsplash License), drifting slightly slower than the page, with the About
 * headline set on the sand at its lower edge.
 */
export function AerialBand({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <div ref={ref} className="relative h-[clamp(460px,82vh,860px)] overflow-hidden [clip-path:inset(0)]">
      <motion.div className="absolute -inset-y-[8%] inset-x-0 will-change-transform" style={{ y }}>
        <Image
          src="/about/teal-haze.webp"
          alt="Soft pale sand dunes under a hazy teal sky."
          fill
          // Loaded with the page, not on arrival, so it is decoded before it scrolls into view.
          loading="eager"
          sizes="100vw"
          className="object-cover object-[50%_52%]"
        />
      </motion.div>
      {/* The photo dissolves into the mist canvas below it. */}
      <div aria-hidden className="absolute inset-x-0 -bottom-px z-[1] h-[calc(42%+1px)] will-change-transform bg-gradient-to-b from-transparent via-bg/70 to-bg" />
      {/* And it rises out of the hero's fogged sand above it, through mist, without a hard edge. */}
      <div aria-hidden className="absolute inset-x-0 -top-px z-[1] h-[30%] will-change-transform bg-gradient-to-b from-[#e8dfcf] via-[#e8dfcf]/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[2] container-site pb-2">{children}</div>
      <p className="absolute inset-x-0 top-5 z-[2] container-site text-right">
        <a
          href="https://unsplash.com/photos/H0jx4xMvI50"
          target="_blank"
          rel="noopener noreferrer"
          className="label text-fg-2 transition-colors hover:text-fg"
        >
          Photo: Brianda Maldonado, Unsplash
        </a>
      </p>
    </div>
  );
}
