const int = new Intl.NumberFormat("en-US");

export const fmtInt = (n: number) => int.format(Math.round(n));

/** 109950743 -> "110M", 1913293 -> "1.91M", 161736 -> "162K", 200000 -> "200K", 999960 -> "1M" */
export function fmtCompact(n: number) {
  const abs = Math.abs(n);
  // Thresholds sit at 999.5 of the smaller unit, so a value that rounds up to
  // 1000 moves to the next unit ("1M", not "1000K").
  if (abs >= 999.5e6) return `${trim(n / 1e9)}B`;
  if (abs >= 999.5e3) return `${trim(n / 1e6)}M`;
  if (abs >= 999.5) return `${trim(n / 1e3)}K`;
  return String(Math.round(n));
}

/** Three significant digits; trailing zeros are dropped only after a decimal point. */
function trim(v: number) {
  const digits = Math.abs(v) >= 100 ? 0 : Math.abs(v) >= 10 ? 1 : 2;
  const s = v.toFixed(digits);
  return s.includes(".") ? s.replace(/\.?0+$/, "") : s;
}

export const fmtPct = (r: number, digits = 1) => `${(r * 100).toFixed(digits)}%`;

export const fmtUsd = (n: number) => `$${fmtCompact(n)}`;

export function fmtDay(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

export function fmtDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m ? `${m}m ${s.toString().padStart(2, "0")}s` : `${s}s`;
}
