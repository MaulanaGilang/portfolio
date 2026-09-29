"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A statement whose words light up one by one as it scrolls through the
 * viewport (opacity only, so it stays on under reduced motion). Words
 * wrapped in *asterisks* light up in the accent colour.
 */
export function ScrollLit({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  const words: { w: string; accent: boolean }[] = [];
  let accent = false;
  for (const raw of text.split(" ")) {
    if (raw.startsWith("*")) accent = true;
    words.push({ w: raw.replace(/\*/g, ""), accent });
    if (raw.replace(/[.,!?]$/, "").endsWith("*")) accent = false;
  }

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text.replace(/\*/g, "")}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={w.accent}>
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
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className={cn("inline", accent && "text-accent")}>
      {children}{" "}
    </motion.span>
  );
}
