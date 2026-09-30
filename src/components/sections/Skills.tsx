import { ArrowUpRight, Database } from "@phosphor-icons/react/dist/ssr";
import { certifications, skills } from "@/data/content";
import { EntryCard, EntryRow } from "../ui/EntryCard";
import { SectionHeader } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const certCount = certifications.reduce((n, g) => n + g.items.length, 0);

export function Skills() {
  return (
    <section id="skills" className="relative py-[clamp(72px,8vw,128px)]">
      <div className="container-site">
        <SectionHeader title="Skills" blurb="The stack I use to move data from source to warehouse to dashboard." />

        <div className="mt-8 md:mt-10">
          {skills.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.04} className="grid gap-3 border-t border-line py-5 md:grid-cols-12 md:gap-6">
              <h3 className="label pt-2.5 text-fg md:col-span-3">{g.group}</h3>
              <ul className="flex flex-wrap gap-2 md:col-span-9">
                {g.items.map((s) => (
                  <li
                    key={s.name}
                    className="group/skill inline-flex h-10 items-center gap-2.5 rounded-full bg-surface pr-4 pl-1.5 shadow-[var(--shadow-whisper)]"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-haze text-fg transition-colors duration-300 group-hover/skill:bg-accent-solid group-hover/skill:text-on-accent">
                      {s.icon ? (
                        <span
                          aria-hidden
                          className="logo-mask size-3.5"
                          style={{ maskImage: `url(/skills/${s.icon}.svg)`, WebkitMaskImage: `url(/skills/${s.icon}.svg)` }}
                        />
                      ) : (
                        <Database aria-hidden size={14} weight="bold" />
                      )}
                    </span>
                    <span className="text-[14px]">{s.name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div id="certifications" className="mt-[clamp(72px,8vw,128px)] scroll-mt-24">
          <SectionHeader
            title="Certifications"
            count={certCount}
            blurb="Grouped by issuer. Open a certificate for its credential ID, skills and link."
          />

          <ol className="mt-8 columns-1 gap-3 md:mt-10 lg:columns-2">
            {certifications.map((g, gi) => (
              <EntryCard
                key={g.issuer}
                logo={g.logo}
                name={g.issuer}
                delay={gi * 0.04}
                meta={`${g.items.length} ${g.items.length === 1 ? "certificate" : "certificates"}`}
                className="mb-3 break-inside-avoid"
              >
                {g.items.map((c) => (
                  <EntryRow key={c.name + (c.credentialId ?? "")} title={c.name} meta={`Issued ${c.date}`} tags={c.skills}>
                    {c.credentialId && (
                      <p className="text-sm text-fg-2">
                        <span className="block label text-fg-3">Credential ID</span>
                        <span className="font-mono break-all">{c.credentialId}</span>
                      </p>
                    )}
                    {c.href && (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-sound="click"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
                      >
                        Show credential <ArrowUpRight size={14} weight="bold" />
                      </a>
                    )}
                  </EntryRow>
                ))}
              </EntryCard>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
