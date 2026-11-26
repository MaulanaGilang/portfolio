"use client";

import { cn } from "@/clickstream/lib/utils";

export type TooltipRow = { label: string; value: string; swatch?: string };

/** Positioned inside a relative chart container; x/y are px within it. */
export function ChartTooltip({
  x,
  y,
  title,
  rows,
  containerWidth,
}: {
  x: number;
  y: number;
  title: string;
  rows: TooltipRow[];
  containerWidth: number;
}) {
  const flip = x > containerWidth * 0.62;
  return (
    <div
      role="status"
      className={cn(
        "pointer-events-none absolute z-10 min-w-40 rounded-[var(--radius-md)] border border-cs-rule-2 bg-cs-paper-3/95 px-3 py-2 text-xs shadow-[0_8px_24px_oklch(5%_0.01_255/0.5)] backdrop-blur-sm",
      )}
      style={{
        left: x,
        top: y,
        transform: `translate(${flip ? "calc(-100% - 12px)" : "12px"}, -50%)`,
      }}
    >
      <div className="mb-1 font-medium text-cs-ink">{title}</div>
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-cs-ink-3">
            {r.swatch ? <span className="size-2 rounded-[2px]" style={{ background: r.swatch }} /> : null}
            {r.label}
          </span>
          <span className="num text-cs-ink">{r.value}</span>
        </div>
      ))}
    </div>
  );
}
