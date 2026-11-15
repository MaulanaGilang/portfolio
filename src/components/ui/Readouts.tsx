"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/** Tuban, East Java: the home readout shown in the hero and the footer. */
export const COORDS = "6.8975° S · 112.0640° E";

const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Jakarta" });

// One shared clock that ticks every 15 seconds while anything reads it.
let now = "";
const subs = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;
const tick = () => {
  now = fmt.format(new Date());
  subs.forEach((f) => f());
};
function subscribe(cb: () => void) {
  subs.add(cb);
  if (!timer) {
    tick();
    timer = setInterval(tick, 15_000);
  }
  return () => {
    subs.delete(cb);
    if (!subs.size && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

/** Local time in Tuban (WIB). Plain text, never announced: it's there to be read. */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => now || fmt.format(new Date()),
    () => "--:--",
  );
  return (
    <span className={cn("tabular-nums", className)}>
      WIB <time suppressHydrationWarning>{time}</time>
    </span>
  );
}
