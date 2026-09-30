"use client";

import { useEffect, useRef } from "react";

/**
 * Liquid cursor trail: a small WebGL2 fluid simulation (stable fluids with
 * vorticity) behind the page content. The pointer injects velocity and "film
 * thickness"; the display pass maps thickness to thin-film interference colours,
 * so the trail reads like oil on water or a chemical sheen.
 *
 * Cost control: the simulation runs at 128 cells on the short side and draws at
 * half resolution, and the loop stops entirely a few seconds after the pointer
 * goes still. Skipped for reduced motion, touch-only devices, or no WebGL2.
 */

const SIM_RES = 128;
const DYE_RES = 512;
const PRESSURE_ITERATIONS = 18;
const CURL = 16;
const VELOCITY_DISSIPATION = 0.6;
const DYE_DISSIPATION = 1.6;
const SPLAT_FORCE = 3600;
const SPLAT_RADIUS = 0.0016;
const IDLE_MS = 4500;

const vert = `#version 300 es
precision highp float;
in vec2 aPos;
uniform vec2 texel;
out vec2 vUv; out vec2 vL; out vec2 vR; out vec2 vT; out vec2 vB;
void main() {
  vUv = aPos * 0.5 + 0.5;
  vL = vUv - vec2(texel.x, 0.0); vR = vUv + vec2(texel.x, 0.0);
  vT = vUv + vec2(0.0, texel.y); vB = vUv - vec2(0.0, texel.y);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const head = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
out vec4 o;
`;

