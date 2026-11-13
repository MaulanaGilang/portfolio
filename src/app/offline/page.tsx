import Link from "next/link";
import { Arrival } from "@/components/offline/Arrival";
import { CharacterPanel } from "@/components/offline/CharacterPanel";
import { CopyButton } from "@/components/offline/CopyButton";
import { GuestbookForm } from "@/components/offline/GuestbookForm";
import { posterProps, steamArt } from "@/components/offline/poster";
import { PosterHover } from "@/components/offline/PosterHover";
import { QuoteReel } from "@/components/offline/QuoteReel";
import { SagaFooter } from "@/components/offline/SagaFooter";
import { SAGA, SagaPage } from "@/components/offline/SagaPage";
import {
  accounts,
  characters,
  characterSheet,
  favourites,
  guestbook,
  house,
  nowPlaying,
  playHours,
  playlists,
  type Character,
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

const sheet = (label: string) => characterSheet.find((r) => r.label === label)?.value ?? "";

/** Small crosshairs in the four corners of a full-bleed image. */
function Corners() {
  return (
    <>
      {["tl", "tr", "bl", "br"].map((c) => (
        <span key={c} aria-hidden className={`hx-plus hx-plus-${c}`} />
      ))}
    </>
  );
}

/** A full-width image that opens out from an inset frame as it scrolls in, with its title over the lower left. */
function Feature({ id, image, title, text, href, cta }: { id: string; image: string; title: string; text: string; href: string; cta: string }) {
  return (
    <article className="hx-feature" aria-labelledby={id}>
      <div className="hx-feature-media">
        {/* eslint-disable-next-line @next/next/no-img-element -- large inset image, already compressed */}
        <img src={image} alt="" loading="lazy" />
      </div>
      <div className="hx-feature-copy">
        <span aria-hidden className="hx-dot-mark" />
        <h2 id={id} className="hx-h1">
          {title}
        </h2>
        <p className="hx-small-white mt-4 max-w-[46ch]">{text}</p>
        {href.startsWith("/") ? (
          <Link href={href} transitionTypes={SAGA} className="hx-bracket mt-5">
            {cta}
          </Link>
        ) : (
          <a href={href} className="hx-bracket mt-5">
            {cta}
          </a>
        )}
      </div>
    </article>
  );
}

/** A centred title between two ticked hairlines. */
function CentreTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="hx-rule hx-centre-head">
      <h2 id={id} className="hx-h2">
        {children}
      </h2>
    </div>
  );
}

