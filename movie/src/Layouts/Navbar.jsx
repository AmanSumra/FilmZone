import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      const userId = localStorage.getItem("userId");
      const adminStatus = localStorage.getItem("admin") === "1";
      const user = localStorage.getItem("user");
      const name = localStorage.getItem("username");

      setIsLoggedIn(!!userId || !!user);
      setIsAdmin(adminStatus);
      setUsername(name || "");
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setIsNavbarOpen(false);
  }, [location]);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername("");
    setIsNavbarOpen(false);
    window.location.href = "/";
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
          isActive 
            ? "text-red-500" 
            : "text-gray-300 hover:text-white"
        }`}
      >
        {children}
        {isActive && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></span>
        )}
      </Link>
    );
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              FilmZone
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Home</NavLink>
            {isLoggedIn && (
              <>
                <NavLink to="/recentbooking">My Bookings</NavLink>
                <NavLink to="/movies">Movies</NavLink>
              </>
            )}
            <NavLink to="/about">About</NavLink>
            {!isAdmin && <NavLink to="/contact">Contact</NavLink>}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white font-medium">Hello, {username}</span>
                </div>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white font-medium px-4 py-2 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={handleNavbarToggle}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            >
              {isNavbarOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-gray-800 border-t border-gray-700 transition-all duration-300 ${
          isNavbarOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          <Link to="/" className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/recentbooking" className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                My Bookings
              </Link>
              <Link to="/movies" className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                Movies
              </Link>
            </>
          )}
          <Link to="/about" className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
            About
          </Link>
          {!isAdmin && (
            <Link to="/contact" className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
              Contact
            </Link>
          )}
          
          <div className="pt-4 border-t border-gray-700">
            {isLoggedIn ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white font-medium">Hello, {username}</span>
                </div>
                <button
                  onClick={logout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block text-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-center bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;