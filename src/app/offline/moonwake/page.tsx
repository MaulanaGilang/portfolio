import type { Metadata } from "next";
import Link from "next/link";
import { ConceptGallery } from "@/components/offline/ConceptGallery";
import { codex, codexImages, conceptGalleries, moonwakeIntro, ranks } from "@/data/codex";

export const metadata: Metadata = {
  title: "Moonwake",
  description: "The Codex of Moonwake: the cliff-city of House Maulana, its land, magic, people and lore.",
};

/**
 * The Moonwake region page, reached from the map's "Learn more". A cinematic hero,
 * then the Codex as full-width chapters, each opening on its own painted image.
 */
export default function MoonwakePage() {
  return (
    <main id="main" className="ah-region">
      <header className="ah-region-hero">
        {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed hero, already sized */}
        <img src="/offline/moonwake/codex-hero.webp" alt="" className="ah-region-hero-img" />
        <div className="ah-region-hero-copy">
          <p className="ah-label">House Maulana · Region</p>
          <h1 className="ah-name">Moonwake</h1>
          <p className="ah-motto mt-3">Quiet, eternal, and ours.</p>
          <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-[var(--bone)]">{moonwakeIntro}</p>
        </div>
        <nav aria-label="Chapters" className="ah-region-toc">
          {codex.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="ah-label ah-link">
              {t.label}
            </a>
          ))}
          <a href="#environments" className="ah-label ah-link">
            Concept art
          </a>
        </nav>
      </header>

      {codex.map((t, i) => (
        <section key={t.id} id={t.id} aria-labelledby={`${t.id}-title`} className="ah-chapter" data-flip={i % 2 ? "" : undefined}>
          <div className="ah-chapter-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={codexImages[t.id]} alt="" loading={i < 2 ? "eager" : "lazy"} />
          </div>
          <div className="ah-chapter-copy">
            <p className="ah-label">Chapter {i + 1} of {codex.length}</p>
            <h2 id={`${t.id}-title`} className="ah-title mt-2">
              {t.label}
            </h2>
            <p className="ah-motto mt-3">{t.lead}</p>
            <p className="mt-5 leading-relaxed text-[var(--bone)]">{t.body}</p>
            <dl className="ah-rows mt-7">
              {t.facts.map((f) => (
                <div key={f.label}>
                  <dt className="ah-label">{f.label}</dt>
                  <dd className="text-[15px] leading-relaxed text-[var(--bone)]">{f.value}</dd>
                </div>
              ))}
            </dl>
            {t.id === "moonwatch" && (
              <div className="mt-7">
                <h3 className="ah-label mb-3">Ranks, lowest to highest</h3>
                <ol className="ah-ranks">
                  {ranks.shared.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ol>
                <p className="ah-label mt-5 mb-3 text-[var(--silver)]">Then Moonwake&apos;s own path</p>
                <ol className="ah-ranks ah-ranks-house">
                  {ranks.moonwake.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Concept art: mosaics of the city, its people and the Moonwatch. */}
      <div className="cg-wrap">
        {conceptGalleries.map((g) => (
          <ConceptGallery key={g.id} {...g} />
        ))}
      </div>

      <footer className="ah-wrap py-[clamp(64px,10vh,112px)]">
        <div className="flex flex-col gap-6 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="ah-label">House Maulana</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/offline" className="ah-label ah-link">
              Back to After Hours
            </Link>
            <a href="#main" className="ah-label ah-link">
              Back to top
            </a>
          </div>
        </div>
        <p className="mt-8 max-w-[90ch] text-[13px] leading-relaxed text-[var(--ash)]">
          House Maulana isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or
          anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated
          properties are trademarks or registered trademarks of Riot Games, Inc.
        </p>
      </footer>
    </main>
  );
}
