import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Share2, ChevronUp, ChevronDown, Play, Pause } from 'lucide-react';

const BookQuoteShorts = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [likedQuotes, setLikedQuotes] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API calls (replace with actual API calls)
  const mockQuotes = [
    {
      id: 1,
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      book_title: "Various Interviews",
      likes_count: 42
    },
    {
      id: 2,
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      book_title: "Keynote Speeches",
      likes_count: 28
    },
    {
      id: 3,
      text: "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon",
      book_title: "Beautiful Boy Lyrics",
      likes_count: 65
    },
    {
      id: 4,
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      book_title: "Various Speeches",
      likes_count: 38
    },
    {
      id: 5,
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle",
      book_title: "Philosophy Works",
      likes_count: 51
    }
  ];

  // Fetch quotes from API
  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      const response = await fetch('/api/quotes/random?limit=10');
      const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setQuotes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch quotes');
      console.error('Error fetching quotes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && quotes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % quotes.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, quotes.length]);

  // Navigation handlers
  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % quotes.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + quotes.length) % quotes.length);
  };

  // Like handler
  const handleLike = async (quoteId) => {
    try {
      // Replace with actual API call
      await fetch(`/api/quotes/${quoteId}/like`, { method: 'POST' });
      
      const newLikedQuotes = new Set(likedQuotes);
      if (likedQuotes.has(quoteId)) {
        newLikedQuotes.delete(quoteId);
      } else {
        newLikedQuotes.add(quoteId);
      }
      setLikedQuotes(newLikedQuotes);

      // Update local quotes state
      setQuotes(prev => prev.map(quote => 
        quote.id === quoteId 
          ? { ...quote, likes_count: likedQuotes.has(quoteId) 
              ? quote.likes_count - 1 
              : quote.likes_count + 1 
            }
          : quote
      ));
    } catch (err) {
      console.error('Error liking quote:', err);
    }
  };

  // Share handler (mock)
  const handleShare = async (quote) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Quote by ${quote.author}`,
          text: `"${quote.text}" - ${quote.author}, ${quote.book_title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(
          `"${quote.text}" - ${quote.author}, ${quote.book_title}`
        );
        alert('Quote copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowDown':
          e.preventDefault();
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          setIsAutoPlay(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading quotes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">No quotes found</div>
      </div>
    );
  }

  const currentQuote = quotes[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Header */}
      <header className="p-4 text-center text-white">
        <h1 className="text-2xl font-bold">Book Quote Shorts</h1>
        <p className="text-sm opacity-75">Discover wisdom, one quote at a time</p>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center relative overflow-hidden">
        {/* Quote Container */}
        <div className="h-full flex items-center justify-center p-6 w-full">
          <div
            key={currentQuote.id}
            className="relative max-w-2xl w-full min-h-[400px] bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center shadow-2xl border border-white/20 animate-fade-in"
          >
            {/* Quote Text */}
            <blockquote className="text-white text-xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-6 italic">
              "{currentQuote.text}"
            </blockquote>

            {/* Author and Book */}
            <div className="text-white/80 text-lg md:text-xl space-y-2">
              <div className="font-semibold">— {currentQuote.author}</div>
              <div className="text-base opacity-75">{currentQuote.book_title}</div>
            </div>

            {/* Quote Counter */}
            <div className="mt-6 text-white/60 text-sm">
              {currentIndex + 1} of {quotes.length}
            </div>

            {/* Navigation Buttons (centered at bottom) */}
            <div className="mt-14 flex justify-center space-x-12">
              <button
                onClick={goToPrevious}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
                aria-label="Previous quote"
              >
                <ChevronUp size={24} />
              </button>
              <button
                onClick={goToNext}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
                aria-label="Next quote"
              >
                <ChevronDown size={24} />
              </button>
            </div>

            {/* Right-side vertical action buttons */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
              {/* Like */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleLike(currentQuote.id)}
                  className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 ${
                    likedQuotes.has(currentQuote.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                  aria-label="Like quote"
                >
                  <Heart
                    size={24}
                    fill={likedQuotes.has(currentQuote.id) ? 'currentColor' : 'none'}
                  />
                </button>
                <span className="text-white text-sm mt-1">
                  {currentQuote.likes_count}
                </span>
              </div>

              {/* Share */}
              <button
                onClick={() => handleShare(currentQuote)}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
                aria-label="Share quote"
              >
                <Share2 size={24} />
              </button>

              {/* Auto-play */}
              <button
                onClick={() => setIsAutoPlay((prev) => !prev)}
                className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 ${
                  isAutoPlay
                    ? 'bg-green-500 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
                aria-label="Toggle auto-play"
              >
                {isAutoPlay ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 text-center text-white/60 text-sm">
        Use ↑↓ keys to navigate • Space to toggle auto-play • Click dots to jump
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BookQuoteShorts;