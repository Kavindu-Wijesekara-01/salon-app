import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Reviews from './components/Reviews';
import Booking from './components/Booking';
import Footer from './components/Footer'; // Footer Import කළා
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("/auth/is-verify", {
        headers: { token: localStorage.getItem("token") }
      });
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div className="flex flex-col min-h-screen"> {/* මේ div එකෙන් Footer එක හැමවෙලේම යටම තියෙන්න හදනවා */}
      
      {/* 1. NAVBAR (හැම පිටුවකම උඩින්ම පේනවා) */}
      <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} />
      
      {/* 2. CONTENT AREA (පිටු මාරු වෙන්නේ මේ කොටසේ) */}
      <div className="flex-grow">
        <Routes>
          
          {/* HOME PAGE (Hero + Services + Features) */}
          <Route 
              path="/" 
              element={
                  <>
                      <Hero />
                      {/* Services Section */}
                      <Services /> 
                      {/* Features Section */}
                      <div id="features"><Features /></div>
                  </>
              } 
          />

          {/* REVIEWS PAGE */}
          <Route path="/reviews" element={<Reviews />} />

          {/* BOOKING PAGE (Protected) */}
          <Route 
              path="/booking" 
              element={ isAuthenticated ? <Booking /> : <Navigate to="/login" /> } 
          />

          {/* AUTH PAGES */}
          <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/" />} />
          
          {/* ADMIN DASHBOARD (Protected) */}
          <Route 
              path="/admin-dashboard" 
              element={isAuthenticated ? <AdminDashboard setAuth={setAuth} /> : <Navigate to="/login" />} 
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

        </Routes>
      </div>

      {/* 3. FOOTER (හැම පිටුවකම යටින්ම පේනවා) */}
      <Footer />
      
    </div>
  );
};

export default App;