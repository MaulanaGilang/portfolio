import { ImageResponse } from "next/og";

export const alt = "Gilang Maulana, Data Analyst moving into Data Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Deterministic "raw → refined" dot field so the card matches the hero.
function dots() {
  const out: { x: number; y: number; r: number; c: string }[] = [];
  let s = 7;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 260; i++) {
    out.push({ x: rand() * 520, y: 60 + rand() * 250, r: 1.5 + rand() * 3.5, c: "#0e0f12" });
  }
  for (let lane = 0; lane < 7; lane++) {
    for (let p = 0; p < 9; p++) {
      for (let k = 0; k < 5; k++) {
        out.push({ x: 640 + p * 62 + k * 7, y: 80 + lane * 34, r: 2.4, c: "#2f5bff" });
      }
    }
  }
  return out;
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#f2f2ef",
          padding: 64,
          position: "relative",
        }}
      >
        {dots().map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: d.r * 2,
              height: d.r * 2,
              borderRadius: 999,
              background: d.c,
              opacity: d.c === "#0e0f12" ? 0.45 : 1,
            }}
          />
        ))}
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -5, color: "#0e0f12", lineHeight: 1 }}>
          Gilang Maulana
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 40, color: "#0e0f12" }}>
          Data Analyst <span style={{ color: "#6a6b70", margin: "0 16px" }}>→</span>
          <span style={{ color: "#2f5bff" }}>Data Engineer</span>
        </div>
      </div>
    ),
    size,
  );
}
