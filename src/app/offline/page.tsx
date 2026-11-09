import Link from "next/link";
import { Arrival } from "@/components/offline/Arrival";
import { CopyButton } from "@/components/offline/CopyButton";
import { GuestbookForm } from "@/components/offline/GuestbookForm";
import { HoursChart } from "@/components/offline/HoursChart";
import { ThornRail } from "@/components/offline/ThornRail";
import {
  accounts,
  characterSheet,
  favourites,
  guestbook,
  nowPlaying,
  playHours,
  records,
  trophies,
} from "@/data/offline";

const wib = (iso: string, withTime = true) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit", hour12: false } : {}),
    timeZone: "Asia/Jakarta",
  }).format(new Date(iso));

/** A section title with a hairline running to the edge. */
function Title({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="ah-section-title">
      <h2 id={`${id}-title`} className="ah-wide ah-title">
        {children}
      </h2>
    </div>
  );
}

/** A glass panel with a labelled head. */
function Panel({
  label,
  meta,
  children,
  className = "",
}: {
  label: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`ah-frame ah-panel ${className}`}>
      <div className="ah-panel-head">
        <h3 className="ah-label">{label}</h3>
        {meta && <div className="ah-label text-right">{meta}</div>}
      </div>
      {children}
    </div>
  );
}

