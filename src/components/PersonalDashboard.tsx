import React, { useState, useEffect } from 'react';
import { User, Camera as CameraIcon, History as HistoryIcon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import MedHistoryQuiz from './MedHistoryQuiz';
import Camera from './Camera';
import Profile from './Profile';
import History from './History';

export default function PersonalDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setShowQuiz(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const handleQuizComplete = (quizData) => {
    console.log('Quiz data:', quizData);
    localStorage.setItem('medHistoryQuizData', JSON.stringify(quizData));
    setShowQuiz(false);
  };
  
  const handleQuizSkip = () => {
    setShowQuiz(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'camera':
        return <Camera />;
      case 'history':
        return <History />;
      default:
        return <Profile />;
    }
  };

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-indigo-600">Skinder</h1>
            <button 
              onClick={handleSignOut}
              className="flex items-center text-gray-600 hover:text-indigo-600"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>
        
        <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Medical History Questionnaire</h2>
              <p className="text-gray-600 mb-1">This questionnaire helps us better assess your skin health.</p>
              <p className="text-gray-600 text-sm italic">This will be shown each time you log in to update your information.</p>
            </div>
            
            <MedHistoryQuiz 
              onComplete={handleQuizComplete} 
              onSkip={handleQuizSkip} 
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-indigo-600">Skinder</h1>
          <button 
            onClick={handleSignOut}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 mt-16 mb-16 md:mb-0">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Desktop Navigation - Top */}
          <div className="hidden md:flex border-b">
            <button
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 ${
                activeTab === 'profile'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } focus:outline-none transition duration-150 ease-in-out`}
              onClick={() => setActiveTab('profile')}
            >
              <User className="h-5 w-5 mr-2" />
              Profile
            </button>

            <button
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 ${
                activeTab === 'camera'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } focus:outline-none transition duration-150 ease-in-out`}
              onClick={() => setActiveTab('camera')}
            >
              <CameraIcon className="h-5 w-5 mr-2" />
              Camera
            </button>

            <button
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 ${
                activeTab === 'history'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } focus:outline-none transition duration-150 ease-in-out`}
              onClick={() => setActiveTab('history')}
            >
              <HistoryIcon className="h-5 w-5 mr-2" />
              History
            </button>
          </div>

          {/* Tab content */}
          <div className="p-4 md:p-6">
            {renderTabContent()}
          </div>
        </div>
      </main>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex justify-around items-center">
          <button
            className={`flex flex-col items-center px-4 py-2 ${
              activeTab === 'profile'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-indigo-600'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>

          <button
            className={`flex flex-col items-center px-4 py-2 ${
              activeTab === 'camera'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-indigo-600'
            }`}
            onClick={() => setActiveTab('camera')}
          >
            <CameraIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Camera</span>
          </button>

          <button
            className={`flex flex-col items-center px-4 py-2 ${
              activeTab === 'history'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-indigo-600'
            }`}
            onClick={() => setActiveTab('history')}
          >
            <HistoryIcon className="h-6 w-6" />
            <span className="text-xs mt-1">History</span>
          </button>
        </div>
      </nav>
    </div>
  );
}