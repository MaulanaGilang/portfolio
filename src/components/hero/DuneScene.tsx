"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/*
  Raw data in, trusted data out, as a living pipeline over a dune field.

  The field: transverse dunes displaced once on the CPU and baked into a
  height texture, shaded in Dune Part One's light (sun-warm sand, teal lee
  shadows, wind ripples, mist pooling low), with sand drifting off the crests.

  The pipeline: every block is one instance of a single mesh, moved on a
  shared clock in the vertex shader. Raw blocks rise out of the sand at the
  left and tumble loosely over the dunes; in the middle the keepers flash
  spice while they're pulled into line and the rejects sink back into the
  sand; on the right they ride over the dunes as teal record batches in
  ordered lanes. The pointer pushes blocks aside; scrolling runs it faster.
*/

// ---------- terrain height (shared by the mesh, the height texture and nothing else) ----------
function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function vnoise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}
/** Transverse dunes: long crests across the wind, a gentle windward slope and a steep slip face. */
function dune(x: number, z: number) {
  const warp = vnoise(x * 0.035, z * 0.035) * 6 + vnoise(x * 0.09 + 3, z * 0.09) * 1.6;
  const t = x * 0.13 + Math.sin(z * 0.06) * 1.3 + warp * 0.32;
  const f = t - Math.floor(t);
  const crest = f < 0.82 ? f / 0.82 : (1 - f) / 0.18;
  const s = Math.pow(crest * crest * (3 - 2 * crest), 1.15);
  const amp = 0.55 + 0.8 * vnoise(x * 0.045 + 10, z * 0.045 - 4);
  return s * 2.0 * amp + vnoise(x * 0.14, z * 0.14) * 0.4 + vnoise(x * 0.6, z * 0.6) * 0.05 - 0.6;
}

// Terrain extents (world units).
const X0 = -70;
const XW = 140;
const Z0 = -75;
const ZD = 90;

/**
 * The height the filed lanes fly at: just above the highest sand along their path and in front
 * of it (toward the camera), so no crest cuts through a lane or hides it.
 */
function laneHeight(flowZ: number) {
  let top = -Infinity;
  for (let x = -22; x <= 22; x += 0.25) for (let z = flowZ - 1.2; z <= flowZ + 4; z += 0.25) top = Math.max(top, dune(x, z));
  return top + 0.45;
}

