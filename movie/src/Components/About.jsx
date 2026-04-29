import React from "react";
import { Link } from "react-router-dom";
import aboutImage1 from "../Assets/image/movie.png";
import aboutImage2 from "../Assets/image/movie.jpeg";

const FeatureCard = ({ icon, title, description, delay }) => (
  <div 
    className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-red-500/50 hover:bg-gray-800 transition-all duration-300 hover:-translate-y-2"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3 text-center">{title}</h3>
    <p className="text-gray-400 text-center leading-relaxed">{description}</p>
  </div>
);

const StatCard = ({ number, label }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{number}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gray-800 text-center py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Welcome to FilmZone
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            About FilmZone
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Your ultimate destination for a seamless movie booking experience. 
            Discover, book, and enjoy the magic of cinema.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="10K+" label="Happy Customers" />
            <StatCard number="500+" label="Movies Available" />
            <StatCard number="50+" label="Cinemas Partner" />
            <StatCard number="24/7" label="Support Available" />
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-500/20 rounded-full blur-xl"></div>
            <img 
              src={aboutImage1} 
              alt="Movie Tickets" 
              className="rounded-2xl shadow-2xl max-w-full h-auto transform hover:scale-[1.02] transition-transform duration-500" 
            />
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-red-500 to-red-700 p-6 rounded-xl shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-white/80 text-sm">Secure Booking</div>
              </div>
            </div>
          </div>
          <div>
            <span className="text-red-500 font-semibold tracking-wider uppercase text-sm">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-2 text-white">
              Bringing Cinema Closer to You
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you are planning for <strong className="text-white">movie ticket bookings</strong> for the latest movies in India, don't look any further. FilmZone is your one-stop solution for movies to watch this weekend. We believe the magic of cinema is best experienced on the big screen, surrounded by fellow movie lovers.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Our platform makes <strong className="text-white">online ticket booking</strong> incredibly easy, allowing you to secure your seats for the first-day-first-show without any hassle.
            </p>
            <Link 
              to="/movies" 
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
            >
              Explore Movies
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-red-500 font-semibold tracking-wider uppercase text-sm">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Everything You Need</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need for a perfect movie outing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              delay="0ms"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2H5z"></path>
                </svg>
              }
              title="Easy Booking"
              description="Book tickets in just a few clicks with our user-friendly interface."
            />
            <FeatureCard
              delay="100ms"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
                </svg>
              }
              title="Latest Movies"
              description="Stay updated with the latest blockbusters and movie trailers."
            />
            <FeatureCard
              delay="200ms"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              }
              title="Theaters Near You"
              description="Find movie showtimes in cinemas near you."
            />
          </div>
        </div>
      </section>

      {/* Local Focus Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
             <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-red-500/20 rounded-full blur-xl"></div>
            <img 
              src={aboutImage2} 
              alt="Friends watching movie" 
              className="rounded-2xl shadow-2xl max-w-full h-auto transform hover:scale-[1.02] transition-transform duration-500" 
            />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-red-500 font-semibold tracking-wider uppercase text-sm">Local Experience</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-2 text-white">
              Your Local Cinema Experience
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Enjoy your favourite movie, not just with your friends, but in a cinema hall that will be filled with like-minded people. Be a part of everyone's reaction and cheer for the biggest <strong className="text-white">Bollywood movies</strong> together.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Dates are already announced, and all you need to do is book the tickets for the preferred date so that you don't end up missing the first-day first show!
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Instant Confirmation
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Secure Payments
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-32 h-32 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 border-4 border-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for Your Movie Night?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Join thousands of movie lovers who trust FilmZone for their cinema adventures.</p>
          <Link 
            to="/movies" 
            className="inline-flex items-center gap-2 bg-white text-red-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-xl"
          >
            Browse Movies Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;