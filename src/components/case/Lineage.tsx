// Bronze → Silver → Gold lineage of the SQL Data Warehouse project, drawn from
// the real table names in the repository (scripts/bronze, silver, gold).

const sources = [
  { system: "CRM", tables: ["crm_sales_details", "crm_cust_info", "crm_prd_info"] },
  { system: "ERP", tables: ["erp_cust_az12", "erp_loc_a101", "erp_px_cat_g1v2"] },
];
const tables = sources.flatMap((s) => s.tables);
const gold = [
  { name: "fact_sales", from: ["crm_sales_details"] },
  { name: "dim_customers", from: ["crm_cust_info", "erp_cust_az12", "erp_loc_a101"] },
  { name: "dim_products", from: ["crm_prd_info", "erp_px_cat_g1v2"] },
];

const W = 1000;
const BOX_W = 210;
const BOX_H = 38;
const col = { src: 24, bronze: 170, silver: 470, gold: 766 };
const rowY = [40, 96, 152, 250, 306, 362];
const goldY = [40, 180, 306];

export function Lineage() {
  return (
    <div className="mt-10">
      {/* Desktop: full diagram */}
      <div className="hidden overflow-hidden rounded-card bg-surface p-8 md:block">
        <svg viewBox={`0 0 ${W} 420`} className="h-auto w-full" role="img" aria-labelledby="lineage-title">
          <title id="lineage-title">
            Data lineage: six CRM and ERP tables load into Bronze, are cleaned in Silver, and are integrated into
            fact_sales, dim_customers and dim_products in Gold.
          </title>

          {["Source", "Bronze", "Silver", "Gold"].map((h, i) => (
            <text
              key={h}
              x={[col.src, col.bronze, col.silver, col.gold][i]}
              y={14}
              className="fill-fg-3 font-mono text-[12px]"
            >
              {h}
            </text>
          ))}

          {sources.map((s, si) => (
            <g key={s.system}>
              <rect
                x={col.src}
                y={rowY[si * 3] }
                width={96}
                height={rowY[si * 3 + 2] - rowY[si * 3] + BOX_H}
                rx={10}
                className="fill-surface stroke-line"
              />
              <text
                x={col.src + 48}
                y={rowY[si * 3 + 1] + BOX_H / 2 + 5}
                textAnchor="middle"
                className="fill-fg text-[14px] font-semibold"
              >
                {s.system}
              </text>
            </g>
          ))}

          {tables.map((t, i) => {
            const y = rowY[i] + BOX_H / 2;
            return (
              <g key={t}>
                <path d={`M ${col.src + 96} ${y} H ${col.bronze}`} className="lineage-flow stroke-fg-3" fill="none" />
                <path d={`M ${col.bronze + BOX_W} ${y} H ${col.silver}`} className="lineage-flow stroke-fg-3" fill="none" />
                <Box x={col.bronze} y={rowY[i]} label={t} tier="bronze" />
                <Box x={col.silver} y={rowY[i]} label={t} tier="silver" />
              </g>
            );
          })}

          {gold.map((g, gi) => (
            <g key={g.name}>
              {g.from.map((f) => {
                const y1 = rowY[tables.indexOf(f)] + BOX_H / 2;
                const y2 = goldY[gi] + BOX_H / 2;
                const x1 = col.silver + BOX_W;
                const x2 = col.gold;
                const mx = (x1 + x2) / 2;
                return (
                  <path
                    key={f}
                    d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
                    className="lineage-flow stroke-accent"
                    fill="none"
                  />
                );
              })}
              <Box x={col.gold} y={goldY[gi]} label={g.name} tier="gold" />
            </g>
          ))}
        </svg>
      </div>

      {/* Mobile: the same lineage as a readable list */}
      <ol className="space-y-4 md:hidden">
        {gold.map((g) => (
          <li key={g.name} className="rounded-card bg-surface p-5">
            <p className="inline-flex rounded-full bg-gold px-3 py-1 font-mono text-xs text-black">{g.name}</p>
            <p className="label mt-4 text-fg-3">Built from</p>
            <ul className="mt-2 space-y-1 font-mono text-sm">
              {g.from.map((f) => (
                <li key={f}>
                  {f} <span className="text-fg-3">(bronze → silver)</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Box({ x, y, label, tier }: { x: number; y: number; label: string; tier: "bronze" | "silver" | "gold" }) {
  // The Gold layer is literally gold: the site's second accent was chosen for it.
  const fill = tier === "gold" ? "fill-gold stroke-gold" : tier === "silver" ? "fill-surface stroke-fg-3" : "fill-surface-2 stroke-line";
  const text = tier === "gold" ? "fill-black" : "fill-fg";
  return (
    <g>
      <rect x={x} y={y} width={BOX_W} height={BOX_H} rx={9} className={fill} />
      <text x={x + 14} y={y + BOX_H / 2 + 4.5} className={`${text} font-mono text-[13px]`}>
        {label}
      </text>
    </g>
  );
}