/** Heights baked into a half-float texture so the shaders can sit blocks and sand exactly on the dunes. */
function buildHeightTexture() {
  const W = 512;
  const H = 330;
  const data = new Uint16Array(W * H);
  for (let j = 0; j < H; j++)
    for (let i = 0; i < W; i++) {
      const x = X0 + (i / (W - 1)) * XW;
      const z = Z0 + (j / (H - 1)) * ZD;
      data[j * W + i] = THREE.DataUtils.toHalfFloat(dune(x, z));
    }
  const tex = new THREE.DataTexture(data, W, H, THREE.RedFormat, THREE.HalfFloatType);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

// ---------- shared shader chunks ----------
const heightChunk = /* glsl */ `
  uniform sampler2D uHeight;
  float ground(vec2 xz) {
    vec2 uv = vec2((xz.x - (${X0.toFixed(1)})) / ${XW.toFixed(1)}, (xz.y - (${Z0.toFixed(1)})) / ${ZD.toFixed(1)});
    return texture2D(uHeight, clamp(uv, 0.0, 1.0)).r;
  }
`;

const fogChunk = /* glsl */ `
  uniform vec3 uFog;
  uniform float uDensity;
  float fogAmount(vec3 world) {
    float d = length(cameraPosition - world);
    float f = 1.0 - exp(-pow(d * uDensity, 2.0));
    // Mist pools low: the ground fogs faster than what stands above it.
    f = max(f, (1.0 - smoothstep(-0.6, 2.2, world.y)) * smoothstep(9.0, 44.0, d));
    return clamp(f, 0.0, 1.0);
  }
`;

// ---------- terrain ----------
const terrainVert = /* glsl */ `
  varying vec3 vWorld;
  varying vec3 vN;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const terrainFrag = /* glsl */ `
  uniform vec3 uSun;
  uniform vec3 uLit;
  uniform vec3 uWarm;
  uniform vec3 uShade;
  uniform vec3 uDeep;
  varying vec3 vWorld;
  varying vec3 vN;
  ${fogChunk}

  float h21(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 15731.743); }
  float n21(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y);
  }

  void main() {
    vec3 N = normalize(vN);
    float dist = length(cameraPosition - vWorld);

    // Wind ripples run parallel to the dune crests (iso-lines of the same phase field),
    // everywhere but the steep slip faces, fading with distance.
    float field = vWorld.x * 0.13 + sin(vWorld.z * 0.06) * 1.3 + n21(vWorld.xz * 0.035) * 1.9;
    float phase = field * 6.2831 * 11.0 + n21(vWorld.xz * 0.5) * 2.5;
    float mask = smoothstep(0.5, 0.78, N.y) * (1.0 - smoothstep(5.0, 28.0, dist));
    N = normalize(N + vec3(cos(phase), 0.0, cos(phase) * 0.15) * 0.3 * mask);

    vec3 L = normalize(uSun);
    float diff = dot(N, L);
    float lit = smoothstep(-0.25, 0.7, diff);
    // Teal in the lee, deeper in the troughs; warm on the faces that catch the low sun.
    vec3 shade = mix(uDeep, uShade, smoothstep(-0.8, 1.2, vWorld.y));
    vec3 col = mix(shade, uLit, lit);
    col = mix(col, uWarm, smoothstep(0.3, 0.8, diff) * 0.45);
    // A thin bright line along the crests, where the slip face breaks.
    float crest = smoothstep(0.55, 0.95, N.x) * smoothstep(0.6, 1.6, vWorld.y);
    col += crest * 0.05;
    // Fine grain so the gradients never band.
    col += (h21(floor(vWorld.xz * 24.0)) - 0.5) * 0.012 * (1.0 - smoothstep(4.0, 16.0, dist));

    col = mix(col, uFog, fogAmount(vWorld));
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

// ---------- the pipeline ----------
const ROWS = 4; // stacked lanes
const COLS = 3; // lanes in depth
const LANES = ROWS * COLS;
const BATCH = 3; // blocks per record batch
const FLOW_Z = -5.5; // the depth the pipeline runs at

const blockVert = /* glsl */ `
  uniform float uTime;
  uniform float uW;
  uniform vec3 uMouse;
  uniform float uMouseForce;
  uniform float uLaneY;
  uniform vec3 uRaw;
  uniform vec3 uHeat;
  uniform vec3 uFiled;
  uniform vec3 uTop;
  attribute vec4 aSeed;
  attribute float aLane;
  attribute float aOffset;
  attribute float aKeep;
  attribute float aK;
  varying vec3 vWorld;
  varying vec3 vN;
  varying vec3 vCol;
  varying float vHeat;
  ${heightChunk}

  vec3 rotateAxis(vec3 v, vec3 k, float a) {
    float c = cos(a), s = sin(a);
    return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c);
  }

  void main() {
    vec4 s = aSeed;
    float t = uTime;
    float p = fract(aOffset + t * 0.018);
    float x = -uW * 0.5 + p * uW;

    float order = smoothstep(0.34, 0.62, p) * aKeep;
    float drop = (1.0 - aKeep) * smoothstep(0.3 + s.x * 0.1, 0.5 + s.x * 0.1, p);

    // Raw: loose over the sand, risen out of it at the far left.
    float rz = ${FLOW_Z.toFixed(1)} + (s.w - 0.5) * 3.6;
    float rx = x + (s.z - 0.5) * 1.8 + sin(t * 0.4 + s.y * 6.2831) * 0.3;
    float g = ground(vec2(rx, rz));
    float rise = smoothstep(0.0, 0.1, p);
    vec3 raw = vec3(rx, g + mix(-0.35, 0.25 + s.y * 1.25, rise) + sin(t * (0.5 + s.z) + s.w * 6.2831) * 0.12 * rise, rz);

    // Modeled: record batches in level, ordered lanes, held just above the highest sand they cross.
    float row = mod(aLane, ${ROWS}.0);
    float col = floor(aLane / ${ROWS}.0);
    float mx = x + aK * 0.3;
    float mz = ${FLOW_Z.toFixed(1)} + (col - ${((COLS - 1) / 2).toFixed(1)}) * 0.75;
    vec3 modeled = vec3(mx, uLaneY + row * 0.42, mz);

    vec3 center = mix(raw, modeled, order);
    // Rejects sink back into the sand.
    center.y = mix(center.y, ground(center.xz) - 0.6, smoothstep(0.0, 1.0, drop));

    // The pointer pushes blocks aside: loose ones more than filed ones.
    vec2 d = center.xy - uMouse.xy;
    float f = exp(-dot(d, d) / 1.8) * uMouseForce;
    center.xy += normalize(d + 1e-4) * f * mix(1.3, 0.45, order);

    vec3 axis = normalize(s.xyz - 0.5 + 1e-3);
    float angle = (t * (0.35 + s.w * 0.7) + s.x * 6.2831) * (1.0 - order);
    float edge = smoothstep(0.0, 0.05, p) * (1.0 - smoothstep(0.93, 1.0, p));
    float scale = mix(0.12 + s.w * 0.15, 0.25, order) * (1.0 - smoothstep(0.2, 1.0, drop)) * edge;

    vec3 local = rotateAxis(position * scale, axis, angle);
    vec3 n = rotateAxis(normal, axis, angle);
    vec4 w = modelMatrix * vec4(center + local, 1.0);
    vWorld = w.xyz;
    vN = normalize(mat3(modelMatrix) * n);
    gl_Position = projectionMatrix * viewMatrix * w;

    float heat = smoothstep(0.36, 0.46, p) * (1.0 - smoothstep(0.56, 0.66, p)) * aKeep;
    float filed = smoothstep(0.56, 0.66, p) * aKeep;
    vec3 filedCol = mix(uFiled, uTop, step(${(ROWS - 1).toFixed(1)}, row) * 0.6);
    vCol = mix(mix(uRaw, uHeat, heat), filedCol, filed);
    vHeat = heat;
  }
`;

const blockFrag = /* glsl */ `
  uniform vec3 uSun;
  uniform vec3 uSky;
  uniform vec3 uGround;
  uniform vec3 uHeat;
  varying vec3 vWorld;
  varying vec3 vN;
  varying vec3 vCol;
  varying float vHeat;
  ${fogChunk}
  void main() {
    vec3 N = normalize(vN);
    vec3 L = normalize(uSun);
    vec3 V = normalize(cameraPosition - vWorld);
    vec3 hemi = mix(uGround, uSky, N.y * 0.5 + 0.5);
    float diff = max(dot(N, L), 0.0);
    float spec = pow(max(dot(N, normalize(L + V)), 0.0), 56.0) * 0.3;
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0) * 0.25;
    vec3 col = vCol * (hemi * 0.72 + diff * 0.62) + spec + fres * uSky * 0.5 + uHeat * vHeat * 0.35;
    col = mix(col, uFog, fogAmount(vWorld) * 0.9);
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

// ---------- drifting sand ----------
const sandVert = /* glsl */ `
  uniform float uTime;
  uniform float uPx;
  attribute vec4 aSeed;
  varying float vAlpha;
  ${heightChunk}
  void main() {
    // Each grain skims downwind (+x) a little above the surface, hopping as it goes.
    float span = 46.0;
    float x = mod(aSeed.x * span + uTime * (0.6 + aSeed.y * 1.4), span) - span * 0.5;
    float z = -16.0 + aSeed.z * 20.0;
    float hop = abs(sin(uTime * (1.2 + aSeed.w * 2.0) + aSeed.x * 40.0)) * (0.08 + aSeed.w * 0.22);
    vec3 pos = vec3(x, ground(vec2(x, z)) + 0.04 + hop, z);
    vec4 mv = viewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPx * (0.6 + aSeed.y) / -mv.z;
    float edge = smoothstep(0.0, 0.08, (x + span * 0.5) / span) * (1.0 - smoothstep(0.92, 1.0, (x + span * 0.5) / span));
    vAlpha = edge * (1.0 - smoothstep(10.0, 30.0, -mv.z)) * (0.35 + aSeed.w * 0.5);
  }
`;

const sandFrag = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float a = smoothstep(0.5, 0.1, length(c)) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
    #include <colorspace_fragment>
  }
`;

// ---------- geometry ----------
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildTerrain(small: boolean) {
  const g = new THREE.PlaneGeometry(XW, ZD, small ? 170 : 300, small ? 110 : 200);
  g.rotateX(-Math.PI / 2);
  g.translate(X0 + XW / 2, 0, Z0 + ZD / 2);
  const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) p.setY(i, dune(p.getX(i), p.getZ(i)));
  g.computeVertexNormals();
  return g;
}

