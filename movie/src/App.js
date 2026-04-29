import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import "./Assets/index.css";
import "./Assets/index.scss";
import "./Assets/style.css";

import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer";
import AIChat from "./Components/AIChat";

import About from "./Components/About";
import Booking from "./Components/Booking";
import Contact from "./Components/Contact";
import Index from "./Components/Index";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Movie from "./Components/Movie";
import RecentBookings from "./Components/RecentBooking";
import UpdateMovie from "./Components/update";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <AIChat />
        <Routes>
          <Route path="/" exact element={<Index />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/booking" exact element={<Booking />} />
          <Route path="/recentbooking" exact element={<RecentBookings />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/movies" exact element={<Movie />} />
          <Route path="/update-movie/:id" element={<UpdateMovie />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;