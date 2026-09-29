"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS = "01<>/{}[]#_=+*";

/**
 * Decodes text like a data stream. Runs once on mount (after `delay` ms)
 * and again whenever `trigger` changes. Writes to the DOM directly so the
 * animation never re-renders React.
 */
export function Scramble({
  text,
  delay = 0,
  duration = 700,
  trigger,
  play = true,
  className,
}: {
  text: string;
  delay?: number;
  duration?: number;
  trigger?: unknown;
  /** Hold the animation until this turns true. */
  play?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (reduce || !play || !el) return;
    let raf = 0;
    let start = 0;
    const timer = window.setTimeout(() => {
      const tick = (t: number) => {
        start ||= t;
        const p = Math.min(1, (t - start) / duration);
        const settled = Math.floor(p * text.length);
        let s = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          s += i < settled || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = s;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [text, delay, duration, trigger, reduce, play]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden>
        {text}
      </span>
    </span>
  );
}
