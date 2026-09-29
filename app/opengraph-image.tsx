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
  const [black, semiBold] = await Promise.all([loadFont("Nunito-Black.ttf"), loadFont("Nunito-SemiBold.ttf")]);

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
          background: "#0d0f14",
          fontFamily: "Nunito",
          overflow: "hidden",
        }}
      >
        {[
          { top: -520, left: 380, size: 1500, color: "rgba(105,90,215,0.3)" },
          { top: -180, left: 780, size: 1300, color: "rgba(45,105,205,0.24)" },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: c.top,
              left: c.left,
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              background: c.color,
              display: "flex",
              filter: "blur(140px)",
            }}
          />
        ))}

        <div
          style={{
            position: "relative",
            display: "flex",
            width: 128,
            height: 128,
            borderRadius: 30,
            background: "linear-gradient(#3c414d, #14161b)",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 44px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 70,
              height: 70,
              borderRadius: 20,
              background: "#fff",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  width: 18,
                  height: 26,
                  borderRadius: 9,
                  background: "radial-gradient(circle at 40% 32%, #363b47, #1c1f27)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex", width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 36,
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
