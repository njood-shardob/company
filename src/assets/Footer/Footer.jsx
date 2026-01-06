import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8c1.7 3.3 3.3 4.9 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.1 22 2 13.9 2 3c0-.6.4-1 1-1h3.8c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
      />
    </svg>
  );
}

function IconWeb() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm7.9 9h-3.1c-.2-2.2-.9-4.2-2-5.7 2.6 1 4.6 3.2 5.1 5.7zM12 4.1c1.3 1.5 2.2 3.9 2.4 6.9H9.6c.2-3 .9-5.4 2.4-6.9zM4.9 11c.6-2.5 2.5-4.7 5.1-5.7-1.1 1.5-1.8 3.5-2 5.7H4.9zm0 2H8c.2 2.2.9 4.2 2 5.7-2.6-1-4.6-3.2-5.1-5.7zm4.7 0h4.8c-.2 3-.9 5.4-2.4 6.9-1.3-1.5-2.2-3.9-2.4-6.9zm5.4 5.7c1.1-1.5 1.8-3.5 2-5.7h3.1c-.6 2.5-2.5 4.7-5.1 5.7z"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2c-3.9 0-7 3.1-7 7 0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5 14.5 7.6 14.5 9 13.4 11.5 12 11.5z"
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ftx" role="contentinfo">
      <div className="ftx__bg" aria-hidden="true" />
      <div className="ftx__container">
        <div className="ftx__top">
          {/* Logo / Brand */}
          <div className="ftx__brand">
            
            <img className="ftx__logo" src="/logo.jpg" alt="Horizon Delta Logo" />
            <div className="ftx__brandText">
              <div className="ftx__brandTitle">Horizon Delta Est.</div>
              <div className="ftx__brandSub">Building Quality Projects On Time</div>
            </div>
          </div>

          {/* Links */}
          <nav className="ftx__links" aria-label="Quick Links">
            <div className="ftx__colTitle">Quick Links</div>
            <ul className="ftx__list">
              <li><Link className="ftx__link" to="/">Home</Link></li>
              <li><Link className="ftx__link" to="/projects">Projects</Link></li>
              <li><Link className="ftx__link" to="/about">About Us</Link></li>
              <li><Link className="ftx__link" to="/contact">Contact Us</Link></li>
            </ul>
          </nav>

          {/* Contact (مثل الصورة) */}
          <div className="ftx__contactBlock">
            <div className="ftx__colTitle">Contact Information</div>

            <div className="ftx__contactList">
              <div className="ftx__contactRow">
                <span className="ftx__iconCircle" aria-hidden="true"><IconPhone /></span>
                <a className="ftx__contactText" href="tel:+966506604269">
                  +966 50 660 4269
                </a>
              </div>

              <div className="ftx__contactRow">
                <span className="ftx__iconCircle" aria-hidden="true"><IconMail /></span>
                <a className="ftx__contactText" href="mailto:info@horizon-delta.com">
                  info@horizon-delta.com
                </a>
              </div>

              <div className="ftx__contactRow">
                <span className="ftx__iconCircle" aria-hidden="true"><IconWeb /></span>
                <a
                  className="ftx__contactText"
                  href="https://www.horizon-delta.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.horizon-delta.com
                </a>
              </div>

              <div className="ftx__contactRow">
                <span className="ftx__iconCircle" aria-hidden="true"><IconPin /></span>
                <span className="ftx__contactText">Saudi Arabia, Riyadh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ftx__divider" />

        <div className="ftx__bottom">
          © {year} Horizon Delta Est. All rights reserved.
        </div>
      </div>
    </footer>
  );
}