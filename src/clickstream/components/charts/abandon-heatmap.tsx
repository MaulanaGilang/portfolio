"use client";

import { useState } from "react";
import { fmtInt, fmtPct } from "@/clickstream/lib/format";

type Cell = { weekday: number; hour: number; carted: number; rate: number };

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ORDER = [1, 2, 3, 4, 5, 6, 0]; // JS weekday -> Monday-first rows

// Sequential, one hue (blue 240): low abandonment = dark, high = bright.
const ramp = (t: number) => `oklch(${24 + t * 50}% ${0.03 + t * 0.1} 240)`;

export function AbandonHeatmap({ cells }: { cells: Cell[] }) {
  const [hover, setHover] = useState<Cell | null>(null);
  const rates = cells.map((c) => c.rate);
  const lo = Math.min(...rates);
  const hi = Math.max(...rates);
  const t = (r: number) => (r - lo) / (hi - lo);
  const get = (w: number, h: number) => cells.find((c) => c.weekday === w && c.hour === h)!;

  return (
    <figure>
      <div className="overflow-x-auto pb-2">
        <div
          role="grid"
          aria-label="Cart abandonment rate by weekday and hour (UTC)"
          className="grid min-w-[560px] gap-[2px]"
          style={{ gridTemplateColumns: "2.5rem repeat(24, minmax(0, 1fr))" }}
          onPointerLeave={() => setHover(null)}
        >
          {ORDER.map((w) => (
            <div role="row" key={w} className="contents">
              <span role="rowheader" className="self-center font-cs-mono text-[11px] text-cs-ink-3">
                {DAYS[ORDER.indexOf(w)]}
              </span>
              {Array.from({ length: 24 }, (_, h) => {
                const c = get(w, h);
                return (
                  <span
                    role="gridcell"
                    key={h}
                    tabIndex={-1}
                    aria-label={`${DAYS[ORDER.indexOf(w)]} ${h}:00, ${fmtPct(c.rate)} abandoned`}
                    onPointerEnter={() => setHover(c)}
                    className="h-6 rounded-[2px] sm:h-8 transition-[outline] hover:outline hover:outline-2 hover:outline-cs-ink"
                    style={{ background: ramp(t(c.rate)) }}
                  />
                );
              })}
            </div>
          ))}
          <span />
          {Array.from({ length: 24 }, (_, h) => (
            <span key={h} className="pt-1 text-center font-cs-mono text-[10px] text-cs-ink-3">
              {h % 6 === 0 ? `${h}h` : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs text-cs-ink-3">
          <span className="num">{fmtPct(lo, 0)}</span>
          <span
            aria-hidden
            className="h-2 w-32 rounded-full"
            style={{ background: `linear-gradient(90deg, ${ramp(0)}, ${ramp(0.5)}, ${ramp(1)})` }}
          />
          <span className="num">{fmtPct(hi, 0)}</span>
          <span>of carts abandoned</span>
        </div>
        <p className="min-h-5 text-xs text-cs-ink-2" aria-live="polite">
          {hover
            ? `${DAYS[ORDER.indexOf(hover.weekday)]} ${String(hover.hour).padStart(2, "0")}:00 UTC: ${fmtPct(hover.rate)} of ${fmtInt(hover.carted)} carts abandoned`
            : "Hover a cell for detail. Hours in UTC."}
        </p>
      </div>
    </figure>
  );
}
