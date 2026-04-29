import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bgimage from "../Assets/image/bgimage.jpg"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Please fill in all fields",
        background: '#1f2937',
        color: '#ffffff'
      });
      setIsLoading(false);
      return;
    }

    const userData = {
      Email: email,
      Password: password,
    };

    const LoginUrl = `http://localhost:5000/user_login`;
    axios.post(LoginUrl, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const login = response.data;
        if (login.success === true) {
          localStorage.clear();
          localStorage.setItem("email", login.result.Email);
          localStorage.setItem("userId", login.result._id);
          if (login.result.admin === '1') {
            localStorage.setItem("admin", login.result.admin);
          }
          localStorage.setItem("user", JSON.stringify(login.result));
          localStorage.setItem("username", login.result.FirstName);

          window.dispatchEvent(new Event("storage"));
          
          Swal.fire({
            icon: "success",
            title: "Welcome back!",
            text: "Login successful",
            background: '#1f2937',
            color: '#ffffff',
            timer: 1500,
            showConfirmButton: false
          });
          
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: login.message || "Login failed",
            background: '#1f2937',
            color: '#ffffff'
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.response?.data?.message || "Invalid Credentials",
          background: '#1f2937',
          color: '#ffffff'
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <img src={bgimage} alt="" className='w-full h-full fixed -z-10 inset-0 object-cover' />
      <div className='w-full h-full bg-gradient-to-b from-black/80 via-black/70 to-black/80 fixed -z-10 inset-0'></div>
      
      <div className="w-full max-w-md relative">
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700/50">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">F</span>
              </div>
              <span className="text-3xl font-bold text-white">FilmZone</span>
            </Link>
            <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
            <p className="text-gray-400 mt-2">Log in to continue your movie adventure.</p>
          </div>

          <form onSubmit={handleSubmitClick} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-red-500 focus:ring-offset-gray-900" />
                <span className="ml-2 text-sm text-gray-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-red-500 hover:text-red-400">
                Forgot Password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-red-500 hover:text-red-400">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;