import type { ConceptTile } from "@/data/codex";

/**
 * A concept-art mosaic under a divider label, in the manner of a region page:
 * hovering or focusing a tile lifts it, frames it and shows a short caption.
 * Each tile opens the full image.
 */
export function ConceptGallery({ id, label, tiles }: { id: string; label: string; tiles: ConceptTile[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="cg">
      <div className="cg-divider">
        <span aria-hidden className="cg-divider-mark" />
        <h2 id={`${id}-title`} className="cg-divider-label">
          {label}
        </h2>
      </div>
      <ul className="cg-grid">
        {tiles.map((t) => (
          <li key={t.src} className="cg-tile" data-span={t.span}>
            <a href={t.src} target="_blank" rel="noopener noreferrer" className="cg-link">
              {/* eslint-disable-next-line @next/next/no-img-element -- concept art, already sized */}
              <img src={t.src} alt="" loading="lazy" />
              <span className="cg-caption">
                <span className="cg-caption-title">{t.title}</span>
                <span aria-hidden className="cg-caption-rule" />
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
