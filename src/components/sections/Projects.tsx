"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, ViewTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projects } from "@/data/content";
import { play } from "@/lib/sound";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../ui/primitives";

/**
 * Selected work as an index: big titles on the left, one pinned cover on the
 * right that follows whichever project is hovered, focused or in the middle
 * of the screen. On phones each title carries its own cover.
 */
export function Projects() {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const p = projects[active];

  // While scrolling, the row crossing the middle of the viewport becomes active.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    rows.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-[clamp(72px,8vw,128px)]">
      <div className="container-site">
        <SectionHeading
          id="projects-title"
          title="Projects"
          lead="Warehouses, pipelines and the dashboards teams act on. Each one opens as a case study."
        />

        <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
          <ol className="border-t border-rule-strong md:col-span-6">
            {projects.map((proj, i) => (
              <li
                key={proj.slug}
                data-i={i}
                ref={(el) => {
                  rows.current[i] = el;
                }}
                className="border-b border-line"
              >
                <Link
                  href={`/projects/${proj.slug}`}
                  transitionTypes={["nav-forward"]}
                  data-sound="click"
                  onPointerEnter={() => {
                    if (active !== i) play("hover");
                    setActive(i);
                  }}
                  onFocus={() => setActive(i)}
                  className="group/row block py-6 md:py-8"
                >
                  {/* Phones: the cover sits above its title. */}
                  <ViewTransition name={`cover-m-${proj.slug}`} default="none">
                    <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-card bg-haze md:hidden">
                      <Image src={proj.cover} alt="" fill sizes="100vw" className="object-cover" />
                    </div>
                  </ViewTransition>
                  <span className="flex items-baseline justify-between gap-6 label text-fg-3">
                    <span>{proj.category}</span>
                    <span>{proj.year}</span>
                  </span>
                  <span className="mt-2 flex items-start justify-between gap-6">
                    <span
                      className={cn(
                        "text-[clamp(1.7rem,3vw,2.9rem)] leading-[1.02] font-medium tracking-[-0.035em] transition-colors duration-500",
                        active === i ? "text-fg" : "md:text-fg-3",
                      )}
                    >
                      {proj.title}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1 grid size-10 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,rotate] duration-500",
                        active === i ? "border-fg bg-fg text-bg" : "border-rule-strong text-fg md:-rotate-45 md:group-hover/row:rotate-0",
                      )}
                    >
                      <ArrowUpRight size={16} weight="bold" />
                    </span>
                  </span>
                  <span className="mt-3 block max-w-[46ch] text-[16px] leading-relaxed text-fg-2">{proj.short}</span>
                  <span className="sr-only">View case study</span>
                </Link>
              </li>
            ))}
          </ol>

          {/* Desktop: the pinned cover. Named for the page transition, so it morphs into the case-study hero. */}
          <div className="hidden md:col-span-6 md:block">
            <div className="sticky top-[max(96px,14vh)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-haze">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={p.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ViewTransition name={`cover-${p.slug}`} share="morph" default="none">
                      <div className="absolute inset-0">
                        <Image src={p.cover} alt="" fill sizes="(min-width: 768px) 46vw, 1px" className="object-cover" />
                      </div>
                    </ViewTransition>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-6">
                <p className="label text-fg-2">{p.context}</p>
                <p className="label text-fg-3">{p.tools.slice(0, 3).join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
