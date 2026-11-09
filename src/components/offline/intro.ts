/** Set on <html> while the arrival grains are forming; hides the printed sigil. */
export const INTRO_FLAG = "ahIntro";

/**
 * Runs before first paint on a direct visit to /offline: hides the printed
 * sigil so the grains can form it. (Client navigation sets the flag in Arrival.)
 */
export const introScript = `try{if(location.pathname.indexOf("/offline")===0&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.${INTRO_FLAG}=""}catch(e){}`;
