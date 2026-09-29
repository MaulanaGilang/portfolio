"use client";

import { animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { finishIntro } from "@/lib/intro";

const KEY = "gm-preloaded";

/**
 * First visit per session: an ink curtain counts 0 to 100 while the name
 * assembles, then lifts off the hero. Repeat visits skip it entirely (an
 * inline script in <head> marks <html data-preloaded> before paint).
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"run" | "exit" | "gone">("run");
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.preloaded !== undefined || reduce) {
      root.dataset.preloaded = "";
      finishIntro();
      const t = setTimeout(() => setPhase("gone"), 0);
      return () => clearTimeout(t);
    }
    root.style.overflow = "hidden";
    const controls = animate(0, 100, {
      duration: 1.5,
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
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0e0f12] p-[clamp(16px,4vw,48px)] text-[#f2f2ef]"
      initial={false}
      animate={phase === "exit" ? { y: "-100%" } : { y: "0%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => phase === "exit" && setPhase("gone")}
    >
      <div className="flex justify-between font-mono text-xs text-[#8b8c92]">
        <span>Gilang Maulana</span>
        <span>raw → refined</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div className="-mb-[0.22em] overflow-hidden pb-[0.22em]">
          <motion.p
            className="display text-[clamp(2.5rem,8vw,7rem)] leading-[1.05]"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            Ingesting
          </motion.p>
        </div>
        <span ref={count} className="font-mono text-[clamp(1.5rem,4vw,3rem)] tabular-nums text-[#7b96ff]">
          000
        </span>
      </div>
    </motion.div>
  );
}

/** Runs before paint: skip the preloader on repeat visits within a session. */
export const preloaderScript = `try{if(sessionStorage.getItem("${KEY}"))document.documentElement.dataset.preloaded=""}catch(e){}`;
