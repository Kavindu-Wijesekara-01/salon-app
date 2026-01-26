import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Link එක Import කළා

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      setIsVisible(true);
    }, []);
  
  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-br from-pink-900 via-black to-pink-800 py-16">

      {/* Moving Pink Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-full blur-3xl animate-orb-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-rose-500/15 to-pink-500/15 rounded-full blur-3xl animate-orb-float-reverse"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-orb-pulse"></div>

        {/* Animated Grid with Pink Lines */}
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


      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 mt-6 tracking-tight">
          Our  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Features</span>
        </h2>

          <div 
              className={`flex justify-center items-center gap-4 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
            >
              <div className="w-8 h-1 rounded-xl px bg-pink-400/50"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="w-8 h-1 rounded-xl px bg-rose-400/50"></div>
          </div>

        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="lg:w-1/2">
          
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1136"
                alt="Salon Interior"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute bg-gradient-to-r from-pink-500 to-pink-700 p-3 -right-2 -bottom-7 flex flex-col items-center justify-center rounded-xl text-white"><span className='text-4xl font-bold'>
              11+
              </span><span className='text-md font-semibold'>Year Experience</span></div>
            </div>
          
           </div> 
    

          {/* Content Section */}
          <div className="lg:w-1/2">
            <h3 className="text-4xl font-semibold text-pink-300 mb-6">
              We Provide the Best Beauty Services
            </h3>
            <p className="text-white mb-6 leading-relaxed">
              Welcome to our premier beauty salon where we combine expertise, luxury, and 
              personalized care to bring out your natural beauty. For over 15 years, we've 
              been dedicated to providing exceptional beauty services in a relaxing and 
              friendly environment.
            </p>
            <p className="text-white mb-6 leading-relaxed">
              Our team of certified professionals stays updated with the latest trends and 
              techniques to ensure you receive the highest quality treatments. We use only 
              premium products and state-of-the-art equipment to deliver outstanding results.
            </p>
          
            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-2xl font-semibold">Expert Stylists</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-2xl font-semibold">Quality Products</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-2xl font-semibold">Modern Equipment</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-2xl font-semibold">Relaxing Atmosphere</span>
              </div>
            </div>

            {/* 2. CTA Button එක Link එකක් බවට පත් කිරීම */}
            <Link 
              to="/booking" 
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white md:px-6 px-8 py-3 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 md:w-auto sm:w-auto max-w-xs shadow-lg hover:shadow-pink-500/25"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book Appointment
              </span>
            </Link>

          </div>
        </div>

        
        </div>
      
      
    </section>
  );
};

export default About;