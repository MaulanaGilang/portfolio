"use client";

import { useId, useState } from "react";

/**
 * Steam hours per month as a HUD trace: one line with a soft fill, a dashed
 * average, the peak and the current month marked. Hovering (or focusing the
 * chart and using the arrow keys) moves a crosshair and shows that month's hours
 * in the readout. The full series is also in a table for screen readers.
 */
export function HoursChart({ data }: { data: { month: string; hours: number }[] }) {
  const W = 760;
  const H = 280;
  const pad = { l: 44, r: 16, t: 24, b: 34 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const peak = Math.max(...data.map((d) => d.hours));
  const max = Math.ceil((peak * 1.1) / 20) * 20;
  const avg = data.reduce((s, d) => s + d.hours, 0) / data.length;
  const last = data.length - 1;
  const x = (i: number) => pad.l + (i / last) * plotW;
  const y = (v: number) => pad.t + plotH - (v / max) * plotH;
  const ticks = Array.from({ length: max / 20 + 1 }, (_, i) => i * 20);

  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(d.hours).toFixed(1)}`).join("");
  const area = `${line}L${x(last)} ${y(0)}L${x(0)} ${y(0)}Z`;
  const peakIndex = data.findIndex((d) => d.hours === peak);

  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? last;
  const gradient = useId();

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    setHover(Math.max(0, Math.min(last, Math.round(((px - pad.l) / plotW) * last))));
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    setHover((h) => Math.max(0, Math.min(last, (h ?? last) + (e.key === "ArrowRight" ? 1 : -1))));
  };

  return (
    <figure>
      {/* The readout: the month under the crosshair, or this month by default. */}
      <div className="mb-4 flex flex-wrap items-end gap-x-10 gap-y-3" aria-live="polite">
        <div>
          <p className="ah-label">{hover === null ? "This month" : data[shown].month}</p>
          <p className="ah-stat">
            {data[shown].hours}
            <span className="ml-2 text-[0.45em] text-[var(--ash)]">hours</span>
          </p>
        </div>
        <div>
          <p className="ah-label">Monthly average</p>
          <p className="ah-num text-[20px] text-[var(--bone)]">{avg.toFixed(0)} h</p>
        </div>
        <div>
          <p className="ah-label">Peak</p>
          <p className="ah-num text-[20px] text-[var(--bone)]">
            {peak} h, {data[peakIndex].month}
          </p>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full touch-pan-y outline-offset-4"
        role="img"
        tabIndex={0}
        aria-label={`Steam hours per month over the last ${data.length} months. Peak ${peak} hours in ${data[peakIndex].month}, average ${avg.toFixed(0)}, ${data[last].hours} so far this month. Use the arrow keys to read each month.`}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        onKeyDown={onKey}
        onBlur={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradient} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#c9cdd3" stopOpacity="0.32" />
            <stop offset="1" stopColor="#c9cdd3" stopOpacity="0" />
          </linearGradient>
        </defs>

        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="rgb(240 232 214 / 0.12)" />
            <text x={pad.l - 10} y={y(t) + 4} textAnchor="end" fontSize={11} fill="#b3aaa6">
              {t}
            </text>
          </g>
        ))}

        {/* This month is still running: a wine red band behind it. */}
        <rect x={x(last) - plotW / last / 2} y={pad.t} width={plotW / last / 2} height={plotH} fill="#5a0f1e" opacity={0.7} />

        <path d={area} fill={`url(#${gradient})`} />
        <path d={line} fill="none" stroke="#c9cdd3" strokeWidth={1.75} strokeLinejoin="round" />

        <line x1={pad.l} x2={W - pad.r} y1={y(avg)} y2={y(avg)} stroke="#f0e8d6" strokeOpacity={0.55} strokeDasharray="3 5" />
        <text x={W - pad.r} y={y(avg) - 7} textAnchor="end" fontSize={11} fill="#f0e8d6" fillOpacity={0.8}>
          AVG
        </text>

        {data.map((d, i) => (
          <rect
            key={d.month}
            x={x(i) - 3}
            y={y(d.hours) - 3}
            width={6}
            height={6}
            fill={i === shown ? "#f0e8d6" : "#120e0e"}
            stroke="#c9cdd3"
            strokeWidth={1.25}
            transform={`rotate(45 ${x(i)} ${y(d.hours)})`}
          />
        ))}

        {/* Crosshair */}
        <line x1={x(shown)} x2={x(shown)} y1={pad.t} y2={y(0)} stroke="#f0e8d6" strokeOpacity={0.5} />

        {data.map((d, i) => (
          <text key={d.month} x={x(i)} y={H - 10} textAnchor="middle" fontSize={11} fill={i === shown ? "#f0e8d6" : "#b3aaa6"}>
            {d.month}
          </text>
        ))}
      </svg>

      <table className="sr-only">
        <caption>Steam hours per month</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Hours</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.month}>
              <th scope="row">{d.month}</th>
              <td>{d.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
