"use client";

import { scaleBand, scaleLinear } from "d3-scale";
import { useState } from "react";
import { ChartTooltip, type TooltipRow } from "@/clickstream/components/charts/tooltip";
import { fmtDay } from "@/clickstream/lib/format";
import { useWidth } from "@/clickstream/lib/use-width";

export type Segment = { key: string; label: string; color: string };
export type DayDatum = { date: string; values: Record<string, number>; note?: string };

const M = { top: 16, right: 4, bottom: 24, left: 44 };

/** One bar per day, optionally stacked. 2px surface gap between bars and segments. */
export function DayBars({
  data,
  segments,
  height = 220,
  yFormat,
  tooltip,
  highlight,
  ariaLabel,
}: {
  data: DayDatum[];
  segments: Segment[];
  height?: number;
  yFormat: (n: number) => string;
  tooltip: (d: DayDatum) => TooltipRow[];
  highlight?: (d: DayDatum) => boolean;
  ariaLabel: string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);

  const totals = data.map((d) => segments.reduce((s, seg) => s + (d.values[seg.key] ?? 0), 0));
  const x = scaleBand<number>()
    .domain(data.map((_, i) => i))
    .range([M.left, width - M.right])
    .paddingInner(width < 520 ? 0.12 : 0.2);
  const y = scaleLinear()
    .domain([0, Math.max(...totals) * 1.08])
    .nice(3)
    .range([height - M.bottom, M.top]);
  const ticks = y.ticks(3);
  const bw = x.bandwidth();
  const r = Math.min(3, bw / 2);

  return (
    <div ref={ref} className="relative w-full">
      <svg width={width} height={height} role="img" aria-label={ariaLabel} className="block">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={M.left} x2={width - M.right} y1={y(t)} y2={y(t)} stroke="var(--cs-data-grid)" />
            <text x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-cs-ink-3 font-cs-mono text-[11px]">
              {yFormat(t)}
            </text>
          </g>
        ))}

        {data.map((d, i) => {
          let acc = 0;
          const hl = highlight?.(d);
          const dim = hover !== null && hover !== i;
          return (
            <g key={d.date} opacity={dim ? 0.55 : 1}>
              {segments.map((seg, si) => {
                const v = d.values[seg.key] ?? 0;
                const y0 = y(acc);
                acc += v;
                const y1 = y(acc);
                const isTop = si === segments.length - 1 || segments.slice(si + 1).every((s) => !d.values[s.key]);
                // 2px surface gap between stacked segments
                const h = y0 - y1 - (si > 0 ? 2 : 0);
                if (h <= 0) return null;
                return (
                  <path
                    key={seg.key}
                    d={barPath(x(i)!, y1, bw, h, isTop ? r : 0)}
                    fill={hl && segments.length === 1 ? "var(--cs-accent)" : seg.color}
                  />
                );
              })}
            </g>
          );
        })}

        {[0, data.length - 1].map((i) => (
          <text
            key={i}
            x={i === 0 ? x(i)! : x(i)! + bw}
            y={height - 6}
            textAnchor={i === 0 ? "start" : "end"}
            className="fill-cs-ink-3 font-cs-mono text-[11px]"
          >
            {fmtDay(data[i].date)}
          </text>
        ))}

        {/* hit targets wider than the marks */}
        {data.map((d, i) => (
          <rect
            key={d.date}
            x={x(i)! - (x.step() - bw) / 2}
            y={M.top}
            width={x.step()}
            height={height - M.top - M.bottom}
            fill="transparent"
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
          />
        ))}
      </svg>
      {hover !== null ? (
        <ChartTooltip
          x={x(hover)! + bw / 2}
          y={Math.max(y(totals[hover]), M.top + 30)}
          containerWidth={width}
          title={fmtDay(data[hover].date) + (data[hover].note ? `, ${data[hover].note}` : "")}
          rows={tooltip(data[hover])}
        />
      ) : null}
    </div>
  );
}

/** Bar with only its top corners rounded; the base stays square on the axis. */
function barPath(x: number, y: number, w: number, h: number, r: number) {
  if (r <= 0 || h < r) return `M${x},${y}h${w}v${h}h${-w}Z`;
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}
