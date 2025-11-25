import React, { useState } from "react";
import "./App.css";

// i18n files
import en from "./data/en.json";
import ar from "./data/Ar.json";

// components
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Publications from "./components/Publications.jsx";
import Footer from "./components/Footer.jsx";
import GeometryBar from "./components/GeometryBar.jsx";
import Ticker from "./components/Ticker.jsx";

export default function App() {

  // language state
  const [lang, setLang] = useState("en");

  // choose Arabic or English
  const t = lang === "en" ? en : ar;

  return (
    <div className={`site-wrapper ${lang === "ar" ? "rtl" : ""}`}>

      {/* Sticky Elements */}
      <div className="always-ltr">
        <GeometryBar />
      <Ticker />
      </div>
      

      {/* Language Switch Button */}
      <button className="lang-switch" onClick={() => setLang(lang === "en" ? "ar" : "en")}>
        {lang === "en" ? "العربية" : "English"}
      </button>

      {/* Components with content */}
      <Hero text={t.hero} />
      <About text={t.about} />
      <Projects text={t.projects} />
      <Publications text={t.publications} />
      <Footer text={t.footer} />

    </div>
  );
}
