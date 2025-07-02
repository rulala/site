import React, { useState, useEffect } from 'react';
import { Github, Mail, ExternalLink, Code, Palette, Search, PenTool, BookOpen, FileText, Instagram, Twitter } from 'lucide-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'countdown' | 'geometric' | 'portfolio'>('countdown');
  const [countdownStep, setCountdownStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]);
  const [nameTransition, setNameTransition] = useState(false);
  const countdownSequence = [3, 2, 1];

  // Determine if bubble cursor should be active
  const isBubbleCursorActive = currentScreen !== 'portfolio';

  useEffect(() => {
    // Add or remove bubble cursor class from body
    if (isBubbleCursorActive) {
      document.body.classList.add('bubble-cursor-active');
    } else {
      document.body.classList.remove('bubble-cursor-active');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('bubble-cursor-active');
    };
  }, [isBubbleCursorActive]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isBubbleCursorActive) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        // Update trail positions with delay
        setTrailPositions(prev => {
          const newTrail = [...prev];
          newTrail[0] = { x: e.clientX - 15, y: e.clientY - 15 };
          newTrail[1] = { x: prev[0].x, y: prev[0].y };
          newTrail[2] = { x: prev[1].x, y: prev[1].y };
          newTrail[3] = { x: prev[2].x, y: prev[2].y };
          return newTrail;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isBubbleCursorActive]);

  useEffect(() => {
    if (currentScreen === 'countdown') {
      if (countdownStep < countdownSequence.length) {
        const timer = setTimeout(() => {
          setCountdownStep(countdownStep + 1);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => setCurrentScreen('geometric'), 500);
      }
    } else if (currentScreen === 'geometric') {
      // Start the name transition animation after 1.5 seconds
      setTimeout(() => {
        setNameTransition(true);
      }, 1500);
      // Then switch to portfolio after 2.5 seconds total
      setTimeout(() => setCurrentScreen('portfolio'), 2500);
    }
  }, [currentScreen, countdownStep]);

  if (currentScreen === 'countdown') {
    return (
      <>
        {isBubbleCursorActive && (
          <div className="bubble-cursor">
            <div 
              className="main-bubble" 
              style={{ left: mousePosition.x, top: mousePosition.y }}
            />
            {trailPositions.map((pos, index) => (
              <div
                key={index}
                className="trail-bubble"
                style={{ left: pos.x, top: pos.y }}
              />
            ))}
          </div>
        )}
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1f2937' }}>
          <div className="text-center">
            <div className="text-8xl md:text-9xl font-title mb-8 transition-all duration-1000 ease-in-out" style={{ color: '#FDF8F5' }}>
              {countdownStep < countdownSequence.length ? countdownSequence[countdownStep] : ''}
            </div>
            <div className="text-lg tracking-widest uppercase font-body" style={{ color: '#94a3b8' }}>
              Loading ...
            </div>
          </div>
        </div>
      </>
    );
  }

  if (currentScreen === 'geometric') {
    return (
      <>
        {isBubbleCursorActive && (
          <div className="bubble-cursor">
            <div 
              className="main-bubble" 
              style={{ left: mousePosition.x, top: mousePosition.y }}
            />
            {trailPositions.map((pos, index) => (
              <div
                key={index}
                className="trail-bubble"
                style={{ left: pos.x, top: pos.y }}
              />
            ))}
          </div>
        )}
        <div className="min-h-screen flex items-center justify-center overflow-hidden relative" style={{ backgroundColor: '#FDF8F5' }}>
          {/* Geometric shapes in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 animate-spin-slow">
                <div className="w-full h-full border-2 transform rotate-45" style={{ borderColor: '#1f2937' }}></div>
              </div>
              <div className="absolute inset-8 animate-pulse">
                <div className="w-full h-full transform rotate-12" style={{ backgroundColor: '#1f2937' }}></div>
              </div>
              <div className="absolute inset-16 animate-bounce">
                <div className="w-full h-full border-4 rounded-full" style={{ borderColor: '#475569' }}></div>
              </div>
              <div className="absolute inset-24 animate-ping">
                <div className="w-full h-full transform rotate-45" style={{ backgroundColor: '#334155' }}></div>
              </div>
            </div>
          </div>
          
          {/* Name overlay - much bigger and more prominent */}
          <div className={`relative z-10 text-center transition-all duration-1000 ease-in-out ${nameTransition ? 'transform -translate-y-96 scale-50' : 'animate-fade-in'}`}>
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-title tracking-tight leading-none" style={{ color: '#1f2937' }}>
              Rula J
            </h1>
            <p className="text-2xl md:text-3xl mt-6 tracking-wider font-body" style={{ color: '#475569' }}>
              AI Professional
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen text-black font-body" style={{ backgroundColor: '#FDF8F5', color: '#1f2937' }}>
      {/* Sticky Header with Name */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-8 backdrop-blur-sm border-b animate-slide-down" style={{ backgroundColor: 'rgba(253, 248, 245, 0.95)', borderColor: '#e2e8f0' }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-title tracking-tight" style={{ color: '#1f2937' }}>
              Rula J
            </h1>
            <p className="text-sm tracking-wider font-body" style={{ color: '#475569' }}>
              AI Professional
            </p>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-sm tracking-wide hover:opacity-70 transition-opacity font-body" style={{ color: '#475569' }}>About</a>
            <a href="#projects" className="text-sm tracking-wide hover:opacity-70 transition-opacity font-body" style={{ color: '#475569' }}>Projects</a>
            <a href="#writing" className="text-sm tracking-wide hover:opacity-70 transition-opacity font-body" style={{ color: '#475569' }}>Writing</a>
            <a href="#contact" className="text-sm tracking-wide hover:opacity-70 transition-opacity font-body" style={{ color: '#475569' }}>Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content with Top Padding */}
      <main className="pt-32">
        {/* Photo Section */}
        <section id="photo" className="min-h-screen flex items-center justify-center px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="max-w-md mx-auto">
              <div className="aspect-square bg-gray-200 rounded-sm overflow-hidden shadow-lg">
                <img 
                  src="https://i.imgur.com/E3NnQkZ.png" 
                  alt="Your profile photo"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback to placeholder if custom image fails to load
                    e.currentTarget.src = "https://images.pexels.com/photos/8923670/pexels-photo-8923670.jpeg?auto=compress&cs=tinysrgb&w=600";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center px-8 py-16" style={{ backgroundColor: '#F6EEE5' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-title mb-12 tracking-wide" style={{ color: '#1f2937' }}>About</h2>
            <div className="max-w-3xl mx-auto space-y-8 leading-relaxed text-lg font-body" style={{ color: '#334155' }}>
              <p>
                I'm a passionate creative professional with a deep love for innovative design 
                and meaningful problem-solving. My work spans across digital experiences, 
                visual storytelling, and strategic thinking.
              </p>
              <p>
                With a background in both technical and creative disciplines, I bring 
                a unique perspective to every project. I believe in the power of 
                simplicity and the beauty found in thoughtful details.
              </p>
              <p>
                My interests extend beyond professional work into exploring new technologies, 
                understanding design philosophy, and capturing moments through various creative mediums. 
                I'm constantly seeking to learn and grow, both personally and professionally.
              </p>
              <p>
                When I'm not working, you'll find me reading about emerging trends, 
                experimenting with new tools and techniques, or simply enjoying the process 
                of creating something meaningful from nothing.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center justify-center px-8 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-title mb-16 tracking-wide" style={{ color: '#1f2937' }}>Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              
              <div className="group">
                <div className="flex flex-col items-center space-y-6 p-8 hover:bg-white hover:bg-opacity-50 rounded-lg transition-all duration-300">
                  <div className="w-20 h-20 flex items-center justify-center border-2 border-gray-400 rounded-full group-hover:scale-110 transition-all duration-300" style={{ borderColor: '#475569' }}>
                    <Code className="w-10 h-10 transition-colors" style={{ color: '#334155' }} />
                  </div>
                  <h3 className="text-xl font-title transition-colors" style={