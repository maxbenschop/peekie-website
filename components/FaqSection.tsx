import { FAQS } from "@/lib/faqs";

export default function FaqSection() {
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
        {FAQS.map(([q, a], i) => (
          <details className="faq-item" key={q} open={i === 0}>
            <summary className="faq-question">
              {q}
              <span className="faq-sign" aria-hidden="true" />
            </summary>
            <p className="faq-answer">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
