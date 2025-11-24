import React from "react"; 
import "./App.css";
import Projects from "./components/Projects.jsx";
import logoEN from "./assets/LOGOCESS2025-01.png";
import logoAR from "./assets/cessLogo.png";
import GeometryBar from "./components/GeometryBar.jsx";

import Ticker from "./components/Ticker.jsx";


export default function App() {
  return (
    <div className="site-wrapper">
      <GeometryBar />
      <Ticker />
      {/* HERO */}
      <header className="hero">
        

        <h1 className="hero-title">
          
          CENTER FOR ENVIRONMENTAL & SOCIAL STUDIES
          <p className="hero-text">
          Researching extractivism, ecological violence, political economy, and 
          community resilience in Sudan and the wider region.
        </p>
        </h1>
<img src={logoEN} alt="CESS Logo English" className="logo-main" />
        
      </header>

      {/* ABOUT */}
      <section className="section about">
        <h2>About CESS</h2>
        <p>
         cess-sudan.com is conceived as a critical knowledge platform that seeks to expand legal literacy, public accountability, and structural transparency within Sudan’s mining sector—an arena historically shaped by dispossession, militarized extraction, and opaque political–economic arrangements. Its scope is intentionally open-ended, with the aim of extending its analysis to other strategically exploited resources, including water, energy, and land.

The platform is an initiative of the Center for Environmental and Social Studies (CESS), a Sudanese research collective committed to advancing social justice and countering the ecological and economic violences embedded in extractivist regimes. CESS works to produce and democratize knowledge, defend environmental and human rights, and support communities confronting displacement, exploitation, and systemic marginalization.

Built through collaborative efforts and solidarities across research, civil society, and grassroots networks, the platform provides access to current news, investigative studies, and specialized reports. It also creates a space for engaging with affected communities, activists, scholars, and practitioners.

Our aim is not merely to “inform,” but to intervene—to amplify subordinated voices, contest extractive power structures, and provide resources that can contribute to alternative development trajectories grounded in justice and collective autonomy. We encourage users to connect with us through these channels, to participate, critique, and build with us. We regard these interactions as essential for strengthening public consciousness, expanding community agency, and ensuring that struggles around resource governance reach a broader public.

Given the intensifying threats posed by Sudan’s mining economy—marked by militarization, corruption, and environmental destruction—and given the expanding possibilities of digital media, establishing accessible and reliable online infrastructures has become indispensable. Such platforms offer counter-narratives to dominant state and corporate discourses, support community organizing, and help expose the political and ecological costs of extractivism in Sudan.
        </p>
      </section>

      <Projects />  

      {/* PUBLICATIONS */}
      <section className="section publications">
        <h2>Publications</h2>

        <div className="pub-list">
          <div className="pub-item">
            <h4>The Proliferation of Small Arms in Sudan</h4>
            <span className="pub-meta">Research Paper — 2024</span>
          </div>

          <div className="pub-item">
            <h4>Ecological Colonialism & Extractive Economies</h4>
            <span className="pub-meta">Essay — 2025</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <img src={logoAR} alt="CESS Arabic Logo" className="logo-footer" />
        <p>© 2025 — Center for Environmental & Social Studies</p>
        <p>Khartoum -Nairobi -Cairo —Paris -Berlin </p>
      </footer>

    </div>
  );
}
