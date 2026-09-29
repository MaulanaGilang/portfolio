"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";

/**
 * Lenis smooth scroll plus a global Motion policy: for visitors who prefer
 * reduced motion, Motion skips transform animations (opacity fades remain),
 * so components never branch on the preference during render.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: reduce ? 1 : 0.1, smoothWheel: !reduce }}>
        <AnchorRouter />
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}

/**
 * Where an element sits in the document when nothing is pinned. Curtain
 * panels are sticky, so a covered panel's bounding box reports its pinned
 * position; measure from the in-flow marker before the panel instead.
 */
export function naturalTop(el: HTMLElement) {
  const curtain = el.closest<HTMLElement>("[data-curtain]");
  const marker = curtain?.previousElementSibling as HTMLElement | null;
  if (!curtain || !marker?.hasAttribute("data-curtain-marker")) {
    return el.getBoundingClientRect().top + window.scrollY;
  }
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== curtain) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  const curtainTop = marker.getBoundingClientRect().top + window.scrollY + parseFloat(getComputedStyle(curtain).marginTop);
  return curtainTop + y;
}

/** Same-page hash links (#about, /#about) scroll to the section's natural position. */
function AnchorRouter() {
  const lenis = useLenis();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest("a");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (!url.hash || url.pathname !== location.pathname) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      const y = target.id === "top" ? 0 : naturalTop(target);
      if (lenis) lenis.scrollTo(y, { duration: 1.4 });
      else window.scrollTo({ top: y });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenis]);

  return null;
}
