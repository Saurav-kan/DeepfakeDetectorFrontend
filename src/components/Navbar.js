import React from "react";
import "./Navbar.css";

function Navbar({ onNavigate, activeSection }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Deepfake Detector</div>
      <ul className="navbar-links">
        <li>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home");
            }}
            className={activeSection === "home" ? "active" : ""}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("about");
            }}
            className={activeSection === "about" ? "active" : ""}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#technology"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("technology");
            }}
            className={activeSection === "technology" ? "active" : ""}
          >
            Technology
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
