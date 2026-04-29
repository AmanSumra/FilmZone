import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bgimage from "../Assets/image/bgimage.jpg"

const RecentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');
  const isAdmin = localStorage.getItem('admin') === '1';

  useEffect(() => {
    const getRecentBooking = async () => {
      setIsLoading(true);
      setError(null);

      const url = isAdmin
        ? `http://localhost:5000/recentbookings`
        : `http://localhost:5000/recentbooking/${userId}`;

      try {
        const response = await axios.get(url);
        if (response.data.success === true) {
          setBookings(response.data.result);
        } else {
          throw new Error('Failed to fetch bookings.');
        }
      } catch (err) {
        console.error("Error fetching recent bookings:", err);
        setError('Could not load booking history. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getRecentBooking();
  }, [isAdmin, userId]);

  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen p-4 md:p-8 relative">
      <div className="absolute inset-0 -z-10">
        <img src={bgimage} alt="" className='w-full h-full object-cover' />
        <div className='w-full h-full bg-gradient-to-b from-gray-900 via-black/80 to-gray-900 absolute inset-0'></div>
      </div>
      
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            {isAdmin ? 'Admin Panel' : 'My Account'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {isAdmin ? 'All Recent Bookings' : 'My Booking History'}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {isAdmin ? 'Here are all the recent transactions.' : 'Here are the details of your recent bookings.'}
          </p>
        </div>

        {error ? (
          <div className="text-center text-xl text-red-500 bg-gray-800/50 p-8 rounded-2xl">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="text-center bg-gray-800/50 p-12 rounded-2xl border border-gray-700">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-xl text-gray-300 mb-2">No recent bookings found.</p>
            <p className="text-gray-500">It's time for a movie night!</p>
            {!isAdmin && (
              <Link 
                to="/movies" 
                className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
              >
                Browse Movies
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <div 
                key={booking._id} 
                className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Movie Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-28 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      {booking.MoviePhotos ? (
                        <img 
                          src={`http://localhost:5000/${booking.MoviePhotos}`} 
                          alt={booking.MovieName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">🎬</div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{booking.MovieName || 'Movie'}</h3>
                      <p className="text-gray-400 text-sm mb-2">{booking.MovieScreen || 'Regular Screen'}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="flex items-center gap-1 text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {booking.movieDate || booking.MovieDate || 'N/A'}
                        </span>
                        <span className="flex items-center gap-1 text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {booking.movieTime || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="flex flex-col md:items-end gap-4">
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Booking ID</p>
                      <p className="text-white font-mono text-sm">{booking._id?.slice(-8) || 'N/A'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Seats</p>
                        <p className="text-white font-semibold">{booking.bookedSeat || booking.seats || 'N/A'}</p>
                      </div>
                      <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 rounded-lg">
                        <p className="text-white font-bold">₹{booking.total_price || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${booking.payment_status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                      <span className="text-sm text-gray-400 capitalize">{booking.payment_status || 'Pending'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentBookings;