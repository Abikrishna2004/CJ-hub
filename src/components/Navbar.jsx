import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { bg, setBg, acc, setAcc } = useTheme();
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const settingsBtnRef = useRef(null);

  // Close customizer when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        settingsBtnRef.current &&
        !settingsBtnRef.current.contains(e.target)
      ) {
        setCustomizerOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="header" role="banner">
      <nav className="container nav-container" aria-label="Main Navigation">
        <Link to="/" className="logo">
          <img src="assets/logo.jpg" alt="Compile Journey Logo" class="logo-icon-img" />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span className="text-gradient">Compile</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
              JOURNEY
            </span>
          </div>
        </Link>

        {/* Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', position: 'relative' }}>
          <button
            ref={settingsBtnRef}
            className={`theme-btn ${customizerOpen ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setCustomizerOpen(!customizerOpen);
            }}
            aria-label="Theme Customizer"
            aria-expanded={customizerOpen}
          >
            <svg viewBox="0 0 24 24">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>

          {/* Floating Customizer Panel */}
          <div
            ref={panelRef}
            className={`glass-card customizer-panel ${customizerOpen ? 'open' : ''}`}
            role="radiogroup"
            aria-label="Theme Customizer Options"
          >
            <div className="customizer-section">
              <span className="customizer-title">Choose Background</span>
              <div className="color-options">
                {['obsidian', 'midnight', 'sepia', 'light'].map((name) => (
                  <button
                    key={name}
                    className={`color-circle bg-opt ${bg === name ? 'active' : ''}`}
                    onClick={() => setBg(name)}
                    style={{
                      backgroundColor:
                        name === 'obsidian'
                          ? '#05070f'
                          : name === 'midnight'
                          ? '#060814'
                          : name === 'sepia'
                          ? '#f8f3e6'
                          : '#f8fafc',
                      border:
                        name === 'sepia' || name === 'light'
                          ? '1px solid rgba(0,0,0,0.1)'
                          : '1px solid rgba(255,255,255,0.15)',
                    }}
                    title={name.charAt(0).toUpperCase() + name.slice(1)}
                    aria-label={`${name} background`}
                    role="radio"
                    aria-checked={bg === name}
                  />
                ))}
              </div>
            </div>
            <div className="customizer-section">
              <span className="customizer-title">Choose Accent</span>
              <div className="color-options">
                {['cyan', 'magenta', 'emerald', 'amber'].map((name) => (
                  <button
                    key={name}
                    className={`color-circle acc-opt ${acc === name ? 'active' : ''}`}
                    onClick={() => setAcc(name)}
                    style={{
                      backgroundColor:
                        name === 'cyan'
                          ? '#00f2fe'
                          : name === 'magenta'
                          ? '#e100ff'
                          : name === 'emerald'
                          ? '#10b981'
                          : '#f59e0b',
                    }}
                    title={`${name.charAt(0).toUpperCase() + name.slice(1)} Accent`}
                    aria-label={`${name} Accent`}
                    role="radio"
                    aria-checked={acc === name}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg viewBox="0 0 24 24">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`} id="nav-menu-box">
          <li>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/workspace" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Workspace
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
