/**
 * The Archmagus's familiar: a silver wyvern (two legs, two wings) asleep in the
 * footer. Point at it and its red-violet eye opens. Decoration only. The shape is
 * a mask (public/offline/wyvern.png, white with the wyvern in alpha).
 */
export function Wyvern() {
  return (
    <span className="ah-wyvern" aria-hidden>
      <span className="ah-wyvern-shape" />
      <span className="ah-wyvern-eye" />
    </span>
  );
}
