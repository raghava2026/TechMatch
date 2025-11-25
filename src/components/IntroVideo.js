import React, { useRef, useState, useEffect } from 'react';
import '../styles/IntroVideo.css';

const IntroVideo = ({ onTransitionComplete }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      onTransitionComplete();
    };

    const handleVideoError = () => {
      console.warn('Video failed to load, transitioning to main content');
      // Fallback after 2 seconds if video fails
      setTimeout(onTransitionComplete, 2000);
    };

    const handlePlay = () => {
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    // Fallback: transition after 5 seconds if video doesn't load
    const timeoutId = setTimeout(() => {
      if (video.readyState < 2) {
        console.warn('Video taking too long, transitioning to main content');
        onTransitionComplete();
      }
    }, 5000);

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', handleVideoError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      clearTimeout(timeoutId);
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [onTransitionComplete]);

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onTransitionComplete();
  };

  return (
    <div className="intro-video-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-text">Loading...</div>
        </div>
      )}
      <video
        ref={videoRef}
        className="intro-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/assets/TechMatch Logo Animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button className="skip-intro" onClick={handleSkip}>
        Skip Intro
      </button>
    </div>
  );
};

export default IntroVideo;
