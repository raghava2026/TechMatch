import React, { useEffect, useRef, useState } from 'react';

const IntroVideo = ({ videoSrc, onTransitionComplete, onSkip }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      onTransitionComplete?.();
    };

    const handleError = () => {
      console.warn('Video failed to load, transitioning to main content');
      onTransitionComplete?.();
    };

    const handlePlay = () => {
      setIsLoaded(true);
    };

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Fallback timeout (3 seconds)
    transitionTimeoutRef.current = setTimeout(() => {
      if (!isLoaded) {
        console.warn('Video taking too long, transitioning to main content');
        onTransitionComplete?.();
      }
    }, 3000);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [onTransitionComplete]);

  return (
    <div className="intro-video-container">
      <video
        ref={videoRef}
        className="intro-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button className="skip-intro" onClick={() => {
        videoRef.current?.pause();
        onSkip?.();
      }}>
        Skip Intro
      </button>
    </div>
  );
};

export default IntroVideo;
