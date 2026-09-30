"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "motion/react";

/*
  Raw → Refined. Every particle travels left to right on a shared clock.
  Left third: scattered "raw" records (ink, random sizes, noisy drift).
  Middle: they are pulled toward lanes ("cleaning").
  Right: they march in tidy cobalt packets along fixed lanes ("modeled").
  The cursor pushes particles aside. All motion is computed on the GPU.
*/

const LANES = 7;
const PACKET = 7; // dots per packet in the modeled zone

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uSize;
  uniform vec2 uMouse;
  uniform float uMouseForce;
  uniform float uPixelRatio;
  uniform float uBandY;
  uniform float uBandH;
  uniform float uScroll;

  attribute vec4 aSeed;
  attribute float aLane;
  attribute float aOffset;
  attribute float aKeep;

  varying float vOrder;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    float speed = 0.028 + uScroll * 0.05;
    float p = fract(aOffset + uTime * speed);

    float W = uSize.x * 1.08;
    float x = -W * 0.5 + p * W;

    // 0 = raw, 1 = modeled. The cleaning stage sits between the gates.
    // Records that fail cleaning (aKeep = 0) never order; they sink and fade out.
    float order = smoothstep(0.30, 0.66, p) * aKeep;
    float drop = (1.0 - aKeep) * smoothstep(0.26 + aSeed.x * 0.14, 0.52 + aSeed.x * 0.1, p);

    // Raw position: scattered around the band, drifting on slow sine noise.
    float t = uTime * 0.6;
    float rawY = uBandY + (aSeed.y - 0.5) * uBandH * 1.35
               + sin(t * (0.6 + aSeed.z) + aSeed.w * 6.2831) * uBandH * 0.12;
    float rawX = x + (aSeed.z - 0.5) * 90.0 + cos(t * (0.5 + aSeed.x) + aSeed.y * 6.2831) * 18.0;

    // Modeled position: fixed lane.
    float laneGap = uBandH / float(${LANES});
    float laneY = uBandY + (aLane - float(${LANES - 1}) * 0.5) * laneGap;

    vec2 pos = vec2(mix(rawX, x, order), mix(rawY, laneY, order));
    pos.y -= drop * (40.0 + aSeed.y * 60.0);

    // Cursor pushes particles away (raw ones scatter more).
    vec2 d = pos - uMouse;
    float r = 120.0;
    float f = exp(-dot(d, d) / (r * r)) * uMouseForce;
    pos += normalize(d + 0.0001) * f * mix(70.0, 34.0, order);

    vOrder = order;
    vSeed = aSeed.x;
    // Fade in/out at the edges of the stream.
    vAlpha = smoothstep(0.0, 0.07, p) * (1.0 - smoothstep(0.93, 1.0, p)) * (1.0 - drop);

    float rawSize = mix(1.6, 4.6, aSeed.w * aSeed.w);
    float size = mix(rawSize, 3.0, order) * (1.0 + f * 0.6) * (1.0 - drop * 0.5);
    gl_PointSize = size * uPixelRatio;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uRaw;
  uniform vec3 uClean;
  uniform vec3 uRefined;
  uniform float uFade;
  varying float vOrder;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float edge = 1.0 - smoothstep(0.38, 0.5, d);
    // raw (grey) -> cleaning (indigo) -> modeled (gold, the "Gold layer")
    vec3 col = mix(uRaw, uClean, smoothstep(0.05, 0.45, vOrder));
    col = mix(col, uRefined, smoothstep(0.6, 0.95, vOrder));
    float a = mix(0.22 + vSeed * 0.45, 1.0, vOrder) * vAlpha * edge * uFade;
    gl_FragColor = vec4(col, a);
  }
