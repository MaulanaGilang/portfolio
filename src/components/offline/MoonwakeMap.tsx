"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { codex, codexImages, moonwakeIntro } from "@/data/codex";

// The coast map (public/offline/moonwake/map.webp, 16:9). Moonwake sits at this point on it.
const MOONWAKE = { x: 0.704, y: 0.5 };
const ZOOM_IN = 2.6;

// Places on the close-up (public/offline/moonwake/closeup.webp), as fractions of the image.
const PLACES = [
  { name: "The Keep", x: 0.18, y: 0.24 },
  { name: "The Still Pool", x: 0.39, y: 0.4 },
  { name: "The Hall of Names", x: 0.27, y: 0.58 },
  { name: "The Long Bridge", x: 0.62, y: 0.44 },
  { name: "The Watchtower", x: 0.12, y: 0.66 },
];

// Neighbours, shown as plain labels on the wide map only.
const NEIGHBOURS = [
  { name: "Ionian spirit-villages", x: 0.89, y: 0.14 },
  { name: "Inland trade cities", x: 0.16, y: 0.36 },
  { name: "Noxian outpost", x: 0.12, y: 0.7 },
];

const FEATURED = ["people", "moonwatch", "magic", "nature"];

type View = "world" | "city";

/**
 * The Map of Moonwake: an easter egg opened by waking the dragon. A painted coast
 * that can be dragged and zoomed; selecting Moonwake glides the camera in, swaps to
 * the close-up of the city and opens a side panel with a link to the full Codex.
 */
