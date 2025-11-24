import React from "react";
import "../App.css";
import MapImage from "../assets/map_project.png";
import PublicationImage from "../assets/childLabour.jpg";
import broadCastImage from "../assets/mine2.png";

export default function Projects() {
  return (
    <section className="section projects">
      <h2>Projects</h2>

      <div className="project-grid">

        <div className="project-card">
          <img src={MapImage} alt="" className="project-image" />
          <h3>01 — Gold Mining Investigation Map</h3>
          <p>
            A geospatial investigation into the environmental, health, and 
            social impacts of industrial and artisanal gold mining across Sudan.
          </p>
        </div>

        <div className="project-card">
          <img src={broadCastImage} alt="" className="project-image" />
          <h3>02 — Ecology & Political Economy Broadcast</h3>
          <p>
            A broadcast documenting ecological injustice and shifting political 
            economies shaping Sudan and the region.
          </p>
        </div>

        <div className="project-card">
          <img src={PublicationImage} alt="" className="project-image" />
          <h3>03 — Research Papers & Publications</h3>
          <p>
            Essays and research on extractivism, ecological colonialism,
            small arms proliferation, and community-led resistance.
          </p>
        </div>

      </div>
    </section>
  );
}