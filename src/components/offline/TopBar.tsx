import Link from "next/link";
import { house } from "@/data/offline";
import { Crest } from "./Crest";
import { SAGA } from "./SagaPage";

/**
 * The saga top bar, shared by After Hours and the Moonwake page: section links on
 * the left, the house in the centre, the way home on the right.
 */
export function TopBar({ links, brandHref }: { links: { href: string; label: string }[]; brandHref: string }) {
  return (
    <header className="hx-nav">
      <nav aria-label="Sections" className="hx-nav-links">
        {links.map((l, i) =>
          l.href.startsWith("/") ? (
            <Link key={l.href} href={l.href} transitionTypes={SAGA} className="hx-navlink">
              {i === 0 && <span aria-hidden className="hx-navdot" />}
              {l.label}
            </Link>
          ) : (
            <a key={l.href} href={l.href} className="hx-navlink">
              {i === 0 && <span aria-hidden className="hx-navdot" />}
              {l.label}
            </a>
          ),
        )}
      </nav>
      <a href={brandHref} className="hx-nav-brand" aria-label={`${house.name}, back to the top`}>
        <Crest className="size-[18px]" />
        <span>{house.name}</span>
      </a>
      <Link href="/" transitionTypes={["world-out"]} className="hx-navlink hx-nav-home">
        Back to the portfolio
      </Link>
    </header>
  );
}

/** The city's name across the full width, one span per letter so the letters spread to the edges. */
export function Wordmark({ as: Tag = "p", id, className = "" }: { as?: "h1" | "p"; id?: string; className?: string }) {
  const letters = house.seat.split("");
  const order = [3, 0, 5, 1, 6, 2, 4, 7];
  return (
    <Tag id={id} className={`hx-mark ${className}`} aria-label={Tag === "h1" ? house.seat : undefined} aria-hidden={Tag === "p" ? true : undefined}>
      {letters.map((ch, k) => (
        <span key={k} aria-hidden style={{ animationDelay: `${order[k % 8] * 110}ms` }}>
          {ch}
        </span>
      ))}
    </Tag>
  );
}
