import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { projects } from "@/data/content";
import { Lineage } from "@/components/case/Lineage";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { PillButton } from "@/components/ui/primitives";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.short,
    openGraph: { title: p.title, description: p.short, images: [{ url: p.cover }] },
  };
}

const directional = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      <main id="main" className="relative pt-[clamp(84px,10vh,104px)]">
        {/* First screen, Lusion project-page format: story on the left, the cover on the right. */}
        <section className="container-site grid min-h-[calc(100dvh-clamp(84px,10vh,104px))] items-center gap-10 pb-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Link
              href="/#projects"
              transitionTypes={["nav-back"]}
              data-sound="click"
              className="inline-flex h-11 items-center gap-2.5 rounded-full bg-surface px-5 text-sm font-medium tracking-normal uppercase shadow-[var(--shadow-whisper)]"
            >
              <ArrowLeft size={16} weight="bold" /> Back
            </Link>

            <p className="mt-8 label text-accent">
              {p.category} <span className="mx-1.5 text-fg">•</span>
              <span className="text-fg">{p.year}</span>
            </p>
            <SplitReveal as="h1" text={p.title} className="mt-3 display text-[clamp(2.6rem,4.6vw,5.5rem)]" />
            <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-fg-2">{p.overview}</p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <h2 className="label text-accent">Tools</h2>
                <ul className="mt-2 space-y-1 text-[15px]">
                  {p.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="label text-accent">Context</h2>
                <p className="mt-2 text-[15px]">{p.context}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {p.links.map((l, n) => (
                <PillButton key={l.href} href={l.href} external variant={n === 0 ? "dark" : "light"}>
                  {l.label}
                </PillButton>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            <ViewTransition name={`cover-${p.slug}`} share="morph" default="none">
              <div className="relative aspect-[4/3] max-h-[74dvh] w-full overflow-hidden rounded-frame bg-haze">
                <Image src={p.cover} alt="" fill priority sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
              </div>
            </ViewTransition>
          </div>
        </section>

        {/* Details: compact, two columns. */}
        <section className="container-site grid gap-10 py-[clamp(56px,6vw,96px)] md:grid-cols-12 md:gap-12">
          <div className="space-y-10 md:col-span-7">
            <Reveal>
              <h2 className="label text-accent">The problem</h2>
              <p className="mt-3 max-w-[62ch] text-[clamp(1.1rem,1.4vw,1.35rem)] leading-snug">{p.problem}</p>
            </Reveal>
            <Reveal>
              <h2 className="label text-accent">Approach</h2>
              <ol className="mt-4 divide-y divide-line border-y border-line">
                {p.approach.map((step, n) => (
                  <li key={step.slice(0, 30)} className="grid grid-cols-[2.5rem_1fr] gap-2 py-4">
                    <span className="label pt-1 text-fg-3 tabular-nums">{String(n + 1).padStart(2, "0")}</span>
                    <span className="text-[16px] leading-relaxed text-fg-2">{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <aside className="md:col-span-5">
            <Reveal className="rounded-card bg-surface p-6 shadow-[var(--shadow-whisper)] md:sticky md:top-28 md:p-7">
              <h2 className="label text-accent">Result</h2>
              <p className="mt-3 text-[clamp(1.15rem,1.5vw,1.4rem)] leading-snug">{p.result}</p>
            </Reveal>
          </aside>
        </section>

        {p.lineage && (
          <Reveal className="container-site pb-[clamp(56px,6vw,96px)]">
            <h2 className="label text-accent">Data lineage</h2>
            <p className="mt-3 max-w-[60ch] text-fg-2">
              Six source tables from CRM and ERP are loaded as-is into Bronze, cleaned one-to-one in Silver, then
              integrated into a star schema in Gold.
            </p>
            <Lineage />
          </Reveal>
        )}

        {p.figures?.map((f) => (
          <Reveal key={f.src} className="container-site pb-[clamp(56px,6vw,96px)]">
            <figure>
              <div className="overflow-hidden rounded-card bg-[#121212]">
                <Image src={f.src} alt={f.alt} width={f.width} height={f.height} sizes="100vw" className="h-auto w-full" />
              </div>
              <figcaption className="mt-3 label text-fg-3">{f.caption}</figcaption>
            </figure>
          </Reveal>
        ))}

        {/* Next project: a dark rounded card, like the home page's closing card. */}
        <section data-tone="ink" className="mt-[clamp(24px,4vw,64px)]">
          <Link
            href={`/projects/${next.slug}`}
            transitionTypes={["nav-forward"]}
            data-sound="click"
            className="group/next container-site flex min-h-[46dvh] flex-col justify-center py-20"
          >
            <span className="label text-fg-3">Next project</span>
            <span className="mt-4 flex items-end justify-between gap-6">
              <span className="display text-[clamp(2.6rem,6.5vw,7rem)] transition-colors duration-500 group-hover/next:text-accent">
                {next.title}
              </span>
              <ArrowRight
                size={64}
                className="mb-[0.15em] size-[clamp(2rem,5vw,4rem)] shrink-0 transition-transform duration-500 group-hover/next:translate-x-3"
              />
            </span>
          </Link>
        </section>
      </main>
    </ViewTransition>
  );
}
