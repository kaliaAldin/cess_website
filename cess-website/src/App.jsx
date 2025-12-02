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

  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);  // NEW

  const t = lang === "en" ? en : ar;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close menu after click
    }
  };

  return (
    <div className={`site-wrapper ${lang === "ar" ? "rtl" : ""}`}>

      {/* Sticky elements */}
      <div className="always-ltr">
        <GeometryBar />
        <Ticker />
      </div>

      {/* Language + Menu Buttons */}
      <div className="top-buttons">

        {/* Hamburger Menu */}
        <button 
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Language Switch */}
        <button 
          className="lang-switch"
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
        >
          {lang === "en" ? "العربية" : "English"}
        </button>

      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className={`menu-dropdown ${lang === "ar" ? "rtl" : ""}`}>
          <button onClick={() => scrollToSection("about")}>
            {lang === "en" ? "About" : "عن المركز"}
          </button>
          <button onClick={() => scrollToSection("projects")}>
            {lang === "en" ? "Projects" : "المشاريع"}
          </button>
          <button onClick={() => scrollToSection("publications")}>
            {lang === "en" ? "Publications" : "المنشورات"}
          </button>
        </div>
      )}

      {/* Content */}
      <Hero text={t.hero} lang={lang} />
      <About text={t.about} lang={lang} />
      <Projects text={t.projects} lang={lang} />
      <Publications text={t.publications} lang={lang} />
      <Footer text={t.footer} lang={lang} />
    </div>
  );
}
