import React from "react";
import "../App.css";
import MapImage from "../assets/map_project.png";
import PublicationImage from "../assets/childLabour.jpg";
import broadCastImage from "../assets/mine2.png";

export default function Projects({ text }) {
  return (
    <section className="section projects">
      <h2>{text.heading}</h2>

      <div className="project-grid">

        <div className="project-card">
          <img src={MapImage} alt="" className="project-image" />
          <h3>01 — {text.project_1.header}</h3>
          <p>
            {text.project_1.body}
          </p>
        </div>

        <div className="project-card">
          <img src={broadCastImage} alt="" className="project-image" />
          <h3>02 — {text.project_2.header}</h3>
          <p>
            {text.project_2.body}
          </p>
        </div>

        <div className="project-card">
          <img src={PublicationImage} alt="" className="project-image" />
          <h3>03 — {text.project_3.header} </h3>
          <p>
            {text.project_3.body}
          </p>
        </div>

      </div>
    </section>
  );
}