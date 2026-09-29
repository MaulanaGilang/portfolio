import { experience } from "@/data/content";
import { Disclosure, DisclosureGroup, ExpandAll } from "../ui/Disclosure";
import { LogoTile, SectionTitle, Tag } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const roleCount = experience.reduce((n, c) => n + c.roles.length, 0);

export function Experience() {
  return (
    <section id="experience" data-tone="paper" className="py-[clamp(96px,12vw,180px)]">
      <DisclosureGroup>
        <div className="container-site">
          <SectionTitle title="Experience" count={roleCount} />
        </div>
        <div className="container-site mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="max-w-[34ch] text-fg-2">
                Operations, analytics and cloud work, grouped by company. Open a role to see what I shipped.
              </p>
              <ExpandAll className="mt-6" />
            </div>
          </div>

          <ol className="lg:col-span-9">
            {experience.map((c) => (
              <Reveal as="li" key={c.org} className="border-t border-line py-8 first:border-t-0 first:pt-0 lg:first:pt-2">
                <div className="flex gap-4 md:gap-6">
                  {/* Logo rail: one logo per company with a connector through its roles (LinkedIn-style). */}
                  <div className="flex flex-col items-center">
                    <LogoTile src={c.logo} alt={`${c.org} logo`} size={52} />
                    {c.roles.length > 1 && <span aria-hidden className="mt-3 w-px flex-1 bg-line" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <header className="min-h-[52px]">
                      <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{c.org}</h3>
                      <p className="mt-1 font-mono text-xs text-fg-3">
                        {c.type} · {c.total}
                        <span className="hidden sm:inline"> · {c.location}</span>
                      </p>
                    </header>

                    <ul className="mt-5 space-y-2">
                      {c.roles.map((r) => (
                        <li key={r.title + r.period} className="relative">
                          {c.roles.length > 1 && (
                            <span
                              aria-hidden
                              className="absolute top-[26px] -left-[calc(26px+1rem)] size-[9px] -translate-x-1/2 rounded-full border-2 border-bg bg-fg-3 md:-left-[calc(26px+1.5rem)]"
                            />
                          )}
                          <Disclosure
                            className="rounded-card transition-colors hover:bg-surface/60 data-[open]:bg-surface"
                            buttonClassName="p-4 md:p-5"
                            summary={
                              <span className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                                <span>
                                  <span className="block text-lg font-medium tracking-tight md:text-xl">{r.title}</span>
                                  {r.subtitle && <span className="block text-sm text-fg-2">{r.subtitle}</span>}
                                </span>
                                <span className="shrink-0 font-mono text-xs text-fg-3">
                                  {r.period} · {r.duration}
                                </span>
                              </span>
                            }
                          >
                            <div className="px-4 pb-5 md:px-5 md:pr-16">
                              <ul className="space-y-3 text-[15px] leading-relaxed text-fg-2">
                                {r.points.map((p) => (
                                  <li key={p.slice(0, 32)} className="flex gap-3">
                                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>
                              {r.tags && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                  {r.tags.map((t) => (
                                    <Tag key={t}>{t}</Tag>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Disclosure>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </DisclosureGroup>
    </section>
  );
}
