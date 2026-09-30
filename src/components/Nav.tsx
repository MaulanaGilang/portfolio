"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { nav, profile } from "@/data/content";
import { play, setSound, useSound } from "@/lib/sound";
import { cn } from "@/lib/utils";
import { Magnetic } from "./ui/Magnetic";
import { Scramble } from "./ui/Scramble";
import { Tick } from "./ui/primitives";

const socials = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: "Résumé", href: profile.resume },
];

/**
 * Typographic header in the Lusion manner: wordmark left, a short line in the
 * centre, "Let's talk" pill and a MENU trigger right. Sections live in a
 * floating panel. Hides while scrolling down and takes the tone of the
 * panel underneath it.
 */
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
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

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

    const toned = Array.from(document.querySelectorAll<HTMLElement>("section[data-tone], footer[data-tone], main[data-tone]"));
    const toneIO = topmost(toned, "0px 0px -92% 0px", (el) => el && setTone(el.dataset.tone === "ink" ? "ink" : "paper"));
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const activeIO = home ? topmost(sections, "-50% 0px -50% 0px", (el) => setActive(el?.id ?? null)) : null;
    return () => {
      toneIO.disconnect();
      activeIO?.disconnect();
    };
  }, [home, pathname]);

  // Close the menu on Escape or an outside click; move focus into it when it opens.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !trigger.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    panel.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const toggle = () => {
    play(open ? "close" : "open");
    setOpen(!open);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        data-tone={tone}
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-fg transition-[background-color] duration-300",
          scrolled ? "bg-bg" : "bg-transparent",
        )}
      >
        <div className="container-site grid h-16 grid-cols-[1fr_auto] items-center gap-6 md:h-20 lg:grid-cols-[1fr_auto_1fr]">
          <Link href="/" className="label text-[14px] md:text-[15px]" aria-label={`${profile.name}, home`}>
            Gilang Maulana
          </Link>

          <p className="hidden text-[15px] text-fg-2 lg:block">
            {profile.location} <span className="text-fg-3">·</span> Open to remote &amp; relocation
          </p>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSound(!sound)}
              aria-pressed={sound}
              aria-label={sound ? "Turn interface sound off" : "Turn interface sound on"}
              className="grid size-10 place-items-center rounded-full text-fg-2 transition-opacity hover:opacity-60"
            >
              {sound ? <SpeakerHigh size={17} /> : <SpeakerSlash size={17} />}
            </button>
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <Link
                href="/#connect"
                data-sound="click"
                className="group/btn label inline-flex h-11 items-center gap-2.5 rounded-full bg-btn px-5 text-[13px] text-btn-fg shadow-whisper transition-opacity hover:opacity-85"
              >
                <Tick className="text-[15px] leading-none transition-transform duration-500 group-hover/btn:rotate-90" />
                Let’s talk
              </Link>
            </Magnetic>
            <button
              ref={trigger}
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="site-menu"
              className="label inline-flex h-11 items-center gap-2 rounded-full px-3 text-[13px] transition-opacity hover:opacity-60"
            >
              {open ? "Close" : "Menu"}
              <Tick className={cn("text-[16px] leading-none transition-transform duration-500", open && "rotate-45")} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="site-menu"
            data-tone="paper"
            role="dialog"
            aria-label="Site menu"
            className="fixed inset-x-4 top-[72px] z-50 origin-top-right sm:inset-x-auto sm:right-[clamp(16px,3.4vw,48px)] sm:w-[440px] rounded-card border border-line bg-surface p-3 text-fg shadow-whisper md:top-[84px]"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Sections">
              <ul>
                {[...nav, { id: "connect", label: "Let’s talk" }].map((n, i) => (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <MenuLink id={n.id} label={n.label} active={active === n.id} onNavigate={() => setOpen(false)} />
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 rounded-[12px] bg-bg px-4 py-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="label text-fg-2 transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuLink({ id, label, active, onNavigate }: { id: string; label: string; active: boolean; onNavigate: () => void }) {
  const [hover, setHover] = useState(0);
  return (
    <Link
      href={`/#${id}`}
      onClick={onNavigate}
      onPointerEnter={() => {
        setHover((h) => h + 1);
        play("hover");
      }}
      aria-current={active ? "true" : undefined}
      className={cn(
        "group/m flex items-center justify-between rounded-[12px] px-4 py-2.5 transition-colors hover:bg-bg",
        active && "text-accent",
      )}
    >
      <Scramble text={label} trigger={hover} duration={360} className="heading text-[clamp(1.75rem,3vw,2.25rem)]" />
      <Tick className="text-[20px] text-fg-3 transition-transform duration-500 group-hover/m:rotate-90 group-hover/m:text-fg" />
    </Link>
  );
}
