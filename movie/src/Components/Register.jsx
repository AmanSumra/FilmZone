import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bgimage from "../Assets/image/bgimage.jpg"

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!firstName || !email || !password || !dateOfBirth || !gender || !number) {
      Swal.fire({
        icon: "warning",
        title: "Please fill in all fields.",
        background: '#1f2937',
        color: '#ffffff'
      });
      setIsLoading(false);
      return;
    }

    const postData = {
      FirstName: firstName,
      Email: email,
      Password: password,
      DateOfBirth: dateOfBirth,
      Gender: gender,
      Number: number,
    };

    const signUpURL = `http://localhost:5000/user_registration`;

    try {
      const res = await axios.post(signUpURL, postData, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success === true) {
        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Welcome to FilmZone",
          background: '#1f2937',
          color: '#ffffff',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: res.data.message || "Registration failed.",
          background: '#1f2937',
          color: '#ffffff',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || "Registration failed. Please try again.",
        background: '#1f2937',
        color: '#ffffff',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <img src={bgimage} alt="" className='w-full h-full fixed -z-10 inset-0 object-cover' />
      <div className='w-full h-full bg-gradient-to-b from-black/80 via-black/70 to-black/80 fixed -z-10 inset-0'></div>
      
      <div className="w-full max-w-lg relative">
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700/50 max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center space-x-2 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-bold text-white">FilmZone</span>
            </Link>
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-gray-400 mt-2">Join us and start your movie journey today.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  placeholder="Your Name" 
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  required 
                />
              </div>
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="number" 
                  value={number} 
                  onChange={(e) => setNumber(e.target.value)} 
                  placeholder="(+91) 99999 99999" 
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  required 
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="you@example.com" 
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••" 
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                <input 
                  type="date" 
                  id="dateOfBirth" 
                  value={dateOfBirth} 
                  onChange={(e) => setDateOfBirth(e.target.value)} 
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
              <div className="flex items-center gap-6 bg-gray-800/50 border border-gray-600 rounded-xl p-3">
                {['male', 'female'].map((g) => (
                  <label key={g} className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      value={g} 
                      checked={gender === g} 
                      onChange={(e) => setGender(e.target.value)} 
                      className="form-radio h-4 w-4 text-red-600 bg-gray-900 border-gray-600 focus:ring-red-500" 
                      required
                    />
                    <span className="ml-2 text-gray-300 capitalize">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-wait hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-red-500 hover:text-red-400">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;