export default function AfterHours() {
  return (
    <>
      <ThornRail />

      <div className="ah-main">
        <main id="main">
          <Arrival />

          <div className="ah-wrap">
            <section id="dossier" aria-labelledby="dossier-title" className="ah-section">
              <Title id="dossier">Dossier</Title>
              <div className="ah-grid ah-grid-7-5">
                <Panel label="Character sheet">
                  <dl className="ah-rows">
                    {characterSheet.map((row) => (
                      <div key={row.label}>
                        <dt className="ah-label">{row.label}</dt>
                        <dd className="text-[16px] text-[var(--bone)]">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Panel>

                <section id="now" aria-labelledby="now-title" className="scroll-mt-6">
                  <h2 id="now-title" className="sr-only">
                    Now playing
                  </h2>
                  <Panel label="Now playing" className="h-full">
                    <ul className="ah-rows">
                      {nowPlaying.map((n) => (
                        <li key={n.medium}>
                          <span className="ah-label">{n.verb}</span>
                          <span>
                            <span className="block text-[19px] leading-snug text-[var(--bone)]">{n.title}</span>
                            {n.by && <span className="text-[14px] text-[var(--ash)]">{n.by}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Panel>
                </section>
              </div>
            </section>

            <section id="records" aria-labelledby="records-title" className="ah-section">
              <Title id="records">Record book</Title>
              <div className="ah-grid ah-grid-3 mb-5">
                {records.totals.map((t) => (
                  <div key={t.label} className="ah-frame ah-panel">
                    <p className="ah-stat">{t.value}</p>
                    <p className="ah-label mt-2">{t.label}</p>
                  </div>
                ))}
              </div>
              <Panel
                label="Steam hours per month"
                meta={
                  <>
                    Updated <time dateTime={records.refreshedAt}>{wib(records.refreshedAt)} WIB</time>
                  </>
                }
              >
                <HoursChart data={records.hoursByMonth} />
              </Panel>
              <div className="ah-grid ah-grid-7-5 mt-5">
                <Panel label="Top tracks, last 12 months">
                  <ol className="ah-ranked">
                    {records.topTracks.map((t, i) => (
                      <li key={t.title}>
                        <span className="ah-num text-[var(--ash)]">{i + 1}</span>
                        <span>
                          {t.title} <span className="text-[var(--ash)]">by {t.artist}</span>
                        </span>
                        <span className="ah-num text-[var(--ash)]">{t.plays} plays</span>
                      </li>
                    ))}
                  </ol>
                </Panel>
                <Panel label="Most played games">
                  <ol className="ah-ranked">
                    {records.topGames.map((g, i) => (
                      <li key={g.title}>
                        <span className="ah-num text-[var(--ash)]">{i + 1}</span>
                        <span>{g.title}</span>
                        <span className="ah-num text-[var(--ash)]">{g.hours} h</span>
                      </li>
                    ))}
                  </ol>
                </Panel>
              </div>
            </section>

            <section id="favourites" aria-labelledby="favourites-title" className="ah-section">
              <Title id="favourites">Favourites</Title>
              <div className="ah-grid ah-grid-3">
                {favourites.map((c) => (
                  <Panel key={c.id} label={c.label} meta={`${c.items.length} titles`}>
                    <ul className="ah-rows">
                      {c.items.map((it) => (
                        <li key={it.title} className="!grid-cols-[1fr_auto]">
                          <span className="text-[var(--bone)]">{it.title}</span>
                          <span className="ah-num text-[14px] text-[var(--ash)]">{it.year}</span>
                        </li>
                      ))}
                    </ul>
                  </Panel>
                ))}
              </div>
            </section>

            <div className="ah-grid ah-grid-5-7">
              <section id="trophies" aria-labelledby="trophies-title" className="ah-section">
                <Title id="trophies">Trophies</Title>
                <Panel label="Trophy room">
                  <ul className="space-y-5">
                    {trophies.map((t, i) => (
                      <li key={i} className="border-l border-[var(--line-strong)] pl-4">
                        <p className="text-[17px] text-[var(--bone)]">{t.title}</p>
                        <p className="mt-1 text-[14px] text-[var(--ash)]">{t.detail}</p>
                      </li>
                    ))}
                  </ul>
                </Panel>
              </section>

              <section id="play" aria-labelledby="play-title" className="ah-section">
                <Title id="play">Play with me</Title>
                <Panel label="Accounts" meta={playHours.zone}>
                  <p className="mb-1 text-[15px] text-[var(--bone)]">Usually online {playHours.when.toLowerCase()}.</p>
                  <p className="mb-5 text-[15px] text-[var(--ash)]">
                    Up for a match of {playHours.queue.slice(0, -1).join(", ")} or {playHours.queue.at(-1)}.
                  </p>
                  <ul className="ah-rows">
                    {accounts.map((a) => (
                      <li key={a.service} className="!grid-cols-[110px_1fr_auto] !items-center max-[599px]:!grid-cols-[1fr_auto]">
                        <span className="ah-label max-[599px]:col-span-2">{a.service}</span>
                        {a.href ? (
                          <a href={a.href} target="_blank" rel="noopener noreferrer" className="ah-link text-[17px] [overflow-wrap:anywhere]">
                            {a.handle}
                            <span className="sr-only"> (opens {a.service} in a new tab)</span>
                          </a>
                        ) : (
                          <span className="text-[17px] [overflow-wrap:anywhere]">{a.handle}</span>
                        )}
                        <CopyButton value={a.handle} label={`${a.service} handle`} />
                      </li>
                    ))}
                  </ul>
                </Panel>
              </section>
            </div>

            <section id="guestbook" aria-labelledby="guestbook-title" className="ah-section">
              <Title id="guestbook">Guestbook</Title>
              <div className="ah-grid ah-grid-7-5">
                <Panel label="Notes" meta="Shown after approval">
                  <ul className="space-y-6">
                    {guestbook.map((g) => (
                      <li key={g.name + g.date}>
                        <p className="max-w-[60ch] leading-relaxed text-[var(--bone)]">{g.message}</p>
                        {g.recommendation && <p className="mt-1 text-[var(--cream)]">Recommends {g.recommendation}</p>}
                        <p className="mt-1 text-[14px] text-[var(--ash)]">
                          {g.name}, <time dateTime={g.date}>{wib(g.date, false)}</time>
                        </p>
                      </li>
                    ))}
                  </ul>
                </Panel>
                <Panel label="Leave a note">
                  <GuestbookForm />
                </Panel>
              </div>
            </section>
          </div>
        </main>

        <footer className="ah-wrap py-[clamp(64px,10vh,112px)]">
          <div className="flex flex-col gap-6 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="ah-label">House Maulana</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/" className="ah-label ah-link">
                Back to the portfolio
              </Link>
              <a href="#arrival" className="ah-label ah-link">
                Back to top
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
