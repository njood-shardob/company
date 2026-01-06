import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "./image/logo.jpg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function linkClassName(isActive) {
    return isActive ? "navlink is-active" : "navlink";
  }

  return (
    <header className={scrolled ? "nav nav--scrolled" : "nav"}>
      <div className="nav__inner">
        {/* Left: img فقط + اسم الشركة كرابط للـ Home */}
        <div className="nav__brand">
          <img
            className="nav__logo"
            src={logo}
            alt="Company logo"
          />

          <NavLink to="/" end className="nav__brandNameLink">
            Horizon Delta Est.
          </NavLink>
        </div>

        {/* Right: Tabs */}
        <nav className="nav__links" aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            className={(args) => linkClassName(args.isActive)}
          >
            Home
          </NavLink>

          <NavLink
            to="/projects"
            className={(args) => linkClassName(args.isActive)}
          >
            Projects
          </NavLink>

          <NavLink
            to="/about"
            className={(args) => linkClassName(args.isActive)}
          >
            About us
          </NavLink>

          <NavLink
            to="/contact"
            className={(args) => linkClassName(args.isActive)}
          >
            Contact us
          </NavLink>
        </nav>

       
      </div>
    </header>
  );
}