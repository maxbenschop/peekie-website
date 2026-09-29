const GLOBAL_KEYS: [string, string[]][] = [
  ["New note", ["⌥", "Space"]],
  ["Quick capture selection", ["⌥", "⇧", "Space"]],
  ["Show or hide all notes", ["⌃", "⌥", "N"]],
];

const NOTE_KEYS: [string, string[]][] = [
  ["Close and discard", ["⌘", "W"]],
  ["Reopen last closed", ["⇧", "⌘", "T"]],
  ["Keep on top", ["⌥", "⌘", "T"]],
  ["Copy all and close", ["⇧", "⌘", "C"]],
  ["Save or export", ["⌘", "S"]],
  ["Find", ["⌘", "F"]],
];

function KeyGroup({ title, rows }: { title: string; rows: [string, string[]][] }) {
  return (
    <div className="shortcuts-card">
      <div className="shortcuts-group-label">{title}</div>
      {rows.map(([label, keys]) => (
        <div className="shortcut-row" key={label}>
          <span>{label}</span>
          <span className="shortcut-keys">
            {keys.map((key, i) => (
              <span className="kbd" key={i}>
                {key}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ShortcutsSection() {
  return (
    <section data-reveal id="shortcuts" className="section">
      <div className="eyebrow">Shortcuts</div>
      <h2 className="section-title">Built for the keyboard.</h2>
      <p className="section-subtitle">Global shortcuts work from any app. Several can be rebound in Settings.</p>
      <div className="shortcuts-grid">
        <KeyGroup title="Anywhere" rows={GLOBAL_KEYS} />
        <KeyGroup title="Inside a note" rows={NOTE_KEYS} />
      </div>
    </section>
  );
}
