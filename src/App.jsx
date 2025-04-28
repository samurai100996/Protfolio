import { useState, useEffect,useRef  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import './App.css'
import { Typewriter } from 'react-simple-typewriter';

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const [headerVisible, setHeaderVisible] = useState(false);
   const [greetingIndex, setGreetingIndex] = useState(0);
  const [firstWordShown, setFirstWordShown] = useState(false);
const videoRef = useRef(null);

 const greetings = [
    "• Hello",         // English
     "• 안녕",      // Korean
    "• Bonjour",       // French
    "• Hola",          // Spanish
    "• Ciao",          // Italian
    "• こんにちは",    // Japanese
    "• नमस्ते",       // Hindi
    "• 你好",        // Chinese
    "• Guten Tag",     // German
    "• Merhaba",       // Turkish
    "• Wassup",       // Turkish
    "• سَلَامٌ",        // Arabic
    "• Sawatdee",      // Thai
    "• Merhaba",       // Turkish
    "• Olá",           // Portuguese
    "• Здравствуйте",  // Russian
    "• Hallo"          // Dutch
  ];
// Handle first word fade in
  useEffect(() => {
    const firstWordTimer = setTimeout(() => {
      setFirstWordShown(true);
    }, 1500); // First word shows for 1.5 seconds

    return () => clearTimeout(firstWordTimer);
  }, []);
useEffect(() => {
  if (!firstWordShown) return; // Wait until first word is shown

  let intervalId;
  let timeoutId;

  if (greetingIndex === greetings.length - 1) {
    // At last word, slow down
    timeoutId = setTimeout(() => {
      setGreetingIndex(0); // Restart from beginning after pause
    }, 2000); // 2 seconds pause at last word
  } else {
    // Fast cycling for other words
    intervalId = setInterval(() => {
      setGreetingIndex(prevIndex => (prevIndex + 1) % greetings.length);
    }, 150); // 150ms fast
  }

  return () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };
}, [greetingIndex, firstWordShown]);

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
const navigate = useNavigate();

const handleHomeClick = () => {
  navigate('/'); // Move to home page
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
  return (
    <div className="App">
      {/* Transparent Header */}
      <header className={`transparent-header ${headerVisible ? 'visible' : ''}`}>
        <nav>
         <div className="logo">
        <img src={logo} alt="Logo" />
        </div>
          <ul className="nav-links">
            <li onClick={handleHomeClick}>Home</li>
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
          
          <div className="greeting-container">
            <div className="greeting-text">
            <span
  className={`greeting-word ${
    greetingIndex === greetings.length - 1 ? 'fade-out' :
    (!firstWordShown && greetingIndex === 0 ? 'fade-in' : 'instant')
  }`}
>
  {greetings[greetingIndex]}
</span>
            </div>
          </div>
          <div className="scroll">
          <h3>Scroll down</h3>
          </div>
        </div>
        <div className={`introduction ${scrollPosition > 50 ? 'visible' : ''}`}>
          <div className="intro-content">
            <h1 className="animate-up">
              Hi, I'm <span className="special-font">Saurabh</span>
            </h1>
            <p className="animate-up delay-1">
  {' '}
  <span style={{ color: '#ff6f61', fontWeight: 'bold' }}>
    <Typewriter
      words={['Photographer', 'Videographer', 'Content Creator', 'Curiographer']}
      loop={0} // 0 for infinite loop
      cursor
      cursorStyle="_"
      typeSpeed={20} // typing speed (lower = faster)
      deleteSpeed={5} // deleting speed (lower = faster)
      delaySpeed={190} // delay before starting new word (lower = faster)
    />
  </span>
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