function buildBlocks(count: number, batches: number) {
  const rand = rng(20261115);
  const g = new RoundedBoxGeometry(1, 1, 1, 2, 0.12);
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

function buildSand(count: number) {
  const rand = rng(7);
  const g = new THREE.BufferGeometry();
  const seeds = new Float32Array(count * 4);
  for (let i = 0; i < count * 4; i++) seeds[i] = rand();
  g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 4));
  // Positions are computed in the shader; three still wants a position attribute for the draw count.
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  return g;
}

// ---------- scene ----------
const palette = {
  fog: "#e6edeb", // the page's mist
  lit: "#ecdfca", // sun on sand
  warm: "#f3dcb8", // faces square to the low sun
  shade: "#9fb3ae", // Part One's teal lee shadow
  deep: "#7f9893", // trough shadow
  raw: "#a8957a", // blocks still made of sand
  heat: "#d35c11", // spice, while sorting
  filed: "#3f6b6b", // record batches
  top: "#a6c7c5", // the top row of each batch
  sky: "#f4f7f6",
  ground: "#c9b79c",
  grain: "#f1e6d2",
};

type Pointer = { x: number; y: number; active: boolean };

function Field({ pointer, small, calm }: { pointer: React.RefObject<Pointer>; small: boolean; calm: boolean }) {
  const { camera, size, gl } = useThree();
  const heightTex = useMemo(() => buildHeightTexture(), []);
  const terrain = useMemo(() => buildTerrain(small), [small]);
  const count = small ? 520 : 1300;
  const batches = small ? 5 : 7;
  const blocks = useMemo(() => buildBlocks(count, batches), [count, batches]);
  const sandCount = small ? 1800 : 4200;
  const sand = useMemo(() => buildSand(sandCount), [sandCount]);
  useEffect(
    () => () => {
      heightTex.dispose();
      terrain.dispose();
      blocks.dispose();
      sand.dispose();
    },
    [heightTex, terrain, blocks, sand],
  );

  const c = (h: string) => new THREE.Color(h);
  const shared = useMemo(
    () => ({
      uSun: { value: new THREE.Vector3(0.8, 0.34, -0.45) },
      uFog: { value: c(palette.fog) },
      uDensity: { value: 0.03 },
      uHeight: { value: heightTex },
    }),
    [heightTex],
  );
  const terrainUniforms = useMemo(
    () => ({ ...shared, uLit: { value: c(palette.lit) }, uWarm: { value: c(palette.warm) }, uShade: { value: c(palette.shade) }, uDeep: { value: c(palette.deep) } }),
    [shared],
  );
  const blockMat = useRef<THREE.ShaderMaterial>(null);
  const blockUniforms = useMemo(
    () => ({
      ...shared,
      uTime: { value: 8 },
      uW: { value: 26 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uMouseForce: { value: 0 },
      uLaneY: { value: laneHeight(FLOW_Z) },
      uRaw: { value: c(palette.raw) },
      uHeat: { value: c(palette.heat) },
      uFiled: { value: c(palette.filed) },
      uTop: { value: c(palette.top) },
      uSky: { value: c(palette.sky) },
      uGround: { value: c(palette.ground) },
    }),
    [shared],
  );
  const sandMat = useRef<THREE.ShaderMaterial>(null);
  const sandUniforms = useMemo(
    () => ({ uHeight: { value: heightTex }, uTime: { value: 0 }, uPx: { value: 40 }, uColor: { value: c(palette.grain) } }),
    [heightTex],
  );

  const st = useRef({ t: 8, mx: 0, my: 0, force: 0, lastY: 0, boost: 0, hit: new THREE.Vector3(99, 99, 0) });
  const tmp = useMemo(() => ({ v: new THREE.Vector3(), dir: new THREE.Vector3() }), []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const s = st.current;
    const cam = camera as THREE.PerspectiveCamera;

    // Scrolling runs the pipeline a little faster (read once per frame, no scroll listener).
    // Gentle and eased: at most about twice the resting pace, rising and settling over half a second,
    // so the blocks speed up like a current instead of lurching.
    const y = window.scrollY;
    const v = Math.min(Math.abs(y - s.lastY) / Math.max(dt, 1e-3) / 1400, 1);
    s.lastY = y;
    s.boost += (v - s.boost) * (1 - Math.pow(0.2, dt));
    s.t += dt * (calm ? 0.35 : 1 + s.boost * 1.1);

    // Pointer parallax and a slow drift; scrolling lifts the camera a little as the hero leaves.
    const p = pointer.current;
    const k = 1 - Math.pow(0.02, dt);
    s.mx += ((p.active ? p.x : 0) - s.mx) * k;
    s.my += ((p.active ? p.y : 0) - s.my) * k;
    const lift = Math.min(y / window.innerHeight, 1);
    cam.position.set(s.mx * 0.9 + Math.sin(s.t * 0.05) * 0.4, (small ? 3.4 : 2.9) + s.my * 0.3 + lift * 0.8, small ? 15 : 13.5);
    cam.lookAt(small ? 0.3 : 0.8, (small ? 1.2 : 1.6) + lift * 0.3, FLOW_Z - 2);

    const m = blockMat.current;
    if (m) {
      const u = m.uniforms;
      u.uTime.value = s.t;
      const dist = cam.position.z - FLOW_Z;
      const visH = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * dist;
      u.uW.value = visH * (size.width / size.height) * 1.2;
      if (p.active) {
        tmp.v.set(p.x, p.y, 0.5).unproject(cam);
        tmp.dir.copy(tmp.v).sub(cam.position).normalize();
        const tt = (FLOW_Z - cam.position.z) / tmp.dir.z;
        s.hit.copy(cam.position).addScaledVector(tmp.dir, tt);
      }
      u.uMouse.value.lerp(s.hit, k);
      s.force += ((p.active ? 1 : 0) - s.force) * k * 0.5;
      u.uMouseForce.value = s.force;
    }
    if (sandMat.current) {
      sandMat.current.uniforms.uTime.value = s.t;
      sandMat.current.uniforms.uPx.value = 36 * gl.getPixelRatio() * (size.height / 900);
    }
  });

  return (
    <>
      <mesh geometry={terrain} frustumCulled={false}>
        <shaderMaterial vertexShader={terrainVert} fragmentShader={terrainFrag} uniforms={terrainUniforms} />
      </mesh>
      <points geometry={sand} frustumCulled={false}>
        <shaderMaterial
          ref={sandMat}
          vertexShader={sandVert}
          fragmentShader={sandFrag}
          uniforms={sandUniforms}
          transparent
          depthWrite={false}
        />
      </points>
      <instancedMesh args={[blocks, undefined, count]} frustumCulled={false}>
        <shaderMaterial ref={blockMat} vertexShader={blockVert} fragmentShader={blockFrag} uniforms={blockUniforms} />
      </instancedMesh>
    </>
  );
}

export default function DuneScene({ active = true, calm = false }: { active?: boolean; calm?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0, active: false });
  const small = typeof window !== "undefined" && window.innerWidth < 768;

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

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        flat
        camera={{ position: [0, 2.9, 13.5], fov: 38, near: 0.1, far: 140 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active ? "always" : "demand"}
        aria-hidden
      >
        <Field pointer={pointer} small={small} calm={calm} />
      </Canvas>
    </div>
  );
}
