import React from "react";
import "./Ticker.css";

export default function Ticker() {
  return (
    <div className="ticker-wrapper">
      
      {/* TICKER 1 — Right → Left */}
      <div className="ticker ticker-blue">
        <div className="ticker-content move-left">
          <span> Latest Updates: Gold Mining Investigations · Community Reports · Extractivism Research · Environmental Justice · </span>
        </div>
      </div>

      {/* TICKER 2 — Left → Right */}
      <div className="ticker ticker-yellow">
        <div className="ticker-content move-right">
          <span> News and Events: Ecological Violence Studies · Political Economy Broadcast · New Publications · Field Interviews · </span>
        </div>
      </div>

    </div>
  );
}
