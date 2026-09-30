import { about } from "@/data/content";
import { ScrollLit } from "../ui/ScrollLit";
import { Reveal } from "../ui/Reveal";
import { Tick } from "../ui/primitives";

export function About() {
  return (
    <section id="about" data-tone="paper" className="relative py-[clamp(96px,12vw,168px)]">
      <div className="container-site flex flex-col items-center text-center">
        <p className="label flex items-center gap-3 text-fg-2">
          <Tick />
          About
          <Tick />
        </p>
        <ScrollLit
          text={about.statement}
          className="heading mt-8 max-w-[22ch] text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.05] font-normal"
        />

        <div className="mt-16 max-w-[62ch] space-y-5 text-[17px] leading-[1.55] text-fg-2 md:mt-20 md:text-[18px]">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <dl className="mt-16 grid w-full max-w-[1100px] grid-cols-2 gap-3 text-left md:mt-20 md:grid-cols-4 md:gap-4">
          {about.facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.05} className="rounded-card bg-surface p-5 md:p-6">
              <dt className="label text-fg-3">{f.label}</dt>
              <dd className="mt-6 text-[17px] leading-snug font-medium md:mt-10 md:text-[19px]">{f.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
