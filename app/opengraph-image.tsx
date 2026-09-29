import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Peekie: A translucent scratchpad for your Mac";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(file: string) {
  return readFile(path.join(process.cwd(), "assets/fonts", file));
}

export default async function Image() {
  const [black, semiBold, iconBuf] = await Promise.all([
    loadFont("Nunito-Black.ttf"),
    loadFont("Nunito-SemiBold.ttf"),
    readFile(path.join(process.cwd(), "assets/reference/app-icon.png")),
  ]);
  const iconSrc = `data:image/png;base64,${iconBuf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background:
            "radial-gradient(650px 450px at 78% 20%, rgba(59,130,246,0.36), transparent 60%), radial-gradient(500px 400px at 95% 60%, rgba(139,92,246,0.28), transparent 60%), #14171e",
          fontFamily: "Nunito",
          overflow: "hidden",
        }}
      >
        <img src={iconSrc} alt="" width={128} height={128} style={{ display: "flex" }} />
        <div
          style={{
            position: "relative",
            marginTop: 32,
            fontSize: 84,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.03em",
          }}
        >
          Peekie
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 8,
            fontSize: 32,
            fontWeight: 600,
            color: "rgba(255,255,255,0.82)",
            letterSpacing: "-0.01em",
          }}
        >
          A translucent scratchpad for your Mac.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Nunito", data: black, weight: 900, style: "normal" },
        { name: "Nunito", data: semiBold, weight: 600, style: "normal" },
      ],
    }
  );
}
