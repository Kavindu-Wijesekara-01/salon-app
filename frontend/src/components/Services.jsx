import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Animation Trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Data Fetching
  const getServices = async () => {
    try {
      const response = await fetch("/services");
      const jsonData = await response.json();
      setServices(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div 
      id="services" 
      className="bg-white relative py-24 scroll-mt-20" // py-24: උඩින් යටින් ඉඩ, scroll-mt-20: Navbar එකට යට නොවී Scroll වෙන්න
    >
      
      {/* Container for Responsive Width */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- TITLE SECTION (With your Animation) --- */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
             Our Beauty <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Services</span>
          </h2>
          
          {/* ඔයාගේ Animation එක එහෙම්මම තියෙනවා */}
          <div 
              className={`flex justify-center items-center gap-4 transition-all duration-1000 delay-500 mb-8 ${
                isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
          >
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-transparent to-pink-500/50"></div>
              <div className="w-2.5 h-2.5 bg-pink-600 rounded-full animate-pulse shadow-lg shadow-pink-500/50"></div>
              <div className="w-12 h-1 rounded-full bg-gradient-to-l from-transparent to-pink-500/50"></div>
          </div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Discover our exclusive range of treatments designed to rejuvenate your style. 
            Professional care tailored just for you.
          </p>
        </div>

        {/* --- SERVICES GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          
          {services.map((service) => (
            <div 
              key={service.service_id} 
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 flex flex-col transform hover:-translate-y-2"
            >
              
              {/* Image Section */}
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={service.service_image} 
                  alt={service.service_name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-pink-600 shadow-sm uppercase tracking-wider flex items-center gap-1">
                  <span>✨</span> Premium
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1">
                    {service.service_name}
                  </h3>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-medium">
                  {service.service_description}
                </p>
                
                {/* Details Row */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-6">
                  <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Price</span>
                      <span className="text-lg font-extrabold text-gray-900">Rs. {service.service_price}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                      <svg className="w-3.5 h-3.5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-bold">{service.service_duration}</span>
                  </div>
                </div>

                {/* Booking Button */}
                <Link 
                  to="/booking" 
                  className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 shadow-md hover:shadow-pink-500/30 flex items-center justify-center gap-2 group-hover:tracking-wider text-center"
                >
                  Book Appointment
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;