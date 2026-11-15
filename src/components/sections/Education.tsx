import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { certifications, education } from "@/data/content";
import { DisclosureGroup } from "../ui/Disclosure";
import { EntryCard, EntryRow } from "../ui/EntryCard";

const certCount = certifications.reduce((n, g) => n + g.items.length, 0);

/** Two ledgers side by side: where I studied, and what I've certified since. */
export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-[clamp(72px,8vw,128px)]">
      <div className="container-site grid gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 id="education-title" className="heading text-[clamp(1.75rem,3.4vw,3.4rem)]">
            Education
          </h2>
          <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-fg-2">
            A computer engineering degree, a cloud apprenticeship and a data analytics program.
          </p>
          <DisclosureGroup>
            <ol className="mt-10 border-t border-rule-strong">
              {education.map((e, i) => (
                <EntryCard key={e.school} logo={e.logo} name={e.school} meta={e.period} delay={i * 0.04}>
                  <EntryRow title={e.program} points={e.points} />
                </EntryCard>
              ))}
            </ol>
          </DisclosureGroup>
        </div>

        <div id="certifications" className="scroll-mt-24">
          <h2 className="heading text-[clamp(1.75rem,3.4vw,3.4rem)]">Certificates</h2>
          <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-fg-2">
            {certCount} certificates, grouped by issuer. Open one for its credential ID and link.
          </p>
          <DisclosureGroup>
            <ol className="mt-10 border-t border-rule-strong">
              {certifications.map((g, gi) => (
                <EntryCard
                  key={g.issuer}
                  logo={g.logo}
                  name={g.issuer}
                  delay={gi * 0.04}
                  meta={`${g.items.length} ${g.items.length === 1 ? "certificate" : "certificates"}`}
                >
                  {g.items.map((c) => (
                    <EntryRow key={c.name + (c.credentialId ?? "")} title={c.name} meta={`Issued ${c.date}`} tags={c.skills}>
                      {c.credentialId && (
                        <p className="text-[15px] text-fg-2">
                          <span className="block label text-fg-3">Credential ID</span>
                          <span className="font-mono text-[14px] break-all">{c.credentialId}</span>
                        </p>
                      )}
                      {c.href && (
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-sound="click"
                          className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-medium text-accent underline decoration-accent/40 hover:decoration-accent"
                        >
                          Show credential <ArrowUpRight size={14} weight="bold" />
                        </a>
                      )}
                    </EntryRow>
                  ))}
                </EntryCard>
              ))}
            </ol>
          </DisclosureGroup>
        </div>
      </div>
    </section>
  );
}
