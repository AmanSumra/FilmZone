import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddMovieModel = ({ isOpen, onClose, onSuccess }) => {

  const [movieName, setMovieName] = useState('');
  const [screenNumber, setScreenNumber] = useState('');
  const [status, setStatus] = useState('Active');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [moviePoster, setMoviePoster] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [cast, setCast] = useState('');
  const [director, setDirector] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [duration, setDuration] = useState('');
  const [language, setLanguage] = useState('Hindi');

  const genreOptions = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Drama", 
    "Family", "Fantasy", "Horror", "Musical", "Mystery", "Romance", 
    "Sci-Fi", "Sport", "Thriller", "War", "Western"
  ];

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!movieName || !price || !screenNumber || !releaseDate || !description || !moviePoster || selectedGenres.length === 0) {
      Swal.fire({ 
        icon: 'warning', 
        title: 'Please fill all required fields and select at least one genre', 
        background: '#1f2937', 
        color: '#ffffff' 
      });
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('MoviePhotos', moviePoster);
    formData.append('MovieName', movieName);
    formData.append('MovieDate', releaseDate);
    formData.append('MovieScreen', screenNumber);
    formData.append('Description', description);
    formData.append('Status', status);
    formData.append('price', price);
    formData.append('Cast', cast);
    formData.append('Director', director);
    formData.append('Genre', JSON.stringify(selectedGenres));
    formData.append('Duration', duration);
    formData.append('Language', language);

    const addMovieUrl = `http://localhost:5000/add/movie`;

    try {
      const res = await axios.post(addMovieUrl, formData);
      if (res.data.success === true) {
        Swal.fire({
          icon: 'success',
          title: res.data.message || 'Movie Added Successfully!',
          background: '#1f2937', color: '#ffffff',
          showConfirmButton: false,
          timer: 1500
        });
        onSuccess();
        onClose();
        resetForm();
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: err.response?.data?.message || 'An error occurred',
        background: '#1f2937', color: '#ffffff',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setMovieName('');
    setPrice('');
    setScreenNumber('');
    setReleaseDate('');
    setDescription('');
    setMoviePoster(null);
    setCast('');
    setDirector('');
    setSelectedGenres([]);
    setDuration('');
    setLanguage('Hindi');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-3xl transform transition-all max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Add New Movie</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="movieName" className="block text-sm font-medium text-gray-300 mb-1">Movie Name *</label>
              <input type="text" id="movieName" value={movieName} onChange={(e) => setMovieName(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md focus:ring-2 focus:ring-red-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category/Genre *</label>
              <div className="flex flex-wrap gap-2">
                {genreOptions.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGenre(g)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                      selectedGenres.includes(g)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              {selectedGenres.length > 0 && (
                <p className="text-xs text-gray-400 mt-1">Selected: {selectedGenres.join(', ')}</p>
              )}
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price (₹) *</label>
              <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md focus:ring-2 focus:ring-red-500" required />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration</label>
              <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="2h 30min" className="w-full bg-gray-700 p-2 rounded-md focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label htmlFor="screenNumber" className="block text-sm font-medium text-gray-300 mb-1">Screen Number *</label>
              <input type="text" id="screenNumber" value={screenNumber} onChange={(e) => setScreenNumber(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md focus:ring-2 focus:ring-red-500" required />
            </div>
            <div>
              <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-300 mb-1">Release Date *</label>
              <input type="date" id="releaseDate" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md focus:ring-2 focus:ring-red-500" required />
            </div>
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">Language</label>
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md focus:ring-2 focus:ring-red-500">
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Marathi">Marathi</option>
                <option value="Bengali">Bengali</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Kannada">Kannada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <div className="flex items-center gap-6 bg-gray-700 p-2 rounded-md">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="status" value="Active" checked={status === 'Active'} onChange={(e) => setStatus(e.target.value)} className="form-radio h-4 w-4 text-red-600 bg-gray-900 border-gray-600 focus:ring-red-500" />
                  <span className="ml-2 text-gray-200">Active</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="status" value="Inactive" checked={status === 'Inactive'} onChange={(e) => setStatus(e.target.value)} className="form-radio h-4 w-4 text-red-600 bg-gray-900 border-gray-600 focus:ring-red-500" />
                  <span className="ml-2 text-gray-200">Inactive</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="director" className="block text-sm font-medium text-gray-300 mb-1">Director</label>
            <input type="text" id="director" value={director} onChange={(e) => setDirector(e.target.value)} placeholder="Director Name" className="w-full bg-gray-700 p-2 rounded-md focus:ring-2 focus:ring-red-500" />
          </div>

          <div>
            <label htmlFor="cast" className="block text-sm font-medium text-gray-300 mb-1">Cast</label>
            <textarea id="cast" value={cast} onChange={(e) => setCast(e.target.value)} placeholder="Actor1, Actor2, Actress1..." rows="2" className="w-full bg-gray-700 p-2 rounded-md focus:ring-2 focus:ring-red-500"></textarea>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full bg-gray-700 p-2 rounded-md focus:ring-2 focus:ring-red-500" required></textarea>
          </div>

          <div>
            <label htmlFor="moviePoster" className="block text-sm font-medium text-gray-300 mb-1">Movie Poster *</label>
            <input type="file" id="moviePoster" accept="image/*" onChange={(e) => setMoviePoster(e.target.files[0])} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white hover:file:bg-gray-500" required />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={() => { onClose(); resetForm(); }} className="py-2 px-6 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold transition-colors">Cancel</button>
            <button type="submit" disabled={isLoading} className="py-2 px-6 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors disabled:bg-gray-500">
              {isLoading ? 'Saving...' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModel;