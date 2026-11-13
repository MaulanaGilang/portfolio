import type { ConceptTile } from "@/data/codex";

/**
 * A concept-art mosaic under a centred title between ticked hairlines, laid out
 * like a region page's galleries. Hovering or focusing a tile lifts it, frames it
 * and shows a short caption; each tile opens the full image.
 */
export function ConceptGallery({ id, label, tiles }: { id: string; label: string; tiles: ConceptTile[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="hx-section cg">
      <div className="hx-rule hx-centre-head">
        <p className="hx-small">Concept art</p>
        <h2 id={`${id}-title`} className="hx-h2 mt-2">
          {label}
        </h2>
      </div>
      <ul className="cg-grid hx-pad">
        {tiles.map((t, k) => (
          <li key={t.src} className="cg-tile" data-span={t.span}>
            <a href={t.src} target="_blank" rel="noopener noreferrer" className="cg-link">
              {/* eslint-disable-next-line @next/next/no-img-element -- concept art, already sized */}
              <img src={t.src} alt="" loading="lazy" />
              <span aria-hidden className="cg-num hx-small-white">
                {String(k + 1).padStart(2, "0")}
              </span>
              <span className="cg-caption">
                <span className="cg-caption-title">{t.title}</span>
                <span aria-hidden className="hx-dot-mark" />
                <span className="cg-caption-text">{t.text}</span>
                <span className="sr-only"> (opens the full image in a new tab)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
