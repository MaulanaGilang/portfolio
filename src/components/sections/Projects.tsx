"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/data/content";
import { play } from "@/lib/sound";
import { cn } from "@/lib/utils";
import { SectionTitle, Tick } from "../ui/primitives";

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
    <section id="projects" data-tone="paper" className="py-[clamp(96px,12vw,168px)]">
      <div className="container-site">
        <SectionTitle label="Projects" count={projects.length} title="Selected work" />

        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Project categories"
            className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-surface p-1.5 shadow-whisper [scrollbar-width:none]"
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
                    "label relative h-11 shrink-0 rounded-full px-4 text-[12px] whitespace-nowrap transition-colors sm:px-5 sm:text-[13px]",
                    selected ? "text-btn-fg" : "text-fg-2 hover:text-fg",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="project-tab"
                      className="absolute inset-0 rounded-full bg-btn"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    <span className="sm:hidden">{c.replace("Data ", "").replace(" Computing", "")}</span>
                    <span className="hidden sm:inline">{c}</span>{" "}
                    <span className="opacity-60">{n}</span>
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
              className="grid gap-x-4 gap-y-14 md:grid-cols-2 md:gap-y-20"
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
    <article className={cn("group/card relative", featured && "md:col-span-2")}>
      <Link
        href={`/projects/${p.slug}`}
        aria-label={`${p.title} case study`}
        tabIndex={-1}
        data-sound="click"
        className={cn(
          "relative block overflow-hidden bg-[#0b0c11]",
          featured
            ? "aspect-[4/3] rounded-[var(--radius-stage)] md:aspect-[21/9]"
            : "aspect-[4/3] rounded-[clamp(24px,4.2vw,64px)]",
        )}
      >
        <Image
          src={p.cover}
          alt=""
          fill
          sizes={featured ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04]"
        />
      </Link>

      <div className={cn("mt-6 px-1", featured && "md:grid md:grid-cols-12 md:gap-6")}>
        <div className={cn(featured && "md:col-span-7")}>
          <p className="label flex items-center gap-2 text-fg-3">
            <Tick className="text-accent" />
            {p.context} · {p.year}
          </p>
          <h3 className={cn("heading mt-3", featured ? "text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.02]" : "text-[clamp(1.5rem,2.2vw,1.9rem)]")}>
            {p.title}
          </h3>
        </div>
        <div className={cn(featured && "md:col-span-5 md:pt-7")}>
          <p className="mt-3 max-w-[48ch] text-[16px] leading-relaxed text-fg-2">{p.short}</p>
          <Link
            href={`/projects/${p.slug}`}
            data-sound="click"
            className="group/btn label mt-5 inline-flex h-11 items-center gap-2.5 rounded-full border border-fg/15 bg-surface px-5 text-[12px] text-fg transition-colors hover:border-fg/40"
          >
            <Tick className="text-[15px] leading-none transition-transform duration-500 group-hover/btn:rotate-90" />
            View case study
          </Link>
        </div>
      </div>
    </article>
  );
}
