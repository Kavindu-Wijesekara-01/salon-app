import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ setAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Active Section එක මතක තියාගන්න State එක
  const [activeSection, setActiveSection] = useState('home');

   // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 1. Auth Status Check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true); else setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  // 2. SCROLL SPY LOGIC (Scroll කරනකොට Active එක මාරු වීම)
  useEffect(() => {
    const handleScroll = () => {
      // Home Page එකේ ඉන්නවා නම් විතරක් Scroll එක බලන්න
      if (location.pathname === '/') {
        const sections = ['home', 'services', 'features', 'contact'];
        
        // පහලට Scroll කරද්දී...
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Screen එකේ උඩ හරියට (0 - 150px) අදාල කොටස ආවම Active කරන්න
            if (rect.top >= -100 && rect.top < 300) {
              setActiveSection(section);
              break; 
            }
          }
        }
      }
    };

    // Scroll කරන හැම වෙලේම මේක දුවන්න
    window.addEventListener('scroll', handleScroll);
    
    // Page එකෙන් අයින් වෙද්දී නවත්තන්න
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // 3. PAGE වෙනස් වෙද්දී Active එක බලෙන් මාරු කිරීම
  useEffect(() => {
    if (location.pathname === '/booking') {
      setActiveSection('booking');
    } else if (location.pathname === '/') {
      // Home එකට ආපු ගමන් Home එක Active කරන්න (Scroll නොකර උඩ ඉන්න නිසා)
      if (window.scrollY < 100) setActiveSection('home');
    }
  }, [location.pathname]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    if(setAuth) setAuth(false);
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  // Styles
  const navLinkStyle = "text-gray-300 hover:text-pink-500 font-medium text-lg transition-colors cursor-pointer";
  const activeLinkStyle = "text-pink-500 font-bold text-lg transition-colors cursor-pointer scale-105 border-b-2 border-pink-500 pb-1";

  // Click Handler (Scroll වෙන්න උදව් කරන්න)
  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    
    // Home Page එකේ නෙවෙයි නම් Home එකට යවලා එතනින් Scroll කරන්න
    if (location.pathname !== "/" && section !== 'booking') {
        navigate("/");
        setTimeout(() => {
            const element = document.getElementById(section);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
  };

  return (
    <nav 
      className={`navbar-container fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-linear-to-br from-pink-900  to-pink-800 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between relative">
        
        {/* LOGO */}
        <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center space-x-2 z-50">
            <span className="text-2xl font-bold text-white font-pacifico">
              Blink<span className="text-pink-500 font-pacifico ml-1">Beat</span>
            </span>
        </Link>

        {/* CENTER: NAV ITEMS (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
            {/* HOME */}
            {location.pathname === "/" ? (
                <a href="#home" onClick={() => setActiveSection('home')} className={activeSection === 'home' ? activeLinkStyle : navLinkStyle}>Home</a>
            ) : (
                <Link to="/" className={navLinkStyle}>Home</Link>
            )}
            
            {/* SERVICES */}
            {location.pathname === "/" ? (
               <a href="#services" onClick={() => setActiveSection('services')} className={activeSection === 'services' ? activeLinkStyle : navLinkStyle}>Services</a>
            ) : (
               <Link to="/" onClick={() => setTimeout(() => document.getElementById('services')?.scrollIntoView(), 100)} className={navLinkStyle}>Services</Link>
            )}

            {/* FEATURES */}
            {location.pathname === "/" ? (
               <a href="#features" onClick={() => setActiveSection('features')} className={activeSection === 'features' ? activeLinkStyle : navLinkStyle}>Features</a>
            ) : (
               <Link to="/" onClick={() => setTimeout(() => document.getElementById('features')?.scrollIntoView(), 100)} className={navLinkStyle}>Features</Link>
            )}

            {/* අනිත් Links අතරට දාන්න */}
            <Link to="/reviews" className={location.pathname === "/reviews" ? activeLinkStyle : navLinkStyle}>Reviews</Link>
            
            {/* APPOINTMENT */}
            <Link 
                to="/booking" 
                onClick={() => setActiveSection('booking')}
                className={activeSection === 'booking' || location.pathname === '/booking' ? activeLinkStyle : navLinkStyle}
            >
                Appointment
            </Link>
            
        

            {/* DASHBOARD LINK (Admin Only) */}
            {isLoggedIn && localStorage.getItem("userRole") === "admin" && (
                <Link to="/admin-dashboard" className="text-purple-400 hover:text-purple-300 font-medium text-lg">Dashboard</Link>
            )}
        </div>

        {/* RIGHT: LOGIN / REGISTER */}
        <div className="hidden md:flex items-center gap-4 z-50">
            {!isLoggedIn ? (
                <>
                    <Link to="/login" className="text-white hover:text-pink-400 font-medium text-sm transition-colors">Login</Link>
                    <Link to="/register" className="bg-white text-black hover:bg-gray-200 font-bold rounded-full px-5 py-2 text-sm transition-transform hover:scale-105">Register</Link>
                </>
            ) : (
                <button onClick={logout} className="bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg px-5 py-2 text-sm transition-colors">Logout</button>
            )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-400 hover:text-white z-50">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
            </svg>
        </button>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
            <div className="absolute top-20 left-0 w-full bg-black/95 border-b border-pink-500/20 md:hidden flex flex-col items-center py-8 space-y-6 shadow-2xl animate-fade-in-down">
                <a href="#home" onClick={() => handleNavClick('home')} className={activeSection === 'home' ? "text-pink-500 font-bold text-xl" : "text-white text-xl"}>Home</a>
                <a href="#services" onClick={() => handleNavClick('services')} className={activeSection === 'services' ? "text-pink-500 font-bold text-xl" : "text-white text-xl"}>Services</a>
                <a href="#features" onClick={() => handleNavClick('features')} className={activeSection === 'features' ? "text-pink-500 font-bold text-xl" : "text-white text-xl"}>Features</a>
                <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)} className={location.pathname === '/booking' ? "text-pink-500 font-bold text-xl" : "text-white text-xl"}>Appointment</Link>
                <Link to="/reviews" className={location.pathname === "/reviews" ? activeLinkStyle : navLinkStyle}>Reviews</Link>
                
                
                <div className="w-1/2 h-px bg-zinc-800 my-2"></div>

                {!isLoggedIn ? (
                    <div className="flex flex-col gap-4 items-center w-full px-8">
                        <Link to="/login" className="text-white">Login</Link>
                        <Link to="/register" className="w-full text-center bg-white text-black font-bold py-3 rounded-lg">Register</Link>
                    </div>
                ) : (
                    <button onClick={logout} className="text-red-500 font-bold">Logout</button>
                )}
            </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;