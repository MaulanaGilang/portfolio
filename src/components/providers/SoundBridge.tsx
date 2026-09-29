"use client";

import { useEffect } from "react";
import { play } from "@/lib/sound";

/** Delegated hover/click sounds for anything marked data-sound. No-ops while sound is off. */
export function SoundBridge() {
  useEffect(() => {
    let lastHover: Element | null = null;
    const over = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element).closest("[data-sound]");
      if (el && el !== lastHover) play("hover");
      lastHover = el;
    };
    const click = (e: MouseEvent) => {
      if ((e.target as Element).closest("[data-sound]")) play("click");
    };
    document.addEventListener("pointerover", over);
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("click", click);
    };
  }, []);
  return null;
}
