const Movie = require("../models/Movie");

const extractGenre = (message) => {
  if (!message) return null;
  
  const msg = message.toLowerCase();
  
  const genreMappings = {
    action: ['action', 'adventure', 'thriller', 'fight', 'hero', 'war', 'combat', 'explosion', 'army', 'police', 'heroic', 'mission'],
    comedy: ['comedy', 'funny', 'laugh', 'hilarious', 'humor', 'comedic', 'entertaining', 'laugh ri', 'light heart', 'comic'],
    romantic: ['romance', 'romantic', 'love', 'heart', 'couple', 'dating', 'love story', 'valentine', 'relationship', 'romantic comedy', 'love affair'],
    horror: ['horror', 'scary', 'fear', 'terror', 'creepy', 'ghost', 'supernatural', 'haunted', 'frightening', 'dark', 'spooky', 'thriller'],
    drama: ['drama', 'emotional', 'serious', 'deep', 'meaningful', 'touching', '真实', 'biopic', 'emotion'],
    sciFi: ['science', 'sci-fi', 'sci fi', 'space', 'future', 'technology', 'alien', 'robot', 'fantasy', 'marvel', 'dc', 'astronaut'],
    family: ['family', 'kids', 'children', 'animated', 'cartoon', 'animation', 'disney', 'pixar', 'animated movie'],
    suspense: ['suspense', 'mystery', 'investigation', 'detective', 'twist', 'secret', 'puzzle', 'whodunnit', 'crime'],
    animation: ['animation', 'animated', 'cartoon', 'anime', 'animated film'],
    adventure: ['adventure', 'journey', 'quest', 'explore']
  };

  for (const [genre, keywords] of Object.entries(genreMappings)) {
    if (keywords.some(keyword => msg.includes(keyword))) {
      return genre;
    }
  }
  
  return null;
};

const extractIntent = (message) => {
  if (!message) return 'recommend';
  
  const msg = message.toLowerCase();
  
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('greeting')) {
    return 'greeting';
  }
  if (msg.includes('help') || msg.includes('what can you do')) {
    return 'help';
  }
  if (msg.includes('thank')) {
    return 'thanks';
  }
  if (msg.includes('price') || msg.includes('cost') || msg.includes('ticket') || msg.includes('rupee') || msg.includes('₹')) {
    return 'price';
  }
  if (msg.includes('show') || msg.includes('time') || msg.includes('schedule') || msg.includes('date') || msg.includes('today') || msg.includes('tomorrow')) {
    return 'showtime';
  }
  if (msg.includes('trending') || msg.includes('popular') || msg.includes('best') || msg.includes('hit') || msg.includes('top')) {
    return 'trending';
  }
  if (msg.includes('new') || msg.includes('latest') || msg.includes('recent') || msg.includes('release')) {
    return 'new';
  }
  if (msg.includes('cheap') || msg.includes('budget') || msg.includes('affordable') || msg.includes('low price')) {
    return 'cheap';
  }
  if (msg.includes('book') || msg.includes('ticket') || msg.includes('seat')) {
    return 'booking';
  }
  
  return 'recommend';
};

const getGenreEmoji = (genre) => {
  const emojis = {
    action: "🔥",
    comedy: "😊",
    romantic: "💕",
    horror: "😱",
    drama: "🎭",
    sciFi: "🚀",
    family: "👨‍👩‍👧‍👦",
    suspense: "🕵️‍♂️",
    animation: "🎨"
  };
  return emojis[genre] || "🎬";
};

