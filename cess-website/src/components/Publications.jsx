import React from "react";
import "../App.css";
import Pdficon from "../assets/pdf-svgrepo-com.png";

export default function Publications({text}) {
  return (
  <section id="publications" className="section publications">
        <h2>{text.heading}</h2>

        <div className="pub-list">
          <div className="pub-item">
            
            <h4>{text.publication_1.header}</h4>
            <a 
  href={text.publication_1.link} 
  target="_blank" 
  rel="noopener noreferrer"
  className="pdf-link"
>
            <span className="pub-meta">{text.publication_1.description} — {text.publication_1.year}</span>
            <img  className="pdf-icon" src={Pdficon} alt="PDF icon" /></a>
          </div>

          <div className="pub-item">
            <h4>{text.publication_2.header}</h4>
            <a 
  href={text.publication_2.link} 
  target="_blank" 
  rel="noopener noreferrer"
  className="pdf-link"
>
            <span className="pub-meta">{text.publication_2.description} — {text.publication_2.year}</span>
            <img  className="pdf-icon" src={Pdficon} alt="PDF icon" /></a>
          </div>
        </div>
      </section>
  );
}   