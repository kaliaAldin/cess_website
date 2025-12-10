import React from "react";
import "../App.css";
import logoAR from "../assets/cessLogo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <img src={logoAR} alt="CESS Arabic Logo" className="logo-footer" />
      <p>© 2025 — Center for Environmental & Social Studies</p>
      <p>Khartoum -Kampala -Cairo —Paris -Berlin </p>
    </footer>
  );
}