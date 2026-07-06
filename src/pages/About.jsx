import React from 'react';
import '../../css/about.css';

export default function About() {
  return (
    <main id="main-content">
      {/* ABOUT SECTION */}
      <section className="about-hero">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Who We Are</span>
            <h1 className="section-title">About Compile Journey</h1>
            <p className="section-subtitle">
              A companion platform designed to support students navigating technology curriculum paths.
            </p>
          </div>

          <div className="glass-card" style={{ marginBottom: 'var(--space-xxl)' }}>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                textAlign: 'center',
                maxWidth: '900px',
                margin: '0 auto',
              }}
            >
              Compile Journey was created with a simple vision: to make technology education accessible, structured, and
              practical for every student. The platform serves as a learning companion for aspiring developers who want to
              build strong technical skills and advance their careers in technology. Through carefully curated resources,
              learning roadmaps, project ideas, and career guidance, Compile Journey aims to help students learn efficiently
              and confidently.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="about-split-grid">
            <div className="glass-card about-split-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-cyan)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="12 8 8 12 12 16 16 12 12 8" />
                </svg>
                <h2 className="about-split-title">Our Mission</h2>
              </div>
              <p className="about-split-desc">
                Our mission is to empower students and aspiring developers by providing structured learning paths, practical
                resources, and career-focused guidance that bridge the gap between education and industry requirements.
              </p>
            </div>

            <div className="glass-card about-split-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-magenta)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                <h2 className="about-split-title">Our Vision</h2>
              </div>
              <p className="about-split-desc">
                Our vision is to build a thriving community of learners and innovators where curiosity drives creativity,
                knowledge inspires growth, and every student has the opportunity to achieve success in technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section
        className="founder-section"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Founder</span>
            <h2 className="section-title">Founder Introduction</h2>
            <p className="section-subtitle">Meet the visionary behind Compile Journey Hub.</p>
          </div>

          <div className="glass-card founder-card">
            <div className="founder-avatar-frame">
              <div className="founder-avatar" style={{ padding: 0, overflow: 'hidden' }}>
                <img
                  src="assets/founder.jpg"
                  alt="Abikrishna - Founder of Compile Journey"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="founder-info">
              <span className="founder-role">Founder & Developer</span>
              <h3 className="founder-name">Abikrishna</h3>
              <p className="founder-desc">
                Abikrishna is a Computer Science Engineering student with a strong passion for Software Development,
                Artificial Intelligence, Data Science, and Continuous Learning.
              </p>
              <p className="founder-desc" style={{ marginTop: 'var(--space-xs)' }}>
                Driven by the desire to help fellow students navigate their learning journey more effectively, he created
                Compile Journey as a platform to share knowledge, roadmaps, resources, and experiences that support personal
                and professional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS & INTERESTS */}
      <section className="skills-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Competencies</span>
            <h2 className="section-title">Skills & Interests</h2>
            <p className="section-subtitle">Primary areas of research, practice, and sharing on this platform.</p>
          </div>

          <div className="skills-container">
            <span className="skill-tag">Python Programming</span>
            <span className="skill-tag">Artificial Intelligence & Machine Learning</span>
            <span className="skill-tag">Data Science & Analytics</span>
            <span className="skill-tag">Web Development</span>
            <span className="skill-tag">Data Structures & Algorithms</span>
            <span className="skill-tag">Software Development</span>
            <span className="skill-tag">Career Development</span>
            <span className="skill-tag">Open Source Learning</span>
          </div>
        </div>
      </section>
    </main>
  );
}
