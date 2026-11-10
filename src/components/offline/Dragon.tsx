/**
 * The Archmagus's familiar: a small silver dragon curled asleep. Point at it (or
 * focus it) and it opens one red-violet eye and lifts its head a little.
 * Decorative; the caption says what it is for screen readers and on hover.
 */
export function Dragon() {
  return (
    <span className="ah-dragon" tabIndex={0} role="img" aria-label="The Archmagus's familiar: a small dragon, asleep">
      <svg viewBox="0 0 120 80" aria-hidden>
        {/* Tail: wraps along the bottom and ends in a spade under the head */}
        <path className="ah-dragon-body" fill="none" strokeWidth="7" strokeLinecap="round" d="M98 56 C94 72 72 75 56 71" />
        <path className="ah-dragon-fill" d="M57 71 L47 66 L49 73 L43 78 L54 76Z" />
        {/* Body: a coil from the tail, over the top, down to the neck */}
        <path className="ah-dragon-body" fill="none" strokeWidth="13" strokeLinecap="round" d="M98 56 C108 36 88 17 62 17 C40 17 24 30 23 45" />
        {/* Folded wing on the back */}
        <path className="ah-dragon-fill" d="M50 19 L45 5 L56 11 L64 3 L67 16 L77 10 L76 22Z" />
        {/* Spines down the far side */}
        <path className="ah-dragon-fill" d="M95 25 L104 21 L100 31Z M103 38 L112 36 L106 45Z" />
        {/* Head, resting on the tail; it lifts when woken */}
        <g className="ah-dragon-head">
          <path className="ah-dragon-fill" d="M9 58 C9 49 19 47 28 50 L44 56 C47 57 47 61 44 62 L24 66 C14 67 9 64 9 58Z" />
          <path className="ah-dragon-fill" d="M13 52 L4 44 L17 49Z M19 49 L14 38 L24 48Z" />
          <path className="ah-dragon-eye-shut" fill="none" strokeWidth="1.6" strokeLinecap="round" d="M21 56.5 Q24.5 58.6 28 56.5" />
          <circle className="ah-dragon-eye" cx="24.5" cy="56.5" r="2.4" />
        </g>
      </svg>
      <span className="ah-dragon-caption ah-label">The Archmagus&apos;s familiar</span>
    </span>
  );
}
