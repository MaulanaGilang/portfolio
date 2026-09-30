import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Solid black circle with a white Satoshi "G", like GitHub's single-mark favicon.
export default async function Icon() {
  const font = await readFile(join(process.cwd(), "src/fonts/Satoshi-700.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 999,
          background: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Satoshi",
          fontSize: 44,
          lineHeight: 1,
          paddingBottom: 3,
        }}
      >
        G
      </div>
    ),
    { ...size, fonts: [{ name: "Satoshi", data: font, weight: 700, style: "normal" }] },
  );
}
