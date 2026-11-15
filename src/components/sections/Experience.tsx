import { experience } from "@/data/content";
import { DisclosureGroup, ExpandAll } from "../ui/Disclosure";
import { EntryCard, EntryRow } from "../ui/EntryCard";
import { SectionHeading } from "../ui/primitives";

/** "May 2026 - Jul 2026" + "Jul 2025 - Apr 2026" (newest first) → "Jul 2025 - Jul 2026". */
function span(periods: string[]) {
  const first = periods.at(-1)!.split(" - ")[0];
  const last = periods[0].split(" - ").at(-1)!;
  return first === last ? first : `${first} - ${last}`;
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-[clamp(72px,8vw,128px)]">
      <DisclosureGroup>
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="experience-title"
              title="Experience"
              lead="Operations, analytics and cloud work, newest first. Open a role to see what I shipped."
            />
            <ExpandAll className="self-start md:self-auto" />
          </div>

          <ol className="mt-10 border-t border-rule-strong md:mt-14">
            {experience.map((c, i) => (
              <EntryCard
                key={c.org}
                logo={c.logo}
                name={c.org}
                delay={i * 0.04}
                aside={
                  <>
                    <span className="block text-fg">{span(c.roles.map((r) => r.period))}</span>
                    <span className="block">
                      {c.type}, {c.total}
                    </span>
                  </>
                }
                meta={c.location}
              >
                {c.roles.map((r) => (
                  <EntryRow
                    key={r.title + r.period}
                    title={r.title}
                    subtitle={r.subtitle}
                    meta={`${r.period}, ${r.duration}`}
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