export default async function AfterHours() {
  const steam = await getSteamStats();

  const gilang: Character = {
    id: "gilang",
    name: "Gilang",
    image: "/offline/moonwake/concept/life-archmagus.webp",
    bio: [`${sheet("Title")}. ${sheet("Class")}.`, `${sheet("Focus")}. ${sheet("Plays")}, with a dragon for a familiar.`],
    cells: [
      { label: "Main roles", value: sheet("Main roles") },
      { label: "Home", value: sheet("Home") },
      { label: "Languages", value: sheet("Languages") },
      { label: "Familiar", value: sheet("Familiar") },
    ],
  };

  const playing = nowPlaying.flatMap((n) =>
    n.titles.map((t) => ({
      ...t,
      medium: n.medium,
      verb: n.verb,
      art: t.steamAppId ? steamArt(t.steamAppId) : t.poster ? { poster: t.poster } : undefined,
      hours: t.steamAppId ? steam?.mostPlayed.find((g) => g.appid === t.steamAppId)?.hours : undefined,
    })),
  );
  const library = favourites.flatMap((c) => c.items.map((it) => ({ ...it, category: c.label })));
  const ledger = steam ? [...steam.mostPlayed.slice(0, 3)] : [];
  const recentHours = steam?.recent.reduce((s, g) => s + g.hours, 0) ?? 0;

  return (
    <SagaPage>
      <PosterHover />
      <div aria-hidden className="hx-progress">
        <span />
      </div>
      <Arrival />

      <main id="main">
        {/* The saga line: a title and a large grey paragraph. */}
        <section className="hx-intro hx-rule" aria-labelledby="intro-title">
          <h2 id="intro-title" className="hx-intro-title">
            The {house.name} saga
          </h2>
          <p className="hx-lede">
            {house.intro} A cliff-city over deep water, one bridge in and one bridge out. {house.motto}
          </p>
        </section>

        <Feature
          id="feature-codex"
          image="/offline/moonwake-courtyard.webp"
          title="The Codex"
          text="The land, the magic, the people and the lore of Moonwake, with the concept art of the city, its people and the Moonwatch."
          href="/offline/moonwake"
          cta="Open the Codex"
        />
        <Feature
          id="feature-archmagus"
          image="/offline/moonwake/concept/env-hall.webp"
          title="The Archmagus"
          text="Gilang Maulana, away from the desk. An all-rounder mage who keeps people standing, with a dragon asleep under the table."
          href="#dossier"
          cta="Meet the Archmagus"
        />

        {/* Story: a centred block over a full-bleed painting, with a line running down from it. */}
        <section className="hx-story" aria-labelledby="story-title">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/offline/moonwake/codex-land.webp" alt="" loading="lazy" className="hx-bleed-img hx-drift" />
          <Corners />
          <div className="hx-story-copy">
            <h2 id="story-title" className="hx-h1">
              Story
            </h2>
            <span aria-hidden className="hx-dot-mark mx-auto mt-4" />
            <p className="hx-small-white mt-5">
              Moonwake is built in terraces down a sea cliff, curved like a crescent, with the keep carved straight from the rock.
              Mist sits on the water most mornings and nobody stumbles in. Under the city lies a still well of red-violet magic,
              and once a year, in the Quiet Hour, the whole city falls silent while it is fed...
            </p>
            <Link href="/offline/map" transitionTypes={SAGA} className="hx-bracket mt-5">
              Discover more<span className="sr-only">: open the Map of Moonwake</span>
            </Link>
          </div>
          <span aria-hidden className="hx-story-line" />
        </section>

        {/* Characters: a framed profile and a strip of thumbnails. */}
        <section id="dossier" aria-labelledby="dossier-title" className="hx-section">
          <CentreTitle id="dossier-title">Characters</CentreTitle>
          <div className="hx-pad">
            <CharacterPanel characters={[gilang, ...characters]} />
          </div>
        </section>

        <QuoteReel />

        {/* The Library: a list like a press list. */}
        <section id="favourites" aria-labelledby="favourites-title" className="hx-section hx-pad hx-split">
          <h2 id="favourites-title" className="hx-h2 hx-split-title">
            The Library
          </h2>
          <ul className="hx-list">
            {library.map((r) => (
              <li key={r.title} {...posterProps({ title: r.title, poster: r.poster, clip: r.clip, meta: `${r.category}, ${r.year}` })}>
                <span aria-hidden className="hx-list-dot" />
                <span className="hx-list-key">{r.category}</span>
                <span className="hx-list-val">{r.title}</span>
                <span className="hx-list-end">{r.year}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* The Ledger: big numbers like an events list. */}
        <section id="records" aria-labelledby="records-title" className="hx-section hx-pad hx-split">
          <h2 id="records-title" className="hx-h2 hx-split-title">
            The Ledger
          </h2>
          <div>
            {steam ? (
              <ul className="hx-events">
                {ledger.map((g) => (
                  <li key={g.appid} {...posterProps({ title: g.name, meta: "Steam", ...steamArt(g.appid) })}>
                    <span className="hx-event-num">
                      {g.hours.toLocaleString("en-US")}
                      <span className="hx-event-unit">H</span>
                    </span>
                    <span className="hx-small">
                      <span className="hx-small-white">{g.name}.</span> Hours on Steam, all time.
                    </span>
                  </li>
                ))}
                {steam.recent.map((g) => (
                  <li key={`recent-${g.appid}`} {...posterProps({ title: g.name, meta: "Steam, last two weeks", ...steamArt(g.appid) })}>
                    <span className="hx-event-num">
                      {g.hours}
                      <span className="hx-event-unit">H</span>
                    </span>
                    <span className="hx-small">
                      <span className="hx-small-white">{g.name}.</span> Played in the last two weeks.
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="hx-small">Steam stats aren&apos;t available right now. They refresh once a day.</p>
            )}
            {steam && (
              <p className="hx-small mt-5">
                Updated <time dateTime={steam.fetchedAt}>{wib(steam.fetchedAt)} WIB</time>
              </p>
            )}
          </div>
        </section>

        {/* Stats: four framed columns. */}
        <section aria-labelledby="stats-title" className="hx-section">
          <CentreTitle id="stats-title">Stats</CentreTitle>
          <div className="hx-pad">
            <ul className="hx-stats">
              {[
                {
                  n: steam ? `${steam.totalHours.toLocaleString("en-US")}+` : "—",
                  label: "Hours",
                  text: "Played on Steam across the whole library, counted by Steam itself and refreshed once a day.",
                },
                { n: steam ? String(steam.gameCount) : "—", label: "Games", text: "In the Steam library, played or still waiting for their turn." },
                {
                  n: `${recentHours}H`,
                  label: "Fortnight",
                  text: steam?.recent.length ? `The last two weeks: ${steam.recent.map((g) => g.name).join(", ")}.` : "Nothing on Steam in the last two weeks.",
                },
                { n: String(playlists.length), label: "Playlists", text: "Indonesian, English and Japanese, all on Spotify. One for each language." },
              ].map((s) => (
                <li key={s.label}>
                  <p className="hx-stat">
                    <span>{s.n}</span>
                  </p>
                  <p className="hx-h3 mt-auto">{s.label}</p>
                  <p className="hx-small mt-3">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Now playing: a parallax painting, then cards like a shop row. */}
        <section aria-labelledby="now-title" className="hx-section">
          <div className="hx-story hx-story-short">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/offline/moonwake/concept/life-festival.webp" alt="" loading="lazy" className="hx-bleed-img hx-drift" />
            <Corners />
            <div className="hx-story-copy">
              <h2 id="now-title" className="hx-h1">
                Now playing
              </h2>
              <span aria-hidden className="hx-dot-mark mx-auto mt-4" />
              <p className="hx-small-white mt-5">What is on the table this season: the games being played and the shows being watched.</p>
            </div>
            <span aria-hidden className="hx-story-line" />
          </div>
          <ul className="hx-pad hx-cards">
            {playing.map((t) => (
              <li key={t.title} className="hx-card" {...posterProps({ title: t.title, meta: t.verb, ...(t.art ?? {}) })}>
                <p className="hx-card-meta">
                  <span>Medium</span>
                  <span aria-hidden>/</span>
                  <span className="hx-small-white">{t.medium}</span>
                </p>
                <div className="hx-card-art">
                  {t.art?.poster ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.art.poster} alt="" loading="lazy" />
                  ) : (
                    <span className="hx-card-blank hx-h2">{t.title}</span>
                  )}
                </div>
                <h3 className="hx-h3">{t.title}</h3>
                <p className="hx-small hx-card-desc">{t.verb} now.</p>
                <p className="hx-card-meta hx-card-foot">
                  <span>{t.hours ? "Hours" : "Status"}</span>
                  <span aria-hidden>/</span>
                  <span className="hx-small-white">{t.hours ? t.hours.toLocaleString("en-US") : t.verb}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* The Long Bridge: accounts and playlists as a press list with actions. */}
        <section id="play" aria-labelledby="play-title" className="hx-section hx-pad hx-split">
          <div className="hx-split-title">
            <h2 id="play-title" className="hx-h2">
              The Long Bridge
            </h2>
            <p className="hx-small mt-4">
              {playHours.when}, {playHours.zone}.
            </p>
          </div>
          <ul className="hx-list">
            {accounts.map((a) => (
              <li key={a.service}>
                <span aria-hidden className="hx-list-dot" />
                <span className="hx-list-key">{a.service}</span>
                <span className="hx-list-val [overflow-wrap:anywhere]">{a.handle}</span>
                <span className="hx-list-end hx-list-actions">
                  {a.href && (
                    <a href={a.href} target="_blank" rel="noopener noreferrer" className="ah-button">
                      Visit<span className="sr-only"> {a.service} (opens in a new tab)</span>
                    </a>
                  )}
                  <CopyButton value={a.copy ?? a.handle} label={a.copy ? `${a.service} link` : `${a.service} handle`} />
                </span>
              </li>
            ))}
            {playlists.map((p) => (
              <li key={p.label}>
                <span aria-hidden className="hx-list-dot" />
                <span className="hx-list-key">Playlist {p.label}</span>
                <span className="hx-list-val">{p.language}</span>
                <span className="hx-list-end hx-list-actions">
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="ah-button">
                    Listen<span className="sr-only"> to the {p.language} playlist on Spotify (opens in a new tab)</span>
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* The Long Table: notes as a list, and the form. */}
        <section id="guestbook" aria-labelledby="guestbook-title" className="hx-section hx-pad hx-split">
          <div className="hx-split-title">
            <h2 id="guestbook-title" className="hx-h2">
              The Long Table
            </h2>
            <p className="hx-small mt-4">Leave a note. Notes appear once approved.</p>
          </div>
          <div className="grid gap-14">
            <ul className="hx-list">
              {guestbook.map((g) => (
                <li key={g.name + g.date} className="hx-list-note">
                  <span aria-hidden className="hx-list-dot" />
                  <span className="hx-list-key">
                    {g.name}
                    <span className="hx-small block">
                      <time dateTime={g.date}>{wib(g.date, false)}</time>
                      {g.example && " · Example"}
                    </span>
                  </span>
                  <span className="hx-list-val normal-case">
                    {g.message}
                    {g.recommendation && <span className="hx-small mt-2 block">Recommends {g.recommendation}</span>}
                  </span>
                </li>
              ))}
            </ul>
            <GuestbookForm />
          </div>
        </section>
      </main>

      <SagaFooter image="/offline/moonwake-harbour.webp" quote="The pool is fed before the table." by="The house code" />
    </SagaPage>
  );
}
