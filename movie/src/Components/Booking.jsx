import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Booking = () => {

  const navigate = useNavigate();
  const [seatsVisible, setSeatsVisible] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const [seatList, setSeatList] = useState(null);
  const [movieName, setMovieName] = useState('');
  const [movieScreen, setMovieScreen] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [moviePhotos, setMoviePhotos] = useState('');
  const [moviePrice, setMoviePrice] = useState(0);
  const [cast, setCast] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState([]);
  const [duration, setDuration] = useState('');
  const [language, setLanguage] = useState('');
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const currentDate = new Date().toISOString().slice(0, 10);

  const [bookDate, setBookDate] = useState('');
  const [bookTime, setBookTime] = useState('');

  const [selectedSeats, setSelectedSeats] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);

  const checkoutHandler = async () => {
    if (selectedSeats.length === 0) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select at least one seat.' });
      return;
    }
    if (bookTime === '') {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select a show time.' });
      return;
    }
    if (bookDate === '') {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select a date.' });
      return;
    }

    let amount = moviePrice * selectedSeats.length * 100;

    var options = {
      key: 'rzp_test_SdJk4EX7ugHfEA',
      amount: amount,
      currency: 'INR',
      name: movieName,
      description: `Ticket booking for ${selectedSeats.length} seat(s)`,
      handler: async function (response) {
        const body = {
          userId: localStorage.getItem('userId'),
          movieId: urlParams.get('id'),
          bookedSeat: selectedSeats,
          movieDate: bookDate,
          movieName: movieName,
          email: email,
          movieScreen: movieScreen,
          movieTime: bookTime,
          amount: amount / 100,
          orderId: response.razorpay_payment_id,
          userName: localStorage.getItem('username') || 'Guest User',
        };
        try {
          const res = await fetch('http://localhost:5000/add/ticket', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
          });
          if (res.status === 200) {
            Swal.fire({ icon: 'success', title: 'Success!', text: 'Your ticket has been booked.' });
            navigate('/recentbooking');
          } else {
            throw new Error('Server Error');
          }
        } catch (error) {
          Swal.fire({ icon: 'error', title: 'Booking Failed', text: 'Something went wrong. Please try again.' });
        }
      },
      prefill: {
        name: localStorage.getItem('username') || 'Guest User',
        email: localStorage.getItem('email'),
      },
      theme: { color: '#e53e3e' },
    };

    const razor = new window.Razorpay(options);
    await razor.open();
  };

  const handleSeatChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSeats([...selectedSeats, value]);
    } else {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== value));
    }
  };

  const findSeats = async () => {
    if (!bookDate || !bookTime) {
      Swal.fire({ icon: 'warning', title: 'Incomplete Selection', text: 'Please select both date and time.' });
      return;
    }
    setSeatsVisible(true);
    setSelectedSeats([]);
    const PostData = { id: urlParams.get('id'), date: bookDate, time: bookTime };
    try {
      const res = await axios.post(`http://localhost:5000/detail/seat`, PostData);
      if (res.data.success === true) {
        setSeatList(res.data.bookedSeats);
      }
    } catch (error) {
      console.error("Error fetching seat data:", error);
      Swal.fire({ icon: 'error', title: 'Failed to fetch seats', text: 'Could not connect to the server.' });
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/get/reviews/${urlParams.get('id')}`);
      if (res.data.success) {
        setReviews(res.data.reviews || []);
        setAverageRating(res.data.averageRating || 0);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const submitReview = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      Swal.fire({ icon: 'warning', title: 'Login Required', text: 'Please login to submit a review.' });
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/add/review', {
        movieId: urlParams.get('id'),
        userId: userId,
        rating: newRating,
        comment: newComment
      });

      if (res.data.success) {
        Swal.fire({ icon: 'success', title: 'Thank You!', text: 'Your review has been submitted.' });
        setNewComment('');
        setNewRating(5);
        fetchReviews();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to submit review.' });
    }
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const res = await axios.post(`http://localhost:5000/detail/movie/`, { id: urlParams.get('id') });
        if (res.data.success === true) {
          const movie = res.data.result;
          console.log(movie);
          setMovieName(movie.MovieName);
          setMovieScreen(movie.MovieScreen);
          setDescription(movie.Description);
          setEmail(localStorage.getItem('email'));
          setMoviePhotos(movie.MoviePhotos);
          setMoviePrice(movie.MoviePrice);
          setCast(movie.Cast || 'Information not available');
          setDirector(movie.Director || 'Information not available');
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
          setGenre([...new Set(genres)]);
          setDuration(movie.Duration || 'N/A');
          setLanguage(movie.Language || 'Hindi');
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    getMovieDetails();
    fetchReviews();
  }, [urlParams.get('id')]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const occupiedSeats = seatList ? seatList.split(',').map(s => s.trim()) : [];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        {/* Movie Info Header - Professional Design */}
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-8 overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <div className="relative">
                <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src={`http://localhost:5000/${moviePhotos}`} 
                    alt={movieName} 
                    className="w-full h-auto max-h-[420px] object-cover transform transition-transform duration-500 hover:scale-105"
                    style={{ minHeight: '300px' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                  
                  {averageRating > 0 && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-black font-bold px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {averageRating.toFixed(1)}
                    </div>
                  )}
                  
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-md font-medium">
                    {language}
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg shadow-red-600/30">
                    ₹{moviePrice}
                  </span>
                  <span className="block text-gray-400 text-sm mt-1">per ticket</span>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <div className="mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{movieName}</h1>
              </div>
              
              {/* Genre tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {genre.slice(0, 4).map((g, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide text-white"
                    style={{
                      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                      boxShadow: '0 2px 8px rgba(220, 38, 38, 0.4)'
                    }}
                  >
                    {typeof g === 'string' ? g.replace(/[\[\]"]/g, '').trim() : g}
                  </span>
                ))}
                {duration && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 bg-gray-700/50">
                    {duration}
                  </span>
                )}
              </div>
              
              {/* Rating and reviews */}
              <div className="flex items-center mb-5">
                <div className="flex mr-3">{renderStars(averageRating)}</div>
                <span className="text-gray-400 text-sm">({reviews.length} reviews)</span>
              </div>
              
              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-6 border-l-2 border-red-500 pl-4">{description}</p>
              
              {/* Cast & Director */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-700/50">
                  <h3 className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    Director
                  </h3>
                  <p className="text-white font-medium">{director}</p>
                </div>
                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-700/50">
                  <h3 className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Cast
                  </h3>
                  <p className="text-white font-medium">{cast}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Interactive Area */}
          <div className="lg:col-span-2">
            {/* Step 1: Show Selection */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700/50">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Select Your Show
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    id="date"
                    min={currentDate}
                    value={bookDate}
                    onChange={(e) => { setBookDate(e.target.value); setSeatsVisible(false); }}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white"
                  />
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                  <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                  <select
                    id="time"
                    value={bookTime}
                    onChange={(e) => { setBookTime(e.target.value); setSeatsVisible(false); }}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white"
                  >
                    <option value="">Select Time</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="21:00">09:00 PM</option>
                  </select>
                </div>
                <button 
                  onClick={findSeats} 
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl py-3 px-4 font-bold transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-red-600/40"
                >
                  Find Seats
                </button>
              </div>
            </div>

            {/* Step 2: Seat Selection */}
            {seatsVisible && (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg mt-8 border border-gray-700/50">
                <div className="flex flex-col items-center">
                  {/* Screen */}
                  <div className="w-full md:w-2/3 h-3 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-t-full shadow-[0_-10px_30px_rgba(255,255,255,0.1)] mb-2"></div>
                  <p className="text-gray-400 font-bold tracking-[0.3em] mb-8 text-sm">SCREEN</p>

                  {/* Seats */}
                  <div className="w-full flex flex-col gap-3">
                    {rows.map(row => (
                      <div key={row} className="flex justify-center gap-2">
                        {columns.map(col => {
                          const seatNumber = `${row}${col}`;
                          const isOccupied = occupiedSeats.includes(seatNumber);
                          const isSelected = selectedSeats.includes(seatNumber);

                          let seatClass = 'w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer transition-all duration-200 shadow-md ';
                          if (isOccupied) seatClass += 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-60';
                          else if (isSelected) seatClass += 'bg-gradient-to-r from-red-500 to-red-600 text-white ring-2 ring-red-300 ring-offset-2 ring-offset-gray-900 transform scale-110';
                          else seatClass += 'bg-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:scale-105';

                          return (
                            <label key={seatNumber} htmlFor={seatNumber} className={seatClass}>
                              <input
                                type="checkbox"
                                id={seatNumber}
                                value={seatNumber}
                                checked={isSelected}
                                disabled={isOccupied}
                                onChange={handleSeatChange}
                                className="opacity-0 absolute"
                              />
                              {col}
                            </label>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center gap-8 mt-10 bg-gray-800/50 px-6 py-3 rounded-full">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-lg bg-gray-700 shadow-md"></div>
                      <span className="text-gray-400 text-sm">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-lg bg-gradient-to-r from-red-500 to-red-600 shadow-md"></div>
                      <span className="text-white text-sm font-medium">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-lg bg-gray-600 opacity-60 shadow-md"></div>
                      <span className="text-gray-500 text-sm">Occupied</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg mt-8 border border-gray-700/50">
              <button 
                onClick={() => setShowReviews(!showReviews)}
                className="w-full flex justify-between items-center text-2xl font-bold mb-6"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Reviews ({reviews.length})
                </span>
                <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                  {showReviews ? 'Hide' : 'Show'}
                </span>
              </button>

              {showReviews && (
                <div>
                  {/* Add Review Form */}
                  {localStorage.getItem('userId') && (
                    <div className="bg-gray-800/50 p-5 rounded-xl mb-6 border border-gray-700/50">
                      <h3 className="text-lg font-semibold mb-4 text-white">Add Your Review</h3>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-400 mb-2">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewRating(star)}
                              className={`p-2 rounded-lg transition-all transform hover:scale-110 ${
                                newRating >= star 
                                  ? 'text-yellow-400 bg-yellow-400/20' 
                                  : 'text-gray-600 hover:text-yellow-400'
                              }`}
                            >
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-400 mb-2">Comment</label>
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Write your review..."
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 h-28 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <button 
                        onClick={submitReview}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-red-600/20"
                      >
                        Submit Review
                      </button>
                    </div>
                  )}

                  {/* Reviews List */}
                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((review, index) => (
                        <div key={index} className="bg-gray-800/50 p-5 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold">
                                {(review.userName || 'A')[0].toUpperCase()}
                              </div>
                              <div>
                                <span className="font-semibold text-white">{review.userName || 'Anonymous'}</span>
                                <div className="flex mt-1">{renderStars(review.rating)}</div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-300 leading-relaxed ml-13">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-800/30 rounded-xl">
                      <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl sticky top-24 border border-gray-700/50">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Booking Summary
              </h2>
              
              <div className="relative mb-6 rounded-xl overflow-hidden group">
                <img 
                  src={`http://localhost:5000/${moviePhotos}`} 
                  alt={movieName} 
                  className="w-full h-56 object-cover shadow-lg transform group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent rounded-xl"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white line-clamp-1">{movieName}</h3>
                      <p className="text-gray-400 text-sm">{movieScreen}</p>
                    </div>
                    <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ₹{moviePrice}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm bg-gray-800/50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Selected Seats:</span> 
                  <span className="text-white font-medium">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Ticket Price:</span> 
                  <span className="text-white">₹{moviePrice} / seat</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Date:</span> 
                  <span className="text-white">{bookDate || 'Not selected'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Show Time:</span> 
                  <span className="text-white">{bookTime ? `${bookTime}:00` : 'Not selected'}</span>
                </div>
              </div>

              <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-gray-300">Total:</span>
                <span className="text-white">₹{moviePrice * selectedSeats.length}</span>
              </div>

              <button
                onClick={checkoutHandler}
                disabled={selectedSeats.length === 0}
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl py-4 px-4 font-bold transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 hover:shadow-red-600/40"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;