/**
 * Fragment shaders for the dithered scenes. Each scene defines `float scene(vec2 uv, vec2 cell)`
 * returning a shade in 0..1 (or < 0 for empty); the shared shell turns shade into
 * square dots with a 4×4 Bayer (ordered) dither, like a print screen.
 *
 * uv: y spans -1..1, x spans -uAspect..uAspect, origin at the canvas centre.
 * uProgress: 0..1 scroll progress through the section (drives "forming").
 */

const shell = (scene: string) => `#version 300 es
precision highp float;
uniform vec2 uCells;
uniform float uAspect;
uniform float uTime;
uniform float uProgress;
uniform vec2 uMouse;
uniform vec3 uInk;
uniform vec3 uInkLight;
uniform float uCellPx;
uniform float uGutter;
out vec4 o;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float bayer4(vec2 p) {
  ivec2 q = ivec2(mod(p, 4.0));
  int i = q.x + q.y * 4;
  float m[16] = float[16](0., 8., 2., 10., 12., 4., 14., 6., 3., 11., 1., 9., 15., 7., 13., 5.);
  return (m[i] + 0.5) / 16.0;
}
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
// Appears once scroll passes a per-cell random threshold between a and b.
float formed(vec2 cell, float a, float b) { return step(mix(a, b, hash(cell * 1.37 + 4.1)), uProgress); }

${scene}

void main() {
  vec2 px = gl_FragCoord.xy;
  vec2 cell = floor(px / uCellPx);
  vec2 inCell = px - cell * uCellPx;
  // Square dot with a thin gutter.
  if (inCell.x > uCellPx - uGutter || inCell.y > uCellPx - uGutter) { o = vec4(0.0); return; }
  // The cursor parts the dots: sample from further away near the pointer.
  vec2 d = cell - uMouse;
  float push = 9.0 * exp(-dot(d, d) / 160.0);
  vec2 sc = cell + normalize(d + 1e-4) * push;
  vec2 uv = (sc + 0.5 - uCells * 0.5) / (uCells.y * 0.5);
  float s = scene(uv, cell);
  if (s <= bayer4(cell)) { o = vec4(0.0); return; }
  vec3 c = mix(uInkLight, uInk, smoothstep(0.35, 0.9, s));
  o = vec4(c, 1.0);
}`;

// A glass prism: a loose, flickering beam of dots flows in from the left and
// leaves as three orderly parallel bands. Raw data in, trusted data out.
export const prism = shell(`
const float PX = -0.15;
float yaw() { return mix(-0.7, 0.35, uProgress) + 0.06 * sin(uTime * 0.4); }
float sdTriPrism(vec3 p, vec2 h) {
  vec3 q = abs(p);
  return max(q.z - h.y, max(q.x * 0.866025 + p.y * 0.5, -p.y) - h.x * 0.5);
}
float map(vec3 p) {
  p.x -= PX;
  p.y += 0.22;
  p.xz = rot(yaw()) * p.xz;
  p.yz = rot(0.22) * p.yz;
  return sdTriPrism(p, vec2(0.92, 0.5));
}
vec3 nor(vec3 p) {
  vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx)));
}
float hitPrism(vec2 uv) {
  // Cheap bound first: only cells near the prism pay for the raymarch.
  if (abs(uv.x - PX) > 0.8 || abs(uv.y) > 1.0) return -1.0;
  vec3 ro = vec3(uv, -3.0);
  float t = 0.0;
  for (int i = 0; i < 56; i++) {
    float d = map(ro + vec3(0, 0, t));
    if (d < 0.001) break;
    t += d;
    if (t > 6.0) return -1.0;
  }
  vec3 n = nor(ro + vec3(0, 0, t));
  float dif = max(dot(n, normalize(vec3(-0.55, 0.7, -0.6))), 0.0);
  float fre = pow(1.0 - abs(n.z), 1.5);
  // Glass: a readable body, dense edges and a strongly lit face, so it has volume.
  return clamp(0.28 + 0.5 * dif + 0.5 * fre, 0.0, 1.0);
}
float scene(vec2 uv, vec2 cell) {
  float p = hitPrism(uv);
  if (p >= 0.0) {
    if (formed(cell, 0.15, 0.55) > 0.5) return p;
    // Not yet formed: a faint flicker where the glass will be.
    return hash(cell + floor(uTime * 5.0)) < 0.07 ? 1.0 : -1.0;
  }
  float inX = PX - 0.42;   // left face, where the beam enters
  float outX = PX + 0.36;  // right face, where the bands leave
  // Incoming beam: converges on the prism, loose and flowing.
  if (uv.x < inX) {
    float f = (uv.x + uAspect) / (inX + uAspect);          // 0 at the left edge, 1 at the prism
    float cy = mix(0.42, 0.02, f);
    float w = mix(0.34, 0.07, f);
    float reach = clamp(uProgress / 0.3, 0.0, 1.0);
    if (abs(uv.y - cy) < w && f < reach) {
      float flow = hash(cell - vec2(floor(uTime * 9.0), 0.0));
      return flow < mix(0.18, 0.45, f) ? 1.0 : -1.0;
    }
    return -1.0;
  }
  // Outgoing bands: parallel, dense, ordered; drawn out as you scroll.
  if (uv.x > outX) {
    float reach = mix(outX, uAspect, clamp((uProgress - 0.5) / 0.45, 0.0, 1.0));
    if (uv.x > reach) return -1.0;
    for (int i = 0; i < 3; i++) {
      float fy = 0.26 - float(i) * 0.26;
      if (abs(uv.y - fy) < 0.075) return 0.95 - float(i) * 0.22;
    }
  }
  return -1.0;
}
`);

