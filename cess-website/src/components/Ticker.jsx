import React from "react";
import "./Ticker.css";

export default function Ticker() {
  return (
    <div className="ticker-wrapper">

      {/* TICKER 1 — Right → Left */}
      <div className="ticker ticker-blue">
        <div className="ticker-content move-right">
          <span>
            Latest Updates · New Research Outputs · Extractivism Studies · Environmental Justice · Community Reports ·
          </span>
        </div>
      </div>

      {/* TICKER 2 — Left → Right */}
      <div className="ticker ticker-yellow">
        <div className="ticker-content move-left">
          <span>
            New Publication: <a href="#publications" className="ticker-link">Under the Surface</a> · 
            Upcoming Webinar — Dec 6, 2025: CSR, Land Rights & Gold Mining · 
            <a 
              href="https://forms.gle/fwiFyoz3rNZ6bscc9"
              target="_blank"
              rel="noopener noreferrer"
              className="ticker-link"
            >
              Register Here
            </a>
            ·
          </span>
        </div>
      </div>

    </div>
  );
}
