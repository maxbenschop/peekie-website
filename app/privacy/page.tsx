import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_LAST_MODIFIED } from "@/lib/site";

const title = "Privacy";
const description =
  "Peekie makes no network connections, has no analytics, and stores nothing outside your Mac. What the app and this website do and don't do, in plain terms.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    url: "/privacy",
    title: `${title} · Peekie`,
    description,
  },
};

const APP_CELLS = [
  {
    title: "Nothing goes online",
    text: "Peekie makes no network connections, has no analytics, and sends no data anywhere. There are no accounts, no sign-in, and nothing to sync.",
  },
  {
    title: "Accessibility, only for capture",
    text: "Quick capture uses the macOS Accessibility permission to send ⌘C and read your current selection, then it restores your clipboard. Every other feature works without granting this permission.",
  },
  {
    title: "Saved only if you ask",
    text: "Turn on Save notes between launches and open notes are kept in a local file on your Mac. Closing a note without saving deletes it. Nothing is ever uploaded.",
  },
  {
    title: "Open source, so you can verify it",
    text: "Peekie's source is public on GitHub under the MIT license. Rather than take this page's word for it, you can read the code that implements each of these claims yourself.",
  },
];

const RIGHTS = [
  "Access the personal data processed about you",
  "Correct inaccurate data",
  "Request erasure of your data",
  "Restrict or object to processing",
  "Receive your data in a portable format",
  "Lodge a complaint with a supervisory authority — in the Netherlands, the Autoriteit Persoonsgegevens",
];

export default function PrivacyPage() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0d0f14" }}>
      <Nav />
      <section className="section" style={{ paddingBottom: 32 }}>
        <div className="eyebrow">Privacy</div>
        <h1 className="section-title" style={{ maxWidth: "18ch" }}>
          Your notes never leave your Mac.
        </h1>
        <p className="section-subtitle">
          This page covers two different things: the Peekie app (which collects nothing), and this website
          (peekie.app), which — like almost every website — involves some minimal data processing through its
          hosting provider.
        </p>

        <h2 className="legal-heading" style={{ marginTop: 56 }}>
          The app
        </h2>
        <div className="privacy-grid" style={{ marginTop: 24 }}>
          {APP_CELLS.map((cell) => (
            <div className="privacy-cell" key={cell.title}>
              <div className="privacy-cell-title">{cell.title}</div>
              <p className="privacy-cell-text">{cell.text}</p>
            </div>
          ))}
        </div>

        <h2 className="legal-heading" style={{ marginTop: 56 }}>
          This website
        </h2>
        <div className="legal-block">
          <p>
            Peekie the app collects nothing, but this website is hosted on Vercel, and like virtually any web
            host, Vercel’s servers log basic technical information for every visit — your IP address, browser
            user-agent, the page requested, and the timestamp — as a normal part of operating and securing the
            site. An IP address is considered personal data under the GDPR (in the Netherlands, the AVG).
          </p>
          <p>
            <strong>Purpose and legal basis.</strong> This data is processed only to run and protect the site
            (e.g. detecting abuse and diagnosing outages), on the basis of legitimate interest (Article 6(1)(f)
            GDPR). It is not used for advertising, profiling, or analytics — this site runs none.
          </p>
          <p>
            <strong>No cookies.</strong> This site sets no cookies and uses no browser storage of any kind. There
            is nothing non-essential to consent to, so there is no cookie banner.
          </p>
          <p>
            <strong>Fonts, served locally.</strong> This site’s fonts are bundled and served from peekie.app
            itself at build time, not loaded live from Google Fonts — so no font request ever reaches a third
            party or leaks your IP address to one.
          </p>
          <p>
            <strong>Hosting and international transfer.</strong> Vercel Inc. is based in the United States and
            acts as the processor of the server logs described above. Transfers of this kind rely on Standard
            Contractual Clauses; see Vercel’s own Data Processing Addendum for details of their safeguards and
            log-retention practices, which this project does not independently control.
          </p>
        </div>

        <h2 className="legal-heading" style={{ marginTop: 56 }}>
          Your rights
        </h2>
        <div className="legal-block">
          <p>Under the GDPR/AVG, you have the right to:</p>
          <ul className="legal-list">
            {RIGHTS.map((right) => (
              <li key={right}>{right}</li>
            ))}
          </ul>
        </div>

        <h2 className="legal-heading" style={{ marginTop: 56 }}>
          Who’s responsible for this
        </h2>
        <p className="section-subtitle" style={{ marginTop: 16 }}>
          This site and the Peekie app are made by Max Benschop, acting as an individual open-source maintainer,
          not a registered company. For any privacy question or request —{" "}
          <a href="https://github.com/maxbenschop/peekie/issues">open an issue on GitHub</a>.
        </p>
        <p className="section-subtitle" style={{ marginTop: 24, fontSize: 13 }}>
          Last updated {SITE_LAST_MODIFIED}.
        </p>
      </section>
      <div style={{ marginTop: 64 }}>
        <Footer />
      </div>
    </div>
  );
}
