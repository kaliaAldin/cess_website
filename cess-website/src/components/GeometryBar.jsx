import React, { useEffect, useState } from "react";
import "./GeometryBar.css";

export default function GeometryBar() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.2); // subtle movement
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="geometry-bar"
      style={{ transform: `translateX(${offset}px)` }}
    >
      {/* small repeated shapes */}
      <div className="shape dot" />
      <div className="shape square" />
      <div className="shape line" />
      <div className="shape dot" />
      <div className="shape square" />
      <div className="shape line" />
      <div className="shape dot" />
      <div className="shape triangle" />
      <div className="shape dot" />
      <div className="shape line" />
      <div className="shape square" />
    </div>
  );
}
