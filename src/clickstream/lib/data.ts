import "server-only";

import meta from "@/clickstream/data/meta.json";
import totals from "@/clickstream/data/totals.json";
import funnelDaily from "@/clickstream/data/funnel_daily.json";
import categories from "@/clickstream/data/categories.json";
import priceBands from "@/clickstream/data/price_bands.json";
import brands from "@/clickstream/data/brands.json";
import hourly from "@/clickstream/data/hourly_abandonment.json";
import quality from "@/clickstream/data/quality_daily.json";
import runs from "@/clickstream/data/airflow_runs.json";
import snowpipe from "@/clickstream/data/snowpipe_files.json";

// Everything here runs on the server at build time. Client charts receive only
// the small, pre-shaped arrays they draw, never the raw exports.

export type DailyPoint = { date: string; viewed: number; purchased: number };
export type CategoryRow = {
  name: string;
  viewed: number;
  carted: number;
  purchased: number;
  viewShare: number;
  conversion: number;
};

export function getMeta() {
  return meta;
}

export function getTotals() {
  return totals;
}

export function getFunnel() {
  const { sessions_viewed: viewed, sessions_carted: carted, sessions_purchased: purchased } = totals;
  return {
    viewed,
    carted,
    purchased,
    viewToCart: carted / viewed,
    cartToPurchase: purchased / carted,
    overall: purchased / viewed,
    revenue: totals.revenue,
  };
}

/** Purchasing sessions per day, overall and per top category. */
export function getDaily() {
  const byDate = new Map<string, DailyPoint>();
  const byCat = new Map<string, Map<string, DailyPoint>>();
  for (const r of funnelDaily) {
    const all = byDate.get(r.event_date) ?? { date: r.event_date, viewed: 0, purchased: 0 };
    all.viewed += r.sessions_viewed;
    all.purchased += r.sessions_purchased;
    byDate.set(r.event_date, all);

    const m = byCat.get(r.category_l1) ?? new Map();
    m.set(r.event_date, { date: r.event_date, viewed: r.sessions_viewed, purchased: r.sessions_purchased });
    byCat.set(r.category_l1, m);
  }
  const all = [...byDate.values()];
  const series: Record<string, DailyPoint[]> = { all };
  for (const name of ["electronics", "appliances", "computers", "apparel"]) {
    series[name] = [...(byCat.get(name)?.values() ?? [])];
  }

  const sorted = [...all].map((d) => d.purchased).sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const peak = all.reduce((a, b) => (b.purchased > a.purchased ? b : a));
  return { series, median, peak, peakRatio: peak.purchased / median };
}

export function getCategories(): CategoryRow[] {
  const totalViewed = categories.reduce((s, c) => s + c.sessions_viewed, 0);
  return categories
    .map((c) => ({
      name: c.category_l1,
      viewed: c.sessions_viewed,
      carted: c.sessions_carted,
      purchased: c.sessions_purchased,
      viewShare: c.sessions_viewed / totalViewed,
      conversion: c.sessions_purchased / c.sessions_viewed,
    }))
    .sort((a, b) => b.conversion - a.conversion);
}

/** The surprise: the category with the biggest gap between attention and conversion. */
export function getLaggard(rows: CategoryRow[]) {
  return rows
    .filter((r) => r.viewShare > 0.05 && r.name !== "unknown")
    .reduce((worst, r) => (r.conversion < worst.conversion ? r : worst));
}

export function getPriceBands() {
  return priceBands.map((b) => ({
    band: b.price_band,
    viewed: b.sessions_viewed,
    conversion: b.sessions_purchased / b.sessions_viewed,
  }));
}

export function getBrands() {
  return brands.map((b) => ({
    brand: b.brand,
    purchased: b.sessions_purchased,
    conversion: b.sessions_purchased / b.sessions_viewed,
  }));
}

export function getHourly() {
  return hourly.map((h) => ({
    weekday: h.weekday,
    hour: h.hour,
    carted: h.sessions_carted,
    rate: h.sessions_abandoned / h.sessions_carted,
  }));
}

export function getQuality() {
  const reasons = { bad_timestamp: 0, bad_event_type: 0, bad_price: 0, missing_user: 0, missing_session: 0 };
  for (const q of quality) {
    for (const k of Object.keys(reasons) as (keyof typeof reasons)[]) reasons[k] += q.reasons[k];
  }
  return {
    daily: quality.map((q) => ({ date: q.event_date, quarantined: q.quarantined, duplicates: q.duplicates })),
    rejectRate: quality.reduce((s, q) => s + q.quarantined + q.duplicates, 0) / quality.reduce((s, q) => s + q.raw_rows, 0),
    reasons,
  };
}

export function getRuns() {
  return runs.map((r) => ({
    ds: r.ds,
    upload: r.upload_s,
    copy: r.copy_s,
    dbt: r.dbt_s,
    total: r.upload_s + r.copy_s + r.dbt_s,
    tries: r.tries,
  }));
}

/** Snowpipe demo: one file per minute of event time, with its measured load latency. */
export function getSnowpipe() {
  return {
    day: meta.replay_day,
    files: snowpipe.map((f) => ({ name: f.file.split("/").pop()!, rows: f.rows, sent: f.sent_s, loaded: f.loaded_s, latency: f.latency_s })),
    medianLatency: totals.snowpipe_median_latency_s,
  };
}
