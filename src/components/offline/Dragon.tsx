"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// The map only loads when someone wakes the dragon.
const MoonwakeMap = dynamic(() => import("./MoonwakeMap").then((m) => m.MoonwakeMap), { ssr: false });

/**
 * The Archmagus's familiar: a silver wyvern asleep in the corner. Point at it (or
 * focus it) and its red-violet eye opens; select it and the Map of Moonwake opens.
 * The shape is a mask (public/offline/dragon.png, white with the wyvern in alpha).
 */
export function Dragon() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="ah-dragon" aria-label="A sleeping dragon. Wake it to open the Map of Moonwake" onClick={() => setOpen(true)}>
        <span className="ah-dragon-shape" aria-hidden />
        <span className="ah-dragon-eye" aria-hidden />
      </button>
      {open && <MoonwakeMap onClose={() => setOpen(false)} />}
    </>
  );
}
