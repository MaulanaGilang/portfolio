"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Style = "plain" | "accent" | "gold";

/**
 * A statement whose words light up one by one as it scrolls through the
 * viewport (opacity only, so it stays on under reduced motion).
 * Markup: *word* renders in the accent colour, ^word^ gets a gold wash.
 */
export function ScrollLit({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  const words: { w: string; style: Style }[] = [];
  let style: Style = "plain";
  for (const raw of text.split(" ")) {
    if (raw.startsWith("*")) style = "accent";
    if (raw.startsWith("^")) style = "gold";
    words.push({ w: raw.replace(/[*^]/g, ""), style });
    const bare = raw.replace(/[.,!?]$/, "");
    if (bare.endsWith("*") || bare.endsWith("^")) style = "plain";
  }

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text.replace(/[*^]/g, "")}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} style={w.style}>
            {w.w}
          </Word>
        ))}
      </span>
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  style,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  style: Style;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={cn("inline", style === "accent" && "text-accent", style === "gold" && "mark-gold")}>
        {children}
      </motion.span>{" "}
    </>
  );
}
