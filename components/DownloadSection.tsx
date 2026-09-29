"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import type { LatestRelease } from "@/lib/github";

const INSTALL_CMD = "xattr -dr com.apple.quarantine /Applications/Peekie.app";

export default function DownloadSection({ release }: { release: LatestRelease }) {
  const [copied, setCopied] = useState(false);
  const eyeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let mx = 0;
    let my = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        eyeRefs.current.forEach((eye) => {
          if (!eye) return;
          const r = eye.getBoundingClientRect();
          const dx = mx - (r.left + r.width / 2);
          const dy = my - (r.top + r.height / 2);
          const d = Math.hypot(dx, dy) || 1;
          const k = Math.min(1, d / 260);
          const pupil = eye.firstElementChild as HTMLElement | null;
          if (pupil) {
            pupil.style.left = 50 + (dx / d) * k * 22 + "%";
            pupil.style.top = 50 + (dy / d) * k * 27 + "%";
          }
        });
      });
    };
    window.addEventListener("mousemove", onMove);

    let blinkTimer: ReturnType<typeof setTimeout> | undefined;
    if (!reduce) {
      const blink = () => {
        eyeRefs.current.forEach((eye) => {
          if (eye) eye.style.transform = "translate(-50%,-50%) scaleY(0.08)";
        });
        setTimeout(() => {
          eyeRefs.current.forEach((eye) => {
            if (eye) eye.style.transform = "translate(-50%,-50%)";
          });
        }, 130);
        blinkTimer = setTimeout(blink, 2800 + Math.random() * 3500);
      };
      blinkTimer = setTimeout(blink, 2200);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(blinkTimer);
    };
  }, []);

  const copyCmd = () => {
    navigator.clipboard?.writeText(INSTALL_CMD).catch(() => {});
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="download" className="download-section">
      <div className="download-vignette-top" />
      <div className="download-vignette-radial" />
      <div data-reveal className="download-inner">
        <div className="mascot" aria-label="Peekie">
          <div className="mascot-face">
            <div className="mascot-eye mascot-eye-left" ref={(el) => { eyeRefs.current[0] = el; }}>
              <div className="mascot-pupil" />
            </div>
            <div className="mascot-eye mascot-eye-right" ref={(el) => { eyeRefs.current[1] = el; }}>
              <div className="mascot-pupil" />
            </div>
          </div>
        </div>
        <h2 className="download-title">Write it. Let it go.</h2>
        <p className="download-sub">Free for macOS 14 Sonoma or later.</p>
        <a href={release.url} className="btn btn-primary" style={{ marginTop: 30, textShadow: "none" }}>
          Download Peekie {release.version}
        </a>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-num">1</div>
            <div className="step-text">Download the .dmg from Releases</div>
          </div>
          <div className="step-card">
            <div className="step-num">2</div>
            <div className="step-text">Drag Peekie onto Applications</div>
          </div>
          <div className="step-card">
            <div className="step-num">3</div>
            <div className="step-text">Open it and press ⌥Space</div>
          </div>
        </div>
        <div className="command-row">
          <span className="command-text">
            <span className="command-prompt">$ </span>
            {INSTALL_CMD}
          </span>
          <button onClick={copyCmd} className="copy-btn">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="notarize-note">
          Releases aren&apos;t notarized yet. If macOS won&apos;t open Peekie, right-click it and choose Open, or run
          the command above once.
        </p>
      </div>

      <Footer />
    </section>
  );
}
