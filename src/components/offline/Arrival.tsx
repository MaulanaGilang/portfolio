"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { house } from "@/data/offline";
import { PRELOADED_KEY } from "@/lib/preloader";
import { INTRO_FLAG as FLAG } from "./intro";
import { sections } from "./sections";

// The emblem mask (public/offline/sigil.png) is square; grains are sampled on a 200x200 grid.
const GRID = 200;
const STEP = 2; // one grain per 2x2 block
const FORM_MS = 1400;
const SPREAD_MS = 600;

/**
 * The first screen: a heads-up display framing the house emblem. On load,
 * silver grains drift in and settle into the emblem over about two seconds,
 * then the solid emblem fades in under them and everything stays still.
 */
export function Arrival() {
  const box = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grains, setGrains] = useState(true);

  useLayoutEffect(() => {
    const root = document.documentElement;
    // The visitor is already inside the site: crossing to the portfolio must not replay its loader.
    root.dataset.preloaded = "";
    try {
      sessionStorage.setItem(PRELOADED_KEY, "1");
    } catch {}
    const finish = () => {
      delete root.dataset[FLAG];
      setGrains(false);
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();
    // Client navigation from the portfolio skips the head script, so set the flag here too.
    root.dataset[FLAG] = "";

    const canvas = canvasRef.current;
    const host = box.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return finish();

    let raf = 0;
    let cancelled = false;
    const img = new window.Image();
    img.src = "/offline/sigil.png";
    img.onerror = finish;
    img.onload = () => {
      if (cancelled) return;
      const off = document.createElement("canvas");
      off.width = off.height = GRID;
      const octx = off.getContext("2d");
      if (!octx) return finish();
      octx.drawImage(img, 0, 0, GRID, GRID);
      const px = octx.getImageData(0, 0, GRID, GRID).data;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const side = host.getBoundingClientRect().width;
      canvas.width = canvas.height = Math.round(side * dpr);
      const k = canvas.width / GRID;
      const size = Math.max(1, k * STEP * 0.7);

      // Targets on the emblem; each grain starts somewhere around it.
      const g: { tx: number; ty: number; sx: number; sy: number; d: number }[] = [];
      for (let y = 0; y < GRID; y += STEP) {
        for (let x = 0; x < GRID; x += STEP) {
          if (px[(y * GRID + x) * 4 + 3] < 128) continue; // shape lives in the alpha channel
          const a = Math.random() * Math.PI * 2;
          const r = (0.35 + Math.random() * 0.55) * canvas.width;
          g.push({
            tx: x * k,
            ty: y * k,
            sx: canvas.width / 2 + Math.cos(a) * r,
            sy: canvas.height / 2 + Math.sin(a) * r,
            d: Math.random() * SPREAD_MS,
          });
        }
      }

      const t0 = performance.now();
      const ease = (t: number) => 1 - (1 - t) ** 3;
      const frame = (now: number) => {
        const t = now - t0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#c9cdd3";
        for (const p of g) {
          const u = Math.min(1, Math.max(0, (t - p.d) / FORM_MS));
          if (u <= 0) continue;
          const e = ease(u);
          ctx.globalAlpha = Math.min(1, u * 2.5);
          ctx.fillRect(p.sx + (p.tx - p.sx) * e, p.sy + (p.ty - p.sy) * e, size, size);
        }
        if (t < FORM_MS + SPREAD_MS) raf = requestAnimationFrame(frame);
        else {
          // Settled: the solid emblem fades in under the grains, then the grains go.
          delete root.dataset[FLAG];
          canvas.style.opacity = "0";
          setTimeout(() => !cancelled && setGrains(false), 750);
        }
      };
      raf = requestAnimationFrame(frame);
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      delete root.dataset[FLAG];
    };
  }, []);

  return (
    <section id="arrival" aria-labelledby="arrival-title" className="ah-hud">
      <div className="ah-frame ah-hud-frame">
        <div className="ah-hud-top">
          <p className="ah-label">After hours</p>
          <Link href="/" transitionTypes={["world-out"]} className="ah-label ah-link max-[899px]:hidden">
            Back to the portfolio
          </Link>
        </div>

        <div className="ah-hud-body">
          <div>
            <p className="ah-label mb-4">The other side of Gilang Maulana</p>
            <h1 id="arrival-title" className="ah-wide ah-name">
              {house.name.split(" ").map((w) => (
                <span key={w} className="block">
                  {w}
                </span>
              ))}
            </h1>
            {house.motto && <p className="ah-label mt-6 text-[13px]">{house.motto}</p>}
          </div>

          <div ref={box} className="ah-emblem" role="img" aria-label="The House Maulana sigil: a rose inside a ring of thorns">
            <span className="ah-emblem-ink" />
            {grains && <canvas ref={canvasRef} aria-hidden className="transition-opacity duration-700" />}
          </div>
        </div>

        <div className="ah-hud-bottom">
          <nav aria-label="Jump to a section" className="ah-hud-nav">
            {sections.slice(1).map((s) => (
              <a key={s.id} href={`#${s.id}`} className="ah-label">
                {s.label}
              </a>
            ))}
          </nav>
          <div>
            <p className="ah-label mb-3">About</p>
            <p className="text-[15px] leading-relaxed text-[var(--bone)]">{house.intro}</p>
            <Link href="/" transitionTypes={["world-out"]} className="ah-label ah-link mt-4 inline-block min-[900px]:hidden">
              Back to the portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
