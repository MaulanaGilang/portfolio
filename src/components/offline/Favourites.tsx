import type { Favourite } from "@/data/offline";
import { posterProps } from "./poster";

/** Three unranked lists. Pointing at a title shows its poster (see PosterHover). */
export function Favourites({ categories }: { categories: { id: string; label: string; items: Favourite[] }[] }) {
  return (
    <div className="ah-grid ah-grid-3">
      {categories.map((c) => (
        <div key={c.id} className="ah-frame ah-panel">
          <div className="ah-panel-head">
            <h3 className="ah-label">{c.label}</h3>
            <p className="ah-label">
              {c.items.length} {c.items.length === 1 ? "title" : "titles"}
            </p>
          </div>
          <ul className="ah-rows">
            {c.items.map((it) => (
              <li
                key={it.title}
                className="ah-fav !grid-cols-[1fr_auto]"
                {...posterProps({ title: it.title, poster: it.poster, clip: it.clip, meta: `${c.label}, ${it.year}` })}
              >
                <span className="text-[var(--bone)]">{it.title}</span>
                <span className="ah-num text-[14px] text-[var(--ash)]">{it.year}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
