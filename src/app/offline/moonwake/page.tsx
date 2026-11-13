import type { Metadata } from "next";
import { ConceptGallery } from "@/components/offline/ConceptGallery";
import { SagaFooter } from "@/components/offline/SagaFooter";
import { SagaPage } from "@/components/offline/SagaPage";
import { TopBar, Wordmark } from "@/components/offline/TopBar";
import { codex, codexImages, conceptGalleries, moonwakeIntro, ranks } from "@/data/codex";
import { house } from "@/data/offline";

export const metadata: Metadata = {
  title: "Moonwake",
  description: "The Codex of Moonwake: the cliff-city of House Maulana, its land, magic, people and lore.",
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The Moonwake region page, reached from the map's "Learn more" and the After Hours
 * Codex block. Same saga layout as After Hours: the name across a painting, a saga
 * line, an index of chapters, each chapter as a framed entry, then concept-art mosaics.
 */
export default function MoonwakePage() {
  return (
    <SagaPage>
      <TopBar
        brandHref="#"
        links={[
          { href: "/offline", label: "After Hours" },
          { href: "#chapters", label: "Chapters" },
          { href: "#moonwatch", label: "Moonwatch" },
          { href: "#concept", label: "Concept art" },
          { href: "/offline/map", label: "Map" },
        ]}
      />

      <main id="main">
        <section aria-labelledby="codex-title" className="hx-hero">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed hero, already sized */}
          <img src="/offline/moonwake/codex-hero.webp" alt="" fetchPriority="high" className="hx-bleed-img hx-hero-img" />
          <Wordmark as="h1" id="codex-title" />
          <div className="hx-hero-foot">
            <p className="hx-small-white">{house.name} / Region</p>
            <p className="hx-small-white">
              <span aria-hidden>⌄ </span>Scroll to explore
            </p>
          </div>
        </section>

        <section className="hx-intro hx-rule" aria-labelledby="saga-title">
          <h2 id="saga-title" className="hx-intro-title">
            The Codex of Moonwake
          </h2>
          <p className="hx-lede">
            {moonwakeIntro} {house.motto}
          </p>
        </section>

        {/* An index of the chapters, set like a press list. */}
        <section id="chapters" aria-labelledby="chapters-title" className="hx-pad hx-split hx-index">
          <h2 id="chapters-title" className="hx-h2 hx-split-title">
            Chapters
          </h2>
          <ol className="hx-list">
            {codex.map((t, i) => (
              <li key={t.id}>
                <span aria-hidden className="hx-list-dot" />
                <a href={`#${t.id}`} className="hx-list-key hx-index-link">
                  <span className="hx-small mr-3">{pad(i + 1)}</span>
                  {t.label}
                </a>
                <span className="hx-list-val">{t.lead}</span>
                <span className="hx-list-end">
                  <a href={`#${t.id}`} className="hx-bracket" aria-hidden tabIndex={-1}>
                    Read
                  </a>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Each chapter: a framed entry with its painting, the text and the facts as cells. */}
        {codex.map((t, i) => (
          <section key={t.id} id={t.id} aria-labelledby={`${t.id}-title`} className="hx-section hx-pad">
            <article className="hx-char hx-entry" data-flip={i % 2 ? "" : undefined}>
              <div className="hx-char-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={codexImages[t.id]} alt="" loading={i < 1 ? "eager" : "lazy"} />
              </div>
              <div className="hx-char-name">
                <p className="hx-small">
                  Chapter {pad(i + 1)} / {pad(codex.length)}
                </p>
                <h2 id={`${t.id}-title`} className="hx-h1 mt-4">
                  {t.label}
                </h2>
              </div>
              <div className="hx-char-bio">
                <p className="hx-small-white">{t.lead}</p>
                <p className="hx-small">{t.body}</p>
              </div>
              <dl className="hx-char-cells">
                {t.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="hx-small">{f.label}</dt>
                    <dd className="hx-small-white">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            {t.id === "moonwatch" && (
              <div className="hx-split hx-ranks-wrap">
                <div className="hx-split-title">
                  <h3 className="hx-h2">Ranks</h3>
                  <p className="hx-small mt-4">Lowest to highest. The first twelve are shared; the last nine are Moonwake&apos;s own path.</p>
                </div>
                <ol className="hx-ranks">
                  {[...ranks.shared, ...ranks.moonwake].map((r, k) => (
                    <li key={r} data-house={k >= ranks.shared.length ? "" : undefined}>
                      <span className="hx-small">{pad(k + 1)}</span>
                      <span className="hx-small-white">{r}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </section>
        ))}

        {/* Concept art: mosaics of the city, its people and the Moonwatch. */}
        <div id="concept" className="hx-concept">
          {conceptGalleries.map((g) => (
            <ConceptGallery key={g.id} {...g} />
          ))}
        </div>
      </main>

      <SagaFooter base="/offline" image="/offline/moonwake/concept/env-city.webp" quote="Quiet." by="The battle cry of the Moonwatch" />
    </SagaPage>
  );
}
