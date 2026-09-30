import { experience } from "@/data/content";
import { DisclosureGroup, ExpandAll } from "../ui/Disclosure";
import { EntryCard, EntryRow } from "../ui/EntryCard";
import { SectionHeader } from "../ui/primitives";

const roleCount = experience.reduce((n, c) => n + c.roles.length, 0);

export function Experience() {
  return (
    <section id="experience" className="relative py-[clamp(72px,8vw,128px)]">
      <DisclosureGroup>
        <div className="container-site">
          <SectionHeader
            title="Experience"
            count={roleCount}
            blurb="Operations, analytics and cloud work, grouped by company. Open a role to see what I shipped."
          />
          <div className="mt-6 flex justify-end">
            <ExpandAll />
          </div>

          <ol className="mt-4 space-y-3">
            {experience.map((c, i) => (
              <EntryCard
                key={c.org}
                logo={c.logo}
                name={c.org}
                rail={c.roles.length > 1}
                delay={i * 0.04}
                meta={
                  <>
                    {c.type} · {c.total}
                    <span className="hidden sm:inline"> · {c.location}</span>
                  </>
                }
              >
                {c.roles.map((r) => (
                  <EntryRow
                    key={r.title + r.period}
                    title={r.title}
                    subtitle={r.subtitle}
                    meta={`${r.period} · ${r.duration}`}
                    points={r.points}
                    tags={r.tags}
                  />
                ))}
              </EntryCard>
            ))}
          </ol>
        </div>
      </DisclosureGroup>
    </section>
  );
}
