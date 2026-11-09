/**
 * Steam hours per month as a quiet bar chart. Past months in a dim stone tone,
 * the current month in silver on a wine red column, so the one bar that is
 * still changing stands out. Values are labelled on the current month and the
 * peak; the full series is in a table for screen readers.
 */
export function HoursChart({ data }: { data: { month: string; hours: number }[] }) {
  const W = 720;
  const H = 260;
  const left = 40; // axis labels sit in their own gutter, never on a bar
  const top = 28;
  const bottom = 32;
  const plot = H - top - bottom;
  const peak = Math.max(...data.map((d) => d.hours));
  const max = Math.ceil(peak / 20) * 20;
  const col = (W - left) / data.length;
  const bar = col * 0.56;
  const y = (v: number) => top + plot - (v / max) * plot;
  const last = data.length - 1;
  const ticks = Array.from({ length: max / 20 + 1 }, (_, i) => i * 20);

  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Steam hours per month over the last ${data.length} months. Peak ${peak} hours; ${data[last].hours} hours so far this month.`}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={left} x2={W} y1={y(t)} y2={y(t)} stroke="rgb(240 232 214 / 0.14)" strokeWidth={1} />
            <text x={left - 10} y={y(t) + 4} textAnchor="end" fontSize={12} fill="#b3aaa6">
              {t === max ? `${t} h` : t}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = left + i * col + (col - bar) / 2;
          const now = i === last;
          const labelled = now || d.hours === peak;
          return (
            <g key={d.month}>
              {now && <rect x={left + i * col + 2} y={top - 4} width={col - 4} height={plot + 4} fill="#5a0f1e" />}
              <rect x={x} y={y(d.hours)} width={bar} height={top + plot - y(d.hours)} fill={now ? "#c9cdd3" : "rgb(240 232 214 / 0.32)"} />
              {labelled && (
                <text x={x + bar / 2} y={y(d.hours) - 8} textAnchor="middle" fontSize={13} fill="#ece7e1">
                  {d.hours}
                </text>
              )}
              <text x={x + bar / 2} y={H - 10} textAnchor="middle" fontSize={12} fill={now ? "#ece7e1" : "#b3aaa6"}>
                {d.month}
              </text>
            </g>
          );
        })}
      </svg>
      <table className="sr-only">
        <caption>Steam hours per month</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Hours</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.month}>
              <th scope="row">{d.month}</th>
              <td>{d.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
