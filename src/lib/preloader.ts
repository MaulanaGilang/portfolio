// Shared by the Preloader (client) and the root layout (server). It lives outside the
// "use client" component so the server receives the string, not a client reference.

export const PRELOADED_KEY = "gm-preloaded";

/** Runs before paint: skip the preloader on repeat visits within a session. */
export const preloaderScript = `try{if(sessionStorage.getItem("${PRELOADED_KEY}"))document.documentElement.dataset.preloaded=""}catch(e){}`;
