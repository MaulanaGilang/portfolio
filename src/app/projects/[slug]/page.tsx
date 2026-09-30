import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/content";
import { Lineage } from "@/components/case/Lineage";
import { Curtain } from "@/components/Curtain";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { PillButton, Tag, Tick } from "@/components/ui/primitives";

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

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <Curtain index={0} tone="paper">
        <main id="main" data-tone="paper" className="pt-28 pb-32 md:pt-36 md:pb-44">
          <article className="container-site">
            <header className="flex flex-col items-center text-center">
              <Link href="/#projects" className="label flex items-center gap-3 text-fg-2 transition-opacity hover:opacity-60">
                <Tick />
                All projects <span className="text-fg-3">/</span> <span className="text-accent">{p.category}</span>
                <Tick />
              </Link>
              <SplitReveal as="h1" text={p.title} className="display mt-8 max-w-[14ch] text-[clamp(2.75rem,8vw,7.5rem)]" />
              <p className="mt-8 max-w-[52ch] text-[18px] leading-relaxed text-fg-2">{p.short}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {p.links.map((l, n) => (
                  <PillButton key={l.href} href={l.href} external variant={n === 0 ? "solid" : "outline"}>
                    {l.label}
                  </PillButton>
                ))}
              </div>
            </header>

            <Reveal className="relative mt-14 aspect-[4/3] overflow-hidden rounded-[var(--radius-stage)] bg-[#0b0c11] md:mt-20 md:aspect-[21/9]">
              <Image src={p.cover} alt="" fill priority sizes="100vw" className="object-cover" />
            </Reveal>

            <dl className="mx-auto mt-4 grid max-w-[1400px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {[
                { k: "Context", v: p.context },
                { k: "Year", v: p.year },
                { k: "Category", v: p.category },
                { k: "Tools", v: `${p.tools.length} technologies` },
              ].map((f) => (
                <div key={f.k} className="rounded-card bg-surface p-5">
                  <dt className="label text-fg-3">{f.k}</dt>
                  <dd className="mt-6 text-[16px] font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-20 grid gap-4 md:mt-28 md:grid-cols-12">
              <div className="space-y-4 md:col-span-8">
                <Block title="Overview">{p.overview}</Block>
                <Block title="The problem">{p.problem}</Block>
                <Reveal className="rounded-card bg-surface p-6 md:p-10">
                  <h2 className="label flex items-center gap-2 text-fg-2">
                    <Tick className="text-accent" />
                    Approach
                  </h2>
                  <ol className="mt-6 space-y-5">
                    {p.approach.map((step, n) => (
                      <li key={step.slice(0, 30)} className="grid grid-cols-[2.5rem_1fr] gap-2 border-t border-line pt-5">
                        <span className="label pt-1 text-accent">{String(n + 1).padStart(2, "0")}</span>
                        <span className="text-[17px] leading-relaxed text-fg-2">{step}</span>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>

              <aside className="md:col-span-4">
                <div className="space-y-4 md:sticky md:top-28">
                  <Reveal className="rounded-card bg-btn p-6 text-btn-fg md:p-8">
                    <h2 className="label flex items-center gap-2 opacity-70">
                      <Tick className="text-gold" />
                      Result
                    </h2>
                    <p className="heading mt-5 text-[21px] leading-snug">{p.result}</p>
                  </Reveal>
                  <div className="rounded-card bg-surface p-6 md:p-8">
                    <h2 className="label flex items-center gap-2 text-fg-2">
                      <Tick className="text-accent" />
                      Tools
                    </h2>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tools.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {p.lineage && (
              <Reveal className="mt-24 md:mt-32">
                <div className="flex flex-col items-center text-center">
                  <p className="label flex items-center gap-3 text-fg-2">
                    <Tick />
                    Data lineage
                    <Tick />
                  </p>
                  <h2 className="heading mt-5 text-[clamp(1.9rem,3.6vw,3.1rem)]">
                    Bronze <span className="text-fg-3">→</span> Silver <span className="text-fg-3">→</span>{" "}
                    <span className="mark-gold">Gold</span>
                  </h2>
                  <p className="mt-4 max-w-[60ch] text-fg-2">
                    Six source tables from CRM and ERP are loaded as-is into Bronze, cleaned one-to-one in Silver, then
                    integrated into a star schema in Gold.
                  </p>
                </div>
                <Lineage />
              </Reveal>
            )}

            {p.figures?.map((f) => (
              <Reveal key={f.src} className="mt-24 md:mt-32">
                <figure>
                  <div className="overflow-hidden rounded-[clamp(20px,3vw,40px)] bg-[#121212]">
                    <Image src={f.src} alt={f.alt} width={f.width} height={f.height} sizes="100vw" className="h-auto w-full" />
                  </div>
                  <figcaption className="label mt-4 text-center text-fg-3">{f.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </article>
        </main>
      </Curtain>

      <Curtain index={1} tone="ink" last>
        <section data-tone="ink">
          <Link
            href={`/projects/${next.slug}`}
            data-sound="click"
            className="group/next container-site flex min-h-[70dvh] flex-col items-center justify-center py-24 text-center"
          >
            <span className="label flex items-center gap-3 text-fg-2">
              <Tick />
              Next project
              <Tick />
            </span>
            <span className="display mt-8 max-w-[14ch] text-[clamp(2.75rem,9vw,8.5rem)] transition-colors duration-500 group-hover/next:text-gold">
              {next.title}
            </span>
            <span className="label mt-10 inline-flex h-12 items-center gap-2.5 rounded-full bg-btn px-6 text-[13px] text-btn-fg">
              <Tick className="text-[15px] leading-none transition-transform duration-500 group-hover/next:rotate-90" />
              View case study
            </span>
          </Link>
        </section>
      </Curtain>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="rounded-card bg-surface p-6 md:p-10">
      <h2 className="label flex items-center gap-2 text-fg-2">
        <Tick className="text-accent" />
        {title}
      </h2>
      <p className="mt-5 max-w-[62ch] text-[18px] leading-relaxed text-fg">{children}</p>
    </Reveal>
  );
}
