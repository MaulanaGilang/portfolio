import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/** Organisation logo on a frost tile with a hairline, so every mark reads on the mist canvas. */
export function LogoTile({ src, alt, size = 48, className }: { src: string; alt: string; size?: number; className?: string }) {
  return (
    <span
      className={cn("relative block shrink-0 overflow-hidden rounded-tile bg-white ring-1 ring-line", className)}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} fill sizes={`${size * 2}px`} className="object-cover" />
    </span>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  /** solid: ink pill, the primary action. ghost: hairline pill. */
  variant?: "solid" | "ghost";
  external?: boolean;
  className?: string;
};

/** Pill controls: the only rounded shape on the page. The arrow lifts on hover. */
export function PillButton({ href, children, variant = "solid", external, className }: ButtonProps) {
  const cls = cn(
    "group/btn inline-flex h-12 items-center gap-2.5 rounded-full pr-4 pl-5 text-[15px] font-medium whitespace-nowrap transition-[background-color,color,border-color] duration-300 active:translate-y-px",
    variant === "solid"
      ? "bg-pill text-on-pill hover:bg-accent-solid hover:text-on-accent"
      : "border border-rule-strong text-fg hover:border-fg",
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className={cn(
          "grid size-7 place-items-center rounded-full transition-[background-color,translate] duration-300 group-hover/btn:-translate-y-0.5",
          variant === "solid" ? "bg-on-pill/12" : "bg-fg/6",
        )}
      >
        <ArrowUpRight size={14} weight="bold" className="transition-transform duration-300 group-hover/btn:translate-x-px" />
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-sound="click">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} data-sound="click">
      {inner}
    </Link>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex h-7 items-center rounded-full bg-haze px-3 label text-fg-2">{children}</span>;
}

/** Section heading: Satoshi, large. No eyebrow, no number; an optional line of context below. */
export function SectionHeading({
  id,
  title,
  lead,
  className,
}: {
  id?: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[60rem]", className)}>
      <h2 id={id} className="heading">
        {title}
      </h2>
      {lead && <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-fg-2">{lead}</p>}
    </div>
  );
}
