import { Database } from "@phosphor-icons/react/dist/ssr";
import { certifications, skills } from "@/data/content";
import { Disclosure } from "../ui/Disclosure";
import { LogoTile, SectionTitle, Tag, Tick } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const certCount = certifications.reduce((n, g) => n + g.items.length, 0);

export function Skills() {
  return (
    <section id="skills" data-tone="paper" className="py-[clamp(96px,12vw,168px)]">
      <div className="container-site">
        <SectionTitle label="Skills" title="Tools I build with" />

        <div className="mx-auto mt-14 grid max-w-[1200px] gap-3 md:mt-20 md:grid-cols-2 md:gap-4">
          {skills.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.05} className="rounded-card bg-surface p-5 md:p-7">
              <h3 className="label flex items-center gap-2 text-fg-2">
                <Tick className="text-accent" />
                {g.group}
              </h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s.name}
                    className="group/skill inline-flex h-11 items-center gap-2.5 rounded-full bg-bg pr-4 pl-1.5 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-surface text-fg transition-colors duration-300 group-hover/skill:bg-btn group-hover/skill:text-btn-fg">
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

        <div id="certifications" className="mt-[clamp(96px,12vw,168px)] scroll-mt-24">
          <SectionTitle label="Certifications" count={certCount} title="Credentials" />

          <div className="mx-auto mt-14 max-w-[1200px] columns-1 gap-4 md:mt-20 lg:columns-2">
            {certifications.map((g, gi) => (
              <Reveal as="article" key={g.issuer} delay={gi * 0.05} className="mb-4 break-inside-avoid rounded-card bg-surface p-5 md:p-7">
                <header className="flex items-center gap-4">
                  <LogoTile src={g.logo} alt={`${g.issuer} logo`} size={48} />
                  <div>
                    <h3 className="heading text-[22px]">{g.issuer}</h3>
                    <p className="label mt-1 text-fg-3">
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
                          <span className="flex flex-col gap-1.5">
                            <span className="text-[17px] font-medium">{c.name}</span>
                            <span className="label text-fg-3">Issued {c.date}</span>
                          </span>
                        }
                      >
                        <div className="space-y-4 pr-12 pb-5">
                          {c.credentialId && (
                            <p className="text-[14px] text-fg-2">
                              <span className="label block text-fg-3">Credential ID</span>
                              <span className="mt-1 block break-all tabular-nums">{c.credentialId}</span>
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
                              className="label inline-flex items-center gap-2 text-accent underline-offset-4 hover:underline"
                            >
                              <Tick />
                              Show credential
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
