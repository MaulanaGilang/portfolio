import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { SplitReveal } from "./SplitReveal";
import { Magnetic } from "./Magnetic";

/** Organisation logo on a white tile so every mark reads on the canvas. */
export function LogoTile({ src, alt, size = 48, className }: { src: string; alt: string; size?: number; className?: string }) {
  return (
    <span
      className={cn("relative block shrink-0 overflow-hidden rounded-tile bg-white ring-1 ring-black/5", className)}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} fill sizes={`${size * 2}px`} className="object-cover" />
    </span>
  );
}

/**
 * Lusion section header: big regular-weight title on the left, a short
 * uppercase blurb on the right. Stacks on mobile.
 */
export function SectionHeader({
  title,
  blurb,
  count,
  className,
}: {
  title: string;
  blurb?: string;
  count?: number;
  className?: string;
}) {
  return (
    <div data-section-header className={cn("grid items-end gap-5 md:grid-cols-12", className)}>
      <div className="flex items-start gap-3 md:col-span-8">
        <SplitReveal text={title} className="display text-[clamp(2.6rem,5.2vw,6.25rem)]" />
        {count !== undefined && (
          <span className="mt-[0.4em] text-sm tabular-nums text-fg-3 md:mt-[0.9em]" aria-label={`${count} items`}>
            ({String(count).padStart(2, "0")})
          </span>
        )}
      </div>
      {blurb && <p className="label max-w-[34ch] text-fg md:col-span-4 md:justify-self-end md:pb-3">{blurb}</p>}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
  /** Arrow for links that take you somewhere; dot for in-page actions. Defaults to arrow when external. */
  icon?: "dot" | "arrow";
  external?: boolean;
  className?: string;
};

/** Lusion pill: uppercase label with a small dot. Dark = graphite fill, light = white fill. */
export function PillButton({ href, children, variant = "dark", icon, external, className }: ButtonProps) {
  const arrow = (icon ?? (external ? "arrow" : "dot")) === "arrow";
  const cls = cn(
    "group/btn inline-flex h-12 items-center gap-3 rounded-full px-6 text-sm font-medium tracking-normal whitespace-nowrap uppercase shadow-[var(--shadow-whisper)] transition-transform duration-300 active:scale-[0.97]",
    variant === "dark" ? "bg-pill text-on-pill" : "bg-surface text-fg",
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowUpRight
          aria-hidden
          size={16}
          weight="bold"
          className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        />
      ) : (
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full transition-transform duration-300 group-hover/btn:scale-[2.2]",
            variant === "dark" ? "bg-on-pill" : "bg-fg",
          )}
        />
      )}
    </>
  );
  return (
    <Magnetic strength={0.25}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-sound="click">
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls} data-sound="click">
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center rounded-full bg-haze px-3 text-xs font-medium text-fg-2">
      {children}
    </span>
  );
}

/** "+" tick row, Lusion's signature divider. */
export function Ticks({ label, className }: { label?: string; className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center justify-between text-fg", className)}>
      <span>+</span>
      <span className="hidden sm:inline">+</span>
      {label ? <span className="label">{label}</span> : <span>+</span>}
      <span className="hidden sm:inline">+</span>
      <span>+</span>
    </div>
  );
}
