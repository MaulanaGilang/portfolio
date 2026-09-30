import { education } from "@/data/content";
import { Disclosure, DisclosureGroup } from "../ui/Disclosure";
import { LogoTile, SectionTitle } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

export function Education() {
  return (
    <section id="education" data-tone="paper" className="pt-[clamp(48px,6vw,96px)] pb-[clamp(96px,12vw,168px)]">
      <div className="container-site">
        <SectionTitle label="Education" count={education.length} title="Where I learned" />

        <DisclosureGroup>
          <ol className="mx-auto mt-14 grid max-w-[1200px] items-start gap-3 md:mt-20 md:grid-cols-3 md:gap-4">
            {education.map((e, i) => (
              <Reveal as="li" key={e.school} delay={i * 0.06} className="rounded-card bg-surface">
                <Disclosure
                  buttonClassName="p-5 md:p-6"
                  summary={
                    <span className="flex flex-col">
                      <span className="flex items-center justify-between gap-3">
                        <LogoTile src={e.logo} alt={`${e.school} logo`} size={52} />
                        <span className="label text-fg-3">{e.period}</span>
                      </span>
                      <span className="heading mt-8 block text-[clamp(1.35rem,2vw,1.65rem)]">{e.program}</span>
                      <span className="mt-2 block text-[15px] text-fg-3">{e.school}</span>
                    </span>
                  }
                >
                  <ul className="space-y-3 px-5 pb-6 text-[15px] leading-relaxed text-fg-2 md:px-6">
                    {e.points.map((p) => (
                      <li key={p.slice(0, 32)} className="flex gap-3">
                        <span aria-hidden className="mt-[0.1em] shrink-0 text-accent">+</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Disclosure>
              </Reveal>
            ))}
          </ol>
        </DisclosureGroup>
      </div>
    </section>
  );
}