// A folded paper plane: assembles from dots, then banks and glides up and to the
// right with a dotted trail. Send a message.
export const plane = shell(`
float dot2(vec3 v) { return dot(v, v); }
float udTriangle(vec3 p, vec3 a, vec3 b, vec3 c) {
  vec3 ba = b - a, pa = p - a, cb = c - b, pb = p - b, ac = a - c, pc = p - c;
  vec3 nor = cross(ba, ac);
  return sqrt((sign(dot(cross(ba, nor), pa)) + sign(dot(cross(cb, nor), pb)) + sign(dot(cross(ac, nor), pc)) < 2.0)
    ? min(min(dot2(ba * clamp(dot(ba, pa) / dot2(ba), 0.0, 1.0) - pa), dot2(cb * clamp(dot(cb, pb) / dot2(cb), 0.0, 1.0) - pb)), dot2(ac * clamp(dot(ac, pc) / dot2(ac), 0.0, 1.0) - pc))
    : dot(nor, pa) * dot(nor, pa) / dot2(nor));
}
float glide() { return smoothstep(0.25, 1.0, uProgress); }
vec2 path(float e) { return mix(vec2(-0.45 * uAspect, -0.42), vec2(0.22 * uAspect, 0.18), e) + vec2(0.0, 0.12 * sin(e * 3.14159)); }
float map(vec3 p) {
  float e = glide();
  p.xy -= path(e);
  // Nose points up and to the right; the plane banks a little as it climbs.
  p.xy = rot(0.85 - 0.25 * e + 0.04 * sin(uTime * 0.8)) * p.xy;
  // Seen mostly from above, like the "send" icon: the centre fold shows between a
  // lit wing and a shaded one; a small roll reveals a sliver of keel.
  p.yz = rot(-1.0) * p.yz;
  p.xz = rot(0.2 + 0.25 * e) * p.xz;
  float S = 0.66;
  // Deep dihedral so the two wings catch different light, and a tall keel fold.
  vec3 N = vec3(0.0, 0.0, 1.0) * S, T = vec3(0.0, 0.0, -0.9) * S;
  vec3 L = vec3(-0.7, 0.32, -0.9) * S, R = vec3(0.7, 0.32, -0.9) * S, K = vec3(0.0, -0.36, -0.9) * S;
  float d = min(udTriangle(p, N, L, T), udTriangle(p, N, R, T));
  d = min(d, udTriangle(p, N, T, K));
  return d - 0.012;
}
vec3 nor(vec3 p) {
  vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx)));
}
float scene(vec2 uv, vec2 cell) {
  vec3 ro = vec3(uv, -3.0);
  float t = 0.0;
  bool hit = false;
  // Cheap bound first: only cells near the plane pay for the raymarch.
  if (length(uv - path(glide())) > 0.8) t = 7.0;
  for (int i = 0; i < 56; i++) {
    if (t > 6.0) break;
    float d = map(ro + vec3(0, 0, t));
    if (d < 0.001) { hit = true; break; }
    t += d;
    if (t > 6.0) break;
  }
  if (hit) {
    vec3 n = nor(ro + vec3(0, 0, t));
    float dif = abs(dot(n, normalize(vec3(-0.5, 0.75, -0.45))));
    // Wide tonal range: the lit wing reads dense, the shaded wing and keel sparse.
    float s = clamp(0.1 + 0.95 * dif * dif, 0.0, 1.0);
    if (formed(cell, 0.0, 0.4) > 0.5) return s;
    return hash(cell + floor(uTime * 5.0)) < 0.08 ? 1.0 : -1.0;
  }
  // Dotted trail along the flight path, thinning out behind the plane.
  float e = glide();
  if (e > 0.02) {
    float best = 1e3, at = 0.0;
    for (int i = 0; i <= 24; i++) {
      float k = e * float(i) / 24.0;
      float dd = length(uv - path(k));
      if (dd < best) { best = dd; at = k; }
    }
    float fade = at / e;
    if (best < 0.035 && mod(cell.x + cell.y, 3.0) < 1.0 && fade < 0.9) return fade * 0.8;
  }
  return -1.0;
}
`);
