import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [inputs, setInputs] = useState({ name: "", rating: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);

  const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
        setIsVisible(true);
        }, []);

  const getReviews = async () => {
    try {
      const response = await fetch("/reviews");
      const jsonData = await response.json();
      setReviews(jsonData);
    } catch (err) { console.error(err.message); }
  };

  useEffect(() => { getReviews(); }, []);

  const onSubmitReview = async (e) => {
    e.preventDefault();
    if (inputs.rating === 0) return toast.error("Please select a star rating!");
    if (!inputs.name || !inputs.comment) return toast.error("Please fill all fields!");

    try {
      const response = await fetch("/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      });

      const newReview = await response.json();
      setReviews([newReview, ...reviews]);
      setInputs({ name: "", rating: 0, comment: "" });
      toast.success("Thank you for your review!");
    } catch (err) { console.error(err.message); }
  };

  return (
    // 1. pt-28 මගින් Title එක Navbar එකට යට නොවී පහලට ගත්තා
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-900 via-black to-pink-800 pt-28 pb-12">
      <ToastContainer position="bottom-right" theme="dark" />

      {/* --- BACKGROUND EFFECTS (ඔයාගේ Styles ඒ විදියටම තියෙනවා) --- */}
      
      {/* Moving Pink Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-full blur-3xl animate-orb-float pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-rose-500/15 to-pink-500/15 rounded-full blur-3xl animate-orb-float-reverse pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-orb-pulse pointer-events-none"></div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-55 pointer-events-none">
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

      {/* --- CONTENT SECTION --- */}
      {/* 2. px-6 මගින් Mobile වලදී පැති වලින් ඉඩ තැබුවා | z-10 මගින් Content එක Background එකට උඩින් ගත්තා */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white drop-shadow-lg">
                Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">Stories</span>
            </h1>

            <div 
              className={`flex justify-center items-center gap-4 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
            >
              <div className="w-8 h-1 rounded-xl px bg-pink-400/50"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="w-8 h-1 rounded-xl px bg-rose-400/50"></div>
            </div>

            <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed pt-5">
                See what our clients say about their BlinkBeat experience. Your feedback helps us shine brighter!
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* LEFT SIDE: ADD REVIEW FORM */}
            <div className="lg:col-span-1">
                <div className="bg-black/40 backdrop-blur-xl border border-pink-500/30 p-8 rounded-3xl sticky top-28 shadow-2xl shadow-pink-900/20">
                    <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        Write a Review <span className="text-2xl">✍️</span>
                    </h3>
                    
                    <form onSubmit={onSubmitReview} className="space-y-5">
                        {/* Star Rating */}
                        <div className="flex gap-2 justify-center mb-6 bg-black/20 p-2 rounded-xl border border-white/5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setInputs({...inputs, rating: star})}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="text-3xl transition-transform hover:scale-110 focus:outline-none"
                                >
                                    <span className={`transition-colors duration-200 ${star <= (hoverRating || inputs.rating) ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" : "text-gray-600"}`}>
                                        ★
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                value={inputs.name}
                                onChange={(e) => setInputs({...inputs, name: e.target.value})}
                                className="w-full bg-zinc-900/50 border border-zinc-700/50 p-4 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-white placeholder-gray-500 transition-all"
                            />
                            
                            <textarea 
                                rows="4"
                                placeholder="Share your experience..." 
                                value={inputs.comment}
                                onChange={(e) => setInputs({...inputs, comment: e.target.value})}
                                className="w-full bg-zinc-900/50 border border-zinc-700/50 p-4 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-white placeholder-gray-500 transition-all resize-none"
                            ></textarea>
                        </div>

                        <button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(219,39,119,0.4)] transition-all transform hover:scale-[1.02] active:scale-95">
                            Post Review
                        </button>
                    </form>
                </div>
            </div>

            {/* RIGHT SIDE: REVIEWS DISPLAY */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.length === 0 ? (
                    <div className="col-span-2 text-center py-12 bg-black/20 rounded-3xl border border-white/5">
                        <p className="text-gray-400 text-lg">No reviews yet. Be the first to write one! 🚀</p>
                    </div>
                ) : (
                    reviews.map((review, index) => (
                        <div 
                            key={review.review_id}
                            className="group bg-zinc-900/60 backdrop-blur-md border border-zinc-800 p-6 rounded-2xl hover:border-pink-500/50 hover:bg-zinc-900/80 transition-all duration-300 animate-slide-up hover:-translate-y-1 hover:shadow-xl"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-600 to-purple-700 flex items-center justify-center font-bold text-xl text-white shadow-lg">
                                        {review.user_name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-base group-hover:text-pink-400 transition-colors">{review.user_name}</h4>
                                        <p className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-gray-700"}`}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed font-light">
                                "{review.comment}"
                            </p>
                        </div>
                    ))
                )}
            </div>

        </div>
      </div>
      
      {/* ඔයාගේ CSS Animations මෙතන වැඩ කරාවි (index.css එකේ තියෙන නිසා) */}
    </div>
  );
};

export default Reviews;