import { ArrowUpRight, Database } from "@phosphor-icons/react/dist/ssr";
import { certifications, skills } from "@/data/content";
import { Disclosure } from "../ui/Disclosure";
import { LogoTile, SectionTitle, Tag } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const certCount = certifications.reduce((n, g) => n + g.items.length, 0);

export function Skills() {
  return (
    <section id="skills" data-tone="paper" className="py-[clamp(96px,12vw,180px)]">
      <div className="container-site">
        <SectionTitle title="Skills" />

        <div className="mt-12 md:mt-16">
          {skills.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.05} className="grid gap-4 border-t border-line py-6 md:grid-cols-12 md:gap-6 md:py-8">
              <h3 className="text-lg font-medium tracking-tight md:col-span-3">{g.group}</h3>
              <ul className="flex flex-wrap gap-2 md:col-span-9">
                {g.items.map((s) => (
                  <li
                    key={s.name}
                    className="group/skill inline-flex h-12 items-center gap-3 rounded-full border border-line bg-bg pr-5 pl-2 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-fg"
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-surface text-fg transition-colors duration-300 group-hover/skill:bg-accent-solid group-hover/skill:text-on-accent">
                      {s.icon ? (
                        <span
                          aria-hidden
                          className="logo-mask size-4"
                          style={{ maskImage: `url(/skills/${s.icon}.svg)`, WebkitMaskImage: `url(/skills/${s.icon}.svg)` }}
                        />
                      ) : (
                        <Database aria-hidden size={16} weight="bold" />
                      )}
                    </span>
                    <span className="text-[15px] font-medium">{s.name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div id="certifications" className="mt-[clamp(80px,10vw,140px)] scroll-mt-24">
          <SectionTitle title="Certifications" count={certCount} />

          <div className="mt-12 columns-1 gap-6 md:mt-16 lg:columns-2">
            {certifications.map((g, gi) => (
              <Reveal
                as="article"
                key={g.issuer}
                delay={gi * 0.05}
                className="mb-6 break-inside-avoid rounded-card border border-line p-5 md:p-7"
              >
                <header className="flex items-center gap-4">
                  <LogoTile src={g.logo} alt={`${g.issuer} logo`} size={48} />
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{g.issuer}</h3>
                    <p className="font-mono text-xs text-fg-3">
                      {g.items.length} {g.items.length === 1 ? "certificate" : "certificates"}
                    </p>
                  </div>
                </header>

                <ul className="mt-5 divide-y divide-line border-t border-line">
                  {g.items.map((c) => (
                    <li key={c.name + (c.credentialId ?? "")}>
                      <Disclosure
                        buttonClassName="py-4"
                        summary={
                          <span className="flex flex-col gap-1">
                            <span className="text-[17px] font-medium tracking-tight">{c.name}</span>
                            <span className="font-mono text-xs text-fg-3">Issued {c.date}</span>
                          </span>
                        }
                      >
                        <div className="space-y-4 pb-5 pr-12">
                          {c.credentialId && (
                            <p className="text-sm text-fg-2">
                              <span className="block font-mono text-xs text-fg-3">Credential ID</span>
                              <span className="font-mono break-all">{c.credentialId}</span>
                            </p>
                          )}
                          {c.skills && (
                            <div className="flex flex-wrap gap-2">
                              {c.skills.map((s) => (
                                <Tag key={s}>{s}</Tag>
                              ))}
                            </div>
                          )}
                          {c.href && (
                            <a
                              href={c.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-sound="click"
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
                            >
                              Show credential <ArrowUpRight size={14} weight="bold" />
                            </a>
                          )}
                        </div>
                      </Disclosure>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
