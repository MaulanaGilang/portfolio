"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AnimatedNumber } from "@/clickstream/components/motion-primitives/animated-number";
import { fmtCompact, fmtInt, fmtPct, fmtUsd } from "@/clickstream/lib/format";
import { cn } from "@/clickstream/lib/utils";

type Funnel = {
  viewed: number;
  carted: number;
  purchased: number;
  viewToCart: number;
  cartToPurchase: number;
  overall: number;
  revenue: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function FunnelStory({ f }: { f: Funnel }) {
  const [step, setStep] = useState(0);
  const oneIn = Math.round(1 / f.overall);

  const steps = [
    {
      title: `${fmtCompact(f.viewed)} sessions looked at a product.`,
      body: "A session is one shopper's visit, rebuilt by dbt from every event it contains, even when it crosses midnight.",
    },
    {
      title: `Only ${fmtPct(f.viewToCart)} put anything in the cart.`,
      body: `This is the cliff. ${fmtCompact(f.viewed - f.carted)} sessions browse and leave without adding a single item.`,
    },
    {
      title: `Once something is in the cart, ${fmtPct(f.cartToPurchase, 0)} of sessions buy.`,
      body: `Most shoppers are lost before the cart, not in it: ${fmtCompact(f.carted - f.purchased)} carts are abandoned, against ${fmtCompact(f.viewed - f.carted)} sessions that never start one.`,
    },
    {
      title: `One session in ${oneIn} ends in a purchase.`,
      body: `${fmtInt(f.purchased)} purchasing sessions, ${fmtUsd(f.revenue)} in purchase value over 61 days.`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-x-16 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* sticky chart: top on mobile, right on desktop */}
      <div className="sticky top-0 z-[2] -mx-4 bg-cs-paper/90 px-4 pb-4 pt-4 backdrop-blur-sm md:order-2 md:mx-0 md:h-dvh md:bg-transparent md:px-0 md:backdrop-blur-none">
        <div className="md:flex md:h-full md:items-center">
          <FunnelChart f={f} step={step} />
        </div>
      </div>

      <ol className="md:order-1">
        {steps.map((s, i) => (
          <Step key={i} index={i} active={step === i} onEnter={setStep} title={s.title} body={s.body} />
        ))}
      </ol>
    </div>
  );
}

function Step({
  index,
  active,
  onEnter,
  title,
  body,
}: {
  index: number;
  active: boolean;
  onEnter: (i: number) => void;
  title: string;
  body: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <li ref={ref} className="flex min-h-[80dvh] items-end pb-[8dvh] md:min-h-dvh md:items-center md:pb-8">
      <div className={cn("transition-opacity duration-500", active ? "opacity-100" : "opacity-35")}>
        <h3 className="max-w-[18ch] text-[clamp(1.6rem,2.4vw+0.6rem,2.5rem)] font-medium">{title}</h3>
        <p className="mt-4 max-w-[44ch] text-cs-ink-2">{body}</p>
      </div>
    </li>
  );
}

function FunnelChart({ f, step }: { f: Funnel; step: number }) {
  const reduce = useReducedMotion();
  const stages = [
    { key: "viewed", label: "Viewed", value: f.viewed, from: 0 },
    { key: "carted", label: "Added to cart", value: f.carted, from: 1 },
    { key: "purchased", label: "Purchased", value: f.purchased, from: 2 },
  ];
  // Bars share one linear scale: the shrink IS the finding.
  const max = f.viewed;

  return (
    <figure className="w-full" aria-label="Session funnel: viewed, added to cart, purchased">
      <div className="space-y-3 md:space-y-7">
        {stages.map((s, i) => {
          const visible = step >= s.from;
          const highlight = step === 3 ? i === 2 : step === i;
          const width = Math.max((s.value / max) * 100, 0.6);
          return (
            <div key={s.key}>
              <div className="mb-1.5 flex items-baseline justify-between gap-4 md:mb-2">
                <span className={cn("text-sm transition-colors", visible ? "text-cs-ink-2" : "text-cs-ink-3/50")}>
                  {s.label}
                </span>
                <span className={cn("text-xl transition-colors md:text-2xl", visible ? "text-cs-ink" : "text-cs-ink-3/40")}>
                  {visible ? (
                    <AnimatedNumber className="num" value={s.value} springOptions={{ bounce: 0, duration: 1100 }} />
                  ) : (
                    <span className="num">0</span>
                  )}
                </span>
              </div>
              <div className="relative h-6 md:h-12">
                {/* full-width ghost of the previous stage: what was lost */}
                {i > 0 && visible ? (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-r-[var(--radius-sm)] border border-dashed border-cs-data-bad/60"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: step === i ? 1 : 0.35 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: `${(stages[i - 1].value / max) * 100}%` }}
                  />
                ) : null}
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left rounded-r-[var(--radius-sm)]"
                  initial={false}
                  animate={{
                    scaleX: visible ? 1 : 0,
                    backgroundColor: highlight ? "var(--cs-accent)" : "var(--cs-data-context)",
                  }}
                  transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
                  style={{ width: `${width}%` }}
                />
              </div>
              {i > 0 ? (
                <p
                  className={cn(
                    "mt-2 font-cs-mono text-xs transition-opacity duration-500",
                    visible ? "opacity-100" : "opacity-0",
                    step === i ? "text-cs-alert" : "text-cs-ink-3",
                  )}
                >
                  {fmtPct(1 - s.value / stages[i - 1].value)} drop from {stages[i - 1].label.toLowerCase()}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
      <figcaption className="mt-8 hidden text-xs text-cs-ink-3 md:block">
        Sessions, Oct 1 to Nov 30 2019. Bars on one linear scale.
      </figcaption>
    </figure>
  );
}
