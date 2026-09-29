import { about } from "@/data/content";
import { ScrollLit } from "../ui/ScrollLit";
import { SectionTitle } from "../ui/primitives";

export function About() {
  return (
    <section id="about" data-tone="ink" className="relative py-[clamp(96px,14vw,200px)]">
      <div className="container-site">
        <SectionTitle title="About" />
        <ScrollLit
          text={about.statement}
          className="mt-10 max-w-[22ch] display text-[clamp(2rem,5.2vw,4.75rem)] leading-[1.02] md:mt-16"
        />

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12">
          <div className="space-y-5 text-[17px] leading-relaxed text-fg-2 md:col-span-6 md:col-start-1">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-[60ch]">
                {p}
              </p>
            ))}
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 self-start md:col-span-5 md:col-start-8">
            {about.facts.map((f) => (
              <div key={f.label} className="border-t border-line pt-4">
                <dt className="font-mono text-xs text-fg-3">{f.label}</dt>
                <dd className="mt-2 text-[15px] font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
