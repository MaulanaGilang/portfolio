"use client";

import { scaleLinear, scaleUtc } from "d3-scale";
import { area, line, curveMonotoneX } from "d3-shape";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { ChartTooltip } from "@/clickstream/components/charts/tooltip";
import { fmtCompact, fmtDay, fmtInt, fmtPct } from "@/clickstream/lib/format";
import { useWidth } from "@/clickstream/lib/use-width";
import { cn } from "@/clickstream/lib/utils";

type Point = { date: string; viewed: number; purchased: number };

const H = 320;
const M = { top: 24, right: 12, bottom: 28, left: 44 };

export function DailyChart({ series, peakDate }: { series: Record<string, Point[]>; peakDate: string }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [key, setKey] = useState("all");
  const [hover, setHover] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const data = series[key];

  const { x, y, path, fill, ticks } = useMemo(() => {
    const dates = data.map((d) => new Date(`${d.date}T00:00:00Z`));
    const x = scaleUtc()
      .domain([dates[0], dates[dates.length - 1]])
      .range([M.left, width - M.right]);
    const y = scaleLinear()
      .domain([0, Math.max(...data.map((d) => d.purchased)) * 1.12])
      .nice(4)
      .range([H - M.bottom, M.top]);
    const pts = data.map((d, i) => [x(dates[i]), y(d.purchased)] as [number, number]);
    const path = line().curve(curveMonotoneX)(pts) ?? "";
    const fill =
      area<[number, number]>()
        .curve(curveMonotoneX)
        .x((p) => p[0])
        .y0(H - M.bottom)
        .y1((p) => p[1])(pts) ?? "";
    return { x, y, path, fill, ticks: y.ticks(4) };
  }, [data, width]);

  const peakIdx = data.findIndex((d) => d.date === peakDate);
  const at = (i: number) => x(new Date(`${data[i].date}T00:00:00Z`));

  function onMove(e: React.PointerEvent<SVGRectElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - box.left + M.left;
    const step = (width - M.left - M.right) / (data.length - 1);
    setHover(Math.max(0, Math.min(data.length - 1, Math.round((px - M.left) / step))));
  }

  const filters = [
    ["all", "All categories"],
    ["electronics", "Electronics"],
    ["appliances", "Appliances"],
    ["computers", "Computers"],
    ["apparel", "Apparel"],
  ] as const;

  return (
    <div>
      <div role="radiogroup" aria-label="Category" className="mb-6 flex flex-wrap gap-2">
        {filters.map(([k, label]) => (
          <button
            key={k}
            role="radio"
            aria-checked={key === k}
            onClick={() => setKey(k)}
            className={cn(
              "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm transition-colors active:scale-[0.98]",
              key === k
                ? "border-cs-accent bg-cs-accent-soft text-cs-ink"
                : "border-cs-rule-2 text-cs-ink-3 hover:border-cs-ink-3 hover:text-cs-ink",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div ref={ref} className="relative w-full">
        <svg width={width} height={H} role="img" aria-label="Purchasing sessions per day" className="block">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={M.left} x2={width - M.right} y1={y(t)} y2={y(t)} stroke="var(--cs-data-grid)" />
              <text x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-cs-ink-3 font-cs-mono text-[11px]">
                {fmtCompact(t)}
              </text>
            </g>
          ))}
          {["2019-10-01", "2019-11-01", "2019-11-30"].map((d) => (
            <text
              key={d}
              x={x(new Date(`${d}T00:00:00Z`))}
              y={H - 6}
              textAnchor={d === "2019-11-30" ? "end" : d === "2019-10-01" ? "start" : "middle"}
              className="fill-cs-ink-3 font-cs-mono text-[11px]"
            >
              {fmtDay(d)}
            </text>
          ))}

          <path d={fill} fill="var(--cs-accent)" opacity={0.07} />
          <motion.path
            key={key}
            d={path}
            fill="none"
            stroke="var(--cs-accent)"
            strokeWidth={2}
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* direct annotation on the peak */}
          {peakIdx >= 0 ? (
            <g>
              <circle cx={at(peakIdx)} cy={y(data[peakIdx].purchased)} r={4.5} fill="var(--cs-accent)" stroke="var(--cs-paper)" strokeWidth={2} />
              <text
                x={at(peakIdx) - 10}
                y={y(data[peakIdx].purchased) - 2}
                textAnchor="end"
                className="fill-cs-ink text-[12px]"
              >
                {fmtDay(data[peakIdx].date)}: {fmtCompact(data[peakIdx].purchased)}
              </text>
            </g>
          ) : null}

          {hover !== null ? (
            <g pointerEvents="none">
              <line x1={at(hover)} x2={at(hover)} y1={M.top} y2={H - M.bottom} stroke="var(--cs-rule-2)" />
              <circle cx={at(hover)} cy={y(data[hover].purchased)} r={4} fill="var(--cs-accent)" stroke="var(--cs-paper)" strokeWidth={2} />
            </g>
          ) : null}

          <rect
            x={M.left}
            y={M.top}
            width={Math.max(0, width - M.left - M.right)}
            height={H - M.top - M.bottom}
            fill="transparent"
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          />
        </svg>
        {hover !== null ? (
          <ChartTooltip
            x={at(hover)}
            y={y(data[hover].purchased)}
            containerWidth={width}
            title={fmtDay(data[hover].date)}
            rows={[
              { label: "Purchasing sessions", value: fmtInt(data[hover].purchased) },
              { label: "Viewing sessions", value: fmtInt(data[hover].viewed) },
              { label: "Conversion", value: fmtPct(data[hover].purchased / data[hover].viewed) },
            ]}
          />
        ) : null}
      </div>
    </div>
  );
}
