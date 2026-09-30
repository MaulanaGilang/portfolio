import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Gilang Maulana, Data Analyst moving into Data Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Deterministic block field: graphite raw → lime cleaning → indigo modeled, matching the hero.
function blocks() {
  const out: { x: number; y: number; s: number; c: string; r: number }[] = [];
  let seed = 11;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 90; i++) {
    out.push({ x: 40 + rand() * 470, y: 70 + rand() * 250, s: 8 + rand() * 12, c: "#1b1c22", r: rand() * 60 - 30 });
  }
  for (let i = 0; i < 14; i++) {
    out.push({ x: 520 + rand() * 120, y: 110 + rand() * 170, s: 12, c: "#c1ff00", r: rand() * 20 - 10 });
  }
  for (let row = 0; row < 5; row++) {
    for (let b = 0; b < 6; b++) {
      for (let k = 0; k < 4; k++) {
        out.push({ x: 680 + b * 78 + k * 15, y: 110 + row * 36, s: 12, c: "#1a2ffb", r: 0 });
      }
    }
  }
  return out;
}

export default async function OpengraphImage() {
  const [regular, medium] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/Satoshi-400.ttf")),
    readFile(join(process.cwd(), "src/fonts/Satoshi-500.ttf")),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#f0f1fa",
          padding: 64,
          position: "relative",
          fontFamily: "Satoshi",
        }}
      >
        {blocks().map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: b.x,
              top: b.y,
              width: b.s,
              height: b.s,
              borderRadius: 3,
              background: b.c,
              transform: `rotate(${b.r}deg)`,
            }}
          />
        ))}
        <div style={{ fontSize: 124, letterSpacing: -4, color: "#000", lineHeight: 0.95 }}>Gilang Maulana</div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 40, color: "#000", fontWeight: 500 }}>
          Data Analyst <span style={{ color: "#5d6070", margin: "0 16px" }}>→</span>
          <span style={{ color: "#1a2ffb" }}>Data Engineer</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Satoshi", data: regular, weight: 400, style: "normal" },
        { name: "Satoshi", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
