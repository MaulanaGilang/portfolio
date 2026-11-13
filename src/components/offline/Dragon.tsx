/**
 * The Archmagus's familiar: a silver wyvern asleep in the footer. Point at it and
 * its red-violet eye opens. Decoration only; the map is reached from the Story
 * block's "Discover more". The shape is a mask (public/offline/dragon.png, white
 * with the wyvern in alpha).
 */
export function Dragon() {
  return (
    <span className="ah-dragon" aria-hidden>
      <span className="ah-dragon-shape" />
      <span className="ah-dragon-eye" />
    </span>
  );
}
