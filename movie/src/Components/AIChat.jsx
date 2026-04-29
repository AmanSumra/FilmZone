import React, { useState, useRef, useEffect } from "react";

const API_URL = "http://localhost:5000";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your movie recommendation assistant. Tell me about your mood or what kind of movie you're looking for, and I'll suggest some great films! 🎬"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(null);
  const messagesEndRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("admin");
    setIsAdmin(adminStatus === "1");
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isAdmin) {
    return null;
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Check if user is mentioning a new explicit genre
    const userText = input.trim().toLowerCase();
    const genreKeywords = ['action', 'comedy', 'romance', 'romantic', 'horror', 'drama', 'sci-fi', 'family', 'animation', 'suspense', 'adventure', 'thriller'];
    const hasNewGenre = genreKeywords.some(g => userText.includes(g));
    const contextToSend = (!hasNewGenre && currentGenre) ? { genre: currentGenre } : null;
    
    console.log("Sending - currentGenre:", currentGenre, "hasNewGenre:", hasNewGenre, "context:", contextToSend);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${API_URL}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          message: input.trim(),
          context: contextToSend
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("AI Response:", data);

      if (data.success && data.data) {
        let responseContent = data.data.response;
        
        if (data.data.movies && data.data.movies.length > 0) {
          responseContent += "\n\nHere are some movies you might like:";
        }

        // Update current genre based on AI response mood
        const newMood = data.data.mood;
        if (newMood && newMood !== 'recommend' && newMood !== 'greeting' && newMood !== 'thanks' && newMood !== 'help' && newMood !== 'booking') {
          setCurrentGenre(newMood);
        }

        const assistantMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: responseContent,
          movies: data.data.movies || [],
          suggestions: data.data.suggestions || [],
          mood: data.data.mood
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: "assistant",
          content: data.message || data.data?.response || "Sorry, I couldn't process your request. Please try again."
        }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      let errorMessage = "Oops! Something went wrong. Please try again.";
      
      if (error.name === 'AbortError') {
        errorMessage = "Request timed out. Please check your connection and try again.";
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = "Cannot connect to server. Please make sure the backend is running on port 5000.";
      }
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (suggestion) => {
    // Check if suggestion is asking for more of current genre
    if (currentGenre && (suggestion.toLowerCase().includes('more') || 
        suggestion.toLowerCase().includes('another') ||
        suggestion.toLowerCase().includes('similar'))) {
      // Keep current genre
    }
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  const navigateToMovie = (movieId) => {
    window.location.href = `/movies?movie=${movieId}`;
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
        style={{ animation: "pulse 2s infinite" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center text-black">AI</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[90vw] bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-700">
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold">FilmZone AI</h3>
                <p className="text-red-200 text-xs">Movie Expert</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-800">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${msg.role === "user" ? "order-2" : "order-1"}`}>
                  {msg.role === "assistant" && (
                    <div className="flex items-start space-x-2 mb-1">
                        <div className="bg-red-600 rounded-full p-1 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-400">FilmZone AI</span>
                    </div>
                  )}
                  <div className={`rounded-2xl px-4 py-2 ${
                    msg.role === "user" 
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white" 
                      : "bg-gray-700 text-gray-100"
                  }`}>
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  </div>
                  
                  {msg.movies && msg.movies.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {msg.movies.slice(0, 4).map((movie) => (
                        <div 
                          key={movie._id}
                          onClick={() => navigateToMovie(movie._id)}
                          className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-600 transition-colors group"
                        >
                          <div className="h-20 overflow-hidden">
                            <img 
                              src={movie.image || ''}
                              alt={movie.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/150x100?text=No+Image'; }}
                            />
                          </div>
                          <div className="p-2">
                            <p className="text-xs text-white font-medium truncate">{movie.name}</p>
                            <p className="text-xs text-gray-400">{movie.price ? `₹${movie.price}` : ""}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickReply(suggestion)}
                          className="text-xs bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white px-3 py-1 rounded-full transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-gray-900 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me your mood..."
                className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-600"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white p-2 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </>
  );
};

export default AIChat;