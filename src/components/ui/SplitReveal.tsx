"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

/**
 * Splits text into words that slide up out of a mask when scrolled into view.
 * Words wrapped in *asterisks* render in the accent colour.
 */
export function SplitReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.045,
  once = true,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const Tag = motion[as];
  const words = parse(text);

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount: 0.4 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      <span className="sr-only">{text.replace(/\*/g, "")}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className={cn("inline-block", w.accent && "text-accent")}
            variants={{
              hidden: { y: "105%" },
              shown: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {w.text}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

function parse(text: string) {
  const out: { text: string; accent: boolean }[] = [];
  let accent = false;
  for (const raw of text.split(" ")) {
    const starts = raw.startsWith("*");
    const ends = raw.replace(/[.,!?]$/, "").endsWith("*");
    if (starts) accent = true;
    out.push({ text: raw.replace(/\*/g, ""), accent });
    if (ends) accent = false;
  }
  return out;
}
