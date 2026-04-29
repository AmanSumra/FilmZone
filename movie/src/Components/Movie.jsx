import axios from 'axios';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import MovieBox from '../Container/MovieBox';
import AddMovieModel from '../Layouts/AddMovieModel';

const UpcomingMovie = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const fetchAllMovies = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/detail/movie');
      if (data.success) {
        setMovieList(data.result);
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const searchMovies = async (query) => {
    if (!query) {
      fetchAllMovies();
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/search/movie', { MovieName: query });
      if (data.success) {
        setMovieList(data.result);
      } else {
        setMovieList([]);
      }
    } catch (error) {
      console.error("Failed to search movies:", error);
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        const { data } = await axios.delete(`http://localhost:5000/delete/movie/${movieId}`);
        if (data.success) {
          setMovieList(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
        }
      } catch (error) {
        console.error('An error occurred while deleting the movie:', error);
      }
    }
  };

  const debouncedSearch = useCallback(debounce(searchMovies, 500), []);

  useEffect(() => {
    fetchAllMovies();

    if (localStorage.getItem('admin') === '1') {
      setIsAdmin(true);
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const getGenres = (movie) => {
    try {
      let genres = [];
      const genreData = movie.Genre;
      
      if (!genreData) return [];
      
      if (Array.isArray(genreData)) {
        genres = genreData;
      } else if (typeof genreData === 'string') {
        if (genreData.startsWith('[')) {
          try {
            genres = JSON.parse(genreData);
          } catch (e) {
            genres = [];
          }
        } else {
          genres = genreData.split(',');
        }
      }
      
      return genres.map(g => {
        if (typeof g === 'string') {
          return g.replace(/[\[\]"]/g, '').trim();
        }
        return String(g).replace(/[\[\]"]/g, '').trim();
      }).filter(g => g && g.length > 0);
    } catch (e) {
      return [];
    }
  };

  const handleFilterClick = (genre) => {
    console.log('Filtering by:', genre);
    console.log('Movie list sample:', movieList.slice(0, 2).map(m => ({ name: m.MovieName, genre: m.Genre })));
    setActiveFilter(genre);
  };

  const filteredMovies = useMemo(() => {
    if (activeFilter === 'all') return movieList;
    
    return movieList.filter(movie => {
      const movieGenres = getGenres(movie);
      const filterLower = activeFilter.toLowerCase();
      // Use partial matching for better results
      return movieGenres.some(g => g.toLowerCase().includes(filterLower) || filterLower.includes(g.toLowerCase()));
    });
  }, [movieList, activeFilter]);

  const genres = ['all', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Now Showing
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Explore Movies</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">Discover and book your favorite movies</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by movie name..."
                className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              />
            </div>
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleFilterClick(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === genre
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {genre === 'all' ? 'All' : genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="container mx-auto px-4 py-12">
        {/* Add Movie Button for Admin */}
        {isAdmin && (
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Movie
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
                <div className="h-96 bg-gray-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {filteredMovies.map((movie) => (
              <MovieBox
                key={movie._id}
                movie={movie}
                handleDelete={handleDeleteMovie}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-xl text-gray-400">No movies found for "{activeFilter}"</p>
            <p className="text-sm text-gray-500 mt-2">Total movies: {movieList.length}</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveFilter('all');}}
              className="mt-6 text-red-500 hover:text-red-400 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Add Movie Modal */}
      <AddMovieModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchAllMovies}
      />
    </div>
  );
};

export default UpcomingMovie;