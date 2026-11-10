/**
 * The Archmagus's familiar: a silver dragon asleep in the corner. Point at it (or
 * focus it) and one red-violet eye opens. The shape is a mask
 * (public/offline/dragon.png, white with the dragon in the alpha channel).
 */
export function Dragon() {
  return (
    <span className="ah-dragon" tabIndex={0} role="img" aria-label="A small silver dragon, asleep">
      <span className="ah-dragon-shape" aria-hidden />
      <span className="ah-dragon-eye" aria-hidden />
    </span>
  );
}
