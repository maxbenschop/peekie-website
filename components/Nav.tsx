"use client";

import { useEffect, useState } from "react";

function formatClock(date: Date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}  ${h}:${m}`;
}

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- clock has no meaningful value until mounted on the client
    setNow(new Date());
    const clockTimer = setInterval(() => setNow(new Date()), 20000);

    const onScroll = () => {
      const hero = document.getElementById("top");
      const download = document.getElementById("download");
      const pastHero = hero ? window.scrollY > hero.offsetHeight - 40 : window.scrollY > 600;
      const onDownload = download ? download.getBoundingClientRect().top < download.offsetHeight * 0.3 : false;
      setHidden(pastHero && !onDownload);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(clockTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className={`nav ${hidden ? "nav-hidden" : "nav-visible"}`}>
      <div className="nav-left">
        <a href="#top" className="nav-brand">
          <img
            src="/menubar-icon.svg"
            alt=""
            style={{ width: 17, height: 17, display: "block", filter: "drop-shadow(0 0.5px 1px rgba(0,0,0,0.3))" }}
          />
          <span>Peekie</span>
        </a>
        <a href="#features" className="nav-link">
          Features
        </a>
        <a href="#shortcuts" className="nav-link">
          Shortcuts
        </a>
        <a href="#privacy" className="nav-link">
          Privacy
        </a>
        <a href="#faq" className="nav-link">
          FAQ
        </a>
        <a href="https://github.com/maxbenschop/peekie" className="nav-link">
          GitHub
        </a>
      </div>
      <div className="nav-right">
        <a href="#download" className="btn btn-sm btn-primary" style={{ textShadow: "none" }}>
          Download
        </a>
        <span className="nav-clock">{now ? formatClock(now) : ""}</span>
      </div>
    </nav>
  );
}
