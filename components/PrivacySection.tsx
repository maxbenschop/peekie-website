const CELLS = [
  {
    title: "Nothing goes online",
    text: "Peekie makes no network connections, has no analytics, and stores nothing outside your Mac.",
  },
  {
    title: "Accessibility, only for capture",
    text: "Quick capture sends ⌘C to read your selection, then restores your clipboard. Everything else works without it.",
  },
  {
    title: "Saved only if you ask",
    text: "Turn on saving and open notes come back after a relaunch. Closing a note deletes its saved copy.",
  },
];

export default function PrivacySection() {
  return (
    <section data-reveal id="privacy" className="section">
      <div className="eyebrow">Privacy</div>
      <h2 className="section-title" style={{ maxWidth: "18ch" }}>
        Your notes never leave your Mac.
      </h2>
      <div className="privacy-grid">
        {CELLS.map((cell) => (
          <div className="privacy-cell" key={cell.title}>
            <div className="privacy-cell-title">{cell.title}</div>
            <p className="privacy-cell-text">{cell.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
