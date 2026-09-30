"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * One panel in the curtain stack (v6: used only for Skills → Let's Connect). Each panel scrolls normally until its
 * bottom edge meets the bottom of the viewport, then pins (sticky with a
 * negative top) while the next panel slides over it as a rounded card.
 * The covered panel recedes and dims. Only transform and opacity change,
 * so the whole effect stays on the compositor: no colour animation.
 */
export function Curtain({
  children,
  index,
  tone,
  last = false,
  className,
}: {
  children: React.ReactNode;
  index: number;
  /** Optional: paints the panel. Omit to keep it transparent over the canvas. */
  tone?: "paper" | "ink";
  last?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Scroll position where this panel pins, and the viewport height. Measured, not
  // read from the panel's box: a sticky element reports its pinned position.
  const geo = useRef({ pinAt: Infinity, vh: 1 });
  const { scrollY } = useScroll();
  // 0 when the panel pins, 1 when the next panel has fully covered it.
  const progress = useTransform(scrollY, (y) => Math.min(1, Math.max(0, (y - geo.current.pinAt) / geo.current.vh)));
  const scale = useTransform(progress, [0, 1], [1, reduce ? 1 : 0.94]);
  const shade = useTransform(progress, [0, 1], [0, reduce ? 0 : 0.28]);

  useEffect(() => {
    const el = ref.current;
    const m = marker.current;
    if (!el || !m || last) return;
    const update = () => {
      const vh = window.innerHeight;
      const h = el.offsetHeight;
      el.style.setProperty("--pin", `${Math.min(0, vh - h)}px`);
      const top = m.getBoundingClientRect().top + window.scrollY + parseFloat(getComputedStyle(el).marginTop);
      geo.current = { pinAt: top + h - vh, vh };
      progress.set(Math.min(1, Math.max(0, (window.scrollY - geo.current.pinAt) / vh)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    ro.observe(document.body);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [last, progress]);

  // Fully covered panels stop painting.
  useMotionValueEvent(progress, "change", (v) => {
    if (ref.current && !last) ref.current.style.visibility = v >= 0.999 ? "hidden" : "";
  });

  return (
    <>
      {/* In-flow marker: where this panel sits when it isn't pinned (used by anchors and measurement). */}
      <div ref={marker} data-curtain-marker aria-hidden className="h-0" />
      <motion.div
        ref={ref}
        data-curtain
        data-tone={tone}
        style={{
          zIndex: index + 1,
          scale: last ? 1 : scale,
          transformOrigin: "50% calc(100% - 50dvh)",
          // The receding panel gets its own layer, so scaling it reuses the painted
          // texture instead of re-rasterising dozens of shadowed pills every frame.
          willChange: last ? undefined : "transform",
        }}
        className={cn(
          "relative",
          !last && "sticky top-[var(--pin,auto)]",
          // Square-edged card: a flat top edge and one soft shadow to lift it off the pinned panel.
          index > 0 && "shadow-[0_-18px_48px_-20px_rgb(43_46_58/0.22)]",
          className,
        )}
      >
        {children}
        {!last && (
          <motion.div
            aria-hidden
            style={{ opacity: shade, willChange: "opacity" }}
            className="pointer-events-none absolute inset-0 z-10 bg-[#2b2e3a]"
          />
        )}
      </motion.div>
    </>
  );
}
