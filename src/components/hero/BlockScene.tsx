"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/*
  Raw → Refined, in 3D. Every block is one instance of a single rounded-box
  mesh (one draw call). Each travels left to right on a shared clock:
  raw   graphite blocks tumble loosely through space,
  clean the ones that pass validation flash acid lime while they're pulled into line,
        the rejects sink and shrink away,
  model survivors settle as electric-indigo "record batches" on a 4 x 3 grid of lanes.
  Position, rotation, colour and lighting are all computed in the shaders.
*/

const ROWS = 4;
const COLS = 3; // depth rows, so the modeled table reads as 3D
const LANES = ROWS * COLS;
const BATCH = 3; // blocks per record batch

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uW;
  uniform vec3 uMouse;
  uniform float uMouseForce;

  attribute vec4 aSeed;
  attribute float aLane;
  attribute float aOffset;
  attribute float aKeep;
  attribute float aK;

  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vColor;
  varying float vLime;

  uniform vec3 uRaw;
  uniform vec3 uLime;
  uniform vec3 uIndigo;

  vec3 rotateAxis(vec3 v, vec3 k, float a) {
    float c = cos(a), s = sin(a);
    return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c);
  }

  void main() {
    vec4 s = aSeed;
    float p = fract(aOffset + uTime * 0.022);
    float x = -uW * 0.5 + p * uW;

    float order = smoothstep(0.30, 0.64, p) * aKeep;
    float drop = (1.0 - aKeep) * smoothstep(0.28 + s.x * 0.12, 0.50 + s.x * 0.10, p);
    float t = uTime;

    vec3 raw = vec3(
      x + (s.z - 0.5) * 1.6 + sin(t * 0.4 + s.y * 6.2831) * 0.25,
      (s.y - 0.5) * 4.4 + sin(t * (0.5 + s.z) + s.w * 6.2831) * 0.35,
      (s.w - 0.5) * 4.4
    );
    float row = mod(aLane, ${ROWS}.0);
    float col = floor(aLane / ${ROWS}.0);
    vec3 modeled = vec3(x + aK * 0.38, (row - ${(ROWS - 1) / 2}) * 0.62, (col - ${(COLS - 1) / 2}.0) * 0.95);

    vec3 center = mix(raw, modeled, order);
    center.y -= drop * (1.5 + s.y * 2.0);

    // Cursor pushes blocks aside (loose raw ones more than filed ones).
    vec2 d = center.xy - uMouse.xy;
    float f = exp(-dot(d, d) / 1.6) * uMouseForce;
    center.xy += normalize(d + 1e-4) * f * mix(1.2, 0.45, order);

    vec3 axis = normalize(s.xyz - 0.5 + 1e-3);
    float angle = (t * (0.4 + s.w * 0.8) + s.x * 6.2831) * (1.0 - order);
    float edge = smoothstep(0.0, 0.06, p) * (1.0 - smoothstep(0.94, 1.0, p));
    // Rejects shrink all the way to nothing as they sink.
    float scale = mix(0.18 + s.w * 0.2, 0.3, order) * (1.0 - smoothstep(0.0, 0.85, drop)) * edge;

    vec3 local = rotateAxis(position * scale, axis, angle);
    vec3 n = rotateAxis(normal, axis, angle);

    vec4 mv = modelViewMatrix * vec4(center + local, 1.0);
    gl_Position = projectionMatrix * mv;
    vNormal = normalize(normalMatrix * n);
    vView = -mv.xyz;

    float lime = smoothstep(0.34, 0.46, p) * (1.0 - smoothstep(0.56, 0.66, p)) * aKeep;
    float indigo = smoothstep(0.56, 0.66, p) * aKeep;
    vColor = mix(mix(uRaw, uLime, lime), uIndigo, indigo);
    vLime = lime;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uSky;
  uniform vec3 uGround;
  uniform vec3 uLime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vColor;
  varying float vLime;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vView);
    vec3 L = normalize(vec3(-0.35, 0.8, 0.55));
    vec3 hemi = mix(uGround, uSky, N.y * 0.5 + 0.5);
    float diff = max(dot(N, L), 0.0);
    float spec = pow(max(dot(N, normalize(L + V)), 0.0), 60.0) * 0.45;
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0) * 0.35;
    vec3 col = vColor * (hemi * 0.7 + diff * 0.75) + spec + fres * vec3(0.9, 0.92, 1.0) * 0.6 + uLime * vLime * 0.25;
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
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

