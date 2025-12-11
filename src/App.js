import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import IntroVideo from './components/IntroVideo';
import HexagonCanvas from './components/HexagonCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FirebirdModal from './components/FirebirdModal';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Admissions from './pages/Admissions';
import ServiceDetails from './pages/ServiceDetails';
import Testimonials from './pages/Testimonials';
import Projects from './pages/Projects';

import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PasswordReset from './pages/PasswordReset';
import Dashboard from './pages/Dashboard';
import './styles/App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [firebirdOpen, setFirebirdOpen] = useState(false);

  useEffect(() => {
    // Check if intro has been seen before (session storage)
    const hasSeenIntro = sessionStorage.getItem('techmatch_intro_seen');
    if (hasSeenIntro === 'true') {
      setShowIntro(false);
      setAppReady(true);
    }

    // Check if firebird modal has been shown before (persist across visits)
    try {
      const hasSeenFirebird = localStorage.getItem('techmatch_firebird_seen');
      if (!hasSeenFirebird) {
        // only show after intro completes; set initial open flag to false here
        // we'll open it when intro is finished (or immediately if intro already skipped)
        setFirebirdOpen(true);
      }
    } catch (err) {
      // localStorage may be unavailable in some environments; default to showing once per session
      const hasSeenFirebirdSession = sessionStorage.getItem('techmatch_firebird_seen');
      if (!hasSeenFirebirdSession) setFirebirdOpen(true);
    }

    // Mark app as ready after initial render
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('techmatch_intro_seen', 'true');
  };

  const handleFirebirdClose = () => {
    setFirebirdOpen(false);
    try {
      localStorage.setItem('techmatch_firebird_seen', 'true');
    } catch (err) {
      // fallback to session storage
      sessionStorage.setItem('techmatch_firebird_seen', 'true');
    }
  };

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className={`app ${appReady ? 'ready' : ''}`}>
          <HexagonCanvas />
          <WhatsAppButton />
          <FirebirdModal open={firebirdOpen && !showIntro} onClose={handleFirebirdClose} />
          {showIntro ? (
            <IntroVideo onTransitionComplete={handleIntroComplete} />
          ) : (
            <>
              <Navbar />
              <main className="main-content-wrapper">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/admissions" element={<Admissions />} />
                  <Route path="/services/:serviceId" element={<ServiceDetails />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/password-reset" element={<PasswordReset />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
