"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * The day turning: Dune Part Two in a photograph, a dune ridge burning
 * orange against black shadow (Unsplash License), ungraded. The band rises
 * out of the Skills sand and sinks into the night of the footer, drifting
 * slightly as you pass.
 */
export function Dusk() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <div ref={ref} className="relative -mt-px h-[clamp(460px,86vh,920px)] overflow-hidden [clip-path:inset(0)]">
      <motion.div className="absolute -inset-y-[7%] inset-x-0 will-change-transform" style={{ y }}>
        <Image
          src="/about/dusk-ridge.webp"
          alt="A dune ridge burning orange in the last light, against black shadow and a dark sky with a glowing horizon."
          fill
          // Loaded with the page, not on arrival, so it is decoded before it scrolls into view.
          loading="eager"
          sizes="100vw"
          className="object-cover object-[50%_55%]"
        />
      </motion.div>
      {/* Out of the sand above, into the night below. */}
      {/* Sand warms through the horizon's glow before the photo takes over, instead of greying over the dark ridge. */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-0.5 z-[1] h-[calc(38%+2px)] will-change-transform"
        style={{ background: "linear-gradient(to bottom, #e7dccb 0%, #ebc496 28%, rgb(234 125 12 / 0.42) 62%, transparent 100%)" }}
      />
      <div aria-hidden className="absolute inset-x-0 -bottom-px z-[1] h-[30%] will-change-transform bg-gradient-to-b from-transparent to-[#170504]" />
      <p className="absolute inset-x-0 bottom-5 z-[2] container-site text-right">
        <a
          href="https://unsplash.com/photos/OzN5RYhwl6s"
          target="_blank"
          rel="noopener noreferrer"
          className="label text-[#c9a98c] transition-colors hover:text-[#efe6d8]"
        >
          Dune at last light. Photo: Edwin Rodriguez, Unsplash
        </a>
      </p>
    </div>
  );
}
