import { about } from "@/data/content";
import { Reveal } from "../ui/Reveal";
import { SplitReveal } from "../ui/SplitReveal";
import { AerialBand } from "./AerialBand";

/** Words wrapped in *asterisks* render in spice. */
function Accent({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") ? (
          <span key={i} className="text-accent">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

// The thesis the hero just acted out, then the story and the facts beside it.
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative -mt-px pb-[clamp(88px,11vw,176px)]">
      <AerialBand>
        <h2 id="about-title" className="text-[clamp(2.6rem,6.6vw,6rem)] leading-[0.98] font-medium tracking-[-0.04em]">
          <span className="sr-only">{about.headline.join(" ")}</span>
          <span aria-hidden>
            <SplitReveal as="span" text={about.headline[0]} className="block" />
            <SplitReveal as="span" text={about.headline[1]} className="block pl-[1.4em] text-teal-ink" delay={0.12} />
          </span>
        </h2>
      </AerialBand>

      <div className="container-site">
        <div className="mt-[clamp(40px,5vw,80px)] grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <p className="max-w-[30ch] text-[clamp(1.4rem,2.1vw,2rem)] leading-[1.25] tracking-[-0.02em]">
              <Accent text={about.statement} />
            </p>
            <div className="mt-8 space-y-4 text-[16px] leading-relaxed text-fg-2">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-[64ch]">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="md:col-span-4 md:col-start-9" delay={0.08}>
            <dl>
              {about.facts.map((f) => (
                <div key={f.label} className="border-t border-line pt-3 pb-6">
                  <dt className="label text-fg-3">{f.label}</dt>
                  <dd className="mt-1.5 text-[18px] leading-snug">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
