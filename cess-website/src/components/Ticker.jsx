import React from "react";
import tickerData from "../data/ticker.json";
import "./Ticker.css";
import "../App.css";

export default function Ticker() {
  const t1 = tickerData.ticker_1.text;
  const segments = tickerData.ticker_2.segments;

  return (
    <div className="ticker-wrapper">

      {/* Ticker 1 */}
      <div className="ticker ticker-blue">
        <div className="ticker-content move-right">
          <span>{t1}</span>
        </div>
      </div>

      {/* Ticker 2 */}
      <div className="ticker ticker-yellow">
        <div className="ticker-content move-left">
          <span>
            {segments.map((seg, i) => {
              if (seg.type === "text") {
                return <span key={i}>{seg.value}</span>;
              }
              if (seg.type === "link") {
                return (
                  <a
                    key={i}
                    href={seg.url}
                    className="ticker-link"
                    target={seg.url.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                  >
                    {seg.label}
                  </a>
                );
              }
              return null;
            })}
          </span>
        </div>
      </div>

    </div>
  );
}