`;

/** Seeded PRNG (mulberry32) so the field is identical on every mount. */
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGeometry(count: number) {
  const rand = rng(20260929);
  const g = new THREE.BufferGeometry();
  const seeds = new Float32Array(count * 4);
  const lanes = new Float32Array(count);
  const offsets = new Float32Array(count);
  const keep = new Float32Array(count);
  const positions = new Float32Array(count * 3); // required by three; real position is computed in the shader

  // Survivors: evenly spaced packets of PACKET dots on each lane. Everything else is dropped while cleaning.
  const packets = count > 8000 ? 34 : 18;
  const dot = count > 8000 ? 0.0028 : 0.0042; // spacing inside a packet, as a fraction of the stream
  const kept = LANES * packets * PACKET;
  for (let i = 0; i < count; i++) {
    seeds.set([rand(), rand(), rand(), rand()], i * 4);
    lanes[i] = i % LANES;
    if (i < kept) {
      const j = Math.floor(i / LANES);
      const packet = Math.floor(j / PACKET);
      const k = j % PACKET;
      keep[i] = 1;
      // Staggered between lanes so packets don't line up vertically.
      offsets[i] = packet / packets + k * dot + lanes[i] * 0.137 + rand() * 0.002;
    } else {
      keep[i] = 0;
      offsets[i] = rand();
    }
  }
  g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 4));
  g.setAttribute("aLane", new THREE.BufferAttribute(lanes, 1));
  g.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));
  g.setAttribute("aKeep", new THREE.BufferAttribute(keep, 1));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
  return g;
}

function Particles({
  count,
  mouse,
  scroll,
  calm,
}: {
  count: number;
  mouse: React.RefObject<{ x: number; y: number; active: boolean }>;
  scroll?: MotionValue<number>;
  calm: boolean;
}) {
  const { size, viewport } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null);
  const smooth = useRef({ x: 0, y: 0, force: 0 });

  const geometry = useMemo(() => buildGeometry(count), [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 8 },
      uSize: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(9999, 9999) },
      uMouseForce: { value: 0 },
      uPixelRatio: { value: 1 },
      uBandY: { value: 0 },
      uBandH: { value: 200 },
      uScroll: { value: 0 },
      uFade: { value: 0 },
      // Lit for the dark stage: lavender-grey records, electric indigo while cleaning, gold when modeled.
      uRaw: { value: new THREE.Color("#c9ccdc") },
      uClean: { value: new THREE.Color("#4152ff") },
      // A shade lighter than the UI gold: tiny points on a dark stage otherwise read as orange.
      uRefined: { value: new THREE.Color("#ffd04d") },
    }),
    [],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m) return;
    const u = m.uniforms;
    const dt = Math.min(delta, 1 / 30);
    const W = size.width;
    const H = size.height;
    u.uSize.value.set(W, H);
    u.uPixelRatio.value = viewport.dpr;
    // Band sits in the upper part of the hero, above the name.
    // The canvas now fills the rounded stage: centre the band, a touch low to clear the stage labels.
    u.uBandY.value = -H * 0.04;
    u.uBandH.value = Math.min(H * 0.5, 320);
    u.uTime.value += dt * (calm ? 0.35 : 1);
    u.uScroll.value = calm ? 0 : (scroll?.get() ?? 0);
    u.uFade.value = Math.min(1, u.uFade.value + dt * 1.2);

    const s = smooth.current;
    const target = mouse.current;
    const k = 1 - Math.pow(0.001, dt);
    if (target.active) {
      s.x += (target.x - s.x) * k;
      s.y += (target.y - s.y) * k;
    }
    s.force += ((target.active ? 1 : 0) - s.force) * k * 0.6;
    u.uMouse.value.set(s.x, s.y);
    u.uMouseForce.value = s.force;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function PipelineScene({
  scroll,
  calm = false,
  active = true,
}: {
  scroll?: MotionValue<number>;
  /** Reduced motion: slow ambient drift, no scroll coupling. */
  calm?: boolean;
  /** False while the hero is off-screen, so the GPU rests. */
  active?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 9999, y: 9999, active: false });

  // Pointer in canvas-centred pixels (y up), tracked on the whole hero.
  useEffect(() => {
    const el = wrap.current?.parentElement;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = wrap.current!.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left - r.width / 2;
      mouse.current.y = -(e.clientY - r.top - r.height / 2);
      mouse.current.active = true;
    };
    const leave = () => {
      mouse.current.active = false;
    };
    const up = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") leave();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", move);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", move);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerup", up);
    };
  }, []);

  const count = window.innerWidth < 768 ? 5200 : 12600;

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 1 }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={active ? "always" : "never"}
        aria-hidden
      >
        <Particles count={count} mouse={mouse} scroll={scroll} calm={calm} />
      </Canvas>
    </div>
  );
}
