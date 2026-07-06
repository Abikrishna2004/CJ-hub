import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Workspace from './pages/Workspace';
import Contact from './pages/Contact';
import { ThemeProvider } from './context/ThemeContext';
import '../css/global.css';

function AppContent() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Pages Switch Router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Back to Top */}
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
