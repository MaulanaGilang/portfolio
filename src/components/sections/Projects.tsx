"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, ViewTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/data/content";
import { play } from "@/lib/sound";
import { cn } from "@/lib/utils";
import { SectionHeader } from "../ui/primitives";

export function Projects() {
  const [tab, setTab] = useState<ProjectCategory>("Data Engineering");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = projects.filter((p) => p.category === tab);

  function select(i: number) {
    const next = projectCategories[(i + projectCategories.length) % projectCategories.length];
    setTab(next);
    play("click");
    tabs.current[projectCategories.indexOf(next)]?.focus();
  }

  return (
    <section id="projects" className="relative py-[clamp(72px,8vw,128px)]">
      <div className="container-site">
        <SectionHeader
          title="Featured Work"
          count={projects.length}
          blurb="A selection of data projects, from warehouses and pipelines to dashboards that teams act on."
        />

        <div className="mt-6 flex justify-center md:mt-8">
          <div
            role="tablist"
            aria-label="Project categories"
            className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-haze p-1 [scrollbar-width:none]"
          >
            {projectCategories.map((c, i) => {
              const selected = c === tab;
              const n = projects.filter((p) => p.category === c).length;
              return (
                <button
                  key={c}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={selected}
                  aria-controls="projects-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") select(i + 1);
                    if (e.key === "ArrowLeft") select(i - 1);
                  }}
                  onPointerEnter={() => play("hover")}
                  className="relative h-10 shrink-0 rounded-full px-4 text-[13px] font-medium tracking-normal whitespace-nowrap uppercase sm:px-5"
                >
                  {selected && (
                    <motion.span
                      layoutId="project-tab"
                      className="absolute inset-0 rounded-full bg-surface shadow-[var(--shadow-whisper)]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className={cn("relative", !selected && "text-fg-2")}>
                    <span className="sm:hidden">{c.replace("Data ", "").replace(" Computing", "")}</span>
                    <span className="hidden sm:inline">{c}</span>{" "}
                    <span className="text-[11px] opacity-60">{n}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div id="projects-panel" role="tabpanel" aria-labelledby={`tab-${projectCategories.indexOf(tab)}`} className="mt-8 md:mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-x-8 gap-y-10 md:grid-cols-2"
            >
              {list.map((p, i) => (
                // Lusion grid: two per row; an odd one out spans the full width.
                <ProjectCard key={p.slug} project={p} wide={list.length % 2 === 1 && i === list.length - 1} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, wide }: { project: Project; wide: boolean }) {
  const tags = [p.category, ...p.tools.slice(0, 3)];
  return (
    <article className={cn("group/card", wide && "md:col-span-2")}>
      <Link
        href={`/projects/${p.slug}`}
        transitionTypes={["nav-forward"]}
        data-sound="click"
        aria-label={`${p.title}: view case study`}
        className={cn("block", wide && "md:grid md:grid-cols-12 md:items-center md:gap-10")}
      >
        {/* Named for the page transition: this image morphs into the case-study hero. */}
        <ViewTransition name={`cover-${p.slug}`} share="morph" default="none">
          <div className={cn("relative aspect-[16/9] overflow-hidden rounded-card bg-haze", wide && "md:col-span-7")}>
            <Image
              src={p.cover}
              alt=""
              fill
              sizes={wide ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.035]"
            />
          </div>
        </ViewTransition>

        <div className={cn(wide && "md:col-span-5")}>
          <p className={cn("mt-4 label text-fg", wide && "md:mt-0")}>
            {tags.map((t, i) => (
              <span key={t}>
                {i > 0 && <span className="mx-1.5">•</span>}
                {t}
              </span>
            ))}
          </p>
          <h3 className="mt-2 text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[1.05]">{p.title}</h3>
          <p className="mt-2 max-w-[52ch] text-[15px] text-fg-2">{p.short}</p>
          <span className="mt-4 inline-flex h-11 items-center gap-2.5 rounded-full bg-surface px-5 text-sm font-medium tracking-normal uppercase shadow-[var(--shadow-whisper)]">
            View case study
            <ArrowUpRight
              aria-hidden
              size={16}
              weight="bold"
              className="transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
