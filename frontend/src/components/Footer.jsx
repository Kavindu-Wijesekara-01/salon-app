import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-black pt-18 pb-8 overflow-hidden border-t border-pink-900/30">
      
      {/* --- BACKGROUND ANIMATION --- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-600/10 to-purple-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="grid grid-cols-12 gap-8 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-pink-500/10 h-full"></div>
          ))}
        </div>
      </div>

      {/* --- FOOTER CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. BRAND INFO */}
          <div className="space-y-6">
            <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-white">
                  Blink<span className="text-pink-500 font-pacifico ml-1">Beat</span>
                </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Elevating your beauty with professional care and premium styling. Your style journey begins here.
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'TW'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-pink-500 hover:bg-pink-600/20 transition-all group">
                  {/* Social Icons Placeholder - can be replaced with SVGs later */}
                  <span className="text-xs font-bold group-hover:scale-110 transition-transform">{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#home" className="text-gray-400 hover:text-pink-500 transition-colors flex items-center gap-2"><span className="text-pink-500 opacity-0 hover:opacity-100 transition-opacity">›</span> Home</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-pink-500 transition-colors flex items-center gap-2"><span className="text-pink-500 opacity-0 hover:opacity-100 transition-opacity">›</span> Services</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-pink-500 transition-colors flex items-center gap-2"><span className="text-pink-500 opacity-0 hover:opacity-100 transition-opacity">›</span> Features</a></li>
              <li><Link to="/reviews" className="text-gray-400 hover:text-pink-500 transition-colors flex items-center gap-2"><span className="text-pink-500 opacity-0 hover:opacity-100 transition-opacity">›</span> Reviews</Link></li>
            </ul>
          </div>

          {/* 3. SERVICES */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Popular Services</h3>
            <ul className="space-y-4 text-sm">
              <li className="text-gray-400 flex items-center gap-2"><span className="text-pink-500/50">›</span> Hair Styling & Cut</li>
              <li className="text-gray-400 flex items-center gap-2"><span className="text-pink-500/50">›</span> Facial Treatments</li>
              <li className="text-gray-400 flex items-center gap-2"><span className="text-pink-500/50">›</span> Bridal Dressing</li>
              <li className="text-gray-400 flex items-center gap-2"><span className="text-pink-500/50">›</span> Manicure & Pedicure</li>
            </ul>
          </div>

          {/* 4. CONTACT INFO (Icons Updated Here) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-6">
              {/* VISIT US (Location Icon) */}
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 mt-1 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                  {/* SVG Map Pin Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 font-medium group-hover:text-pink-400 transition-colors">Visit Us</p>
                  <p className="text-gray-500 text-sm leading-relaxed">No. 123, Lotus Road, Colombo 07, Sri Lanka.</p>
                </div>
              </li>
              
              {/* CALL US (Phone Icon) */}
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 mt-1 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                   {/* SVG Phone Icon */}
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 font-medium group-hover:text-pink-400 transition-colors">Call Us</p>
                  <p className="text-gray-500 text-sm">+94 77 123 4567</p>
                  <p className="text-gray-500 text-sm">+94 11 234 5678</p>
                </div>
              </li>

              {/* EMAIL US (Envelope Icon) */}
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 mt-1 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                   {/* SVG Envelope Icon */}
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 font-medium group-hover:text-pink-400 transition-colors">Email Us</p>
                  <p className="text-gray-500 text-sm">hello@blinkbeat.com</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BlinkBeat Salon. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;