/**
 * The House Maulana crest: a wine-red circle with a thin black border and a
 * silver crescent, horns down, centred. Same geometry as
 * docs/offline/assets/moonwake/crest.svg. With `rise`, the moon rises into place
 * on load (CSS, see .ah-crest in offline.css); reduced motion shows it settled.
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
          <circle cx="200" cy="203" r="80" fill="#000" />
        </mask>
        <clipPath id="ah-crest-disc">
          <circle cx="200" cy="200" r="139" />
        </clipPath>
      </defs>
      <circle className="ah-crest-field" cx="200" cy="200" r="141" fill="#5A0F1E" stroke="#000" strokeWidth="4" />
      {/* Clipped to the field, so the rising moon appears from inside the circle. */}
      <g clipPath="url(#ah-crest-disc)">
        <g className="ah-crest-moon">
          <g transform="translate(0 55.6)">
            <circle cx="200" cy="170" r="88" fill="#C9CDD3" mask="url(#ah-crest-cut)" />
          </g>
        </g>
      </g>
    </svg>
  );
}
