import React from "react";
import "../App.css";

export default function About({text}) {
    return (
           <section id="about" className="section about">
        <h2>{text.heading}</h2>
        <p>
         {text.body}

        </p>
      </section>
    );
}   