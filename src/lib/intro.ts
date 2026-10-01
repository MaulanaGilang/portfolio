"use client";

// Tracks the preloader so the hero can time itself around it:
// "done"    = the curtain has started lifting (hero entrance animations begin),
// "settled" = the curtain is fully gone (heavy work like the 3D loop may start;
//             running it under the moving curtain saturates the GPU and stutters the lift).
import { useSyncExternalStore } from "react";

const state = { done: false, settled: false };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function finishIntro() {
  if (state.done) return;
  state.done = true;
  emit();
}

export function settleIntro() {
  if (state.settled) return;
  state.done = true;
  state.settled = true;
  emit();
}

export function useIntroDone() {
  return useSyncExternalStore(subscribe, () => state.done, () => false);
}

export function useIntroSettled() {
  return useSyncExternalStore(subscribe, () => state.settled, () => false);
}