function buildGeometry(count: number, batches: number) {
  const rand = rng(20260930);
  const g = new RoundedBoxGeometry(1, 1, 1, 2, 0.2);
  const seeds = new Float32Array(count * 4);
  const lanes = new Float32Array(count);
  const offsets = new Float32Array(count);
  const keep = new Float32Array(count);
  const ks = new Float32Array(count);
  const kept = LANES * batches * BATCH;
  for (let i = 0; i < count; i++) {
    seeds.set([rand(), rand(), rand(), rand()], i * 4);
    if (i < kept) {
      const lane = i % LANES;
      const j = Math.floor(i / LANES);
      lanes[i] = lane;
      keep[i] = 1;
      ks[i] = j % BATCH;
      // Every block in a batch shares one clock position; lanes are staggered.
      offsets[i] = Math.floor(j / BATCH) / batches + lane * 0.071 + rand() * 0.004;
    } else {
      lanes[i] = i % LANES;
      offsets[i] = rand();
    }
  }
  g.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 4));
  g.setAttribute("aLane", new THREE.InstancedBufferAttribute(lanes, 1));
  g.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 1));
  g.setAttribute("aKeep", new THREE.InstancedBufferAttribute(keep, 1));
  g.setAttribute("aK", new THREE.InstancedBufferAttribute(ks, 1));
  return g;
}

type Pointer = { x: number; y: number; active: boolean };

function Blocks({ count, batches, pointer, calm }: { count: number; batches: number; pointer: React.RefObject<Pointer>; calm: boolean }) {
  const { size } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null);
  const smooth = useRef({ mx: 0, my: 0, force: 0, hit: new THREE.Vector3(99, 99, 0) });
  const tmp = useMemo(() => ({ v: new THREE.Vector3(), dir: new THREE.Vector3() }), []);

  const geometry = useMemo(() => buildGeometry(count, batches), [count, batches]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 6 },
      uW: { value: 20 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uMouseForce: { value: 0 },
      uRaw: { value: new THREE.Color("#1b1c22") },
      uLime: { value: new THREE.Color("#c1ff00") },
      uIndigo: { value: new THREE.Color("#1a2ffb") },
      uSky: { value: new THREE.Color("#ffffff") },
      uGround: { value: new THREE.Color("#9ea2b8") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m) return;
    const u = m.uniforms;
    const dt = Math.min(delta, 1 / 30);
    u.uTime.value += dt * (calm ? 0.35 : 1);

    const cam = state.camera as THREE.PerspectiveCamera;
    const visH = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.position.z;
    u.uW.value = visH * (size.width / size.height) * 1.15;

    // Camera drifts toward the pointer for parallax.
    const s = smooth.current;
    const p = pointer.current;
    const k = 1 - Math.pow(0.002, dt);
    s.mx += ((p.active ? p.x : 0) - s.mx) * k * 0.6;
    s.my += ((p.active ? p.y : 0) - s.my) * k * 0.6;
    cam.position.x = s.mx * 1.4;
    cam.position.y = 0.6 + s.my * 0.8;
    cam.lookAt(0, 0, 0);

    // Pointer ray onto the z = 0 plane.
    if (p.active) {
      tmp.v.set(p.x, p.y, 0.5).unproject(cam);
      tmp.dir.copy(tmp.v).sub(cam.position).normalize();
      const t = -cam.position.z / tmp.dir.z;
      s.hit.copy(cam.position).addScaledVector(tmp.dir, t);
    }
    u.uMouse.value.lerp(s.hit, k);
    s.force += ((p.active ? 1 : 0) - s.force) * k * 0.5;
    u.uMouseForce.value = s.force;
  });

  return (
    <instancedMesh args={[geometry, undefined, count]} frustumCulled={false}>
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </instancedMesh>
  );
}

export default function BlockScene({ calm = false, active = true }: { calm?: boolean; active?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0, active: false });

  // Pointer in normalised device coordinates of the frame.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      pointer.current.active = true;
    };
    const leave = () => {
      pointer.current.active = false;
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const small = window.innerWidth < 768;
  const count = small ? 650 : 1500;
  const batches = small ? 5 : 7;

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.6, 16], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active ? "always" : "never"}
        aria-hidden
      >
        <Blocks count={count} batches={batches} pointer={pointer} calm={calm} />
      </Canvas>
    </div>
  );
}
