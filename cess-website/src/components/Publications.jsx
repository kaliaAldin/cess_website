import React from "react";
import "../App.css";
import Pdficon from "../assets/pdf-svgrepo-com.png";

export default function Publications({ text }) {
  if (!text) return null;

  // Collect keys like "publication_1", "publication_2", ...
  const pubKeys = Object.keys(text)
    .filter((k) => /^publication_\d+$/.test(k))
    .sort((a, b) => {
      const na = parseInt(a.split("_")[1], 10);
      const nb = parseInt(b.split("_")[1], 10);
      return na - nb;
    });

  return (
    <section id="publications" className="section publications">
      <h2>{text.heading}</h2>

      <div className="pub-list">
        {pubKeys.map((key) => {
          const pub = text[key];
          if (!pub) return null;

          // Optional: skip empty items so you don't render blank cards
          const hasContent =
            (pub.header && pub.header.trim()) ||
            (pub.description && pub.description.trim()) ||
            (pub.year && String(pub.year).trim()) ||
            (pub.link && pub.link.trim());

          if (!hasContent) return null;

          return (
            <div className="pub-item" key={key}>
              <h4>{pub.header}</h4>

              {pub.link ? (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-link"
                >
                  <span className="pub-meta">
                    {pub.description} — {pub.year}
                  </span>
                  <img className="pdf-icon" src={Pdficon} alt="PDF icon" />
                </a>
              ) : (
                <span className="pub-meta">
                  {pub.description} — {pub.year}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
