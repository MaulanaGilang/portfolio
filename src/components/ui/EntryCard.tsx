"use client";

import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { Disclosure } from "./Disclosure";
import { LogoTile, Tag } from "./primitives";
import { Reveal } from "./Reveal";

// Rows from the same organisation hang off one rail, each with its own dot.
const RailCtx = createContext(false);

/**
 * Shared anatomy for Experience, Education and Certifications, so all three
 * read at the same proportions: white card, 44px logo, name + meta header,
 * then collapsible rows (title left, meta right, "+" toggle). Cards separate
 * organisations, so rows inside a card carry no divider lines.
 */
export function EntryCard({
  logo,
  name,
  meta,
  rail = false,
  delay = 0,
  className,
  children,
}: {
  logo: string;
  name: string;
  meta: React.ReactNode;
  /** LinkedIn-style connector through several rows from the same organisation. */
  rail?: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="li" delay={delay} className={cn("rounded-card bg-surface p-5 shadow-[var(--shadow-whisper)] md:p-6", className)}>
      <div className="flex gap-4">
        <div className="shrink-0">
          <LogoTile src={logo} alt={`${name} logo`} size={44} />
        </div>
        <div className="min-w-0 flex-1">
          <header className="flex min-h-[44px] flex-col justify-center">
            <h3 className="text-[19px] leading-tight md:text-[21px]">{name}</h3>
            <p className="mt-0.5 label text-fg-3">{meta}</p>
          </header>
          {/* The last row's bottom padding would double the card's; pull it back so top and bottom match. */}
          <ul className="mt-1 -mb-4">
            <RailCtx.Provider value={rail}>{children}</RailCtx.Provider>
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export function EntryRow({
  title,
  subtitle,
  meta,
  points,
  tags,
  children,
}: {
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;
  points?: string[];
  tags?: string[];
  children?: React.ReactNode;
}) {
  const rail = useContext(RailCtx);
  return (
    <li className="relative">
      {rail && (
        <>
          {/* Rail segment: starts just below the logo (never over it), stops at the dot on the last row. */}
          <span
            aria-hidden
            className="absolute top-0 bottom-0 -left-[38.5px] w-px bg-line [li:first-child>&]:top-1 [li:last-child>&]:bottom-auto [li:last-child>&]:h-7"
          />
          <span aria-hidden className="absolute top-[24px] -left-[42px] size-2 rounded-full bg-fg-3 ring-4 ring-surface" />
        </>
      )}
      <Disclosure
        buttonClassName="py-4"
        summary={
          <span className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
            <span>
              <span className="block text-[17px] leading-snug">{title}</span>
              {subtitle && <span className="block text-sm text-fg-2">{subtitle}</span>}
            </span>
            {meta && <span className="shrink-0 label text-fg-3 tabular-nums">{meta}</span>}
          </span>
        }
      >
        <div className="pb-5 md:pr-14">
          {points && (
            <ul className="space-y-2.5 text-[15px] leading-relaxed text-fg-2">
              {points.map((p) => (
                <li key={p.slice(0, 32)} className="flex gap-3">
                  {/* A glyph, not a 1px box: hairlines at fractional offsets render at uneven weight and tint. */}
                  <span aria-hidden className="shrink-0 text-accent select-none">
                    —
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}
          {children}
          {tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </div>
      </Disclosure>
    </li>
  );
}
