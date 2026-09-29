"use client";

import { useState } from "react";

const FAQS: [string, string][] = [
  [
    "Why is there no Dock icon?",
    "Peekie is a background utility. It is meant to appear when you press a shortcut and disappear when you are done.",
  ],
  ["Can I keep my notes?", "Yes. Turn on Save notes between launches, or export a note with ⌘S."],
  [
    "How do I open Settings?",
    "Launch Peekie again from Applications, Spotlight or Finder. If you turn on Show menu bar icon, it has entries for Settings and Quit.",
  ],
  [
    "Why is it not on the Mac App Store?",
    "The adjustable blur uses internal Core Animation layers of the system blur view, which is not a public API.",
  ],
  ["Is there a Windows or Linux version?", "No. Peekie is built with AppKit and SwiftUI for macOS."],
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section data-reveal id="faq" className="section faq-section">
      <div>
        <div className="eyebrow">FAQ</div>
        <h2 className="section-title">Questions.</h2>
        <p className="section-subtitle" style={{ fontSize: 15 }}>
          Something else? <a href="https://github.com/maxbenschop/peekie/issues">Open an issue on GitHub</a>.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {FAQS.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div className="faq-item" key={q}>
              <button className="faq-question" onClick={() => setOpen(isOpen ? -1 : i)}>
                {q}
                <span className="faq-sign">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <p className="faq-answer">{a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
