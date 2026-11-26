"use client";

import { ArrowCounterClockwise, Pause, Play } from "@phosphor-icons/react";
import { scaleLinear } from "d3-scale";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChartTooltip } from "@/clickstream/components/charts/tooltip";
import { fmtDay, fmtInt } from "@/clickstream/lib/format";
import { useWidth } from "@/clickstream/lib/use-width";

type File = { name: string; rows: number; sent: number; loaded: number; latency: number };
type Props = { day: string; files: File[]; medianLatency: number };

const H = 240;
const M = { top: 16, right: 8, bottom: 28, left: 44 };
const PLAY_SECONDS = 30; // the 25-minute demo plays back in 30 s

export function SnowpipeReplay({ day, files, medianLatency }: Props) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const reduce = useReducedMotion();
  const end = useMemo(() => Math.max(...files.map((f) => f.loaded)), [files]);
  const byLoad = useMemo(() => [...files].sort((a, b) => a.loaded - b.loaded), [files]);
  const cumRows = useMemo(() => {
    const out: number[] = [];
    for (const f of byLoad) out.push((out[out.length - 1] ?? 0) + f.rows);
    return out;
  }, [byLoad]);

  const clock = useMotionValue(reduce ? end : 0);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const [loaded, setLoaded] = useState(reduce ? files.length : 0);
  const [state, setState] = useState<"idle" | "playing" | "paused" | "done">(reduce ? "done" : "idle");
  const [hover, setHover] = useState<number | null>(null);

  // React state changes only when another file lands (~5x per second), not per frame.
  useMotionValueEvent(clock, "change", (t) => {
    let n = 0;
    while (n < byLoad.length && byLoad[n].loaded <= t) n++;
    if (n !== loaded) setLoaded(n);
    if (t >= end) setState("done");
  });

  function play() {
    if (state === "done") {
      clock.set(0);
      setLoaded(0);
    }
    const from = state === "done" ? 0 : clock.get();
    controls.current = animate(clock, end, { duration: (PLAY_SECONDS * (end - from)) / end, ease: "linear" });
    setState("playing");
  }
  function pause() {
    controls.current?.stop();
    setState("paused");
  }
  useEffect(() => () => controls.current?.stop(), []);

  const x = scaleLinear().domain([0, end]).range([M.left, width - M.right]);
  const maxLat = Math.max(...files.map((f) => f.latency));
  const y = scaleLinear().domain([0, maxLat * 1.15]).nice(4).range([H - M.bottom, M.top]);
  const headX = useTransform(clock, (t) => x(t));
  const wall = useTransform(clock, (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`);

  const landed = byLoad.slice(0, loaded);
  const visible = new Set(landed.map((f) => f.name));
  const last = landed[landed.length - 1];
  const lastEventTime = last ? `${last.name.slice(0, 2)}:${last.name.slice(2, 4)}` : "--:--";
  const minutes = Math.round(Math.max(...files.map((f) => f.sent)) / 60);

  return (
    <motion.div
      onViewportEnter={() => {
        if (state === "idle") play();
      }}
      viewport={{ once: true, amount: 0.5 }}
      className="rounded-[var(--radius-md)] border border-cs-rule bg-cs-paper-2/60 p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <motion.span className="num text-3xl text-cs-ink">{wall}</motion.span>
          <span className="font-cs-mono text-xs text-cs-ink-3">of a {minutes}-minute run, played back</span>
        </div>
        <button
          type="button"
          onClick={state === "playing" ? pause : play}
          className="inline-flex min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-cs-rule-2 px-4 py-2 text-sm text-cs-ink transition-colors hover:border-cs-accent hover:text-cs-accent active:scale-[0.98]"
        >
          {state === "playing" ? (
            <><Pause size={16} weight="fill" aria-hidden /> Pause</>
          ) : state === "done" ? (
            <><ArrowCounterClockwise size={16} aria-hidden /> Replay</>
          ) : (
            <><Play size={16} weight="fill" aria-hidden /> {state === "paused" ? "Resume" : "Play"}</>
          )}
        </button>
      </div>

      <div ref={ref} className="relative mt-6 w-full">
        <svg
          width={width}
          height={H}
          role="img"
          aria-label={`Snowpipe load latency for ${files.length} files, median ${medianLatency} seconds`}
          className="block"
          onPointerLeave={() => setHover(null)}
        >
          {y.ticks(4).map((t) => (
            <g key={t}>
              <line x1={M.left} x2={width - M.right} y1={y(t)} y2={y(t)} stroke="var(--cs-data-grid)" />
              <text x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-cs-ink-3 font-cs-mono text-[11px]">
                {t}s
              </text>
            </g>
          ))}
          {[0, 5, 10, 15, 20, 25].map((m) =>
            m * 60 <= end ? (
              <text
                key={m}
                x={x(m * 60)}
                y={H - 8}
                textAnchor={m === 0 ? "start" : "middle"}
                className="fill-cs-ink-3 font-cs-mono text-[11px]"
              >
                {m}m
              </text>
            ) : null,
          )}

          {/* median, direct-labelled */}
          <line
            x1={M.left}
            x2={width - M.right}
            y1={y(medianLatency)}
            y2={y(medianLatency)}
            stroke="var(--cs-ink-3)"
            strokeDasharray="4 4"
          />
          <text x={width - M.right} y={y(medianLatency) - 6} textAnchor="end" className="fill-cs-ink-2 text-[12px]">
            median {medianLatency}s
          </text>

          {files.map((f, i) =>
            visible.has(f.name) ? (
              <circle
                key={f.name}
                cx={x(f.sent)}
                cy={y(f.latency)}
                r={hover === i ? 6 : 4}
                fill="var(--cs-accent)"
                stroke="var(--cs-paper-2)"
                strokeWidth={2}
              />
            ) : null,
          )}
          {/* hit targets larger than the dots */}
          {files.map((f, i) =>
            visible.has(f.name) ? (
              <circle
                key={`hit-${f.name}`}
                cx={x(f.sent)}
                cy={y(f.latency)}
                r={10}
                fill="transparent"
                onPointerEnter={() => setHover(i)}
              />
            ) : null,
          )}

          <motion.line
            style={{ x: headX }}
            x1={0}
            x2={0}
            y1={M.top}
            y2={H - M.bottom}
            stroke="var(--cs-ink)"
            strokeOpacity={state === "done" ? 0 : 0.6}
          />
        </svg>
        {hover !== null ? (
          <ChartTooltip
            x={x(files[hover].sent)}
            y={y(files[hover].latency)}
            containerWidth={width}
            title={`live/${day}/${files[hover].name}`}
            rows={[
              { label: "Rows", value: fmtInt(files[hover].rows) },
              { label: "Load latency", value: `${files[hover].latency}s` },
            ]}
          />
        ) : null}
      </div>
      <p className="mt-3 text-xs text-cs-ink-3">
        Each dot is one file: when it was dropped into S3, and how long Snowpipe took to load it (from COPY_HISTORY).
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
        {[
          ["Files loaded", `${loaded} / ${files.length}`],
          ["Rows in EVENTS_LIVE", fmtInt(cumRows[loaded - 1] ?? 0)],
          ["Latest event time", `${lastEventTime}, ${fmtDay(day)}`],
          ["Median latency", `${medianLatency}s`],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-cs-ink-3">{label}</dt>
            <dd className="num mt-1 text-lg text-cs-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}
