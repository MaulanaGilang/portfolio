import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { SplitReveal } from "./SplitReveal";
import { Magnetic } from "./Magnetic";

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

/** Big section title with an optional superscript count (e.g. Projects⁵). */
export function SectionTitle({ title, count, className }: { title: string; count?: number; className?: string }) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <SplitReveal text={title} className="display text-[clamp(3rem,8vw,7.5rem)]" />
      {count !== undefined && (
        <span className="mt-[0.6em] font-mono text-sm text-fg-3 md:mt-[1.1em]" aria-label={`${count} items`}>
          ({String(count).padStart(2, "0")})
        </span>
      )}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  className?: string;
};

/** Pill button. Solid = cobalt; outline = hairline that fills on hover. */
export function PillButton({ href, children, variant = "solid", external, className }: ButtonProps) {
  const cls = cn(
    "group/btn relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-6 text-[15px] font-medium whitespace-nowrap transition-[transform,background-color,color,border-color] duration-300 active:scale-[0.97]",
    variant === "solid"
      ? "bg-accent-solid text-on-accent hover:bg-fg hover:text-bg"
      : "border border-fg/25 text-fg hover:border-fg hover:bg-fg hover:text-bg",
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight
        size={16}
        weight="bold"
        className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
      />
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
    <span className="inline-flex h-7 items-center rounded-full border border-line px-3 font-mono text-[11px] text-fg-2">
      {children}
    </span>
  );
}