const frag = {
  splat: `${head}
uniform sampler2D uTarget; uniform float aspect; uniform vec3 color; uniform vec2 point; uniform float radius;
void main() {
  vec2 p = vUv - point; p.x *= aspect;
  o = vec4(texture(uTarget, vUv).xyz + exp(-dot(p, p) / radius) * color, 1.0);
}`,
  advect: `${head}
uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 simTexel; uniform float dt; uniform float dissipation;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * simTexel;
  o = texture(uSource, coord) / (1.0 + dissipation * dt);
}`,
  divergence: `${head}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x, R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y, B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x; if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y; if (vB.y < 0.0) B = -C.y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,
  curl: `${head}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y, R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x, B = texture(uVelocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,
  vorticity: `${head}
uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
void main() {
  float L = texture(uCurl, vL).x, R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x, B = texture(uCurl, vB).x, C = texture(uCurl, vUv).x;
  vec2 f = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  f /= length(f) + 0.0001;
  f *= curl * C; f.y *= -1.0;
  o = vec4(clamp(texture(uVelocity, vUv).xy + f * dt, -1000.0, 1000.0), 0.0, 1.0);
}`,
  pressure: `${head}
uniform sampler2D uPressure; uniform sampler2D uDivergence;
void main() {
  float L = texture(uPressure, vL).x, R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x, B = texture(uPressure, vB).x;
  o = vec4((L + R + B + T - texture(uDivergence, vUv).x) * 0.25, 0.0, 0.0, 1.0);
}`,
  gradient: `${head}
uniform sampler2D uPressure; uniform sampler2D uVelocity;
void main() {
  float L = texture(uPressure, vL).x, R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x, B = texture(uPressure, vB).x;
  o = vec4(texture(uVelocity, vUv).xy - vec2(R - L, T - B), 0.0, 1.0);
}`,
  scale: `${head}
uniform sampler2D uTexture; uniform float value;
void main() { o = value * texture(uTexture, vUv); }`,
  // Thin-film interference: film thickness picks a hue band, so a thicker
  // stroke cycles through the rainbow the way an oil slick does. Softened
  // toward white so it sits on the lavender canvas instead of shouting.
  display: `${head}
uniform sampler2D uDye; uniform float time;
void main() {
  float t = texture(uDye, vUv).r;
  vec3 film = 0.5 + 0.5 * cos(6.28318 * (vec3(0.0, 0.33, 0.67) + t * 1.1 + time * 0.02));
  // Half-way to the lavender canvas: a faint pearly sheen, not a rainbow.
  film = mix(film, vec3(0.941, 0.945, 0.98), 0.5);
  float a = smoothstep(0.05, 0.8, t) * 0.24;
  o = vec4(film * a, a);
}`,
};

type Target = { tex: WebGLTexture; fb: WebGLFramebuffer; w: number; h: number };
type Double = { read: Target; write: Target; swap: () => void };

export function FluidCursor() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!host.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(any-pointer: fine)").matches) return;
    // A fresh canvas per mount: a canvas keeps its first context forever, so reusing
    // one after a cleanup (Strict Mode, HMR) would hand back the lost context.
    const canvas = document.createElement("canvas");
    canvas.className = "size-full";
    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
    if (!gl || !gl.getExtension("EXT_color_buffer_float")) return;
    host.current.appendChild(canvas);

    // ---- GL helpers -------------------------------------------------------
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, vert);
    const program = (src: string) => {
      const p = gl.createProgram()!;
      gl.attachShader(p, vs);
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, src));
      gl.bindAttribLocation(p, 0, "aPos");
      gl.linkProgram(p);
      const u: Record<string, WebGLUniformLocation> = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS) as number;
      for (let i = 0; i < n; i++) {
        const name = gl.getActiveUniform(p, i)!.name;
        u[name] = gl.getUniformLocation(p, name)!;
      }
      return { p, u };
    };
    const P = Object.fromEntries(Object.entries(frag).map(([k, src]) => [k, program(src)])) as Record<
      keyof typeof frag,
      ReturnType<typeof program>
    >;
    if (!gl.getProgramParameter(P.display.p, gl.LINK_STATUS)) return;

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const target = (w: number, h: number, internal: number, format: number): Target => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, gl.HALF_FLOAT, null);
      const fb = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return { tex, fb, w, h };
    };
    const double = (w: number, h: number, internal: number, format: number): Double => {
      const d = { read: target(w, h, internal, format), write: target(w, h, internal, format) } as Double;
      d.swap = () => ([d.read, d.write] = [d.write, d.read]);
      return d;
    };
    const free = (t: Target) => {
      gl.deleteTexture(t.tex);
      gl.deleteFramebuffer(t.fb);
    };

    const res = (base: number) => {
      const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
      const long = Math.round(base * Math.max(aspect, 1 / aspect));
      return aspect >= 1 ? [long, base] : [base, long];
    };

    let velocity: Double, dye: Double, pressure: Double, divergence: Target, curl: Target;
    const allocate = () => {
      // Half resolution is plenty for a soft fluid and quarters the fill cost.
      canvas.width = Math.max(1, Math.round(innerWidth * 0.5));
      canvas.height = Math.max(1, Math.round(innerHeight * 0.5));
      if (velocity) [velocity.read, velocity.write, dye.read, dye.write, pressure.read, pressure.write, divergence, curl].forEach(free);
      const [sw, sh] = res(SIM_RES);
      const [dw, dh] = res(DYE_RES);
      velocity = double(sw, sh, gl.RG16F, gl.RG);
      pressure = double(sw, sh, gl.R16F, gl.RED);
      divergence = target(sw, sh, gl.R16F, gl.RED);
      curl = target(sw, sh, gl.R16F, gl.RED);
      dye = double(dw, dh, gl.R16F, gl.RED);
    };
    allocate();

    let bound = 0;
    const bind = (prog: { p: WebGLProgram; u: Record<string, WebGLUniformLocation> }, texel: [number, number]) => {
      gl.useProgram(prog.p);
      // Passes that ignore the neighbour varyings may have `texel` optimised away.
      if (prog.u.texel) gl.uniform2f(prog.u.texel, texel[0], texel[1]);
      bound = 0;
      return prog.u;
    };
    const tex = (loc: WebGLUniformLocation, t: Target) => {
      gl.activeTexture(gl.TEXTURE0 + bound);
      gl.bindTexture(gl.TEXTURE_2D, t.tex);
      gl.uniform1i(loc, bound++);
    };
    const draw = (t: Target | null) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, t ? t.fb : null);
      gl.viewport(0, 0, t ? t.w : gl.drawingBufferWidth, t ? t.h : gl.drawingBufferHeight);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const texelOf = (t: Target): [number, number] => [1 / t.w, 1 / t.h];

    // ---- Simulation -------------------------------------------------------
    const splat = (x: number, y: number, dx: number, dy: number) => {
      const aspect = canvas.width / canvas.height;
      const radius = SPLAT_RADIUS * (aspect > 1 ? aspect : 1);
      let u = bind(P.splat, texelOf(velocity.read));
      tex(u.uTarget, velocity.read);
      gl.uniform1f(u.aspect, aspect);
      gl.uniform2f(u.point, x, y);
      gl.uniform3f(u.color, dx, dy, 0);
      gl.uniform1f(u.radius, radius);
      draw(velocity.write);
      velocity.swap();

      u = bind(P.splat, texelOf(dye.read));
      tex(u.uTarget, dye.read);
      gl.uniform1f(u.aspect, aspect);
      gl.uniform2f(u.point, x, y);
      // Faster strokes lay down a thicker film, so they sweep through more colour bands.
      gl.uniform3f(u.color, Math.min(0.5, 0.08 + Math.hypot(dx, dy) / 6000), 0, 0);
      gl.uniform1f(u.radius, radius);
      draw(dye.write);
      dye.swap();
    };

    const step = (dt: number) => {
      const vt = texelOf(velocity.read);
      let u = bind(P.curl, vt);
      tex(u.uVelocity, velocity.read);
      draw(curl);

      u = bind(P.vorticity, vt);
      tex(u.uVelocity, velocity.read);
      tex(u.uCurl, curl);
      gl.uniform1f(u.curl, CURL);
      gl.uniform1f(u.dt, dt);
      draw(velocity.write);
      velocity.swap();

      u = bind(P.divergence, vt);
      tex(u.uVelocity, velocity.read);
      draw(divergence);

      u = bind(P.scale, vt);
      tex(u.uTexture, pressure.read);
      gl.uniform1f(u.value, 0.8);
      draw(pressure.write);
      pressure.swap();

      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        u = bind(P.pressure, vt);
        tex(u.uPressure, pressure.read);
        tex(u.uDivergence, divergence);
        draw(pressure.write);
        pressure.swap();
      }

      u = bind(P.gradient, vt);
      tex(u.uPressure, pressure.read);
      tex(u.uVelocity, velocity.read);
      draw(velocity.write);
      velocity.swap();

      u = bind(P.advect, vt);
      tex(u.uVelocity, velocity.read);
      tex(u.uSource, velocity.read);
      gl.uniform2f(u.simTexel, vt[0], vt[1]);
      gl.uniform1f(u.dt, dt);
      gl.uniform1f(u.dissipation, VELOCITY_DISSIPATION);
      draw(velocity.write);
      velocity.swap();

      u = bind(P.advect, texelOf(dye.read));
      tex(u.uVelocity, velocity.read);
      tex(u.uSource, dye.read);
      gl.uniform2f(u.simTexel, vt[0], vt[1]);
      gl.uniform1f(u.dt, dt);
      gl.uniform1f(u.dissipation, DYE_DISSIPATION);
      draw(dye.write);
      dye.swap();
    };

    const render = (time: number) => {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const u = bind(P.display, [1 / canvas.width, 1 / canvas.height]);
      tex(u.uDye, dye.read);
      gl.uniform1f(u.time, time);
      draw(null);
      gl.disable(gl.BLEND);
    };

    // ---- Loop: runs only while the pointer is active ----------------------
    const pointer = { x: 0, y: 0, dx: 0, dy: 0, moved: false, seen: false };
    let raf = 0;
    let last = 0;
    let lastMove = 0;

    const frame = (now: number) => {
      // rAF's timestamp can predate the pointer event that scheduled it; never step backwards.
      const dt = Math.max(0, Math.min((now - last) / 1000, 1 / 30));
      last = now;
      if (pointer.moved) {
        pointer.moved = false;
        splat(pointer.x, pointer.y, pointer.dx * SPLAT_FORCE, pointer.dy * SPLAT_FORCE);
        pointer.dx = pointer.dy = 0;
      }
      step(dt);
      render(now / 1000);
      if (now - lastMove < IDLE_MS && !document.hidden) raf = requestAnimationFrame(frame);
      else {
        raf = 0;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const x = e.clientX / innerWidth;
      const y = 1 - e.clientY / innerHeight;
      if (pointer.seen) {
        // Accumulate between frames so fast flicks aren't lost.
        pointer.dx += x - pointer.x;
        pointer.dy += y - pointer.y;
        pointer.moved = true;
      }
      pointer.seen = true;
      pointer.x = x;
      pointer.y = y;
      lastMove = performance.now();
      if (!raf) {
        last = lastMove;
        raf = requestAnimationFrame(frame);
      }
    };
    const onLeave = () => (pointer.seen = false);

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(allocate, 200);
    };

    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      removeEventListener("resize", onResize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  // Fixed behind all content (a negative z-index paints above the page background
  // but below sections), so the sheen shows on the open canvas and slips under cards and type.
  return <div ref={host} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
