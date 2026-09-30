import { about, profile } from "@/data/content";
import { DitherCanvas } from "../dither/DitherCanvas";
import { PillButton } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { SplitReveal } from "../ui/SplitReveal";

/** Words wrapped in *asterisks* render in the accent colour. */
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

// Sized to fit one screen: headline, then the fact card and copy side by side.
export function About() {
  return (
    <section id="about" className="relative py-[clamp(72px,8vw,128px)]">
      <div className="container-site">
        {/* Headline row: the dotted prism fills the open space to the right of the headline. */}
        <div className="relative">
          <h2 className="display text-[clamp(2.6rem,5.4vw,6.5rem)]">
            <span className="sr-only">{about.headline.join(" ")}</span>
            <span aria-hidden className="inline-block">
              <SplitReveal as="span" text={about.headline[0]} className="block pl-[1.6em]" />
              <SplitReveal as="span" text={about.headline[1]} className="block" delay={0.12} />
            </span>
          </h2>
          <DitherCanvas
            scene="prism"
            tone="light"
            offset={["start 0.95", "end 0.35"]}
            className="mt-6 h-44 md:absolute md:-top-[45%] md:-bottom-[22%] md:right-0 md:left-[46%] md:mt-0 md:h-auto"
          />
        </div>

        <div className="mt-[clamp(32px,4.5vw,64px)] grid gap-8 md:grid-cols-12 md:gap-8">
          {/* Fact card: the white "object" on the canvas, where Lusion places an image. */}
          <Reveal
            className="order-2 self-start rounded-card bg-surface p-6 shadow-[var(--shadow-whisper)] md:order-1 md:col-span-5 md:p-7"
          >
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
              {about.facts.map((f) => (
                <div key={f.label}>
                  <dt className="label text-fg-3">{f.label}</dt>
                  <dd className="mt-1.5 text-[16px] leading-snug">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="order-1 md:order-2 md:col-span-7 md:pl-[4%]" delay={0.08}>
            <p className="text-[clamp(1.15rem,1.55vw,1.5rem)] leading-[1.3]">
              <Accent text={about.statement} />
            </p>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-fg-2">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-[66ch]">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-6">
              <PillButton href={profile.resume} external variant="light">
                Download résumé
              </PillButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
