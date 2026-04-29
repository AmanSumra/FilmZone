import React from "react";
import heroBg from "../Assets/image/image1.jpg";
import aboutImg from "../Assets/image/movie.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Index = () => {
  const id = localStorage.getItem("userId") ? true : false;
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem("admin") == "1";

  const fetchAllMovies = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/detail/movie');
      if (data.success) {
        setMovieList(data.result.slice(0, 8));
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovieList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  function handleclick() {
    navigate("/movies")
  }

  const features = [
    {
      icon: "🎬",
      title: "Latest Movies",
      desc: "Access to newest releases and blockbusters"
    },
    {
      icon: "🎟️",
      title: "Instant Booking",
      desc: "Book your tickets in seconds with seamless experience"
    },
    {
      icon: "💺",
      title: "Choose Seats",
      desc: "Select your favorite seats from our interactive seat map"
    },
    {
      icon: "📱",
      title: "Mobile Tickets",
      desc: "Get your tickets delivered directly to your phone"
    }
  ];

  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* Hero Section - Enhanced */}
      <section
        className="relative h-[70vh] md:h-[85vh] flex items-center justify-center text-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Animated Gradient Overlay */}
        <div className="absolute inset- bg-gradient-to-b from-black/50 via-black/70 to-gray-900"></div>
        
        {/* Floating particles effect - simplified with CSS */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium tracking-wider uppercase">
              Now Showing
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Your Next Movie Adventure Awaits
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover the latest blockbusters, book tickets instantly, and experience cinema like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleclick}
              className="group relative bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Browse Movies
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button
              onClick={() => navigate("/about")}
              className="group border-2 border-white/30 hover:border-white text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:bg-white/10"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FilmZone?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Experience the future of movie booking with our platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-red-500/50 hover:bg-gray-800 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Now Showing Section - Enhanced */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Now Showing</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-700 rounded"></div>
            </div>
            <button
              onClick={handleclick}
              className="mt-4 md:mt-0 text-red-500 hover:text-red-400 font-semibold flex items-center gap-2 transition-colors"
            >
              View All Movies
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
                  <div className="h-96 bg-gray-700"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {movieList.map((movie, index) => (
                <div
                  key={index}
                  className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={`http://localhost:5000/${movie.MoviePhotos}`}
                      alt={movie.MovieName}
                      className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Rating badge */}
                    {movie.AverageRating > 0 && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-black font-bold px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                        ⭐ {movie.AverageRating.toFixed(1)}
                      </div>
                    )}
                    
                    {/* Genre tags */}
                    {(() => {
                      let genres = [];
                      if (Array.isArray(movie.Genre)) {
                        genres = movie.Genre;
                      } else if (typeof movie.Genre === 'string') {
                        if (movie.Genre.startsWith('[')) {
                          try {
                            genres = JSON.parse(movie.Genre);
                          } catch {
                            genres = movie.Genre.replace(/[\[\]"]/g, '').split(',').map(g => g.trim()).filter(g => g);
                          }
                        } else {
                          genres = movie.Genre.split(',').map(g => g.trim()).filter(g => g);
                        }
                      }
                      if (genres.length > 0) {
                        const validGenres = [...new Set(genres.filter(g => g && g.trim()))];
                        if (validGenres.length > 0) {
                          return (
                            <div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[85%]">
                              {validGenres.slice(0, 3).map((g, i) => (
                                <span 
                                  key={i} 
                                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide text-white"
                                  style={{
                                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.4)'
                                  }}
                                >
                                  {g.replace(/[\[\]"]/g, '').trim()}
                                </span>
                              ))}
                              {validGenres.length > 3 && (
                                <span 
                                  className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white"
                                  style={{
                                    background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                                  }}
                                >
                                  +{validGenres.length - 3}
                                </span>
                              )}
                            </div>
                          );
                        }
                      }
                      return null;
                    })()}
                    
                    {/* Quick book button on hover */}
                    {!isAdmin && (
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(id ? `/booking?id=${movie._id}` : `/login`);
                          }}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                          Book Now
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 truncate group-hover:text-red-500 transition-colors">
                      {movie.MovieName}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {movie.MovieDate}
                      </span>
                      <span className="bg-gray-700 px-3 py-1 rounded-full text-red-400 font-semibold">
                        ₹{movie.MoviePrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Us Section - Enhanced */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-content">
              <span className="text-red-500 font-semibold tracking-wider uppercase text-sm">About FilmZone</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-2">
                Your Premier Movie Booking Destination
              </h2>
              <h3 className="text-xl text-red-500 font-semibold mb-6">
                Enjoy Online Ticket Booking for Movies in India
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                If you are planning for <strong className="text-white">movie ticket bookings</strong> for
                the latest movies in India, don't look any further. Now it is easy
                to get on with <strong className="text-white">online ticket booking</strong> with our platform.
                Your one-stop solution for movies to watch this weekend.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Everyone enjoys watching their favorite movies on the big screen, and the excitement of watching
                it with friends is unparalleled. Experience seamless booking, exclusive deals, and 
                unforgettable cinema experiences with FilmZone.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
              >
                Contact Us
              </button>
            </div>
            <div className="image-content relative">
              <div className="relative">
                <img
                  src={aboutImg}
                  alt="Movie experience"
                  className="rounded-2xl shadow-2xl max-w-sm md:max-w-full transform hover:scale-[1.02] transition-transform duration-500"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-red-500 to-red-700 p-6 rounded-xl shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold">10K+</div>
                    <div className="text-white/80 text-sm">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-32 h-32 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 border-4 border-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Movie Experience?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">Join thousands of movie lovers who trust FilmZone for their cinema adventures.</p>
          <button
            onClick={handleclick}
            className="bg-white text-red-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-xl"
          >
            Get Started Now
          </button>
        </div>
      </section>

    </div>
  );
};

export default Index;