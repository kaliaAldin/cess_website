import React from "react";
import "../App.css";
import logoEN from "../assets/LOGOCESS2025-01.png";

export default function Hero({text}) {
    return (
         <header className="hero">
        

        <h1 className="hero-title">
          
           {text.title}
          <p className="hero-text">
       {text.text}
        </p>
        </h1>
<img src={logoEN} alt="CESS Logo English" className="logo-main" />
        
      </header>
    );
}