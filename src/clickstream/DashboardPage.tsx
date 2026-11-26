import { ArrowDown, ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { AbandonHeatmap } from "@/clickstream/components/charts/abandon-heatmap";
import { DailyChart } from "@/clickstream/components/charts/daily-chart";
import { RankBars } from "@/clickstream/components/charts/rank-bars";
import { FunnelStory } from "@/clickstream/components/funnel-story";
import { HeroPipeline } from "@/clickstream/components/hero-pipeline";
import { DataTable, Section } from "@/clickstream/components/section";
import { SiteNav } from "@/clickstream/components/site-nav";
import { SnowpipeReplay } from "@/clickstream/components/snowpipe-replay";
import {
  getBrands,
  getCategories,
  getDaily,
  getFunnel,
  getHourly,
  getLaggard,
  getMeta,
  getPriceBands,
  getQuality,
  getRuns,
  getSnowpipe,
  getTotals,
} from "@/clickstream/lib/data";
import { fmtCompact, fmtDay, fmtDuration, fmtInt, fmtPct } from "@/clickstream/lib/format";
import { site } from "@/clickstream/lib/site";
import { QualityChart, RunsChart } from "@/clickstream/client-charts";

export default function Home() {
  const meta = getMeta();
  const totals = getTotals();
  const funnel = getFunnel();
  const daily = getDaily();
  const cats = getCategories();
  const laggard = getLaggard(cats);
  const bands = getPriceBands();
  const brands = getBrands();
  const hourly = getHourly();
  const quality = getQuality();
  const runs = getRuns();
  const snowpipe = getSnowpipe();

  // hour-of-day abandonment, averaged across weekdays, for the headline
  const byHour = Array.from({ length: 24 }, (_, h) => {
    const cells = hourly.filter((c) => c.hour === h);
    const carted = cells.reduce((s, c) => s + c.carted, 0);
    const abandoned = cells.reduce((s, c) => s + c.carted * c.rate, 0);
    return { hour: h, rate: abandoned / carted };
  });
  const worstHour = byHour.reduce((a, b) => (b.rate > a.rate ? b : a));
  const bestHour = byHour.reduce((a, b) => (b.rate < a.rate ? b : a));

  const backfillS = runs.reduce((s, r) => s + r.total, 0);
  const retried = runs.filter((r) => r.tries > 1);
  const hh = Math.floor(backfillS / 3600);
  const mm = Math.round((backfillS % 3600) / 60);

  const bandMax = Math.max(...bands.map((b) => b.conversion));
  const bandPeak = bands.reduce((a, b) => (b.conversion > a.conversion ? b : a));
  const bandLow = bands.reduce((a, b) => (b.conversion < a.conversion ? b : a));

  return (
    <>
      <SiteNav preview={meta.preview} />

      <main id="top">
        {/* HERO: the pipeline is the map of the page */}
        <section className="mx-auto flex min-h-dvh w-full max-w-[1240px] flex-col justify-center gap-12 px-4 pb-16 pt-28 sm:px-8 md:gap-16 md:pt-24">
          <div className="max-w-[62rem]">
            <h1 className="text-[clamp(2.5rem,5vw+0.75rem,4.75rem)] font-medium">
              110 million clicks, traced to the checkout.
            </h1>
            <p className="mt-6 max-w-[48ch] text-lg text-cs-ink-2">
              A daily ELT pipeline on S3, Snowflake and dbt turns two months of raw shop events into one auditable
              funnel.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={site.repoUrl}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-cs-accent px-5 py-2.5 text-sm font-medium text-cs-accent-ink transition-[transform,filter] hover:brightness-110 active:scale-[0.98]"
              >
                <GithubLogo size={18} weight="bold" aria-hidden />
                Read the code
              </a>
              <a
                href="#funnel"
                className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-cs-ink-2 underline-offset-4 transition-colors hover:text-cs-ink hover:underline"
              >
                Follow the rows
                <ArrowDown size={14} aria-hidden />
              </a>
            </div>
          </div>

          <HeroPipeline
            rawCsvGb={totals.raw_csv_gb}
            parquetGb={totals.parquet_gb}
            rawRows={totals.raw_rows}
            cleanRows={totals.clean_rows}
            quarantined={totals.quarantined}
            duplicates={totals.duplicates}
            dbtModels={totals.dbt_models}
            dbtTests={totals.dbt_tests}
            days={totals.days}
          />
        </section>

        {/* 1. The funnel, told on scroll */}
        <Section
          id="funnel"
          title="Shoppers don't quit at the cart. They quit before it."
          lede="dbt rebuilds every session from all of its events, even when it crosses midnight. Scroll through what happens to them."
          className="pb-8 md:pb-8"
        >
          <FunnelStory f={funnel} />
        </Section>

        {/* 2. Time */}
        <Section
          id="daily"
          title={`${fmtDay(daily.peak.date)} sold ${daily.peakRatio.toFixed(1)}× a normal day.`}
          lede={`A mid-November sale lifted purchasing sessions from a median of ${fmtCompact(daily.median)} a day to ${fmtCompact(daily.peak.purchased)}. Filter by category to see who drove it.`}
        >
          <DailyChart series={daily.series} peakDate={daily.peak.date} />
          <DataTable
            caption="Purchasing sessions per day, all categories"
            columns={["Date", "Viewing sessions", "Purchasing sessions", "Conversion"]}
            rows={daily.series.all.map((d) => [d.date, fmtInt(d.viewed), fmtInt(d.purchased), fmtPct(d.purchased / d.viewed, 2)])}
          />
        </Section>

        {/* 3. What converts */}
        <Section
          id="categories"
          title={`${capitalize(laggard.name)} draws ${fmtPct(laggard.viewShare, 0)} of visits. Only ${fmtPct(laggard.conversion)} of them buy.`}
          lede="Share of sessions that end in a purchase, by top-level category. The number beside each bar is its share of all viewing sessions."
        >
          <RankBars
            ariaLabel="View-to-purchase conversion by category"
            rows={cats.map((c) => ({
              key: c.name,
              label: c.name,
              value: c.conversion,
              valueLabel: fmtPct(c.conversion),
              aside: `${fmtPct(c.viewShare, 0)} of visits`,
              highlight: c.name === laggard.name,
              detail: [
                { label: "Viewed", value: fmtInt(c.viewed) },
                { label: "Carted", value: fmtInt(c.carted) },
                { label: "Purchased", value: fmtInt(c.purchased) },
              ],
            }))}
          />
          <DataTable
            caption="Conversion by category"
            columns={["Category", "Viewed", "Carted", "Purchased", "Conversion"]}
            rows={cats.map((c) => [c.name, fmtInt(c.viewed), fmtInt(c.carted), fmtInt(c.purchased), fmtPct(c.conversion, 2)])}
          />

          <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <h3 className="text-2xl font-medium">Price is the second filter.</h3>
              <p className="mt-3 max-w-[44ch] text-cs-ink-2">
                Conversion peaks at {bandPeak.band} ({fmtPct(bandPeak.conversion)}) and is lowest{" "}
                {bandLow.band.startsWith("<") ? `under ${bandLow.band.slice(2)}` : `at ${bandLow.band}`} (
                {fmtPct(bandLow.conversion)}).
              </p>
              <div className="mt-8">
                <RankBars
                  ariaLabel="Conversion by price band"
                  max={bandMax}
                  rows={bands.map((b) => ({
                    key: b.band,
                    label: b.band,
                    value: b.conversion,
                    valueLabel: fmtPct(b.conversion),
                    detail: [
                      { label: "Viewing sessions", value: fmtInt(b.viewed) },
                      { label: "Conversion", value: fmtPct(b.conversion, 2) },
                    ],
                  }))}
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-medium">The brands that close.</h3>
              <p className="mt-3 max-w-[44ch] text-cs-ink-2">
                Top six brands by purchasing sessions, ranked by how often a view becomes a sale.
              </p>
              <div className="mt-8">
                <RankBars
                  ariaLabel="Conversion for the top brands by purchases"
                  rows={brands
                    .slice(0, 6)
                    .sort((a, b) => b.conversion - a.conversion)
                    .map((b) => ({
                      key: b.brand,
                      label: b.brand.length <= 2 ? b.brand.toUpperCase() : b.brand,
                      value: b.conversion,
                      valueLabel: fmtPct(b.conversion),
                      aside: `${fmtCompact(b.purchased)} sales`,
                      detail: [
                        { label: "Purchasing sessions", value: fmtInt(b.purchased) },
                        { label: "Conversion", value: fmtPct(b.conversion, 2) },
                      ],
                    }))}
                />
              </div>
            </div>
          </div>
        </Section>

        {/* 4. When carts die */}
        <Section
          id="timing"
          title="Carts started overnight are the likeliest to be left."
          lede={`At ${String(worstHour.hour).padStart(2, "0")}:00 UTC, ${fmtPct(worstHour.rate, 0)} of carts are abandoned. At the afternoon peak (${String(bestHour.hour).padStart(2, "0")}:00) it falls to ${fmtPct(bestHour.rate, 0)}.`}
        >
          <AbandonHeatmap cells={hourly} />
        </Section>

        {/* 5. Trust */}
        <Section
          id="quality"
          title="Every row is accounted for."
          lede="RAW keeps every column as text, so a bad value can never fail the load. dbt then types each row and labels it clean, quarantined or duplicate. A dbt test fails the run if any RAW row goes missing."
        >
          <div className="grid grid-cols-1 gap-6 rounded-[var(--radius-md)] border border-cs-rule bg-cs-paper-2/60 p-5 sm:grid-cols-[repeat(4,minmax(0,1fr))] sm:p-6">
            {[
              { label: "RAW rows loaded", value: totals.raw_rows, tone: "text-cs-ink" },
              { label: "Clean rows", value: totals.clean_rows, tone: "text-cs-ink", op: "=" },
              { label: "Quarantined", value: totals.quarantined, tone: "text-cs-ink", op: "+", swatch: "var(--cs-data-bad)" },
              { label: "Duplicates flagged", value: totals.duplicates, tone: "text-cs-ink", op: "+", swatch: "var(--cs-data-dup)" },
            ].map((s) => (
              <div key={s.label} className="relative">
                {s.op ? (
                  <span aria-hidden className="absolute -left-4 top-6 hidden font-cs-mono text-cs-ink-3 sm:block">
                    {s.op}
                  </span>
                ) : null}
                <div className="flex items-center gap-2 text-sm text-cs-ink-3">
                  {s.swatch ? <span className="size-2 rounded-[2px]" style={{ background: s.swatch }} /> : null}
                  {s.label}
                </div>
                <div className={`num mt-1 text-xl sm:text-2xl ${s.tone}`}>{fmtInt(s.value)}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div>
              <h3 className="text-lg font-medium">Exact duplicates flagged per day</h3>
              <p className="mt-1 mb-4 text-sm text-cs-ink-3">
                Same timestamp, event, product, user and session. Only the first copy is kept.
              </p>
              <QualityChart data={quality.daily} />
            </div>
            <div>
              <h3 className="text-lg font-medium">Quarantine by reason</h3>
              <p className="mt-1 mb-4 text-sm text-cs-ink-3">
                {fmtPct(quality.rejectRate, 2)} of RAW rows were quarantined or duplicates.
              </p>
              <dl className="divide-y divide-cs-rule border-y border-cs-rule">
                {(
                  [
                    ["missing_session", "No session id"],
                    ["bad_price", "Negative or unreadable price"],
                    ["missing_user", "No user id"],
                    ["bad_event_type", "Unknown event type"],
                    ["bad_timestamp", "Unreadable timestamp"],
                  ] as const
                ).map(([k, label]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
                    <dt className="text-cs-ink-2">
                      {label}
                      <span className="ml-2 hidden font-cs-mono text-xs text-cs-ink-3 sm:inline">{k}</span>
                    </dt>
                    <dd className={`num ${quality.reasons[k] ? "text-cs-ink" : "text-cs-ink-3"}`}>{fmtInt(quality.reasons[k])}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>

        {/* 6. Operations */}
        {runs.length ? (
        <Section
          id="runs"
          title={`${totals.days} days backfilled in ${hh}h ${mm}m, ${retryText(retried.length)}.`}
          lede="Each Airflow run uploads one day to S3, COPYs it into Snowflake and runs dbt for that day. Every step is safe to repeat: COPY skips files it has already loaded, and dbt replaces the day instead of appending to it."
        >
          <h3 className="mb-4 text-lg font-medium">Run time per day</h3>
          <RunsChart data={runs} />
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-cs-rule pt-8 md:grid-cols-[repeat(4,minmax(0,1fr))]">
            {[
              ["Average run", fmtDuration(backfillS / runs.length)],
              ["dbt tests passing", `${totals.dbt_tests} / ${totals.dbt_tests}`],
              ["Snowflake credits", `${totals.credits_used} of ${totals.credit_cap}`],
              ["Airflow hosting", "$0, local Docker"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-sm text-cs-ink-3">{k}</dt>
                <dd className="num mt-1 text-2xl text-cs-ink">{v}</dd>
              </div>
            ))}
          </dl>
          {retried.length ? (
            <p className="mt-8 max-w-[60ch] text-sm text-cs-ink-3">
              {fmtDay(retried[0].ds)} needed a second attempt after the local Docker engine ran out of memory and was
              restarted. Airflow re-ran the day; because every step is idempotent, it loaded no duplicate rows.
            </p>
          ) : null}
          <p className="mt-4 max-w-[60ch] text-sm text-cs-ink-3">
            Compute ran on an extra-small warehouse that suspends after 60 seconds idle, under a resource monitor that
            stops it at {totals.credit_cap} credits. The same DAG would deploy to managed Airflow (MWAA) unchanged.
          </p>
        </Section>
        ) : null}

        {/* 7. Streaming add-on */}
        {snowpipe.files.length && snowpipe.day ? (
        <Section
          id="stream"
          title={`Then I cut loading to ${snowpipe.medianLatency} seconds with Snowpipe.`}
          lede={`A replayer dropped ${fmtDay(snowpipe.day)} into S3 as one Parquet file per minute of events. Each file fired an S3 event, and Snowpipe loaded it into a separate EVENTS_LIVE table. The live view needs a Snowflake key, so it stayed local; this plays back the recorded load history.`}
        >
          <SnowpipeReplay day={snowpipe.day} files={snowpipe.files} medianLatency={snowpipe.medianLatency} />
        </Section>
        ) : null}

        {/* Close */}
        <section id="about-data" className="mx-auto w-full max-w-[1240px] px-4 py-24 sm:px-8 md:py-36">
          <h2 className="max-w-[18ch] text-[clamp(2.25rem,4.5vw+0.5rem,4rem)] font-medium">
            Every chart on this page is built by code you can read.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={site.repoUrl}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-cs-accent px-5 py-2.5 text-sm font-medium text-cs-accent-ink transition-[transform,filter] hover:brightness-110 active:scale-[0.98]"
            >
              <GithubLogo size={18} weight="bold" aria-hidden />
              Read the code
            </a>
            {site.linkedinUrl ? (
              <a
                href={site.linkedinUrl}
                className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-cs-ink-2 underline-offset-4 hover:text-cs-ink hover:underline"
              >
                Connect on LinkedIn <ArrowUpRight size={14} aria-hidden />
              </a>
            ) : null}
          </div>

          <div className="mt-20 grid grid-cols-1 gap-10 border-t border-cs-rule pt-10 text-sm text-cs-ink-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <p className="max-w-[56ch]">
              <span className="text-cs-ink-2">About this data.</span> {fmtInt(totals.raw_events)} events from a
              multi-category online store, October and November 2019, published by the REES46 Marketing Platform on{" "}
              <a href={site.datasetUrl} className="underline underline-offset-4 hover:text-cs-ink">
                Kaggle
              </a>
              . Used for research and education with attribution.
            </p>
            {meta.preview ? (
              <p className="max-w-[56ch]">
                <span className="text-cs-data-dup">Preview build.</span> The raw event totals are the dataset&apos;s
                published counts. Every other figure is synthetic, shaped like the Snowflake mart exports, and will be replaced
                when the pipeline&apos;s export task writes the real files.
              </p>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-[1240px] px-4 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-cs-rule py-8 text-sm text-cs-ink-3">
          <span className="font-cs-mono">
            clickstream<span className="text-cs-accent">/</span>funnel
          </span>
          <span>Built by {site.author} with AWS S3, Snowflake, dbt, Airflow and Next.js.</span>
        </div>
      </footer>
    </>
  );
}

function retryText(n: number) {
  return n === 0 ? "no retries" : n === 1 ? "one retry" : `${n} retries`;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
