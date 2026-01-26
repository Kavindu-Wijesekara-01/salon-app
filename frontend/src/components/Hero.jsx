import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // 1. Link එක Import කළා

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0]);
  const statsRef = useRef(null);

  const particles = [
    { id: 1, size: 'w-2 h-2 md:w-3 md:h-3', color: 'bg-pink-300', delay: 0, duration: 25 },
    { id: 2, size: 'w-1.5 h-1.5 md:w-2 md:h-2', color: 'bg-rose-300', delay: 3, duration: 20 },
    { id: 3, size: 'w-3 h-3 md:w-4 md:h-4', color: 'bg-pink-400', delay: 1, duration: 30 },
    { id: 4, size: 'w-2 h-2 md:w-2.5 md:h-2.5', color: 'bg-rose-400', delay: 4, duration: 22 },
    { id: 5, size: 'w-2.5 h-2.5 md:w-3.5 md:h-3.5', color: 'bg-pink-500', delay: 2, duration: 28 },
    { id: 6, size: 'w-1.5 h-1.5 md:w-2 md:h-2', color: 'bg-rose-500', delay: 5, duration: 24 },
    { id: 7, size: 'w-1 h-1 md:w-1.5 md:h-1.5', color: 'bg-pink-200', delay: 6, duration: 18 },
    { id: 8, size: 'w-2 h-2 md:w-2.5 md:h-2.5', color: 'bg-rose-200', delay: 7, duration: 26 }
  ];

  const targetNumbers = [10, 2000, 50];
  const duration = 3000; 

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          targetNumbers.forEach((target, index) => {
            const startTime = Date.now();
            const startValue = 0;
            
            const updateCounter = () => {
              const currentTime = Date.now();
              const elapsed = currentTime - startTime;
              
              if (elapsed < duration) {
                const progress = elapsed / duration;
                const currentValue = Math.floor(startValue + progress * target);
                setCounters(prev => {
                  const newCounters = [...prev];
                  newCounters[index] = currentValue;
                  return newCounters;
                });
                requestAnimationFrame(updateCounter);
              } else {
                setCounters(prev => {
                  const newCounters = [...prev];
                  newCounters[index] = target;
                  return newCounters;
                });
              }
            };
            requestAnimationFrame(updateCounter);
          });
        }
      },
      { threshold: 1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // scrollToContact function එක දැන් අවශ්‍ය නෑ මේ බට්න් එකට, 
  // හැබැයි වෙන තැනක පාවිච්චි වෙනවා නම් තියාගන්න.

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-900 via-black to-pink-800 md:py-8 max-[389px]:py-12 max-h-[700px]:py-12" id='home'>
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-55">
          <div className="grid grid-cols-12 gap-20 md:gap-8 h-full animate-grid-move">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-pink-500/20 h-full"></div>
            ))}
          </div>
          <div className="grid grid-rows-12 gap-8 h-full animate-grid-move-vertical">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-b border-pink-500/20 w-full"></div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className={`absolute rounded-full ${particle.color} ${particle.size} opacity-30 md:opacity-40 animate-particle-smooth`}
                style={{
                  left: `${particle.id * 10}%`,
                  top: `${15 + (particle.id % 5) * 15}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                  filter: 'blur(0.5px) md:blur(1px)',
                }}
              ></div>
            ))}
        </div>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300/30 to-transparent animate-light-sweep"></div>
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-rose-300/20 to-transparent animate-light-sweep-delayed"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-300/20 to-transparent animate-light-sweep-reverse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4 ">
        <div className="text-center text-white max-w-4xl mx-auto w-full">
          
          <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-pink-500/20 rounded-full px-6 py-3 mb-8 xs:mt-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <div className="flex gap-1">
              {[1, 2, 3].map((star) => (
                <div key={star} className="text-yellow-500 text-md">✦</div>
              ))}
            </div>
            <span className="text-sm font-light tracking-widest">PREMIUM BEAUTY EXPERIENCE</span>
          </div>

          <div className="space-y-6 mb-8">
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h1 className="sm:text-5xl md:text-7xl font-light tracking-tight mb-4">
                <span className="block text-white/90 font-bold text-6xl md:text-8xl">BlinkBeat</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-rose-200 mt-2 font-semibold text-5xl md:text-6xl font-pacifico">
                  Beauty
                </span>
              </h1>
            </div>

            <div className={`flex justify-center items-center gap-3 sm:gap-4 md:gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
              <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-gradient-to-r from-transparent via-pink-400/40 md:via-pink-400/50 to-pink-400/40 md:to-pink-400/50"></div>
              <div className="flex gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2 md:h-2 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2 md:h-2 bg-rose-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2 md:h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
              <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-gradient-to-l from-transparent via-rose-400/40 md:via-rose-400/50 to-rose-400/40 md:to-rose-400/50"></div>
            </div>

            <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed font-light">
                Experience luxury beauty treatments in our exclusive pink sanctuary, 
                where elegance meets modern aesthetics for your perfect glow.
              </p>
            </div>
          </div>

          <div className={`flex flex-col sm:flex-row gap-3 justify-center items-center mb-12 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* 2. මෙන්න මෙතන Button එක Link එකක් කළා */}
            <Link 
              to="/booking" 
              className="group relative bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white md:px-6 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 md:w-auto sm:w-auto max-w-xs shadow-lg hover:shadow-pink-500/25 cursor-pointer flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">BOOK YOUR SESSION</span>
            </Link>

            <button onClick={scrollToServices} className="group border border-pink-500/30 hover:border-pink-500/60 backdrop-blur-lg bg-pink-500/10 hover:bg-pink-500/20 text-white md:px-8 px-10 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 md:w-auto sm:w-auto max-w-xs cursor-pointer">
              <span className="flex items-center justify-center gap-2">
                VIEW SERVICES
                <svg className="w-4 h-4 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>

          <div ref={statsRef} className={`grid grid-cols-3 gap-6 max-w-md mx-auto transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { number: counters[0], suffix: '+', label: 'Years Excellence' },
              { number: counters[1], suffix: '+', label: 'Clients Served' },
              { number: counters[2], suffix: '+', label: 'Awards Won' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl font-medium text-pink-300 mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-xs text-pink-200/70 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
    </div>
  );
};

export default Hero;