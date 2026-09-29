"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { nav, profile } from "@/data/content";
import { play, setSound, useSound } from "@/lib/sound";
import { cn } from "@/lib/utils";
import { Magnetic } from "./ui/Magnetic";
import { Scramble } from "./ui/Scramble";

export function Nav() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [tone, setTone] = useState<"paper" | "ink">("paper");
  const sound = useSound();
  const { scrollY } = useScroll();

  // Hide while scrolling down, reveal on the way up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const next = y > prev && y > 160;
    if (next !== hidden) setHidden(next);
    if (y > 24 !== scrolled) setScrolled(y > 24);
  });

  // Curtain panels stay pinned after they're covered, so several can overlap a
  // band at once: the one latest in document order is the one on top.
  useEffect(() => {
    const topmost = (els: HTMLElement[], rootMargin: string, pick: (el: HTMLElement | undefined) => void) => {
      const inside = new Set<HTMLElement>();
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) inside.add(e.target as HTMLElement);
            else inside.delete(e.target as HTMLElement);
          }
          pick(els.filter((el) => inside.has(el)).at(-1));
        },
        { rootMargin },
      );
      els.forEach((el) => io.observe(el));
      return io;
    };

    // Nav takes the tone of whatever sits under it.
    const toned = Array.from(document.querySelectorAll<HTMLElement>("section[data-tone], footer[data-tone], main[data-tone]"));
    const toneIO = topmost(toned, "0px 0px -92% 0px", (el) => el && setTone(el.dataset.tone === "ink" ? "ink" : "paper"));

    // Highlight the section in the middle of the viewport.
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const activeIO = home ? topmost(sections, "-50% 0px -50% 0px", (el) => setActive(el?.id ?? null)) : null;

    return () => {
      toneIO.disconnect();
      activeIO?.disconnect();
    };
  }, [home, pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const toggleSound = (
    <button
      type="button"
      onClick={() => setSound(!sound)}
      aria-pressed={sound}
      aria-label={sound ? "Turn interface sound off" : "Turn interface sound on"}
      className="grid size-10 place-items-center rounded-full border border-line text-fg-2 transition-colors hover:border-fg hover:text-fg"
    >
      {sound ? <SpeakerHigh size={16} weight="bold" /> : <SpeakerSlash size={16} weight="bold" />}
    </button>
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        data-tone={open ? "paper" : tone}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b text-fg transition-[background-color,border-color,color] duration-300",
          scrolled && !open ? "border-line bg-bg/92" : "border-transparent",
        )}
      >
        <div className="container-site flex h-16 items-center justify-between gap-6 md:h-[72px]">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-tight"
            onClick={() => setOpen(false)}
            aria-label={`${profile.name}, home`}
          >
            Gilang Maulana<span className="text-accent">.</span>
          </Link>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-bg/85 p-1">
              {nav.map((n) => (
                <NavLink key={n.id} id={n.id} label={n.label} active={active === n.id} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {toggleSound}
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <Link
                href="/#connect"
                data-sound="click"
                className="inline-flex h-10 items-center rounded-full bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-solid hover:text-on-accent"
              >
                Let&apos;s connect
              </Link>
            </Magnetic>
            <button
              type="button"
              className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm font-medium lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => {
                play(open ? "close" : "open");
                setOpen(!open);
              }}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-bg px-4 pt-24 pb-10 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Sections">
              <ul className="flex flex-col">
                {[...nav, { id: "connect", label: "Let's connect" }].map((n, i) => (
                  <li key={n.id} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={`/#${n.id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between py-3 display text-[clamp(2.5rem,11vw,4.5rem)]"
                      >
                        {n.label}
                        <span className="font-mono text-xs tracking-normal text-fg-3">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ id, label, active }: { id: string; label: string; active: boolean }) {
  const [hover, setHover] = useState(0);
  return (
    <li>
      <Link
        href={`/#${id}`}
        onPointerEnter={() => {
          setHover((h) => h + 1);
          play("hover");
        }}
        aria-current={active ? "true" : undefined}
        className={cn(
          "relative inline-flex h-9 items-center rounded-full px-4 text-sm transition-colors",
          active ? "text-bg" : "text-fg-2 hover:text-fg",
        )}
      >
        {active && (
          <motion.span
            layoutId="nav-pill"
            className="absolute inset-0 rounded-full bg-fg"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
        <Scramble text={label} trigger={hover} delay={0} duration={380} className="relative" />
      </Link>
    </li>
  );
}
