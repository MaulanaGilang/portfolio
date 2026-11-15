"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { SpeakerSlash, Waveform } from "@phosphor-icons/react";
import { nav, profile } from "@/data/content";
import { play, setSound, useSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

/** The hero pins for longer than a screen; the nav name appears once its wordmark is gone. */
function heroEnd() {
  const top = document.getElementById("top");
  return top ? top.offsetHeight - window.innerHeight * 0.5 : window.innerHeight * 0.6;
}

export function Nav() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
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
    const past = y > heroEnd();
    if (past !== pastHero) setPastHero(past);
  });

  // The hero already shows the name large, so the nav name waits until it's scrolled past.
  const showName = !home || pastHero || open;

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
    const toneIO = topmost(toned, "0px 0px -92% 0px", (el) => setTone(el?.dataset.tone === "ink" ? "ink" : "paper"));

    // Highlight the section in the middle of the viewport.
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const activeIO = home ? topmost(sections, "-50% 0px -50% 0px", (el) => setActive(el?.id ?? null)) : null;

    return () => {
      toneIO.disconnect();
      activeIO?.disconnect();
    };
  }, [home, pathname]);

  // A reload lands mid-page without a scroll event.
  useEffect(() => {
    const t = setTimeout(() => setPastHero(window.scrollY > heroEnd()), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const toggleSound = (
    <button
      type="button"
      onClick={() => setSound(!sound)}
      aria-pressed={sound}
      aria-label={sound ? "Turn interface sound off" : "Turn interface sound on"}
      className="grid size-11 place-items-center rounded-full border border-rule-strong text-fg transition-colors hover:border-fg hover:text-accent active:translate-y-px"
    >
      {sound ? <Waveform size={17} weight="bold" /> : <SpeakerSlash size={16} weight="bold" />}
    </button>
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        data-tone={open ? "paper" : tone}
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-fg transition-[background-color,color,border-color] duration-300",
          scrolled && !open ? "border-b border-line bg-bg/95" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-site flex h-[72px] items-center justify-between gap-6 md:h-[80px]">
          <Link
            href="/"
            className={cn(
              "display text-[15px] whitespace-nowrap transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-[18px]",
              !showName && "pointer-events-none -translate-y-2 opacity-0",
            )}
            onClick={() => setOpen(false)}
            aria-label={`${profile.name}, home`}
            aria-hidden={!showName || undefined}
            tabIndex={showName ? undefined : -1}
          >
            Gilang Maulana
          </Link>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <NavLink key={n.id} id={n.id} label={n.label} active={active === n.id} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            {toggleSound}
            <Link
              href="/#connect"
              data-sound="click"
              className="hidden h-11 items-center rounded-full bg-pill px-5 text-[15px] font-medium text-on-pill transition-colors duration-300 hover:bg-accent-solid hover:text-on-accent active:translate-y-px sm:inline-flex"
            >
              Let&apos;s talk
            </Link>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-3 rounded-full border border-rule-strong px-5 text-[15px] font-medium lg:hidden"
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
                        className="flex items-baseline justify-between py-4 text-[clamp(2rem,8vw,3.5rem)] leading-none font-medium tracking-[-0.035em]"
                      >
                        {n.label}
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
  return (
    <li>
      <Link
        href={`/#${id}`}
        onPointerEnter={() => play("hover")}
        aria-current={active ? "true" : undefined}
        className={cn(
          "inline-flex h-10 items-center rounded-full px-4 text-[15px] font-medium transition-colors duration-300",
          active ? "bg-fg text-bg" : "text-fg hover:bg-fg/8",
        )}
      >
        {label}
      </Link>
    </li>
  );
}