"use client";

import { useEffect, useState } from "react";
import type { LatestRelease } from "@/lib/github";

type Line = { t: string; bold?: boolean; task?: number; ans?: string };

const LINES: Line[] = [
  { t: "Friday", bold: true },
  { t: "Reply to Anna", task: 0 },
  { t: "Book train to Utrecht", task: 1 },
  { t: "Budget 12*40+180 =", ans: "660" },
];

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    const settle = () => {
      // Pause the animation loop while the tab is hidden instead of
      // burning CPU in the background.
      if (typeof document !== "undefined" && document.hidden) {
        document.addEventListener("visibilitychange", settle, { once: true });
        return;
      }
      resolve();
    };
    setTimeout(settle, ms);
  });
}

function buildHeroLines(hN: number, hChecked: boolean[], hAnswer: boolean, hWin: boolean) {
  let start = 0;
  let cursorSet = false;
  const out: {
    key: number;
    text: string;
    isTask: boolean;
    weight: number;
    color: string;
    deco: string;
    fill: string;
    border: string;
    mark: string;
    showAnswer: boolean;
    answerText: string;
    cursor: boolean;
  }[] = [];

  LINES.forEach((l, idx) => {
    const typed = Math.max(0, Math.min(l.t.length, hN - start));
    start += l.t.length;
    const isLast = idx === LINES.length - 1;
    const cursor = !cursorSet && (typed < l.t.length || isLast);
    if (cursor) cursorSet = true;
    if (typed === 0 && !cursor) return;
    const on = l.task !== undefined && hChecked[l.task];
    out.push({
      key: idx,
      text: l.t.slice(0, typed),
      isTask: l.task !== undefined && typed > 0,
      weight: l.bold ? 700 : 400,
      color: on ? "rgba(255,255,255,0.5)" : "#fff",
      deco: on ? "line-through" : "none",
      fill: on ? "#0a84ff" : "transparent",
      border: on ? "#0a84ff" : "rgba(255,255,255,0.6)",
      mark: on ? "✓" : "",
      showAnswer: !!l.ans && hAnswer,
      answerText: l.ans || "",
      cursor: cursor && hWin,
    });
  });
  return out;
}

export default function Hero({ release }: { release: LatestRelease }) {
  const [hN, setHN] = useState(0);
  const [hChecked, setHChecked] = useState<boolean[]>([false, false]);
  const [hAnswer, setHAnswer] = useState(false);
  const [hWin, setHWin] = useState(false);
  const [hKeysOn, setHKeysOn] = useState(false);
  const [hKeys, setHKeys] = useState(["⌥", "Space"]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = LINES.reduce((a, l) => a + l.t.length, 0);

    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync of the reduced-motion end state on mount
      setHN(total);
      setHAnswer(true);
      setHChecked([true, false]);
      setHWin(true);
      return;
    }

    let alive = true;
    async function run() {
      while (alive) {
        setHN(0);
        setHChecked([false, false]);
        setHAnswer(false);
        setHWin(false);
        setHKeysOn(false);
        setHKeys(["⌥", "Space"]);
        await wait(700);
        if (!alive) return;
        setHKeysOn(true);
        await wait(380);
        setHWin(true);
        await wait(500);
        setHKeysOn(false);
        let n = 0;
        for (const l of LINES) {
          for (let i = 0; i < l.t.length; i++) {
            n++;
            setHN(n);
            await wait(45 + Math.random() * 40);
            if (!alive) return;
          }
          await wait(300);
        }
        setHAnswer(true);
        await wait(800);
        setHChecked([true, false]);
        await wait(3200);
        setHKeys(["⌘", "W"]);
        setHKeysOn(true);
        await wait(400);
        setHWin(false);
        await wait(500);
        setHKeysOn(false);
        await wait(700);
      }
    }
    run();
    return () => {
      alive = false;
    };
  }, []);

  const lines = buildHeroLines(hN, hChecked, hAnswer, hWin);

  return (
    <header id="top" className="hero">
      <div className="hero-vignette-side" />
      <div className="hero-vignette-top" />
      <div className="hero-vignette-bottom" />

      <div className="hero-grid">
        <div className="hero-copy">
          <a href={release.url} className="badge-pill">
            <span className="badge-version">{release.tag}</span>
            <span>{release.highlight}</span>
            <span style={{ opacity: 0.7 }}>→</span>
          </a>
          <h1 className="hero-title">A translucent scratchpad for your Mac.</h1>
          <p className="hero-subtitle">
            Press a shortcut from anywhere and a translucent note floats over whatever you are doing. Type,
            calculate, paste a snippet, and close it when you are done.
          </p>
          <div className="hero-actions">
            <a href="https://github.com/maxbenschop/peekie/releases/latest" className="btn btn-primary">
              Download for Mac
            </a>
            <a href="https://github.com/maxbenschop/peekie" className="btn btn-glass">
              View on GitHub
            </a>
          </div>
          <p className="hero-note">Free and open source · macOS 14+ · Apple Silicon and Intel</p>
        </div>

        <div className="hero-demo">
          <div
            className="window"
            style={{
              transform: `scale(${hWin ? 1 : 0.96})`,
              opacity: hWin ? 1 : 0,
              background: "rgba(28,31,38,0.6)",
            }}
          >
            <div className="window-titlebar">
              <span className="traffic-dot" style={{ background: "#ff5f57" }} />
              <span className="traffic-dot" style={{ background: "#febc2e" }} />
              <span className="traffic-dot" style={{ background: "#28c840" }} />
              <img src="/pin.svg" alt="Pinned" style={{ marginLeft: "auto", width: 15, height: 15, display: "block" }} />
            </div>
            <div className="window-body">
              {lines.map((l) => (
                <div className="hero-line" key={l.key}>
                  {l.isTask && (
                    <span className="hero-checkbox" style={{ borderColor: l.border, background: l.fill }}>
                      {l.mark}
                    </span>
                  )}
                  <span className="hero-text-wrap">
                    <span style={{ whiteSpace: "pre", fontWeight: l.weight, color: l.color, textDecoration: l.deco }}>
                      {l.text}
                    </span>
                    {l.showAnswer && <span style={{ whiteSpace: "pre", fontWeight: 600, color: "#fff" }}> {l.answerText}</span>}
                    {l.cursor && <span className="hero-cursor" />}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="hero-keys"
            style={{
              transform: `translateX(-50%) translateY(${hKeysOn ? "0px" : "8px"})`,
              opacity: hKeysOn ? 1 : 0,
            }}
          >
            {hKeys.map((key, i) => (
              <span className="hero-key" key={i}>
                {key}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-flags">
        <span>No Dock icon</span>
        <span className="hero-flags-dot">·</span>
        <span>No accounts</span>
        <span className="hero-flags-dot">·</span>
        <span>No sync</span>
        <span className="hero-flags-dot">·</span>
        <span>No network connections</span>
      </div>
    </header>
  );
}
