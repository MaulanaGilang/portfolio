"use client";

import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { plane, prism } from "./scenes";

const scenes = { prism, plane };
const palettes = {
  // Lusion cobalt on the lavender canvas: deep for dense shade, periwinkle for sparse.
  light: { ink: [0.102, 0.184, 0.984], inkLight: [0.62, 0.66, 1.0] },
  // Periwinkle on the dark Connect card.
  dark: { ink: [0.55, 0.6, 1.0], inkLight: [0.2, 0.25, 0.62] },
};

// Cells are ~5 CSS px (a 4px dot and 1px gutter), rendered at device resolution
// (capped at 2x) so the square dots stay crisp and even.
const CELL_CSS = 5;

/**
 * A dithered, scroll-formed scene (legencymedia.com-style dot rendering): square
 * dots in an ordered dither that assemble as the section scrolls into view and
 * part around the cursor. One full-screen shader pass on a small canvas, run only
 * while the canvas is on screen.
 */
export function DitherCanvas({
  scene,
  tone,
  offset,
  className,
}: {
  scene: keyof typeof scenes;
  tone: keyof typeof palettes;
  /** Scroll window over which the scene forms, as Motion `useScroll` offsets. */
  offset: [string, string];
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { scrollYProgress } = useScroll({ target: host, offset: offset as any });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 });

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Fresh canvas per mount: a canvas keeps its first context, so reusing one after
    // a cleanup (Strict Mode, HMR) would hand back a lost context.
    const canvas = document.createElement("canvas");
    canvas.className = "block size-full";
    const SCALE = Math.min(2, window.devicePixelRatio || 1);
    const CELL = Math.round(CELL_CSS * SCALE);
    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false, antialias: false, depth: false });
    if (!gl) return;
    el.appendChild(canvas);

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, "#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}"));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, scenes[scene]));
    gl.bindAttribLocation(prog, 0, "p");
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const U = {
      cells: u("uCells"),
      aspect: u("uAspect"),
      time: u("uTime"),
      progress: u("uProgress"),
      mouse: u("uMouse"),
      cellPx: u("uCellPx"),
    };
    const pal = palettes[tone];
    gl.uniform3fv(u("uInk"), pal.ink);
    gl.uniform3fv(u("uInkLight"), pal.inkLight);
    gl.uniform1f(U.cellPx, CELL);
    gl.uniform1f(u("uGutter"), Math.max(1, Math.round(SCALE)));
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const r = el.getBoundingClientRect();
      canvas.width = Math.max(CELL, Math.round((r.width * SCALE) / CELL) * CELL);
      canvas.height = Math.max(CELL, Math.round((r.height * SCALE) / CELL) * CELL);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U.cells, canvas.width / CELL, canvas.height / CELL);
      gl.uniform1f(U.aspect, canvas.width / canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Pointer in cell coordinates (GL's y runs upward); parked far away when absent.
    const mouse = { x: -1e4, y: -1e4 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) * SCALE) / CELL;
      mouse.y = ((r.bottom - e.clientY) * SCALE) / CELL;
    };
    const onLeave = () => ((mouse.x = -1e4), (mouse.y = -1e4));
    if (!reduce) {
      addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }

    let raf = 0;
    let visible = false;
    const t0 = performance.now();
    const frame = () => {
      gl.uniform1f(U.time, reduce ? 0 : (performance.now() - t0) / 1000);
      gl.uniform1f(U.progress, reduce ? 1 : progress.get());
      gl.uniform2f(U.mouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = visible && !reduce ? requestAnimationFrame(frame) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [scene, tone, progress]);

  return <div ref={host} aria-hidden className={cn("pointer-events-none", className)} />;
}
