export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-pill">
        <div className="footer-brand">
          <img src="/icon.svg" alt="" style={{ width: 34, height: 34, display: "block" }} />
          <span>Peekie · MIT © Max Benschop</span>
        </div>
        <span className="footer-divider" />
        <a href="https://github.com/maxbenschop/peekie" className="footer-link">
          GitHub
        </a>
        <a href="https://github.com/maxbenschop/peekie/releases" className="footer-link">
          Releases
        </a>
        <a href="https://github.com/maxbenschop/peekie/blob/main/CHANGELOG.md" className="footer-link">
          Changelog
        </a>
        <a href="https://github.com/maxbenschop/peekie/blob/main/CONTRIBUTING.md" className="footer-link">
          Contribute
        </a>
      </div>
    </footer>
  );
}
