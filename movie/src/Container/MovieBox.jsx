import React from 'react';
import { Link } from 'react-router-dom';

const MovieBox = ({ movie, handleDelete }) => {
  if (!movie) {
    return null;
  }

  const isAdmin = localStorage.getItem('admin') === '1';

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 transition-all duration-300">
      <div className="relative overflow-hidden">
        <Link to={isAdmin ? "#" : `/booking?id=${movie._id}`} className="block">
          <img
            src={`http://localhost:5000/${movie.MoviePhotos}`}
            alt={movie.MovieName}
            className="w-full h-[450px] object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Rating badge */}
          {movie.AverageRating > 0 && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-black font-bold px-2 py-1 rounded-lg text-sm flex items-center gap-1 shadow-lg">
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
          
          {/* Duration tag */}
          {movie.Duration && (
            <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              {movie.Duration}
            </div>
          )}
          
          {/* Price tag */}
          <div className="absolute bottom-3 right-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-4 py-1 rounded-full text-sm shadow-lg">
            ₹{movie.MoviePrice}
          </div>
        </Link>

        {/* Admin actions on hover */}
        {isAdmin && (
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Link
              to={`/update-movie/${movie._id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Update
            </Link>
            <button
              onClick={() => handleDelete(movie._id)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-5">
        <Link to={isAdmin ? "#" : `/booking?id=${movie._id}`} className="block">
          <h3 className="text-lg font-bold text-white mb-2 truncate group-hover:text-red-500 transition-colors">
            {movie.MovieName}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(movie.MovieDate)}
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {movie.MovieScreen}
          </span>
        </div>

        {!isAdmin && (
          <Link
            to={`/booking?id=${movie._id}`}
            className="mt-4 w-full bg-gray-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <span>Book Now</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MovieBox;