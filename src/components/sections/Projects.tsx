"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/data/content";
import { play } from "@/lib/sound";
import { cn } from "@/lib/utils";
import { SplitReveal } from "../ui/SplitReveal";

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
    <section id="projects" data-tone="ink" className="py-[clamp(96px,12vw,180px)]">
      <div className="container-site">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-start gap-3">
            <SplitReveal text="Projects" className="display text-[clamp(3rem,8vw,7.5rem)]" />
            <span className="mt-[0.6em] font-mono text-sm text-fg-3 md:mt-[1.1em]" aria-label={`${projects.length} projects`}>
              ({String(projects.length).padStart(2, "0")})
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Project categories"
            className="mt-10 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-line p-1 [scrollbar-width:none]"
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
                  className={cn(
                    "relative h-11 shrink-0 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors sm:px-5",
                    selected ? "text-on-accent" : "text-fg-2 hover:text-fg",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="project-tab"
                      className="absolute inset-0 rounded-full bg-accent-solid"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    <span className="sm:hidden">{c.replace("Data ", "").replace(" Computing", "")}</span>
                    <span className="hidden sm:inline">{c}</span>{" "}
                    <span className="font-mono text-[11px] opacity-70">{n}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div id="projects-panel" role="tabpanel" aria-labelledby={`tab-${projectCategories.indexOf(tab)}`} className="mt-12 md:mt-16">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-x-6 gap-y-12 md:grid-cols-2"
            >
              {list.map((p, i) => (
                <ProjectCard key={p.slug} project={p} featured={i === 0} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, featured }: { project: Project; featured: boolean }) {
  return (
    <article
      className={cn(
        "group/card relative",
        featured && "md:col-span-2 md:grid md:grid-cols-12 md:items-center md:gap-10",
      )}
    >
      <Link
        href={`/projects/${p.slug}`}
        aria-label={`${p.title} case study`}
        tabIndex={-1}
        data-sound="click"
        className={cn(
          "relative block overflow-hidden rounded-card bg-surface",
          featured ? "aspect-[16/10] md:col-span-7" : "aspect-[16/10]",
        )}
      >
        <Image
          src={p.cover}
          alt=""
          fill
          sizes={featured ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 46vw, 100vw"}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04]"
        />
      </Link>

      <div className={cn("mt-6", featured && "md:col-span-5 md:mt-0")}>
        <p className="font-mono text-xs text-fg-3">
          {p.context} · {p.year}
        </p>
        <h3
          className={cn(
            "mt-3 font-medium tracking-tight",
            featured ? "text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.035em]" : "text-2xl md:text-[1.75rem]",
          )}
        >
          {p.title}
        </h3>
        <p className="mt-3 max-w-[48ch] text-fg-2">{p.short}</p>
        <Link
          href={`/projects/${p.slug}`}
          data-sound="click"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-fg/25 px-5 text-sm font-medium transition-colors hover:border-accent-solid hover:bg-accent-solid hover:text-on-accent"
        >
          View case study
          <ArrowUpRight size={15} weight="bold" className="transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
