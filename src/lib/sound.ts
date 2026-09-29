"use client";

// Tiny synthesized UI sounds (Web Audio, no files). Off by default; the
// visitor opts in from the nav and the choice is remembered.
import { useSyncExternalStore } from "react";

type Kind = "hover" | "click" | "open" | "close" | "toggle";

const KEY = "gm-sound";
let enabled = false;
let ctx: AudioContext | null = null;
const listeners = new Set<() => void>();

function read() {
  try {
    enabled = localStorage.getItem(KEY) === "on";
  } catch {
    enabled = false;
  }
}
if (typeof window !== "undefined") read();

function emit() {
  listeners.forEach((l) => l());
}

export function setSound(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {}
  emit();
  if (on) play("toggle");
}

export function useSound() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => enabled,
    () => false,
  );
}

const voices: Record<Kind, { f: [number, number]; d: number; g: number; type: OscillatorType }> = {
  hover: { f: [1800, 2200], d: 0.035, g: 0.025, type: "sine" },
  click: { f: [660, 440], d: 0.08, g: 0.06, type: "triangle" },
  open: { f: [420, 780], d: 0.12, g: 0.05, type: "sine" },
  close: { f: [780, 420], d: 0.12, g: 0.05, type: "sine" },
  toggle: { f: [520, 1040], d: 0.14, g: 0.06, type: "triangle" },
};

let last = 0;

export function play(kind: Kind) {
  if (!enabled || typeof window === "undefined") return;
  const now = performance.now();
  if (kind === "hover" && now - last < 60) return; // no machine-gun hovers
  last = now;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const v = voices[kind];
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = v.type;
    osc.frequency.setValueAtTime(v.f[0], t);
    osc.frequency.exponentialRampToValueAtTime(v.f[1], t + v.d);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(v.g, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + v.d);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + v.d + 0.02);
  } catch {}
}
