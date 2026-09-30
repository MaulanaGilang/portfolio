import { education } from "@/data/content";
import { DisclosureGroup } from "../ui/Disclosure";
import { EntryCard, EntryRow } from "../ui/EntryCard";
import { SectionHeader } from "../ui/primitives";

export function Education() {
  return (
    <section id="education" className="relative py-[clamp(56px,6vw,96px)]">
      <div className="container-site">
        <SectionHeader
          title="Education"
          count={education.length}
          blurb="A computer engineering degree, a cloud apprenticeship and a data analytics bootcamp."
        />

        <DisclosureGroup>
          <ol className="mt-8 space-y-3 md:mt-10">
            {education.map((e, i) => (
              <EntryCard key={e.school} logo={e.logo} name={e.school} meta={e.period} delay={i * 0.04}>
                <EntryRow title={e.program} points={e.points} />
              </EntryCard>
            ))}
          </ol>
        </DisclosureGroup>
      </div>
    </section>
  );
}
