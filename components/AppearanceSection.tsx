"use client";

import { useState } from "react";

const MODES: [string, string][] = [
  ["dark", "Dark"],
  ["light", "Light"],
];

export default function AppearanceSection() {
  const [mode, setMode] = useState("dark");
  const [opacity, setOpacity] = useState(0.6);
  const [blur, setBlur] = useState(12);

  const dark = mode === "dark";
  const demoTint = dark ? `rgba(28,31,38,${opacity})` : `rgba(245,245,247,${opacity})`;
  const demoText = dark ? "#fff" : "#1c1f26";

  return (
    <section data-reveal className="section">
      <div className="appearance-grid">
        <div>
          <div className="eyebrow">Appearance</div>
          <h2 className="section-title">A note that looks like glass.</h2>
          <p className="section-subtitle" style={{ maxWidth: "40ch" }}>
            Adjust blur and background opacity so the window behind stays readable. Light, dark, or follow the
            system. Respects Reduce Transparency, Increase Contrast and Reduce Motion.
          </p>
          <div className="appearance-panel">
            <div className="segmented">
              {MODES.map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setMode(id)}
                  className="segmented-btn"
                  style={{
                    background: mode === id ? "rgba(255,255,255,0.14)" : "transparent",
                    color: mode === id ? "#fff" : "#8d93a0",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="slider-row">
              Background opacity
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.01}
                value={opacity}
                onChange={(e) => setOpacity(+e.target.value)}
              />
            </label>
            <label className="slider-row">
              Background blur
              <input type="range" min={0} max={40} step={1} value={blur} onChange={(e) => setBlur(+e.target.value)} />
            </label>
          </div>
        </div>
        <div className="appearance-preview">
          <div
            className="appearance-window"
            style={{
              background: demoTint,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              color: demoText,
            }}
          >
            <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
              <span className="appearance-window-dot" style={{ background: "#ff5f57" }} />
              <span className="appearance-window-dot" style={{ background: "#febc2e" }} />
              <span className="appearance-window-dot" style={{ background: "#28c840" }} />
            </div>
            <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.5 }}>
              <div>Ideas for the talk</div>
              <div>- Start with the demo</div>
              <div>- Keep it under 10 minutes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
