import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ setAuth }) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      
      // Backend එකට දත්ත යැවීම
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();

     if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        localStorage.setItem("userRole", parseRes.role);
        
        setAuth(true);
        
        
        // --- පරණ කෝඩ් එක (navigate) මකලා මේක දාන්න ---
        window.location.href = "/"; 
        // ----------------------------------------------
        
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* Background Effects (Hero එකේ වගේමයි) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-pink-900/20 blur-[120px]" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-pink-800/20 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-zinc-900/50 backdrop-blur-xl border border-pink-500/20 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-white mb-2">Join <span className="text-pink-500 font-pacifico">BlinkBeat</span></h2>
        <p className="text-center text-gray-400 mb-8">Create your account to book appointments</p>

        <form onSubmit={onSubmitForm} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="w-full px-4 py-3 bg-black/50 border border-pink-500/30 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-500 outline-none transition-all"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full px-4 py-3 bg-black/50 border border-pink-500/30 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-500 outline-none transition-all"
              placeholder="hello@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full px-4 py-3 bg-black/50 border border-pink-500/30 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold rounded-lg shadow-lg hover:shadow-pink-500/25 transition-all transform hover:scale-[1.02]"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-400 hover:text-pink-300 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;