import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SplitReveal } from "./SplitReveal";
import { Magnetic } from "./Magnetic";

/** Lusion's signature "+" tick: decorative punctuation, hidden from screen readers. */
export function Tick({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("inline-block select-none font-normal", className)}>
      +
    </span>
  );
}

/** Organisation logo on a white tile so every mark reads on both tones. */
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
 * Section header: a "+ LABEL +" line over a large centred title, with an
 * optional count. Centred stacks follow Lusion's layout rhythm.
 */
export function SectionTitle({
  title,
  label,
  count,
  align = "center",
  className,
}: {
  title: string;
  label: string;
  count?: number;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <header className={cn("flex flex-col gap-5", align === "center" ? "items-center text-center" : "items-start", className)}>
      <p className="label flex items-center gap-3 text-fg-2">
        <Tick />
        {label}
        {count !== undefined && <span className="text-fg-3">({String(count).padStart(2, "0")})</span>}
        <Tick />
      </p>
      <SplitReveal text={title} className="display max-w-[16ch] text-[clamp(2.75rem,7.2vw,7rem)]" />
    </header>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  className?: string;
};

/** Pill button: graphite fill (or hairline outline), uppercase label with a leading "+" tick. */
export function PillButton({ href, children, variant = "solid", external, className }: ButtonProps) {
  const cls = cn(
    "label inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[13px] whitespace-nowrap transition-[opacity,transform,background-color,border-color] duration-300 active:scale-[0.97]",
    variant === "solid"
      ? "bg-btn text-btn-fg shadow-whisper hover:opacity-85"
      : "border border-fg/15 bg-surface/60 text-fg hover:border-fg/40",
    className,
  );
  const inner = (
    <>
      <Tick className="text-[15px] leading-none transition-transform duration-500 group-hover/btn:rotate-90" />
      <span>{children}</span>
    </>
  );
  return (
    <Magnetic strength={0.25}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cn("group/btn", cls)} data-sound="click">
          {inner}
        </a>
      ) : (
        <Link href={href} className={cn("group/btn", cls)} data-sound="click">
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center rounded-full border border-line bg-bg px-3 text-[12px] font-medium text-fg-2">
      {children}
    </span>
  );
}
