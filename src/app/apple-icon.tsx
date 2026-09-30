import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself, so this is a full square.
export default async function AppleIcon() {
  const font = await readFile(join(process.cwd(), "src/fonts/Satoshi-700.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Satoshi",
          fontSize: 118,
          lineHeight: 1,
          paddingBottom: 8,
        }}
      >
        G
      </div>
    ),
    { ...size, fonts: [{ name: "Satoshi", data: font, weight: 700, style: "normal" }] },
  );
}
