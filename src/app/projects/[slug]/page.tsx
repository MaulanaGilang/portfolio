import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { projects } from "@/data/content";
import { Lineage } from "@/components/case/Lineage";
import { Curtain } from "@/components/Curtain";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Tag } from "@/components/ui/primitives";

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
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-fg-3 transition-colors hover:text-fg"
          >
            <ArrowLeft size={14} weight="bold" /> All projects
          </Link>

          <header className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="font-mono text-xs text-accent">{p.category}</p>
              <SplitReveal as="h1" text={p.title} className="mt-4 display text-[clamp(2.75rem,8vw,7.5rem)]" />
            </div>
            <p className="self-end text-lg text-fg-2 md:col-span-4">{p.short}</p>
          </header>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 md:mt-14 md:grid-cols-4">
            <div>
              <dt className="font-mono text-xs text-fg-3">Context</dt>
              <dd className="mt-1 font-medium">{p.context}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-fg-3">Year</dt>
              <dd className="mt-1 font-medium">{p.year}</dd>
            </div>
            <div className="col-span-2">
              <dt className="font-mono text-xs text-fg-3">Links</dt>
              <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-sound="click"
                    className="inline-flex items-center gap-1 font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {l.label} <ArrowUpRight size={14} weight="bold" />
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          <Reveal className="relative mt-10 aspect-[16/10] overflow-hidden rounded-card bg-surface md:mt-14 md:aspect-[21/9]">
            <Image src={p.cover} alt="" fill priority sizes="100vw" className="object-cover" />
          </Reveal>

          <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-12">
            <div className="space-y-16 md:col-span-7">
              <Block title="Overview">{p.overview}</Block>
              <Block title="The problem">{p.problem}</Block>
              <Reveal>
                <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Approach</h2>
                <ol className="mt-6 space-y-5">
                  {p.approach.map((step, n) => (
                    <li key={step.slice(0, 30)} className="grid grid-cols-[2.5rem_1fr] gap-2 border-t border-line pt-5">
                      <span className="font-mono text-sm text-accent">{String(n + 1).padStart(2, "0")}</span>
                      <span className="text-[17px] leading-relaxed text-fg-2">{step}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <aside className="md:col-span-4 md:col-start-9">
              <div className="space-y-10 md:sticky md:top-28">
                <Reveal className="rounded-card bg-fg p-6 text-bg md:p-8">
                  <h2 className="font-mono text-xs opacity-60">Result</h2>
                  <p className="mt-3 text-xl leading-snug font-medium tracking-tight">{p.result}</p>
                </Reveal>
                <div>
                  <h2 className="font-mono text-xs text-fg-3">Tools</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
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
              <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Data lineage</h2>
              <p className="mt-3 max-w-[60ch] text-fg-2">
                Six source tables from CRM and ERP are loaded as-is into Bronze, cleaned one-to-one in Silver, then
                integrated into a star schema in Gold.
              </p>
              <Lineage />
            </Reveal>
          )}

          {p.figures?.map((f) => (
            <Reveal key={f.src} className="mt-24 md:mt-32">
              <figure>
                <div className="overflow-hidden rounded-card bg-[#121212]">
                  <Image src={f.src} alt={f.alt} width={f.width} height={f.height} sizes="100vw" className="h-auto w-full" />
                </div>
                <figcaption className="mt-3 font-mono text-xs text-fg-3">{f.caption}</figcaption>
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
          className="group/next container-site flex min-h-[60dvh] flex-col justify-center py-24"
        >
          <span className="font-mono text-xs text-fg-3">Next project</span>
          <span className="mt-4 flex items-end justify-between gap-6">
            <span className="display text-[clamp(2.75rem,9vw,8.5rem)] transition-colors duration-500 group-hover/next:text-accent">
              {next.title}
            </span>
            <ArrowRight
              size={64}
              className="mb-[0.15em] size-[clamp(2rem,6vw,5rem)] shrink-0 transition-transform duration-500 group-hover/next:translate-x-3"
            />
          </span>
        </Link>
      </section>
      </Curtain>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{title}</h2>
      <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-fg-2">{children}</p>
    </Reveal>
  );
}
