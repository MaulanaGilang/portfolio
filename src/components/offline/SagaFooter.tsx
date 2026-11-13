import Link from "next/link";
import { accounts, house } from "@/data/offline";
import { Wyvern } from "./Wyvern";
import { SAGA } from "./SagaPage";
import { sections } from "./sections";
import { Wordmark } from "./TopBar";

/**
 * The saga ending, shared by After Hours and the Moonwake page: a last painting with
 * a framed quote, the city's name across the page, link columns with the sleeping
 * familiar, and Riot's disclaimer.
 */
export function SagaFooter({
  image,
  quote,
  by,
  base = "",
}: {
  image: string;
  quote: string;
  by: string;
  /** Prefix for links to After Hours sections: "" on /offline itself, "/offline" elsewhere. */
  base?: string;
}) {
  return (
    <footer className="hx-end">
      <div className="hx-prefoot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" loading="lazy" className="hx-bleed-img" />
        <figure className="hx-prefoot-quote">
          <blockquote className="hx-quote-text hx-quote-small">&ldquo;{quote}&rdquo;</blockquote>
          <span aria-hidden className="hx-dot-mark mx-auto mt-3" />
          <figcaption className="hx-small-white mt-3">{by}</figcaption>
        </figure>
      </div>
      <Wordmark className="hx-mark-end" />
      <div className="hx-rule hx-foot">
        <nav aria-label="After Hours" className="hx-foot-col">
          <p className="hx-small">After Hours</p>
          {sections.map((s) =>
            base ? (
              <Link key={s.id} href={`${base}#${s.id}`} transitionTypes={SAGA} className="hx-footlink">
                {s.short}
              </Link>
            ) : (
              <a key={s.id} href={`#${s.id}`} className="hx-footlink">
                {s.short}
              </a>
            ),
          )}
        </nav>
        <div className="hx-foot-col">
          <p className="hx-small">Moonwake</p>
          <Link href="/offline/moonwake" transitionTypes={SAGA} className="hx-footlink">
            The Codex
          </Link>
          <Link href="/offline/moonwake#concept" transitionTypes={SAGA} className="hx-footlink">
            Concept art
          </Link>
        </div>
        <div className="hx-foot-col">
          <p className="hx-small">House</p>
          <Link href="/" transitionTypes={["world-out"]} className="hx-footlink">
            Portfolio
          </Link>
          <a href="#" className="hx-footlink">
            Back to top
          </a>
        </div>
        <div className="hx-foot-col">
          <p className="hx-small">Social</p>
          {accounts
            .filter((a) => a.href)
            .map((a) => (
              <a key={a.service} href={a.href} target="_blank" rel="noopener noreferrer" className="hx-footlink">
                {a.service}
              </a>
            ))}
        </div>
        <div className="hx-foot-familiar">
          <p className="hx-small">The familiar, asleep</p>
          <Wyvern />
        </div>
      </div>
      <div className="hx-rule hx-foot-bar">
        <p className="hx-small">
          © {new Date().getFullYear()} {house.name}. All quiet.
        </p>
        {/* Required by Riot Games' fan content policy ("Legal Jibber Jabber"). Keep it verbatim, and keep this page free. */}
        <p className="hx-legal">
          House Maulana isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone
          officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are
          trademarks or registered trademarks of Riot Games, Inc.
        </p>
      </div>
    </footer>
  );
}
