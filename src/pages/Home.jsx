import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../css/home.css';

function StatCounter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <>{count}</>;
}

const CAROUSEL_SLIDES = [
  {
    title: 'Artificial Intelligence & Machine Learning',
    desc: 'Learn the fundamentals of AI, Machine Learning, Deep Learning, and Generative AI through structured learning paths and practical projects.',
    colorClass: '', // default
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    title: 'Data Science',
    desc: 'Master data analysis, visualization, statistics, Python, SQL, and machine learning techniques used by industry professionals.',
    colorClass: 'purple',
    icon: (
      <svg viewBox="0 0 24 24">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: 'Web Development',
    desc: 'Build modern websites and web applications using HTML, CSS, JavaScript, React, and backend technologies.',
    colorClass: 'emerald',
    icon: (
      <svg viewBox="0 0 24 24">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    title: 'Data Structures & Algorithms',
    desc: 'Strengthen your problem-solving skills and prepare for technical interviews with comprehensive DSA learning resources.',
    colorClass: 'amber',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export default function Home() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const autoplayTimerRef = useRef(null);

  const getSlideClass = (i) => {
    if (i === slideIdx) return 'active';
    if (i === (slideIdx - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length) return 'prev-slide';
    if (i === (slideIdx + 1) % CAROUSEL_SLIDES.length) return 'next-slide';
    return 'hidden-slide';
  };

  const startAutoplay = () => {
    autoplayTimerRef.current = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
  };

  const resetAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    startAutoplay();
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, []);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSlideIdx((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
    resetAutoplay();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSlideIdx((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    resetAutoplay();
  };

  return (
    <>
      <main id="main-content">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="hero-tagline">Welcome to Compile Journey</span>
              <h1 className="hero-title">
                Where Curiosity
                <br />
                <span className="text-gradient">Compiles Creativity</span>
              </h1>
              <p className="hero-desc">
                Compile Journey is a platform dedicated to helping students and aspiring developers learn, grow, and achieve
                their career goals. Explore structured roadmaps, practical projects, and valuable resources designed to
                transform curiosity into real-world skills.
              </p>
              <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                Start Learning
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
            <div className="hero-visual">
              <div className="hero-logo-container">
                <img src="assets/logo.jpg" alt="Compile Journey Logo" className="hero-logo-img" />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED LEARNING PATHS */}
        <section
          className="paths-section"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-color)',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Paths</span>
              <h2 className="section-title">Featured Learning Paths</h2>
              <p className="section-subtitle">
                Explore carefully curated, comprehensive roadmaps designed to help you specialize in core technical fields.
              </p>
            </div>

            <div className="paths-slider-container">
              <div className="paths-slider">
                <button className="slider-arrow prev" onClick={handlePrev} aria-label="Previous Slide">
                  <svg viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {CAROUSEL_SLIDES.map((slide, i) => (
                  <div
                    key={i}
                    className={`glass-card path-card ${slide.colorClass} path-slide ${getSlideClass(i)}`}
                    onClick={() => {
                      const slideState = getSlideClass(i);
                      if (slideState === 'prev-slide') {
                        setSlideIdx((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
                        resetAutoplay();
                      } else if (slideState === 'next-slide') {
                        setSlideIdx((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
                        resetAutoplay();
                      }
                    }}
                  >
                    <div className="path-card-icon">{slide.icon}</div>
                    <h3 className="path-card-title">{slide.title}</h3>
                    <p className="path-card-desc">{slide.desc}</p>
                  </div>
                ))}

                <button className="slider-arrow next" onClick={handleNext} aria-label="Next Slide">
                  <svg viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              <div className="slider-dots">
                {CAROUSEL_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={`slider-dot ${i === slideIdx ? 'active' : ''}`}
                    onClick={() => {
                      setSlideIdx(i);
                      resetAutoplay();
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE SECTION */}
        <section className="why-section">
          <div className="container">
            {/* Animated Statistics Counters Banner */}
            <div
              className="glass-card"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-xl)',
                textAlign: 'center',
                marginBottom: 'var(--space-xxl)',
                padding: 'var(--space-xl) var(--space-lg)',
              }}
            >
              <div className="stat-box">
                <div className="why-number" style={{ marginBottom: 0 }}>
                  <StatCounter target={5000} />+
                </div>
                <p
                  className="text-muted"
                  style={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Active Students
                </p>
              </div>
              <div
                className="stat-box"
                style={{
                  borderLeft: '1px solid var(--border-color)',
                  borderRight: '1px solid var(--border-color)',
                }}
              >
                <div className="why-number" style={{ marginBottom: 0 }}>
                  <StatCounter target={50} />+
                </div>
                <p
                  className="text-muted"
                  style={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Learning Roadmaps
                </p>
              </div>
              <div className="stat-box">
                <div className="why-number" style={{ marginBottom: 0 }}>
                  <StatCounter target={100} />+
                </div>
                <p
                  className="text-muted"
                  style={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Practical Projects
                </p>
              </div>
            </div>

            <div className="section-header">
              <span className="section-tag">Value</span>
              <h2 className="section-title">Why Choose Compile Journey?</h2>
              <p className="section-subtitle">
                We bridge the gap between academic theory and industry reality through our core philosophy.
              </p>
            </div>

            <div className="why-grid">
              {/* 1. Structured Learning */}
              <div className="why-card">
                <div className="why-number">01</div>
                <h3 className="why-card-title">Structured Learning</h3>
                <p className="why-card-desc">Follow step-by-step roadmaps designed for beginners and advanced learners.</p>
              </div>

              {/* 2. Practical Projects */}
              <div className="why-card">
                <div className="why-number">02</div>
                <h3 className="why-card-title">Practical Projects</h3>
                <p className="why-card-desc">
                  Apply your knowledge by building real-world projects and strengthening your portfolio.
                </p>
              </div>

              {/* 3. Career Guidance */}
              <div className="why-card">
                <div className="why-number">03</div>
                <h3 className="why-card-title">Career Guidance</h3>
                <p className="why-card-desc">
                  Receive guidance on resumes, LinkedIn optimization, internships, and placement preparation.
                </p>
              </div>

              {/* 4. Continuous Growth */}
              <div className="why-card">
                <div className="why-number">04</div>
                <h3 className="why-card-title">Continuous Growth</h3>
                <p className="why-card-desc">Stay updated with the latest technologies, trends, and learning opportunities.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* INTERACTIVE MODAL DIALOG POPUP */}
      <div
        className={`modal-overlay ${modalOpen ? 'open' : ''}`}
        id="info-modal"
        aria-hidden={!modalOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title-id"
        onClick={() => setModalOpen(false)}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title" id="modal-title-id">
              Get Started with Compile Journey
            </h3>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)} aria-label="Close Modal">
              <svg viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <p style={{ marginBottom: 'var(--space-md)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Welcome to your engineering development companion! Compile Journey provides structured curriculum mappings,
              handpicked libraries, and practice Blueprints to accelerate your progress.
            </p>
            <h4 style={{ color: 'var(--color-cyan)', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>How to Navigate:</h4>
            <ul
              style={{
                paddingLeft: 'var(--space-lg)',
                color: 'var(--text-secondary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '0.9rem',
                lineHeight: 1.5,
              }}
            >
              <li>
                Explore <strong>Services</strong> to view our structured maps for AI/ML, Data Science, and Web Development.
              </li>
              <li>Pick a roadmap and study curated, free books, videos, and articles.</li>
              <li>Challenge your coding skills with practice portfolio blueprints.</li>
              <li>
                Drop us a note on the <strong>Contact</strong> page for mentorship guidance.
              </li>
            </ul>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary modal-close-btn" onClick={() => setModalOpen(false)}>
              Close Info
            </button>
            <Link to="/services" className="btn btn-primary" onClick={() => setModalOpen(false)}>
              Go to Roadmaps
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
