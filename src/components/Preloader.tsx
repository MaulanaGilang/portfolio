"use client";

import { animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { finishIntro, settleIntro } from "@/lib/intro";
import { PRELOADED_KEY as KEY } from "@/lib/preloader";

/**
 * First visit per session: a night loader with a large "Ingesting" and a
 * counter, then it lifts off the page (Lusion-style curtain). Repeat
 * visits skip it (an inline script in <head> marks <html data-preloaded>).
 */
export function Preloader() {
  const reduce = useReducedMotion();
  // On repeat visits (and when arriving from After Hours, which marks the session) the
  // loader is in the DOM for a moment but hidden by `html[data-preloaded] [data-preloader]`.
  const [phase, setPhase] = useState<"run" | "exit" | "gone">("run");
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.preloaded !== undefined || reduce) {
      root.dataset.preloaded = "";
      settleIntro();
      const t = setTimeout(() => setPhase("gone"), 0);
      return () => clearTimeout(t);
    }
    root.style.overflow = "hidden";
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (count.current) count.current.textContent = String(Math.round(v)).padStart(3, "0");
      },
      onComplete: () => {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        root.style.overflow = "";
        setPhase("exit");
        setTimeout(finishIntro, 350);
      },
    });
    return () => {
      controls.stop();
      root.style.overflow = "";
    };
  }, [reduce]);

  if (phase === "gone") return null;

  return (
    <motion.div
      data-preloader
      aria-hidden
      className="fixed inset-0 z-[100] bg-[#170504] p-[clamp(16px,4.5vw,80px)] text-[#efe6d8]"
      initial={false}
      animate={phase === "exit" ? { y: "-100%" } : { y: "0%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase !== "exit") return;
        settleIntro();
        setPhase("gone");
      }}
    >
      <p className="label flex justify-between text-[#a88a72]"><span>Gilang Maulana</span><span>6.8975° S · 112.0640° E</span></p>

      {/* Baseline-aligned, and the mask's bottom padding stays inside the screen so the "g" descenders are never clipped. */}
      <div className="absolute inset-x-[clamp(16px,4.5vw,80px)] bottom-[clamp(16px,3vw,40px)] flex items-baseline justify-between gap-6">
        {/* Font size lives on the mask so its em padding matches the headline. */}
        <div className="overflow-hidden text-[clamp(2.2rem,8vw,7.5rem)]">
          <motion.p
            className="display leading-[1.05]"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Ingesting
          </motion.p>
        </div>
        <span ref={count} className="font-mono text-[clamp(2.2rem,6vw,5.5rem)] leading-[1.05] font-light text-[#ea7d0c] tabular-nums">
          000
        </span>
      </div>
    </motion.div>
  );
}
