"use client";

import { useEffect, useRef } from "react";

/**
 * The lamp in the fog: slow mist drifts over the scene, and a soft red-violet
 * light trails the cursor, catching up slowly. Mouse only; with reduced motion
 * the mist is still and there is no light.
 */
export function Lamp() {
  const light = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = light.current;
    if (!el) return;
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    let shown = false;
    const tick = () => {
      // Ease towards the cursor: the light follows, it never jumps.
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      el.style.translate = `${pos.x}px ${pos.y}px`;
      raf = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!shown) {
        shown = true;
        pos.x = target.x;
        pos.y = target.y;
        el.dataset.on = "";
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      shown = false;
      delete el.dataset.on;
    };
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="ah-mist">
        <span />
        <span />
      </div>
      <div aria-hidden className="ah-lamp">
        <div ref={light} className="ah-lamp-light" />
      </div>
    </>
  );
}
