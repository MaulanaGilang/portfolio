"use client";

import { useRef, useState } from "react";
import { codex, ranks } from "@/data/codex";

/** The Codex of Moonwake: one tab at a time, with a paragraph and the facts. */
export function Codex() {
  const [active, setActive] = useState(codex[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = codex.find((t) => t.id === active) ?? codex[0];

  // Arrow keys, Home and End move between tabs, as in any tab list.
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = codex.length;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i + 1) % n
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(codex[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="ah-codex">
      <div role="tablist" aria-label="Codex chapters" aria-orientation="vertical" className="ah-codex-tabs">
        {codex.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`codex-tab-${t.id}`}
            aria-selected={t.id === active}
            aria-controls={`codex-panel-${t.id}`}
            tabIndex={t.id === active ? 0 : -1}
            onClick={() => setActive(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className="ah-codex-tab"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        key={tab.id}
        role="tabpanel"
        id={`codex-panel-${tab.id}`}
        aria-labelledby={`codex-tab-${tab.id}`}
        tabIndex={0}
        className="ah-frame ah-panel ah-codex-panel"
      >
        <h3 className="ah-title">{tab.label}</h3>
        <p className="ah-motto mt-3">{tab.lead}</p>
        <p className="mt-5 max-w-[62ch] leading-relaxed text-[var(--bone)]">{tab.body}</p>

        <div className="ah-divider my-7" />

        <dl className="ah-rows">
          {tab.facts.map((f) => (
            <div key={f.label}>
              <dt className="ah-label">{f.label}</dt>
              <dd className="text-[15.5px] leading-relaxed text-[var(--bone)]">{f.value}</dd>
            </div>
          ))}
        </dl>

        {tab.id === "moonwatch" && (
          <div className="mt-8">
            <h4 className="ah-label mb-4">Ranks, lowest to highest</h4>
            <ol className="ah-ranks">
              {ranks.shared.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
            <p className="ah-label mt-6 mb-3 text-[var(--silver)]">Then Moonwake&apos;s own path</p>
            <ol className="ah-ranks ah-ranks-house" start={ranks.shared.length + 1}>
              {ranks.moonwake.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
