import { useState, useEffect,useRef  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const [headerVisible, setHeaderVisible] = useState(false);
const videoRef = useRef(null);
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
     // Use requestAnimationFrame for smoother performance
      window.requestAnimationFrame(() => {
        const position = window.scrollY;
        setScrollPosition(position);
        
        // Show header when introduction is visible
        if (position > 50) {
          setHeaderVisible(true);
        } else {
          setHeaderVisible(false);
        }
        
        // Parallax effect for video
        if (videoRef.current) {
          videoRef.current.style.transform = `translateY(${position * 0.3}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      {/* Transparent Header */}
      <header className={`transparent-header ${headerVisible ? 'visible' : ''}`}>
        <nav>
          <div className="logo">[Your Logo]</div>
          <ul className="nav-links">
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <div className={`home ${scrollPosition > 50 ? 'scrolled' : ''}`}>
          <video
            ref={videoRef}
            src="./src/assets/mainvid.mp4"
            autoPlay
            loop
            muted
            className="background-video"
          ></video>
          <h1 className={`welcome-text ${scrollPosition > 0 ? 'fade-out' : ''}`}>
            Welcome to My Portfolio
          </h1>
        </div>

        <div className={`introduction ${scrollPosition > 50 ? 'visible' : ''}`}>
          <div className="intro-content">
            <h1 className="animate-up">Hi, I'm [Your Name]</h1>
            <p className="animate-up delay-1">
              I'm a [Your Profession] with a passion for [Your Interests]. I love
              creating [Your Work/Projects].
            </p>
          </div>
        </div>
      </div>
      
      {/* Spacer to allow scrolling */}
      <div className="spacer"></div>
    </div>
  );
}

export default App;