const getGenreResponse = (genre, intent) => {
  const responses = {
    action: {
      greeting: "🔥 Action lover! Get ready for some high-octane thrillers!",
      price: "💰 Here are action movies with their prices:",
      showtime: "📅 Action movies showing soon - check dates below!",
      trending: "🔥 Hot action movies trending now:",
      new: "🎬 Latest action releases just dropped!",
      cheap: "💵 Budget-friendly action picks:",
      recommend: "Looking for some adrenaline-pumping action? I've got you covered with these thrilling picks!"
    },
    comedy: {
      greeting: "😊 Comedy fan! Time for some laughs!",
      price: "💰 Comedy movie prices:",
      showtime: "📅 Comedy shows available:",
      trending: "😄 Most popular comedies right now:",
      new: "🎬 Fresh comedy releases:",
      cheap: "💵 Affordable comedies:",
      recommend: "Want to lighten your mood? Here are some hilarious picks that will make your day!"
    },
    romantic: {
      greeting: "💕 Romantic movie lover! Love is in the air!",
      price: "💰 Romantic movies with prices:",
      showtime: "📅 Romantic shows for date night:",
      trending: "💕 Most loved romantic movies:",
      new: "🎬 New romantic releases:",
      cheap: "💵 Romantic movies that won't break the bank:",
      recommend: "In the mood for some romance? Let me suggest some heartfelt movies perfect for a date!"
    },
    horror: {
      greeting: "😱 Horror enthusiast! Ready to get scared?",
      price: "💰 Horror movie prices:",
      showtime: "📅 Horror shows - if you dare!",
      trending: "🩸 Most terrifying movies right now:",
      new: "🎬 New horror releases:",
      cheap: "💵 Free scary movies - just kidding! Affordable horror:",
      recommend: "Want to get scared? These horror movies will give you sleepless nights!"
    },
    drama: {
      greeting: "🎭 Drama connoisseur! Deep stories await!",
      price: "💰 Drama movie prices:",
      showtime: "📅 Drama shows available:",
      trending: "🏆 Award-winning dramas:",
      new: "🎬 New dramatic releases:",
      cheap: "💵 Powerful dramas on a budget:",
      recommend: "Looking for something meaningful and emotional? Check out these powerful dramas!"
    },
    sciFi: {
      greeting: "🚀 Sci-fi explorer! Ready for mind-bending adventures?",
      price: "💰 Sci-fi movie prices:",
      showtime: "📅 Sci-fi shows - journey to the unknown:",
      trending: "🌌 Out-of-this-world sci-fi hits:",
      new: "🎬 New sci-fi releases:",
      cheap: "💵 Affordable sci-fi adventures:",
      recommend: "Ready for an out-of-this-world experience? Sci-fi awaits with these amazing films!"
    },
    family: {
      greeting: "👨‍👩‍👧‍👦 Family movie time! Fun for everyone!",
      price: "💰 Family movie prices:",
      showtime: "📅 Family-friendly shows:",
      trending: "⭐ Popular family movies:",
      new: "🎬 New animated releases:",
      cheap: "💵 Family fun on a budget:",
      recommend: "Looking for family-friendly entertainment? Perfect choices for movie night!"
    },
    suspense: {
      greeting: "🕵️‍♂️ Mystery solver! Time to crack some cases!",
      price: "💰 Mystery movie prices:",
      showtime: "📅 Mystery shows:",
      trending: "🔍 Trending mysteries:",
      new: "🎬 New mystery releases:",
      cheap: "💵 Intriguing mysteries on budget:",
      recommend: "Want to keep you on the edge of your seat? Mystery awaits with these thrillers!"
    },
    animation: {
      greeting: "🎨 Animation fan! Colorful worlds await!",
      price: "💰 Animated movie prices:",
      showtime: "📅 Animated shows:",
      trending: "🌟 Most popular animations:",
      new: "🎬 New animated releases:",
      cheap: "💵 Animated movies for kids:",
      recommend: "Amazing animated worlds await! Great for all ages!"
    }
  };
  
  return responses[genre]?.[intent] || responses[genre]?.recommend || "Here are some great movie recommendations for you!";
};

const getGeneralIntentResponse = (intent) => {
  const responses = {
    greeting: "👋 Hello! I'm your movie recommendation assistant at FilmZone! Tell me what kind of movies you like - action, comedy, romance, horror? Or ask me about prices, showtimes, or trending movies!",
    help: "🎯 I can help you with:\n\n• 🎭 Find movies by genre\n• 😄 Get mood-based recommendations\n• 💵 Show prices and affordable options\n• 📅 Check showtimes\n• 🔥 Find trending movies\n• 🎬 Search for specific movies\n\nJust tell me what you're in the mood for!",
    thanks: "😊 You're welcome! Happy to help you find great movies! Let me know if you need anything else!",
    price: "💰 Here's the price list for all our movies:",
    showtime: "📅 Here's what's playing now:",
    trending: "🔥 Here are the most popular movies right now:",
    new: "🎬 Here are the latest movie releases:",
    cheap: "💵 Here are our budget-friendly movie options:",
    booking: "🎟️ To book tickets, go to the Movies section, select your movie, choose seats and time, then proceed to payment!",
    recommend: "Here are some great movie recommendations for you! Tell me more about what you like - action, comedy, romance, horror?"
  };
  
  return responses[intent] || responses.recommend;
};

