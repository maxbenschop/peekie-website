"use client";

import { useState } from "react";

const CHECKLIST_LABELS = ["Reply to Anna", "Book train to Utrecht", "Send invoice", "Water the plants"];
const AWAY_MODES: [string, string][] = [
  ["keep", "Stay visible"],
  ["fade", "Fade"],
  ["hide", "Hide"],
];

export default function FeaturesSection() {
  const [checks, setChecks] = useState([true, false, true, false]);
  const [away, setAway] = useState("keep");

  const toggleCheck = (i: number) => {
    setChecks((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const awayOpacity = away === "keep" ? 1 : away === "fade" ? 0.35 : 0;

  return (
    <section data-reveal id="features" className="section">
      <div className="eyebrow">Features</div>
      <h2 className="section-title" style={{ maxWidth: "18ch" }}>
        Everything a scratchpad needs. Nothing it doesn&apos;t.
      </h2>

      <div className="features-grid">
        {/* Global shortcut */}
        <div className="feature-card">
          <div
            className="feature-visual"
            style={{
              gap: 22,
              background: "radial-gradient(320px 180px at 50% 50%, rgba(92,84,190,0.2), transparent 70%)",
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <div className="keycap" style={{ width: 72, height: 72 }}>
                <span style={{ alignSelf: "flex-end", fontSize: 18 }}>⌥</span>
                <span>option</span>
              </div>
              <div className="keycap" style={{ width: 170, height: 72, flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-start" }}>
                space
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              <span className="shortcut-chip">
                <span className="shortcut-chip-key">⌥⇧Space</span> Quick capture
              </span>
              <span className="shortcut-chip">
                <span className="shortcut-chip-key">⌃⌥N</span> Show or hide all
              </span>
            </div>
          </div>
          <div className="feature-copy">
            <div className="feature-label">Global shortcut</div>
            <div className="feature-desc">A new note from any app. Quick capture copies your selection straight in.</div>
          </div>
        </div>

        {/* Inline maths */}
        <div className="feature-card">
          <div className="feature-visual" style={{ alignItems: "flex-start", gap: 10, padding: "0 clamp(28px,10%,72px)" }}>
            <div className="math-line">
              12*3 <span className="math-eq">=</span> <span className="math-ans">36</span>
            </div>
            <div className="math-line">
              1200 / 12 <span className="math-eq">=</span> <span className="math-ans">100</span>
            </div>
            <div className="math-line" style={{ display: "flex", alignItems: "center" }}>
              (18 + 4) * 3 =<span className="math-cursor" />
            </div>
          </div>
          <div className="feature-copy">
            <div className="feature-label">Inline maths</div>
            <div className="feature-desc">Type 12*3 = at the end of a line and the answer appears.</div>
          </div>
        </div>

        {/* Code blocks */}
        <div className="feature-card">
          <div className="feature-visual" style={{ padding: "0 28px" }}>
            <div className="code-window">
              <div className="code-titlebar">
                <span>```swift</span>
                <span>Swift</span>
              </div>
              <div className="code-body">
                <div>
                  <span className="code-kw">let</span> ttl = <span className="code-num">60</span> * <span className="code-num">60</span>
                </div>
                <div>
                  cache.<span className="code-fn">set</span>(key, value, ttl)
                </div>
                <div className="code-comment">{"// expires in an hour"}</div>
              </div>
            </div>
          </div>
          <div className="feature-copy">
            <div className="feature-label">Code blocks</div>
            <div className="feature-desc">Fenced blocks with syntax colours for Swift, Python, JS, Go, Rust and more.</div>
          </div>
        </div>

        {/* Lists and checklists */}
        <div className="feature-card">
          <div
            className="feature-visual"
            style={{ alignItems: "stretch", justifyContent: "center", gap: 12, padding: "0 clamp(28px,10%,72px)", fontSize: 18 }}
          >
            {CHECKLIST_LABELS.map((label, i) => {
              const on = checks[i];
              return (
                <button key={label} onClick={() => toggleCheck(i)} className="checklist-item">
                  <span
                    className="checklist-mark"
                    style={{
                      borderColor: on ? "#0a84ff" : "rgba(255,255,255,0.4)",
                      background: on ? "#0a84ff" : "transparent",
                    }}
                  >
                    {on ? "✓" : ""}
                  </span>
                  <span
                    className="checklist-label"
                    style={{ color: on ? "#6f7582" : "#e6e8ee", textDecoration: on ? "line-through" : "none" }}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="feature-copy">
            <div className="feature-label">Lists and checklists</div>
            <div className="feature-desc">Type - or [] to start one. Click a box to check it. Try it.</div>
          </div>
        </div>

        {/* When you click away */}
        <div className="feature-card">
          <div className="away-demo">
            <div className="away-bg" />
            <div className="away-card" style={{ opacity: awayOpacity }}>
              <div style={{ display: "flex", gap: 6 }}>
                <span className="traffic-dot" style={{ width: 9, height: 9, background: "#ff5f57" }} />
                <span className="traffic-dot" style={{ width: 9, height: 9, background: "#febc2e" }} />
                <span className="traffic-dot" style={{ width: 9, height: 9, background: "#28c840" }} />
              </div>
              <div style={{ marginTop: 12, fontSize: 14, color: "#fff" }}>Call Sam back</div>
            </div>
            <div className="away-modes">
              {AWAY_MODES.map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setAway(id)}
                  className="away-mode-btn"
                  style={{
                    background: away === id ? "rgba(255,255,255,0.14)" : "transparent",
                    color: away === id ? "#fff" : "#8d93a0",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="feature-copy" style={{ paddingTop: 22 }}>
            <div className="feature-label">When you click away</div>
            <div className="feature-desc">Notes stay visible, fade, or hide. Pinned notes always stay on top.</div>
          </div>
        </div>

        {/* Keep or discard */}
        <div className="feature-card">
          <div className="feature-visual" style={{ gap: 20, padding: "0 28px" }}>
            <div className="capture-chip">
              <span className="shortcut-chip-key" style={{ color: "#fff" }}>
                ⇧⌘T
              </span>
              Reopen last closed note
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              <span className="filetype-chip">.txt</span>
              <span className="filetype-chip">.md</span>
              <span className="filetype-chip">.rtf</span>
              <span className="filetype-chip">.rtfd</span>
            </div>
          </div>
          <div className="feature-copy">
            <div className="feature-label">Keep or discard</div>
            <div className="feature-desc">Temporary by default, so nothing piles up. Save or export what you want to keep.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
