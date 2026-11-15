"use client";

import { cn } from "@/lib/utils";
import { Disclosure } from "./Disclosure";
import { LogoTile, Tag } from "./primitives";
import { Reveal } from "./Reveal";

/**
 * Shared ledger anatomy for Experience, Education and Certifications: one
 * hairline row per organisation, an optional date column on the left, the
 * organisation with its logo, then collapsible rows (title left, dates right,
 * a round toggle). No boxes: rows are separated by hairlines only.
 */
export function EntryCard({
  logo,
  name,
  meta,
  aside,
  delay = 0,
  className,
  children,
}: {
  logo: string;
  name: string;
  meta: React.ReactNode;
  /** Left column (dates). Omit for the compact single-column form. */
  aside?: React.ReactNode;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="li" delay={delay} className={cn("border-b border-line py-7 md:py-9", aside && "md:grid md:grid-cols-12 md:gap-8", className)}>
      {aside && <div className="mb-4 label text-fg-3 md:col-span-3 md:mb-0 md:pt-3">{aside}</div>}
      <div className={cn(aside && "md:col-span-9")}>
        <header className="flex items-center gap-4">
          <LogoTile src={logo} alt={`${name} logo`} size={44} />
          <div className="min-w-0">
            <h3 className="text-[clamp(1.25rem,1.7vw,1.6rem)] leading-tight font-medium tracking-[-0.02em]">{name}</h3>
            <p className="mt-0.5 label text-fg-3">{meta}</p>
          </div>
        </header>
        <ul className="mt-3">{children}</ul>
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
  return (
    <li className="border-t border-line first:border-t-0">
      <Disclosure
        buttonClassName="py-4"
        summary={
          <span className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
            <span>
              <span className="block text-[17px] leading-snug font-medium">{title}</span>
              {subtitle && <span className="block text-[15px] text-fg-2">{subtitle}</span>}
            </span>
            {meta && <span className="shrink-0 label text-fg-3">{meta}</span>}
          </span>
        }
      >
        <div className="pb-6 md:pr-14">
          {points && (
            <ul className="space-y-2.5 text-[16px] leading-relaxed text-fg-2">
              {points.map((p) => (
                <li key={p.slice(0, 32)} className="flex max-w-[70ch] gap-3">
                  <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent-solid" />
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
