import React, { useState } from "react";
import "../App.css";

import MapImage from "../assets/map_project.png";
import PublicationImage from "../assets/childLabour.jpg";
import broadCastImage from "../assets/mine2.png";
import ConflictImage from "../assets/mine4.png";

export default function Projects({ text, lang }) {

  // states for expand/collapse
  const [expanded, setExpanded] = useState({
    p1: false,
    p2: false,
    p3: false,
    p4: false
  });

  // DIFFERENT LIMIT for EN / AR
  const limit = lang === "ar" ? 200 : 120;

  // preview logic
  const getPreview = (body, isExpanded) => {
    if (isExpanded) return body;
    if (body.length <= limit) return body;
    return body.substring(0, limit) + "...";
  };

  // button label
  const more = lang === "ar" ? "عرض المزيد" : "See more";
  const less = lang === "ar" ? "عرض أقل" : "See less";

  return (
    <section id="projects" className="section projects">
      <h2>{text.heading}</h2>

      <div className="project-grid">

        {/* PROJECT 1 */}
        <div className="project-card">
          <img src={MapImage} alt="" className="project-image" />
          <h3>{text.project_1.header}</h3>

          <p>{getPreview(text.project_1.body, expanded.p1)}</p>

          {text.project_1.body.length > limit && (
            <button
              className="see-more-btn"
              onClick={() => setExpanded({ ...expanded, p1: !expanded.p1 })}
            >
              {expanded.p1 ? less : more}
            </button>
          )}
        </div>

        {/* PROJECT 2 */}
        <div className="project-card">
          <img src={broadCastImage} alt="" className="project-image" />
          <h3>{text.project_2.header}</h3>

          <p>{getPreview(text.project_2.body, expanded.p2)}</p>

          {text.project_2.body.length > limit && (
            <button
              className="see-more-btn"
              onClick={() => setExpanded({ ...expanded, p2: !expanded.p2 })}
            >
              {expanded.p2 ? less : more}
            </button>
          )}
        </div>

        {/* PROJECT 3 */}
        <div className="project-card">
          <img src={PublicationImage} alt="" className="project-image" />
          <h3>{text.project_3.header}</h3>

          <p>{getPreview(text.project_3.body, expanded.p3)}</p>

          {text.project_3.body.length > limit && (
            <button
              className="see-more-btn"
              onClick={() => setExpanded({ ...expanded, p3: !expanded.p3 })}
            >
              {expanded.p3 ? less : more}
            </button>
          )}
        </div>

        {/* PROJECT 4 */}
        <div className="project-card">
          <img src={ConflictImage} alt="" className="project-image" />
          <h3>{text.project_4.header}</h3>

          <p>{getPreview(text.project_4.body, expanded.p4)}</p>

          {text.project_4.body.length > limit && (
            <button
              className="see-more-btn"
              onClick={() => setExpanded({ ...expanded, p4: !expanded.p4 })}
            >
              {expanded.p4 ? less : more}
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
