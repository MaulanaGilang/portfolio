"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { cn } from "@/clickstream/lib/utils";

export type RankRow = {
  key: string;
  label: string;
  value: number;
  valueLabel: string;
  aside?: string;
  detail?: { label: string; value: string }[];
  highlight?: boolean;
};

/** Horizontal ranked bars. HTML, not SVG, so labels wrap and reflow on mobile. */
export function RankBars({ rows, max, ariaLabel }: { rows: RankRow[]; max?: number; ariaLabel: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const top = max ?? Math.max(...rows.map((r) => r.value));

  return (
    <ul aria-label={ariaLabel} className="space-y-1">
      {rows.map((r, i) => (
        <li
          key={r.key}
          tabIndex={0}
          onPointerEnter={() => setHover(r.key)}
          onPointerLeave={() => setHover(null)}
          onFocus={() => setHover(r.key)}
          onBlur={() => setHover(null)}
          className="group relative grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)_auto] items-center gap-3 rounded-[var(--radius-sm)] px-2 py-1.5 outline-none transition-colors hover:bg-cs-paper-2 focus-visible:bg-cs-paper-2 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)_auto]"
        >
          <span className={cn("truncate text-sm capitalize", r.highlight ? "text-cs-ink" : "text-cs-ink-2")}>
            {r.label}
          </span>
          <span className="relative h-3.5">
            <motion.span
              className="absolute inset-y-0 left-0 origin-left rounded-r-[var(--radius-sm)]"
              style={{
                width: `${Math.max((r.value / top) * 100, 0.8)}%`,
                background: r.highlight ? "var(--cs-accent)" : "var(--cs-data-context)",
              }}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
          <span className="flex items-baseline gap-2 whitespace-nowrap">
            <span className={cn("num min-w-[3.25rem] text-right text-sm", r.highlight ? "text-cs-ink" : "text-cs-ink-2")}>
              {r.valueLabel}
            </span>
            {r.aside ? <span className="hidden min-w-[6.5rem] font-cs-mono text-xs text-cs-ink-3 sm:inline">{r.aside}</span> : null}
          </span>

          {hover === r.key && r.detail ? (
            <span
              role="status"
              className="pointer-events-none absolute right-2 top-full z-10 mt-1 min-w-48 rounded-[var(--radius-md)] border border-cs-rule-2 bg-cs-paper-3/95 px-3 py-2 text-xs shadow-[0_8px_24px_oklch(5%_0.01_255/0.5)] backdrop-blur-sm"
            >
              {r.detail.map((d) => (
                <span key={d.label} className="flex justify-between gap-4">
                  <span className="text-cs-ink-3">{d.label}</span>
                  <span className="num text-cs-ink">{d.value}</span>
                </span>
              ))}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
