/**
 * The House Maulana crest: a wine-red circle with a thin black border and the
 * crescent over the pool: a silver crescent, horns down, arching over a full
 * silver moon, centred (flat master: docs/offline/assets/moonwake/crest.svg).
 * On the page it sits in the scene rather than on it: the wine field is slightly
 * translucent so the mist shows through, it darkens a little towards its edge,
 * and a fine grain gives it a painted texture. With `rise`, the moon rises into place on load (CSS,
 * see .ah-crest in offline.css); reduced motion shows it settled.
 */
export function Crest({ rise = false, className = "", title }: { rise?: boolean; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`ah-crest ${rise ? "ah-crest-rise" : ""} ${className}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <mask id="ah-crest-cut" maskUnits="userSpaceOnUse">
          <rect width="400" height="400" fill="#fff" />
          <circle cx="200" cy="245" r="62" fill="#000" />
        </mask>
        <clipPath id="ah-crest-disc">
          <circle cx="200" cy="200" r="139" />
        </clipPath>
        {/* Wine, lit from above-centre and falling into shadow at the rim. */}
        <radialGradient id="ah-crest-field" cx="0.5" cy="0.42" r="0.62">
          <stop offset="0" stopColor="#661425" stopOpacity="0.86" />
          <stop offset="1" stopColor="#3e0a15" stopOpacity="0.9" />
        </radialGradient>
        {/* Moon silver, one light across the whole mark: brighter on the crescent's upper curve. */}
        <linearGradient id="ah-crest-moon" gradientUnits="userSpaceOnUse" x1="0" y1="115" x2="0" y2="285">
          <stop offset="0" stopColor="#e9ebef" />
          <stop offset="1" stopColor="#bfc3cb" />
        </linearGradient>
        <filter id="ah-crest-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.16 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      <circle className="ah-crest-field" cx="200" cy="200" r="141" fill="url(#ah-crest-field)" stroke="#000" strokeWidth="4" />
      <g clipPath="url(#ah-crest-disc)">
        {/* Painted grain over the field */}
        <rect className="ah-crest-field" x="59" y="59" width="282" height="282" fill="#000" filter="url(#ah-crest-grain)" />
        {/* The crescent over the pool, which rises inside the circle on load */}
        <g className="ah-crest-moon">
          <circle cx="200" cy="205" r="90" fill="url(#ah-crest-moon)" mask="url(#ah-crest-cut)" />
          <circle cx="200" cy="245" r="40" fill="url(#ah-crest-moon)" />
        </g>
      </g>
    </svg>
  );
}
