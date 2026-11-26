import { cn } from "@/clickstream/lib/utils";

type Props = {
  id: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** A chapter of the story: one finding as the headline, the evidence below it. */
export function Section({ id, title, lede, children, className }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("mx-auto w-full max-w-[1240px] px-4 py-24 sm:px-8 md:py-32", className)}
    >
      <h2 id={`${id}-title`} className="max-w-[20ch] text-[clamp(2rem,4vw+0.5rem,3.5rem)] font-medium">
        {title}
      </h2>
      {lede ? <p className="mt-5 max-w-[60ch] text-lg text-cs-ink-2">{lede}</p> : null}
      <div className="mt-12 md:mt-16">{children}</div>
    </section>
  );
}

/** Accessible table fallback that sits under every chart. */
export function DataTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <details className="group mt-6 text-sm">
      <summary className="inline-flex cursor-pointer select-none items-center gap-2 rounded-[var(--radius-sm)] text-cs-ink-3 transition-colors hover:text-cs-ink">
        <span className="font-cs-mono text-xs">Show as table</span>
      </summary>
      <div className="mt-3 max-h-80 overflow-auto rounded-[var(--radius-md)] border border-cs-rule">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead className="sticky top-0 bg-cs-paper-2">
            <tr>
              {columns.map((c) => (
                <th key={c} scope="col" className="px-3 py-2 font-cs-mono text-xs font-medium text-cs-ink-3">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-cs-rule">
                {r.map((cell, j) => (
                  <td key={j} className={cn("px-3 py-1.5", j > 0 && "num text-cs-ink-2")}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
