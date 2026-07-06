import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img src="assets/logo.jpg" alt="Compile Journey Logo" className="logo-icon-img" loading="lazy" />
              <span className="text-gradient">Compile Journey</span>
            </Link>
            <p className="footer-desc">
              Empowering students and aspiring developers to master programming, explore tech fields, and launch careers.
            </p>
          </div>

          <div>
            <h4 className="footer-title">Platform</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Socials</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://github.com/Abikrishna2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile (opens in a new tab)"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/abikrishna-p-21195b304"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile (opens in a new tab)"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link to="/contact">Instagram</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">&copy; {new Date().getFullYear()} Compile Journey. All rights reserved. Created by Abikrishna.</span>
          <div className="footer-socials">
            <a
              href="https://github.com/Abikrishna2004"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="GitHub Profile (opens in a new tab)"
            >
              <svg viewBox="0 0 24 24">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/abikrishna-p-21195b304"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="LinkedIn Profile (opens in a new tab)"
            >
              <svg viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
