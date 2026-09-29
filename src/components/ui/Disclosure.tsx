"use client";

import { createContext, useContext, useId, useState } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { play } from "@/lib/sound";

/* A group can force every disclosure open or closed ("Expand all").
   Whichever happened last wins: the group command or the row's own click.
   Timestamps avoid syncing state in effects. */
type Signal = { open: boolean; at: number };
const GroupCtx = createContext<{ signal: Signal; set: (open: boolean) => void } | null>(null);

export function DisclosureGroup({ children }: { children: React.ReactNode }) {
  const [signal, setSignal] = useState<Signal>({ open: false, at: 0 });
  return (
    <GroupCtx.Provider value={{ signal, set: (open) => setSignal({ open, at: Date.now() }) }}>
      {children}
    </GroupCtx.Provider>
  );
}

export function ExpandAll({ className }: { className?: string }) {
  const group = useContext(GroupCtx);
  if (!group) return null;
  const allOpen = group.signal.open && group.signal.at > 0;
  return (
    <button
      type="button"
      onClick={() => {
        play(allOpen ? "close" : "open");
        group.set(!allOpen);
      }}
      className={cn(
        "rounded-full border border-line px-4 py-2 font-mono text-xs text-fg-2 transition-colors hover:border-fg hover:text-fg",
        className,
      )}
    >
      {allOpen ? "Collapse all" : "Expand all"}
    </button>
  );
}

export function Disclosure({
  summary,
  children,
  className,
  buttonClassName,
}: {
  summary: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  buttonClassName?: string;
}) {
  const id = useId();
  const group = useContext(GroupCtx);
  const [local, setLocal] = useState<Signal>({ open: false, at: 0 });
  const signal = group?.signal ?? { open: false, at: -1 };
  const open = local.at > signal.at ? local.open : signal.open;

  return (
    <div className={className} data-open={open || undefined}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          play(open ? "close" : "open");
          setLocal({ open: !open, at: Date.now() });
        }}
        onPointerEnter={() => play("hover")}
        className={cn("group/d flex w-full items-start gap-4 text-left", buttonClassName)}
      >
        <span className="min-w-0 flex-1">{summary}</span>
        <span
          aria-hidden
          className={cn(
            "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line text-fg-2 transition-[transform,background-color,color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/d:border-fg group-hover/d:text-fg",
            open && "rotate-45 border-accent-solid bg-accent-solid text-on-accent group-hover/d:border-accent-solid group-hover/d:text-on-accent",
          )}
        >
          <Plus size={14} weight="bold" />
        </span>
      </button>
      <div
        id={id}
        role="region"
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
