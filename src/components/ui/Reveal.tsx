"use client";

import { motion } from "motion/react";

type Tag = "div" | "li" | "article" | "section";

/** Fades and lifts its content in the first time it scrolls into view. Extra data-* attributes pass through. */
export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  ...rest
}: {
  as?: Tag;
  children: React.ReactNode;
  className?: string;
  delay?: number;
} & { [key: `data-${string}`]: string | undefined }) {
  const M = motion[as];
  return (
    <M
      {...rest}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}
