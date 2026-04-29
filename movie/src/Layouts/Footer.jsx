import React from "react";
import { Link } from "react-router-dom";

const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110"
  >
    {icon}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand and About */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-bold text-white">
                FilmZone
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Your premier destination for online movie ticket booking. 
              Discover the latest blockbusters, book instantly, and experience 
              cinema like never before.
            </p>
            <div className="flex space-x-3">
              <SocialIcon 
                href="https://facebook.com" 
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                  </svg>
                }
              />
              <SocialIcon 
                href="https://twitter.com" 
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.95,4.57a10,10,0,0,1-2.82.77,4.96,4.96,0,0,0,2.16-2.72,9.9,9.9,0,0,1-3.12,1.19,4.92,4.92,0,0,0-8.39,4.49A14,14,0,0,1,1.64,3.16,4.92,4.92,0,0,0,3.2,9.72,4.86,4.86,0,0,1,.96,9.11v.06a4.93,4.93,0,0,0,3.95,4.83,4.86,4.86,0,0,1-2.22.08,4.93,4.93,0,0,0,4.6,3.42A9.87,9.87,0,0,1,0,19.54a13.94,13.94,0,0,0,7.55,2.21A13.9,13.9,0,0,0,21.56,7.68c0-.21,0-.42,0-.63A10,10,0,0,0,24,4.59Z"/>
                  </svg>
                }
              />
              <SocialIcon 
                href="https://instagram.com" 
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/>
                  </svg>
                }
              />
              <SocialIcon 
                href="https://youtube.com" 
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.14C19.54,3.5,12,3.5,12,3.5s-7.54,0-9.38.55A3.02,3.02,0,0,0,.5,6.19,31.56,31.56,0,0,0,0,12.25a31.56,31.56,0,0,0,.5,6A3.02,3.02,0,0,0,2.62,20.32c1.84.55,9.38.55,9.38.55s7.54,0,9.38-.55a3.02,3.02,0,0,0,2.12-2.14A31.56,31.56,0,0,0,24,12.25,31.56,31.56,0,0,0,23.5,6.19ZM9.55,15.57V8.43L16,12Z"/>
                  </svg>
                }
              />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative">
              <span>Quick Links</span>
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-600"></span>
            </h3>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-red-500 transition-colors flex items-center gap-2">
                <span className="text-red-600">»</span> Home
              </Link>
              <Link to="/movies" className="hover:text-red-500 transition-colors flex items-center gap-2">
                <span className="text-red-600">»</span> Movies
              </Link>
              <Link to="/about" className="hover:text-red-500 transition-colors flex items-center gap-2">
                <span className="text-red-600">»</span> About Us
              </Link>
              <Link to="/contact" className="hover:text-red-500 transition-colors flex items-center gap-2">
                <span className="text-red-600">»</span> Contact
              </Link>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative">
              <span>Legal</span>
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-600"></span>
            </h3>
            <div className="flex flex-col space-y-3">
              <Link to="/privacy" className="hover:text-red-500 transition-colors flex items-center gap-2">
                <span className="text-red-600">»</span> Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-red-500 transition-colors flex items-center gap-2">
                <span className="text-red-600">»</span> Terms of Service
              </Link>
              <Link to="/faq" className="hover:text-red-500 transition-colors flex items-center gap-2">
                <span className="text-red-600">»</span> FAQ
              </Link>
              <Link to="/refund" className="hover:text-red-500 transition-colors flex items-center gap-2">
                <span className="text-red-600">»</span> Refund Policy
              </Link>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative">
              <span>Contact Us</span>
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-600"></span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-red-500 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <span className="text-sm">123 Cinema Street, Movie City, India</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-red-500 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span className="text-sm">support@filmzone.com</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-red-500 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <span className="text-sm">+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © {new Date().getFullYear()} <span className="text-white font-semibold">FilmZone</span>. All Rights Reserved.
            </p>
            <p className="text-sm text-gray-500">
              Made with ❤️ for Movie Lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;