const parseMovieGenres = (genreData) => {
  if (!genreData) return [];
  
  let genres = [];
  if (Array.isArray(genreData)) {
    genres = genreData;
  } else if (typeof genreData === 'string') {
    if (genreData.startsWith('[')) {
      try {
        genres = JSON.parse(genreData);
      } catch {
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
    return '';
  }).filter(g => g);
};

const filterMoviesByGenre = (movies, genre) => {
  if (!genre || movies.length === 0) return movies;
  
  const genreKeywords = {
    action: ['action', 'adventure', 'thriller', 'fight', 'war', 'combat', 'hero', 'mission'],
    comedy: ['comedy', 'funny', 'laugh', 'humor', 'comic'],
    romantic: ['romance', 'romantic', 'love', 'heart', 'couple'],
    horror: ['horror', 'scary', 'fear', 'ghost', 'supernatural'],
    drama: ['drama', 'emotional', 'serious'],
    sciFi: ['science', 'sci-fi', 'space', 'future', 'fantasy', 'alien'],
    family: ['family', 'kids', 'children', 'animated', 'cartoon'],
    suspense: ['suspense', 'mystery', 'detective', 'twist', 'crime'],
    animation: ['animation', 'animated', 'cartoon'],
    adventure: ['adventure', 'journey', 'quest']
  };
  
  const keywords = genreKeywords[genre] || [];
  const genreLower = genre.toLowerCase();
  
  const filtered = movies.filter(movie => {
    const movieGenres = parseMovieGenres(movie.Genre);
    const genreMatch = movieGenres.some(g => g.toLowerCase() === genreLower || g.toLowerCase().includes(genreLower));
    const keywordMatch = keywords.some(keyword => {
      const searchText = `${movie.MovieName || ''} ${movie.Description || ''}`.toLowerCase();
      return searchText.includes(keyword);
    });
    return genreMatch || keywordMatch;
  });
  
  return filtered.length > 0 ? filtered : movies.slice(0, 6);
};

exports.aiChat = async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide a message" 
      });
    }

    const msg = message.toLowerCase();
    let genre = extractGenre(message);
    const intent = extractIntent(message);
    
    // If no new genre detected, use previous context genre
    const isMoreRequest = msg.includes('more') || msg.includes('another') || msg.includes('similar') || 
                          msg.includes('also') || msg.includes('other') || msg.includes('different');
    
    if (!genre && context && context.genre) {
      // Check if user is asking for more of the same genre
      if (isMoreRequest || msg.length < 30) {
        genre = context.genre;
      }
    }
    
    // Track if this is a "more" request for sorting
    const isMore = isMoreRequest;
    
    let allMovies = await Movie.find({ Status: "Active" });
    
    if (allMovies.length === 0) {
      return res.json({
        success: true,
        data: {
          response: "😕 Sorry, there are no movies available right now. Please check back later!",
          mood: 'none',
          movies: [],
          suggestions: ["Check back later for new movies", "Contact support for more info"]
        }
      });
    }

    let movies = [...allMovies];

    // Filter by genre if detected
    if (genre) {
      console.log(`Filtering by genre: ${genre}`);
      const genreFiltered = filterMoviesByGenre(allMovies, genre);
      console.log(`Found ${genreFiltered.length} movies for genre ${genre}`);
      if (genreFiltered.length > 0) {
        movies = genreFiltered;
      }
    }

    // Apply intent-based sorting/filtering
    switch (intent) {
      case 'trending':
        movies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 8);
        break;
      case 'new':
        movies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 8);
        break;
      case 'cheap':
        movies = [...movies].sort((a, b) => a.MoviePrice - b.MoviePrice).slice(0, 8);
        break;
      case 'price':
        movies = [...movies].sort((a, b) => a.MoviePrice - b.MoviePrice).slice(0, 8);
        break;
      default:
        // Shuffle movies to show variety
        movies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 8);
    }
    
    // If it's a "more" request and we got movies, shuffle again for variety
    if (isMore && movies.length > 0) {
      movies = [...movies].sort(() => 0.5 - Math.random());
    }

    // Ensure we have movies
    if (movies.length === 0) {
      movies = allMovies.slice(0, 8);
    }

    const movieSuggestions = movies.map(movie => {
      const genres = parseMovieGenres(movie.Genre);
      return {
        _id: movie._id ? movie._id.toString() : Math.random().toString(36),
        name: movie.MovieName || "Unknown Movie",
        date: movie.MovieDate || "TBA",
        price: movie.MoviePrice || 0,
        image: movie.MoviePhotos ? `http://localhost:5000/${movie.MoviePhotos}` : "",
        screen: movie.MovieScreen || "Regular",
        description: movie.Description || "No description",
        genre: genres.length > 0 ? genres[0] : "General"
      };
    });

    // Generate response
    let response;
    if (genre) {
      response = getGenreResponse(genre, intent);
    } else {
      response = getGeneralIntentResponse(intent);
    }

    // Get suggestions based on current context
    let suggestions;
    if (genre) {
      const genreSuggestions = {
        action: ["Show me more action", "Comedies please", "Romantic movies", "Latest releases"],
        comedy: ["More comedies", "Show me action", "Any dramas?", "Horror movies"],
        romantic: ["More romance", "Comedies please", "Show me action", "Horror movies"],
        horror: ["More horror", "Thrillers please", "Comedies", "Show me action"],
        drama: ["More dramas", "Emotional movies", "Latest releases", "Comedies"],
        sciFi: ["More sci-fi", "Fantasy movies", "Show me action", "Adventure"],
        family: ["More family", "Animated movies", "Kids movies", "Comedies"],
        suspense: ["More mysteries", "Thrillers", "Show me action", "Comedies"],
        animation: ["More animation", "Family movies", "Show me action", "Adventure"],
        adventure: ["More adventures", "Action movies", "Fantasy", "Show me more"]
      };
      suggestions = genreSuggestions[genre] || ["Show me action", "Show me comedies", "Any romantic movies?"];
    } else {
      suggestions = ["Show me action movies", "Show me comedies", "Any romantic movies?", "What's trending?"];
    }

    res.json({
      success: true,
      data: {
        response: response,
        mood: genre || intent,
        movies: movieSuggestions,
        suggestions: suggestions
      }
    });

  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Something went wrong. Please try again." 
    });
  }
};