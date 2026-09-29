import { education } from "@/data/content";
import { Disclosure, DisclosureGroup } from "../ui/Disclosure";
import { LogoTile, SectionTitle } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

export function Education() {
  return (
    <section id="education" data-tone="paper" className="pb-[clamp(96px,12vw,180px)]">
      <div className="container-site">
        <SectionTitle title="Education" count={education.length} />

        <DisclosureGroup>
          <ol className="mt-12 border-b border-line md:mt-16">
            {education.map((e, i) => (
              <Reveal as="li" key={e.school} delay={i * 0.06} className="border-t border-line">
                <Disclosure
                  buttonClassName="py-6 md:py-8"
                  summary={
                    <span className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 md:grid-cols-12 md:gap-x-6">
                      <LogoTile src={e.logo} alt={`${e.school} logo`} size={56} className="row-span-2 md:col-span-1 md:row-span-1" />
                      <span className="min-w-0 md:col-span-7">
                        <span className="block text-[clamp(1.25rem,2.6vw,2.25rem)] font-medium leading-tight tracking-tight">
                          {e.program}
                        </span>
                        <span className="mt-1 block text-fg-2">{e.school}</span>
                      </span>
                      <span className="font-mono text-xs text-fg-3 md:col-span-4 md:text-right">{e.period}</span>
                    </span>
                  }
                >
                  <ul className="grid gap-3 pb-8 text-[15px] leading-relaxed text-fg-2 md:ml-[calc(100%/12)] md:grid-cols-2 md:gap-8 md:pl-6 md:pr-16">
                    {e.points.map((p) => (
                      <li key={p.slice(0, 32)} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
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
