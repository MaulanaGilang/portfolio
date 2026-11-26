"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { AnimatedNumber } from "@/clickstream/components/motion-primitives/animated-number";
import { fmtInt } from "@/clickstream/lib/format";
import { cn } from "@/clickstream/lib/utils";

type Stage = {
  layer: string;
  tool: string;
  value: number;
  format?: (n: number) => string;
  unit: string;
  notes?: { label: string; value: number; bad?: boolean }[];
};

type Props = {
  rawCsvGb: number;
  parquetGb: number;
  rawRows: number;
  cleanRows: number;
  quarantined: number;
  duplicates: number;
  dbtModels: number;
  dbtTests: number;
  days: number;
};

const oneDecimal = (n: number) => n.toFixed(1);

export function HeroPipeline(p: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();

  const stages: Stage[] = [
    {
      layer: "S3",
      tool: "Parquet, one folder per day",
      value: p.parquetGb,
      format: oneDecimal,
      unit: `GB, split from ${p.rawCsvGb} GB of CSV`,
    },
    { layer: "Snowflake RAW", tool: "COPY INTO", value: p.rawRows, unit: "rows loaded as text, none rejected" },
    {
      layer: "dbt staging",
      tool: "typed + checked",
      value: p.cleanRows,
      unit: "clean rows",
      notes: [
        { label: "quarantined", value: p.quarantined, bad: true },
        { label: "duplicates flagged", value: p.duplicates },
      ],
    },
    { layer: "dbt marts", tool: "star schema", value: p.dbtTests, unit: `tests across ${p.dbtModels} models, all passing` },
  ];

  const show = inView || !!reduce;

  return (
    <div ref={ref} className="relative">
      {/* orchestration bracket: Airflow runs every stage, one day of data per run */}
      <div className="mb-3 hidden items-center gap-3 lg:flex">
        <span className="h-px flex-1 bg-cs-rule-2" />
        <span className="whitespace-nowrap font-cs-mono text-xs text-cs-ink-3">
          Airflow 3 runs upload, COPY and dbt once per day of data, {p.days} runs
        </span>
        <span className="h-px flex-1 bg-cs-rule-2" />
      </div>
      <p className="mb-4 font-cs-mono text-xs text-cs-ink-3 lg:hidden">Airflow 3 runs every stage once per day of data.</p>

      <ol className="grid grid-cols-1 lg:grid-cols-[repeat(4,minmax(0,1fr))] lg:gap-4">
        {stages.map((s, i) => (
          <li key={s.layer} className="relative flex flex-col lg:block">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative rounded-[var(--radius-md)] border bg-cs-paper-2/80 p-4 sm:p-5",
                i === stages.length - 1 ? "border-cs-accent/40" : "border-cs-rule",
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-cs-display text-lg font-medium text-cs-ink">{s.layer}</span>
                <span className="truncate font-cs-mono text-xs text-cs-ink-3">{s.tool}</span>
              </div>
              <div className="mt-4 text-[clamp(1.5rem,2.2vw+0.6rem,2.25rem)] leading-none text-cs-ink">
                {show ? (
                  <AnimatedNumber
                    className="num"
                    value={s.value}
                    format={s.format ?? fmtInt}
                    springOptions={{ bounce: 0, duration: 1600 }}
                  />
                ) : (
                  <span className="num">{(s.format ?? fmtInt)(0)}</span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-cs-ink-3">{s.unit}</p>
              {s.notes ? (
                <dl className="mt-3 space-y-1 border-t border-cs-rule pt-3 text-sm">
                  {s.notes.map((n) => (
                    <div key={n.label} className="flex items-baseline justify-between gap-3">
                      <dt className={n.bad ? "text-cs-alert" : "text-cs-ink-3"}>{n.label}</dt>
                      <dd className="num text-cs-ink-2">{fmtInt(n.value)}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </motion.div>

            {i < stages.length - 1 ? <Connector delay={0.35 + i * 0.22} active={show} /> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A connector with rows flowing along it. Horizontal on desktop, vertical on mobile. */
function Connector({ delay, active }: { delay: number; active: boolean }) {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute left-full top-1/2 z-[1] hidden h-px w-4 -translate-y-1/2 overflow-visible lg:block"
      >
        <span className="absolute inset-0 bg-cs-rule-2" />
        {active
          ? [0, 1].map((k) => (
              <span
                key={k}
                className="absolute -top-[2px] left-0 size-[5px] rounded-full bg-cs-accent"
                style={{
                  ["--flow-len" as string]: "16px",
                  animation: `flow-x 1.6s var(--ease-in-out) ${delay + k * 0.8}s infinite both`,
                }}
              />
            ))
          : null}
      </span>
      <span aria-hidden className="relative mx-auto block h-8 w-px overflow-visible bg-cs-rule-2 lg:hidden">
        {active ? (
          <span
            className="absolute -left-[2px] top-0 size-[5px] rounded-full bg-cs-accent"
            style={{
              ["--flow-len" as string]: "32px",
              animation: `flow-y 1.4s var(--ease-in-out) ${delay}s infinite both`,
            }}
          />
        ) : null}
      </span>
    </>
  );
}
