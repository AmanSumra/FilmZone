import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    MovieName: '',
    MoviePhotos: '',
    MovieDate: '',
    MovieScreen: '',
    SeatingCapacity: '',
    MoviePrice: '',
    Status: '',
    Description: '',
    Cast: '',
    Director: '',
    Genre: [],
    Duration: '',
    Language: 'Hindi'
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const genreOptions = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Drama", 
    "Family", "Fantasy", "Horror", "Musical", "Mystery", "Romance", 
    "Sci-Fi", "Sport", "Thriller", "War", "Western"
  ];

  const languageOptions = [
    "Hindi", "English", "Tamil", "Telugu", "Marathi", "Bengali", "Malayalam", "Kannada"
  ];

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/detail/movie/${id}`);
        if (data.success) {
          const movie = data.result;
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
          setMovieData({
            ...movie,
            Genre: genres
          });
        } else {
          setError('Movie not found.');
        }
      } catch (err) {
        setError('Failed to fetch movie data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const toggleGenre = (genre) => {
    setMovieData(prev => {
      const currentGenres = Array.isArray(prev.Genre) ? prev.Genre : [];
      const genreTrimmed = genre.trim();
      const newGenres = currentGenres.some(g => g.trim() === genreTrimmed)
        ? currentGenres.filter(g => g.trim() !== genreTrimmed)
        : [...currentGenres, genre];
      return { ...prev, Genre: newGenres };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (movieData.Genre.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Please select at least one genre',
        background: '#1f2937',
        color: '#ffffff'
      });
      return;
    }

    const formData = new FormData();

    formData.append('MovieName', movieData.MovieName);
    formData.append('MovieDate', movieData.MovieDate);
    formData.append('MovieScreen', movieData.MovieScreen);
    formData.append('SeatingCapacity', movieData.SeatingCapacity || '');
    formData.append('MoviePrice', movieData.MoviePrice);
    formData.append('Status', movieData.Status);
    formData.append('Description', movieData.Description);
    formData.append('Cast', movieData.Cast || '');
    formData.append('Director', movieData.Director || '');
    formData.append('Genre', JSON.stringify(movieData.Genre));
    formData.append('Duration', movieData.Duration || '');
    formData.append('Language', movieData.Language || 'Hindi');

    if (selectedFile) {
      formData.append('MoviePhotos', selectedFile);
    }

    try {
      const { data } = await axios.put(`http://localhost:5000/update/movie/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Movie Updated Successfully!',
          background: '#1f2937',
          color: '#ffffff',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/movies');
      } else {
        setError(data.message || 'Failed to update movie.');
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: err.response?.data?.message || 'An error occurred while updating.',
        background: '#1f2937',
        color: '#ffffff'
      });
      console.error(err);
    }
  };

  if (isLoading) { 
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl">
        Loading movie details...
      </div>
    ); 
  }
  
  if (error) { 
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500 text-2xl">
        {error}
      </div>
    ); 
  }

  const currentGenres = Array.isArray(movieData.Genre) ? movieData.Genre : [];

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Update Movie</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-red-500 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="MovieName" className="block text-sm font-medium text-gray-300 mb-1">Movie Name *</label>
                <input 
                  type="text" 
                  name="MovieName" 
                  value={movieData.MovieName || ''} 
                  onChange={handleChange} 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-red-500" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category/Genre *</label>
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {genreOptions.map(g => {
                      const isSelected = currentGenres.some(cg => cg.trim() === g.trim());
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => toggleGenre(g)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                            isSelected
                              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-red-500 shadow-lg shadow-red-500/30'
                              : 'bg-gray-800 text-gray-400 border-gray-600 hover:bg-gray-700 hover:border-gray-500 hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isSelected && (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            {g}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                {currentGenres.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-400">Selected:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentGenres.map((g, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-md border border-red-600/30">
                          {g.trim()}
                          <button
                            type="button"
                            onClick={() => toggleGenre(g)}
                            className="hover:text-white transition-colors"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="MoviePrice" className="block text-sm font-medium text-gray-300 mb-1">Ticket Price (₹) *</label>
                <input 
                  type="number" 
                  name="MoviePrice" 
                  value={movieData.MoviePrice || ''} 
                  onChange={handleChange} 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-red-500" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="Duration" className="block text-sm font-medium text-gray-300 mb-1">Duration</label>
                <input 
                  type="text" 
                  name="Duration" 
                  value={movieData.Duration || ''} 
                  onChange={handleChange} 
                  placeholder="e.g., 2h 30min"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-red-500" 
                />
              </div>
              <div>
                <label htmlFor="MovieScreen" className="block text-sm font-medium text-gray-300 mb-1">Screen Number *</label>
                <input 
                  type="text" 
                  name="MovieScreen" 
                  value={movieData.MovieScreen || ''} 
                  onChange={handleChange} 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-red-500" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="MovieDate" className="block text-sm font-medium text-gray-300 mb-1">Release Date *</label>
                <input 
                  type="text" 
                  name="MovieDate" 
                  value={movieData.MovieDate || ''} 
                  onChange={handleChange} 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="Language" className="block text-sm font-medium text-gray-300 mb-1">Language</label>
                <select 
                  name="Language" 
                  value={movieData.Language || 'Hindi'} 
                  onChange={handleChange} 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-red-500"
                >
                  {languageOptions.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <div className="flex items-center gap-6 bg-gray-700 p-2 rounded-md">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="Status" 
                      value="Active" 
                      checked={movieData.Status === 'Active'} 
                      onChange={handleChange} 
                      className="form-radio h-4 w-4 text-red-600 bg-gray-900 border-gray-600 focus:ring-red-500" 
                    />
                    <span className="ml-2 text-gray-200">Active</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="Status" 
                      value="Inactive" 
                      checked={movieData.Status === 'Inactive'} 
                      onChange={handleChange} 
                      className="form-radio h-4 w-4 text-red-600 bg-gray-900 border-gray-600 focus:ring-red-500" 
                    />
                    <span className="ml-2 text-gray-200">Inactive</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Cast & Crew Section */}
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-red-500 mb-4">Cast & Crew</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="Director" className="block text-sm font-medium text-gray-300 mb-1">Director</label>
                <input 
                  type="text" 
                  name="Director" 
                  value={movieData.Director || ''} 
                  onChange={handleChange} 
                  placeholder="Director Name"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-red-500" 
                />
              </div>
              <div>
                <label htmlFor="Cast" className="block text-sm font-medium text-gray-300 mb-1">Cast</label>
                <input 
                  type="text" 
                  name="Cast" 
                  value={movieData.Cast || ''} 
                  onChange={handleChange} 
                  placeholder="Actor1, Actor2, Actress1..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-red-500" 
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-red-500 mb-4">Description</h3>
            <div>
              <label htmlFor="Description" className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
              <textarea 
                name="Description" 
                value={movieData.Description || ''} 
                onChange={handleChange} 
                rows="4"
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-red-500" 
                required
              />
            </div>
          </div>

          {/* Poster Section */}
          <div>
            <h3 className="text-lg font-semibold text-red-500 mb-4">Movie Poster</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Photo</label>
                {movieData.MoviePhotos && (
                  <img
                    src={`http://localhost:5000/${movieData.MoviePhotos}`}
                    alt="Current"
                    className="w-32 h-48 object-cover rounded-md border border-gray-600"
                  />
                )}
              </div>
              <div>
                <label htmlFor="MoviePhotos" className="block text-sm font-medium text-gray-300 mb-2">Upload New Photo</label>
                <input
                  type="file"
                  name="MoviePhotos"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white hover:file:bg-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">If you don't choose a new file, the current photo will be kept.</p>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => navigate('/movies')}
              className="py-2 px-6 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="py-2 px-6 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
            >
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;