export function MoonwakeMap({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<View>("world");
  const [cam, setCam] = useState({ x: 0.5, y: 0.5, z: 1 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ px: number; py: number; cx: number; cy: number } | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // Keep the camera inside the map at the current zoom.
  const clamp = useCallback((c: { x: number; y: number; z: number }) => {
    const half = 0.5 / c.z;
    return { z: c.z, x: Math.min(1 - half, Math.max(half, c.x)), y: Math.min(1 - half, Math.max(half, c.y)) };
  }, []);

  // Switch between the coast and the city, moving the camera with it.
  const go = useCallback(
    (next: View) => {
      setView(next);
      // In the city the camera sits a little right of Moonwake, so the city fills the space left of the panel.
      setCam(next === "city" ? clamp({ x: MOONWAKE.x + 0.07 / ZOOM_IN, y: MOONWAKE.y, z: ZOOM_IN }) : { x: 0.5, y: 0.5, z: 1 });
    },
    [clamp],
  );

  useEffect(() => {
    closeBtn.current?.focus();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (view === "city") go("world");
      else onClose();
    };
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [onClose, view, go]);

  const onWheel = (e: React.WheelEvent) => {
    if (view !== "world") return;
    setCam((c) => clamp({ ...c, z: Math.min(2, Math.max(1, c.z * (e.deltaY < 0 ? 1.12 : 0.9))) }));
  };
  const onDown = (e: React.PointerEvent) => {
    if (view !== "world" || (e.target as HTMLElement).closest("button,a")) return;
    drag.current = { px: e.clientX, py: e.clientY, cx: cam.x, cy: cam.y };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = stage.current;
    if (!d || !el) return;
    const r = el.getBoundingClientRect();
    setCam((c) => clamp({ ...c, x: d.cx - (e.clientX - d.px) / r.width / c.z, y: d.cy - (e.clientY - d.py) / r.height / c.z }));
  };
  const onUp = () => {
    drag.current = null;
    setDragging(false);
  };

  // The map layer is positioned so that (cam.x, cam.y) sits at the centre of the stage.
  const layer = {
    transform: `translate(${(0.5 - cam.x * cam.z) * 100}%, ${(0.5 - cam.y * cam.z) * 100}%) scale(${cam.z})`,
  };

  return (
    <div ref={dialog} role="dialog" aria-modal="true" aria-label="Map of Moonwake" className="ah-map">
      <div
        ref={stage}
        className="ah-map-stage"
        data-view={view}
        data-dragging={dragging ? "" : undefined}
        onWheel={onWheel}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div className="ah-map-layer" style={layer}>
          {/* eslint-disable-next-line @next/next/no-img-element -- a pannable map, sized by its layer */}
          <img src="/offline/moonwake/map.webp" alt="" draggable={false} className="ah-map-img" />
          {/* The close-up fades in over the city once the camera has arrived. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/offline/moonwake/closeup.webp"
            alt=""
            draggable={false}
            className="ah-map-closeup"
            style={{
              left: `${(MOONWAKE.x - 0.5 / ZOOM_IN) * 100}%`,
              top: `${(MOONWAKE.y - 0.5 / ZOOM_IN) * 100}%`,
              width: `${100 / ZOOM_IN}%`,
              height: `${100 / ZOOM_IN}%`,
            }}
          />

          {view === "world" &&
            NEIGHBOURS.map((n) => (
              <span key={n.name} className="ah-map-label" style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}>
                {n.name}
              </span>
            ))}

          {view === "world" && (
            <button
              type="button"
              className="ah-map-pin"
              style={{ left: `${MOONWAKE.x * 100}%`, top: `${MOONWAKE.y * 100}%` }}
              onClick={() => go("city")}
            >
              <span className="ah-map-star" aria-hidden />
              <span className="ah-map-pin-name">Moonwake</span>
            </button>
          )}

          {view === "city" &&
            PLACES.map((p) => (
              <span
                key={p.name}
                className="ah-map-place"
                style={{
                  left: `${(MOONWAKE.x - 0.5 / ZOOM_IN + (p.x / ZOOM_IN)) * 100}%`,
                  top: `${(MOONWAKE.y - 0.5 / ZOOM_IN + (p.y / ZOOM_IN)) * 100}%`,
                }}
              >
                {p.name}
              </span>
            ))}
        </div>
      </div>

      <div className="ah-map-chrome">
        <p className="hx-small-white">
          <span aria-hidden className="hx-navdot mr-2 inline-block align-middle" />
          {view === "world" ? "Map / The coast of Moonwake" : "Map / Moonwake"}
        </p>
        <div className="flex gap-3">
          {view === "city" && (
            <button type="button" className="ah-button" onClick={() => go("world")}>
              Back to the coast
            </button>
          )}
          <button ref={closeBtn} type="button" className="ah-button" onClick={onClose}>
            Close the map
          </button>
        </div>
      </div>
      {view === "world" && <p className="ah-map-hint hx-small-white">Drag to look around. Select Moonwake.</p>}

      <aside className="ah-map-panel" data-open={view === "city" ? "" : undefined} aria-hidden={view !== "city"}>
        <div className="ah-map-head">
          <p className="hx-small">Region / House Maulana</p>
          <h2 className="hx-h1 ah-map-title mt-3">Moonwake</h2>
        </div>
        <div className="ah-map-body">
          <p className="hx-small-white">Quiet, eternal, and ours.</p>
          <p className="hx-small mt-4">{moonwakeIntro}</p>
          <Link href="/offline/moonwake" className="hx-bracket mt-5" tabIndex={view === "city" ? 0 : -1}>
            Learn more
          </Link>
        </div>
        <div className="hx-rule ah-map-featured">
          <h3 className="hx-small">Featured in Moonwake</h3>
          <ul className="mt-4 grid gap-2.5">
            {FEATURED.map((id) => {
              const c = codex.find((x) => x.id === id)!;
              return (
                <li key={id}>
                  <Link href={`/offline/moonwake#${id}`} className="ah-map-card" tabIndex={view === "city" ? 0 : -1}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={codexImages[id]} alt="" loading="lazy" />
                    <span className="ah-map-card-text">
                      <span className="hx-h3">{c.label}</span>
                      <span className="hx-small">{c.lead}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
