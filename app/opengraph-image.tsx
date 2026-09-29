import { ImageResponse } from "next/og";

export const alt = "Peekie: A translucent scratchpad for your Mac";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background:
            "radial-gradient(900px 600px at 85% -10%, rgba(92,84,190,0.35), transparent 60%), radial-gradient(700px 500px at 10% 30%, rgba(40,70,130,0.22), transparent 60%), #0d0f14",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
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
              gap: 14,
            }}
          >
            <div style={{ display: "flex", width: 18, height: 26, borderRadius: 9, background: "#1c1f27" }} />
            <div style={{ display: "flex", width: 18, height: 26, borderRadius: 9, background: "#1c1f27" }} />
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
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
            marginTop: 8,
            fontSize: 32,
            color: "rgba(255,255,255,0.82)",
            letterSpacing: "-0.01em",
          }}
        >
          A translucent scratchpad for your Mac.
        </div>
      </div>
    ),
    { ...size }
  );
}
