import React, { useState, useRef, useEffect } from 'react';
import { Check, X, Info, RotateCcw, BarChart2 } from 'lucide-react';
import TrainingIcon from './TrainingIcon';

// Import images directly using Vite's import mechanism
// Replace these with your actual image imports
import benign1 from '../assets/images/lesions/benign/benign1.jpg';
import benign2 from '../assets/images/lesions/benign/benign2.jpg';
import benign3 from '../assets/images/lesions/benign/benign3.jpg';
import benign4 from '../assets/images/lesions/benign/benign4.jpg';
import benign5 from '../assets/images/lesions/benign/benign5.jpg';

import malignant1 from '../assets/images/lesions/malignant/malignant1.jpg';
import malignant2 from '../assets/images/lesions/malignant/malignant2.jpg';
import malignant3 from '../assets/images/lesions/malignant/malignant3.jpg';
import malignant4 from '../assets/images/lesions/malignant/malignant4.jpg';
import malignant5 from '../assets/images/lesions/malignant/malignant5.jpg';

// Fallback placeholders for testing
const benignPlaceholder = 'https://via.placeholder.com/400x400/98FB98/000000?text=Benign+Lesion';
const malignantPlaceholder = 'https://via.placeholder.com/400x400/FF6B6B/000000?text=Malignant+Lesion';

interface LesionCard {
  id: string;
  imagePath: string;
  type: 'benign' | 'malignant';
  difficulty: 'easy' | 'medium' | 'hard';
}

