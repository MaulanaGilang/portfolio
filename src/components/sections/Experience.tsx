import { experience } from "@/data/content";
import { Disclosure, DisclosureGroup, ExpandAll } from "../ui/Disclosure";
import { LogoTile, SectionTitle, Tag } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const roleCount = experience.reduce((n, c) => n + c.roles.length, 0);

export function Experience() {
  return (
    <section id="experience" data-tone="paper" className="pt-[clamp(96px,12vw,168px)] pb-[clamp(72px,8vw,120px)]">
      <DisclosureGroup>
        <div className="container-site">
          <SectionTitle label="Experience" count={roleCount} title="Where I've worked" />

          <div className="mx-auto mt-14 max-w-[1040px] md:mt-20">
            <div className="mb-4 flex items-center justify-between gap-4 px-1">
              <p className="text-[15px] text-fg-3">Grouped by company. Open a role to see what I shipped.</p>
              <ExpandAll />
            </div>

            <ol className="space-y-3 md:space-y-4">
              {experience.map((c) => (
                <Reveal as="li" key={c.org} className="rounded-card bg-surface p-4 sm:p-6 md:p-8">
                  <div className="flex gap-4 md:gap-6">
                    {/* Logo rail: one logo per company with a connector through its roles (LinkedIn-style). */}
                    <div className="flex flex-col items-center">
                      <LogoTile src={c.logo} alt={`${c.org} logo`} size={52} />
                      {c.roles.length > 1 && <span aria-hidden className="mt-3 w-px flex-1 bg-line" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <header className="min-h-[52px]">
                        <h3 className="heading text-[clamp(1.35rem,2.2vw,1.75rem)]">{c.org}</h3>
                        <p className="label mt-2 text-fg-3">
                          {c.type} · {c.total}
                          <span className="hidden sm:inline"> · {c.location}</span>
                        </p>
                      </header>

                      <ul className="mt-4 space-y-1">
                        {c.roles.map((r) => (
                          <li key={r.title + r.period} className="relative">
                            {c.roles.length > 1 && (
                              <span
                                aria-hidden
                                className="absolute top-[26px] -left-[calc(26px+1rem)] size-[9px] -translate-x-1/2 rounded-full border-2 border-surface bg-fg-3 md:-left-[calc(26px+1.5rem)]"
                              />
                            )}
                            <Disclosure
                              className="rounded-[12px] transition-colors hover:bg-bg data-[open]:bg-bg"
                              buttonClassName="p-4"
                              summary={
                                <span className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between md:gap-6">
                                  <span>
                                    <span className="heading block text-[17px] md:text-[19px]">{r.title}</span>
                                    {r.subtitle && <span className="mt-0.5 block text-[14px] text-fg-3">{r.subtitle}</span>}
                                  </span>
                                  <span className="label shrink-0 text-fg-3">
                                    {r.period} · {r.duration}
                                  </span>
                                </span>
                              }
                            >
                              <div className="px-4 pb-5 md:pr-16">
                                <ul className="space-y-3 text-[15px] leading-relaxed text-fg-2">
                                  {r.points.map((p) => (
                                    <li key={p.slice(0, 32)} className="flex gap-3">
                                      <span aria-hidden className="mt-[0.1em] shrink-0 text-accent">+</span>
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
        </div>
      </DisclosureGroup>
    </section>
  );
}
