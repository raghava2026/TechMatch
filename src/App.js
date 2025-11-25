import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroVideo from './components/IntroVideo';
import HexagonCanvas from './components/HexagonCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './styles/App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Check if intro has been seen before (session storage)
    const hasSeenIntro = sessionStorage.getItem('techmatch_intro_seen');
    if (hasSeenIntro === 'true') {
      setShowIntro(false);
      setAppReady(true);
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

  return (
    <Router>
      <div className={`app ${appReady ? 'ready' : ''}`}>
        <HexagonCanvas />
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
                <Route path="/clients" element={<Clients />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