const Training: React.FC = () => {
  // State for tracking cards, statistics, and UI controls
  const [cards, setCards] = useState<LesionCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [statistics, setStatistics] = useState({
    total: 0,
    correct: 0,
    incorrect: 0,
    streak: 0,
    bestStreak: 0
  });
  const [showTutorial, setShowTutorial] = useState(true);

  const cardRef = useRef<HTMLDivElement>(null);

  // Load cards with directly imported images
  useEffect(() => {
    const loadCards = async () => {
      try {
        // Use the directly imported images
        const benignCards: LesionCard[] = [
          { id: 'b1', imagePath: benign1, type: 'benign', difficulty: 'easy' },
          { id: 'b2', imagePath: benign2, type: 'benign', difficulty: 'easy' },
          { id: 'b3', imagePath: benign3, type: 'benign', difficulty: 'medium' },
          { id: 'b4', imagePath: benign4, type: 'benign', difficulty: 'hard' },
          { id: 'b5', imagePath: benign5, type: 'benign', difficulty: 'medium' },
          // Add fallback in case any images fail to load
          { id: 'b_fallback', imagePath: benignPlaceholder, type: 'benign', difficulty: 'medium' },
        ];
        
        const malignantCards: LesionCard[] = [
          { id: 'm1', imagePath: malignant1, type: 'malignant', difficulty: 'medium' },
          { id: 'm2', imagePath: malignant2, type: 'malignant', difficulty: 'hard' },
          { id: 'm3', imagePath: malignant3, type: 'malignant', difficulty: 'medium' },
          { id: 'm4', imagePath: malignant4, type: 'malignant', difficulty: 'easy' },
          { id: 'm5', imagePath: malignant5, type: 'malignant', difficulty: 'hard' },
          // Add fallback in case any images fail to load
          { id: 'm_fallback', imagePath: malignantPlaceholder, type: 'malignant', difficulty: 'hard' },
        ];
        
        // Combine and shuffle cards
        const allCards = [...benignCards, ...malignantCards];
        setCards(shuffleArray(allCards));
        
        console.log("Loaded cards data:", allCards.length);
      } catch (error) {
        console.error('Error loading image data:', error);
        
        // If imports fail, fall back to placeholders
        const fallbackCards = [
          { id: 'b_fallback', imagePath: benignPlaceholder, type: 'benign', difficulty: 'medium' as 'easy' | 'medium' | 'hard' },
          { id: 'm_fallback', imagePath: malignantPlaceholder, type: 'malignant', difficulty: 'hard' as 'easy' | 'medium' | 'hard' }
        ];
        setCards(fallbackCards);
      }
    };
    
    loadCards();
  }, []);

  // Reset image loaded state when card changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentCardIndex]);

  // Shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array: LesionCard[]): LesionCard[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Mouse and touch event handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (currentCardIndex >= cards.length) return;
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (currentCardIndex >= cards.length) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
    
    // Determine direction for visual feedback
    if (diff > 50) {
      setDirection('right');
    } else if (diff < -50) {
      setDirection('left');
    } else {
      setDirection(null);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
    
    if (diff > 50) {
      setDirection('right');
    } else if (diff < -50) {
      setDirection('left');
    } else {
      setDirection(null);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // If card was dragged far enough, process the swipe
    if (offsetX > 100) {
      processSwipe('right');
    } else if (offsetX < -100) {
      processSwipe('left');
    }
    
    setOffsetX(0);
    setDirection(null);
  };

  const processSwipe = (swipeDirection: 'left' | 'right') => {
    if (currentCardIndex >= cards.length) return;
    
    const currentCard = cards[currentCardIndex];
    const isCorrect = 
      (swipeDirection === 'left' && currentCard.type === 'benign') ||
      (swipeDirection === 'right' && currentCard.type === 'malignant');
    
    updateStatistics(isCorrect);
    
    // Show the answer briefly before moving to next card
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      setCurrentCardIndex(prev => prev + 1);
    }, 1500);
  };

  const updateStatistics = (isCorrect: boolean) => {
    setStatistics(prev => {
      const newStats = {
        total: prev.total + 1,
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        incorrect: isCorrect ? prev.incorrect : prev.incorrect + 1,
        streak: isCorrect ? prev.streak + 1 : 0,
        bestStreak: isCorrect ? Math.max(prev.streak + 1, prev.bestStreak) : prev.bestStreak
      };
      return newStats;
    });
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    processSwipe(direction);
  };

  const resetTraining = () => {
    setCards(shuffleArray(cards));
    setCurrentCardIndex(0);
    setStatistics({
      total: 0,
      correct: 0,
      incorrect: 0,
      streak: 0,
      bestStreak: 0
    });
  };

  // Calculate rotation and opacity based on drag offset
  const cardStyle = {
    transform: isDragging ? `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)` : 'translateX(0) rotate(0)',
    transition: isDragging ? 'none' : 'transform 0.5s ease',
    opacity: isDragging && Math.abs(offsetX) > 100 ? 1 - Math.abs(offsetX) / 500 : 1,
    boxShadow: isDragging ? (
      offsetX > 50 ? '0 10px 25px rgba(220, 38, 38, 0.2)' :  // Red shadow when swiping right
      offsetX < -50 ? '0 10px 25px rgba(16, 185, 129, 0.2)' : // Green shadow when swiping left
      '0 10px 15px rgba(0, 0, 0, 0.1)'
    ) : '0 10px 15px rgba(0, 0, 0, 0.1)'
  };

  // Improved image loading and error handling
  const handleImageLoad = () => {
    console.log("Image loaded successfully");
    setImageLoaded(true);
  };
  
  const handleImageError = () => {
    console.error("Failed to load image");
    setImageLoaded(false);
  };
  
  // Render fallback content for when images aren't available
  const renderFallback = (type: 'benign' | 'malignant') => {
    return (
      <div className={`w-full h-full flex items-center justify-center 
                      ${type === 'benign' ? 'bg-green-100' : 'bg-red-100'}`}>
        <div className="text-center p-4">
          <div className={`text-2xl font-bold ${type === 'benign' ? 'text-green-600' : 'text-red-600'}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)} 
          </div>
          <div className="text-sm text-gray-500 mt-2">Image not available</div>
        </div>
      </div>
    );
  };

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600">Loading training cards...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full select-none">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <TrainingIcon className="h-6 w-6 mr-2 text-indigo-600" />
          Lesion Classification Training
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Swipe left for benign lesions, swipe right for malignant lesions to improve your diagnostic skills
        </p>
      </div>

      {/* Tutorial overlay */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">How to Use the Training Tool</h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <X className="h-8 w-8 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-green-600">Benign</span>
                  <span className="text-xs text-gray-500">Swipe LEFT</span>
                </div>
                
                <div className="text-gray-400">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M 5 12 L 19 12" />
                    <path d="M 12 5 L 12 19" />
                  </svg>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                    <Check className="h-8 w-8 text-red-600" />
                  </div>
                  <span className="text-sm font-medium text-red-600">Malignant</span>
                  <span className="text-xs text-gray-500">Swipe RIGHT</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                <strong>Instructions:</strong> Examine each lesion image carefully, then swipe:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• <strong>Left</strong> if you believe the lesion is <strong>benign</strong></li>
                <li>• <strong>Right</strong> if you believe the lesion is <strong>malignant</strong></li>
              </ul>
              <p className="text-sm text-gray-600">
                You'll receive immediate feedback on your decisions to help improve your diagnostic accuracy.
              </p>
            </div>
            
            <button 
              onClick={() => setShowTutorial(false)}
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Start Training
            </button>
          </div>
        </div>
      )}

      {/* Statistics section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-center px-3 py-2">
            <div className="text-2xl font-bold text-indigo-600">{statistics.total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          
          <div className="text-center px-3 py-2">
            <div className="text-2xl font-bold text-green-600">{statistics.correct}</div>
            <div className="text-xs text-gray-500">Correct</div>
          </div>
          
          <div className="text-center px-3 py-2">
            <div className="text-2xl font-bold text-red-600">{statistics.incorrect}</div>
            <div className="text-xs text-gray-500">Incorrect</div>
          </div>
          
          <div className="text-center px-3 py-2">
            <div className="text-2xl font-bold text-amber-600">{statistics.streak}</div>
            <div className="text-xs text-gray-500">Current Streak</div>
          </div>
          
          <div className="text-center px-3 py-2">
            <div className="text-2xl font-bold text-blue-600">{statistics.bestStreak}</div>
            <div className="text-xs text-gray-500">Best Streak</div>
          </div>
          
          <div className="text-center px-3 py-2">
            <div className="text-2xl font-bold text-purple-600">
              {statistics.total > 0 ? Math.round((statistics.correct / statistics.total) * 100) : 0}%
            </div>
            <div className="text-xs text-gray-500">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Card swiping area */}
      <div className="flex flex-col items-center justify-center mb-6 relative">
        {/* Direction indicators */}
        <div className="flex justify-between w-full absolute pointer-events-none px-4 sm:px-12 z-10">
          <div className={`flex items-center transition-opacity ${direction === 'left' ? 'opacity-100' : 'opacity-30'}`}>
            <div className="bg-green-100 rounded-full p-3">
              <X className="h-8 w-8 text-green-600" />
            </div>
            <span className="ml-2 font-bold text-green-600 text-lg hidden sm:inline">BENIGN</span>
          </div>
          
          <div className={`flex items-center transition-opacity ${direction === 'right' ? 'opacity-100' : 'opacity-30'}`}>
            <span className="mr-2 font-bold text-red-600 text-lg hidden sm:inline">MALIGNANT</span>
            <div className="bg-red-100 rounded-full p-3">
              <Check className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>
        
        {/* Card container */}
        <div className="relative w-full max-w-md h-96 mt-6 mb-4">
          {currentCardIndex < cards.length ? (
            <div 
              ref={cardRef}
              className="absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden"
              style={cardStyle}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleDragEnd}
            >
              {/* Card content */}
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-hidden relative">
                  {/* Fallback always visible, image will overlay when loaded */}
                  {renderFallback(cards[currentCardIndex].type)}
                  
                  {/* Image - will be visible on top when loaded successfully */}
                  <img 
                    src={cards[currentCardIndex].imagePath}
                    alt={`${cards[currentCardIndex].type} skin lesion`} 
                    className={`w-full h-full object-cover absolute inset-0 z-10 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                </div>
                
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">Case #{currentCardIndex + 1}</span>
                      <span className="ml-2 text-gray-500">
                        Difficulty: <span className={`font-medium ${
                          cards[currentCardIndex].difficulty === 'easy' ? 'text-green-600' :
                          cards[currentCardIndex].difficulty === 'medium' ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {cards[currentCardIndex].difficulty.charAt(0).toUpperCase() + cards[currentCardIndex].difficulty.slice(1)}
                        </span>
                      </span>
                    </div>
                    <div>
                      <button 
                        className="text-indigo-600 hover:text-indigo-800" 
                        onClick={() => setShowTutorial(true)}
                      >
                        <Info className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Answer overlay */}
                {showAnswer && (
                  <div className={`absolute inset-0 flex items-center justify-center ${
                    cards[currentCardIndex].type === 'benign' ? 'bg-green-600 bg-opacity-80' : 'bg-red-600 bg-opacity-80'
                  }`}>
                    <div className="text-center text-white">
                      <div className="text-3xl font-bold mb-2">
                        {cards[currentCardIndex].type === 'benign' ? 'BENIGN' : 'MALIGNANT'}
                      </div>
                      <div className="text-xl">
                        {statistics.streak > 0 ? `Streak: ${statistics.streak}` : 'Streak reset'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-6 text-center">
              <BarChart2 className="h-16 w-16 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Training Complete!</h3>
              <p className="text-gray-600 mb-6">
                You've reviewed all available cases.
                Your final accuracy: {statistics.total > 0 ? Math.round((statistics.correct / statistics.total) * 100) : 0}%
              </p>
              <button
                onClick={resetTraining}
                className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Start New Session
              </button>
            </div>
          )}
        </div>
        
        {/* Button controls (alternative to swiping) */}
        {currentCardIndex < cards.length && (
          <div className="flex justify-center space-x-6">
            <button
              className="flex items-center justify-center p-4 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
              onClick={() => handleButtonSwipe('left')}
              disabled={showAnswer}
            >
              <X className="h-6 w-6 text-green-600" />
            </button>
            
            <button
              className="flex items-center justify-center p-4 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
              onClick={() => handleButtonSwipe('right')}
              disabled={showAnswer}
            >
              <Check className="h-6 w-6 text-red-600" />
            </button>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Guide</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center bg-green-100 rounded-full">
              <X className="h-4 w-4 text-green-600" />
            </div>
            <span className="ml-2 text-sm text-gray-600">Swipe <strong>LEFT</strong> for <strong>BENIGN</strong> lesions</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center bg-red-100 rounded-full">
              <Check className="h-4 w-4 text-red-600" />
            </div>
            <span className="ml-2 text-sm text-gray-600">Swipe <strong>RIGHT</strong> for <strong>MALIGNANT</strong> lesions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;