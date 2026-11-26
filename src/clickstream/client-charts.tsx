"use client";

// Thin client wrappers: formatters and tooltip builders are functions, which
// can't cross the server/client boundary as props.

import { DayBars } from "@/clickstream/components/charts/day-bars";
import { fmtCompact, fmtDuration, fmtInt } from "@/clickstream/lib/format";

export function QualityChart({ data }: { data: { date: string; quarantined: number; duplicates: number }[] }) {
  return (
    <DayBars
      ariaLabel="Exact duplicates flagged per day"
      data={data.map((d) => ({ date: d.date, values: { duplicates: d.duplicates } }))}
      segments={[{ key: "duplicates", label: "Duplicates", color: "var(--cs-data-dup)" }]}
      yFormat={fmtCompact}
      tooltip={(d) => {
        const q = data.find((x) => x.date === d.date)!;
        return [
          { label: "Duplicates", value: fmtInt(q.duplicates), swatch: "var(--cs-data-dup)" },
          { label: "Quarantined", value: fmtInt(q.quarantined) },
        ];
      }}
    />
  );
}

type Run = { ds: string; upload: number; copy: number; dbt: number; total: number; tries: number };

export function RunsChart({ data }: { data: Run[] }) {
  return (
    <DayBars
      ariaLabel="Airflow run duration per day of data"
      data={data.map((r) => ({
        date: r.ds,
        values: { total: r.total / 60 },
        note: r.tries > 1 ? `retried ${r.tries - 1}x` : undefined,
      }))}
      segments={[{ key: "total", label: "Run time", color: "var(--cs-data-context)" }]}
      highlight={(d) => !!d.note}
      yFormat={(m) => `${m}m`}
      tooltip={(d) => {
        const r = data.find((x) => x.ds === d.date)!;
        return [
          { label: "upload_to_s3", value: fmtDuration(r.upload) },
          { label: "copy_into_raw", value: fmtDuration(r.copy) },
          { label: "dbt_build", value: fmtDuration(r.dbt) },
          { label: "Total", value: fmtDuration(r.total) },
        ];
      }}
    />
  );
}
