/** Small crosshairs in the four corners of a full-bleed image. */
export function Corners() {
  return (
    <>
      {["tl", "tr", "bl", "br"].map((c) => (
        <span key={c} aria-hidden className={`hx-plus hx-plus-${c}`} />
      ))}
    </>
  );
}

/** A centred title between two ticked hairlines. */
export function CentreTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="hx-rule hx-centre-head">
      <h2 id={id} className="hx-h2">
        {children}
      </h2>
    </div>
  );
}

/**
 * A centred block over a full-bleed painting, with a line running down from it.
 * `short` makes a lower band (used above the Now Playing cards).
 */
export function StoryBlock({
  id,
  title,
  image,
  short = false,
  children,
}: {
  id: string;
  title: string;
  image: string;
  short?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`hx-story ${short ? "hx-story-short" : ""}`} aria-labelledby={`${id}-title`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed painting, already compressed */}
      <img src={image} alt="" loading="lazy" className="hx-bleed-img hx-drift" />
      <Corners />
      <div className="hx-story-copy">
        <h2 id={`${id}-title`} className="hx-h1">
          {title}
        </h2>
        <span aria-hidden className="hx-dot-mark mx-auto mt-4" />
        {children}
      </div>
      <span aria-hidden className="hx-story-line" />
    </section>
  );
}
