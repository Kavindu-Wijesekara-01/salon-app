import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = () => {
  const [services, setServices] = useState([]);
  
  const [inputs, setInputs] = useState({
    name: "", contact: "", service_name: "", date: "", time: "", email: ""
  });

  const { name, contact, service_name, date, time, email } = inputs;
  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

  const loadData = async () => {
    try {
      const serviceRes = await fetch("/services");
      const serviceData = await serviceRes.json();
      setServices(serviceData);
    } catch (err) { console.error(err.message); }
  };

  useEffect(() => { loadData(); }, []);

  const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, contact, service_name, date, time, email };
      
      const response = await fetch("/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.getItem("token") },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();

      if (response.ok) {
        toast.success("Your booking is processing. We will send an email shortly.");
        setInputs({ name: "", contact: "", service_name: "", date: "", time: "", email: "" });
      } else {
        toast.error(parseRes);
      }
    } catch (err) { console.error(err.message); }
  };

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center py-24 px-4 sm:px-6 overflow-hidden">
      <ToastContainer position="top-center" theme="dark" />
      
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[130px] pointer-events-none"></div>

      {/* --- MAIN CARD --- */}
      <div className="relative bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800 p-0 rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden">
        
        {/* 1. LEFT SIDE: INFO PANEL (Professional Look) */}
        <div className="lg:w-2/5 bg-gradient-to-br from-zinc-900 to-black p-10 flex flex-col justify-between border-r border-zinc-800 relative">
            {/* Decorative Circle */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-bl-full blur-2xl"></div>

            <div>
                <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                    Book Your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Appointment</span>
                </h2>
                <p className="text-gray-400 mt-6 text-sm leading-relaxed font-light">
                    Experience world-class beauty treatments. Select your preferred date and service, and let us take care of the rest.
                </p>
            </div>

            {/* Professional Contact Details using SVG Icons */}
            <div className="mt-12 space-y-6">
                
                {/* Location */}
                <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-zinc-800/80 flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 shadow-lg">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-white text-sm font-bold uppercase tracking-wide">Visit Us</p>
                        <p className="text-gray-500 text-xs mt-0.5">No. 123, Lotus Road, Colombo 07</p>
                    </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-zinc-800/80 flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 shadow-lg">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-white text-sm font-bold uppercase tracking-wide">Call Us</p>
                        <p className="text-gray-500 text-xs mt-0.5">+94 77 123 4567</p>
                    </div>
                </div>

                 {/* Hours */}
                 <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-zinc-800/80 flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 shadow-lg">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-white text-sm font-bold uppercase tracking-wide">Open Hours</p>
                        <p className="text-gray-500 text-xs mt-0.5">Daily: 09:00 AM - 08:00 PM</p>
                    </div>
                </div>

            </div>
        </div>

        {/* 2. RIGHT SIDE: FORM */}
        <div className="lg:w-3/5 p-8 md:p-12">
            <form onSubmit={onSubmitForm} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[11px] text-gray-400 uppercase font-bold tracking-widest ml-1">Full Name</label>
                    <input 
                        type="text" name="name" value={name} onChange={onChange} required 
                        className="w-full p-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-white transition-all placeholder-gray-600 text-sm" 
                        placeholder="" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] text-gray-400 uppercase font-bold tracking-widest ml-1">Contact No</label>
                    <input 
                        type="text" name="contact" value={contact} onChange={onChange} required 
                        className="w-full p-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-white transition-all placeholder-gray-600 text-sm" 
                        placeholder="" 
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[11px] text-gray-400 uppercase font-bold tracking-widest ml-1">Email Address</label>
                <div className="relative">
                    <input 
                        type="email" name="email" value={email} onChange={onChange} required 
                        className="w-full p-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-white transition-all placeholder-gray-600 text-sm pl-10" 
                        placeholder="" 
                    />
                     {/* Email Icon inside input */}
                    <svg className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[11px] text-gray-400 uppercase font-bold tracking-widest ml-1">Service</label>
                    <div className="relative">
                        <select name="service_name" value={service_name} onChange={onChange} required className="w-full p-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-white appearance-none text-sm cursor-pointer">
                            <option value="" className="bg-zinc-900 text-gray-500">Select Service</option>
                            {services.map(s => (<option key={s.service_id} value={s.service_name} className="bg-zinc-900">{s.service_name}</option>))}
                        </select>
                        <svg className="w-4 h-4 text-gray-500 absolute right-3 top-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] text-gray-400 uppercase font-bold tracking-widest ml-1">Date</label>
                    <input 
                        type="date" name="date" value={date} onChange={onChange} required 
                        className="w-full p-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-white text-sm cursor-pointer" 
                        min={new Date().toISOString().split("T")[0]} 
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-[11px] text-gray-400 uppercase font-bold tracking-widest ml-1">Select Time Slot</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {timeSlots.map((slot, index) => (
                    <button 
                        type="button" 
                        key={index} 
                        onClick={() => setInputs({...inputs, time: slot})} 
                        className={`py-2.5 px-2 text-[11px] font-medium rounded-lg border transition-all duration-300 relative overflow-hidden ${
                            time === slot 
                            ? "bg-gradient-to-r from-pink-600 to-purple-600 border-transparent text-white shadow-lg shadow-pink-500/20" 
                            : "bg-zinc-900 border-zinc-800 text-gray-400 hover:border-pink-500/50 hover:text-white"
                        }`}
                    >
                        {slot}
                    </button>
                ))}
                </div>
                {/* Validation input */}
                <input type="text" value={time} required className="opacity-0 h-0 w-0 absolute" />
            </div>

            <button className="w-full py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:bg-gray-100 transition-all transform hover:scale-[1.01] mt-4 flex items-center justify-center gap-2">
                <span>Confirm Appointment</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;