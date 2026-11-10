import Link from "next/link";
import { Arrival } from "@/components/offline/Arrival";
import { CopyButton } from "@/components/offline/CopyButton";
import { Favourites } from "@/components/offline/Favourites";
import { GuestbookForm } from "@/components/offline/GuestbookForm";
import { posterProps, steamArt } from "@/components/offline/poster";
import { PosterHover } from "@/components/offline/PosterHover";
import { ThornRail } from "@/components/offline/ThornRail";
import {
  accounts,
  characterSheet,
  favourites,
  guestbook,
  nowPlaying,
  playHours,
  playlists,
} from "@/data/offline";
import { getSteamStats } from "@/lib/steam";

// Rebuilt at most once a day, which is also how often Steam is asked for new numbers.
export const revalidate = 86400;

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

export default async function AfterHours() {
  const steam = await getSteamStats();
  return (
    <>
      <ThornRail />
      <PosterHover />

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
                            {n.titles.map((t) => (
                              <span
                                key={t.title}
                                className="ah-fav block text-[19px] leading-snug text-[var(--bone)]"
                                {...posterProps({
                                  title: t.title,
                                  meta: n.verb,
                                  ...(t.steamAppId ? steamArt(t.steamAppId) : { poster: t.poster }),
                                })}
                              >
                                {t.title}
                              </span>
                            ))}
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
                {[
                  { label: "Hours on Steam", value: steam ? steam.totalHours.toLocaleString("en-US") : "—" },
                  { label: "Games in library", value: steam ? steam.gameCount.toLocaleString("en-US") : "—" },
                  { label: "Playlists", value: String(playlists.length) },
                ].map((t) => (
                  <div key={t.label} className="ah-frame ah-panel">
                    <p className="ah-stat">{t.value}</p>
                    <p className="ah-label mt-2">{t.label}</p>
                  </div>
                ))}
              </div>
              <div className="ah-grid ah-grid-7-5">
                <Panel
                  label="Most played games"
                  meta={
                    steam && (
                      <>
                        Updated <time dateTime={steam.fetchedAt}>{wib(steam.fetchedAt)} WIB</time>
                      </>
                    )
                  }
                >
                  {steam ? (
                    <ol className="ah-ranked">
                      {steam.mostPlayed.map((g, i) => (
                        <li key={g.appid} className="ah-fav" {...posterProps({ title: g.name, meta: "Steam", ...steamArt(g.appid) })}>
                          <span className="ah-num text-[var(--ash)]">{i + 1}</span>
                          <span>{g.name}</span>
                          <span className="ah-num text-[var(--ash)]">{g.hours.toLocaleString("en-US")} h</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-[var(--ash)]">Steam stats aren&apos;t available right now. They refresh once a day.</p>
                  )}
                </Panel>
                <Panel label="Last two weeks">
                  {steam?.recent.length ? (
                    <ol className="ah-ranked">
                      {steam.recent.map((g) => (
                        <li key={g.appid} className="ah-fav !grid-cols-[1fr_auto]" {...posterProps({ title: g.name, meta: "Steam", ...steamArt(g.appid) })}>
                          <span>{g.name}</span>
                          <span className="ah-num text-[var(--ash)]">{g.hours} h</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-[var(--ash)]">{steam ? "Nothing played on Steam in the last two weeks." : "No recent games to show."}</p>
                  )}
                </Panel>
              </div>
              <div className="mt-5">
                <Panel label="Playlists" meta="On Spotify">
                  <ul className="ah-ranked">
                    {playlists.map((p) => (
                      <li key={p.label} className="!grid-cols-[44px_1fr_auto]">
                        <span className="ah-label text-[var(--cream)]">{p.label}</span>
                        <span>{p.language}</span>
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className="ah-label ah-link">
                          Listen
                          <span className="sr-only"> to the {p.language} playlist on Spotify (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Panel>
              </div>
            </section>

            <section id="favourites" aria-labelledby="favourites-title" className="ah-section">
              <Title id="favourites">Favourites</Title>
              <Favourites categories={favourites} />
            </section>

            <div>
              <section id="play" aria-labelledby="play-title" className="ah-section">
                <Title id="play">Play with me</Title>
                <Panel label="Accounts" meta={playHours.zone}>
                  <p className="mb-5 text-[15px] text-[var(--bone)]">{playHours.when}.</p>
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
                        <CopyButton value={a.copy ?? a.handle} label={a.copy ? `${a.service} link` : `${a.service} handle`} />
                      </li>
                    ))}
                  </ul>
                </Panel>
              </section>
            </div>

            <section id="guestbook" aria-labelledby="guestbook-title" className="ah-section">
              <Title id="guestbook">Guestbook</Title>
              <div className="ah-grid ah-grid-7-5">
                <Panel label="Notes">
                  <ul className="space-y-6">
                    {guestbook.map((g) => (
                      <li key={g.name + g.date}>
                        <p className="max-w-[60ch] leading-relaxed text-[var(--bone)]">{g.message}</p>
                        {g.recommendation && <p className="mt-1 text-[var(--cream)]">Recommends {g.recommendation}</p>}
                        <p className="mt-1 text-[14px] text-[var(--ash)]">
                          {g.name}, <time dateTime={g.date}>{wib(g.date, false)}</time>
                          {g.example && <span className="ah-label ml-3">Example note</span>}
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
              <Link href="/" transitionTypes={["world-out"]} className="ah-label ah-link">
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
