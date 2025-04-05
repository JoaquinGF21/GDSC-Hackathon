import React, { useState, useEffect } from 'react';
import { User, Camera, History, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import MedHistoryQuiz from './MedHistoryQuiz';

// These will be imported in the future
// import UserProfile from './components/UserProfile';
// import Camera from './components/Camera';
// import History from './components/History';

export default function PersonalDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();
  
  // Check if user has completed the medical history quiz
  useEffect(() => {
    // Always show the quiz, regardless of previous completions
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
    // Here you would typically save the quiz data to your database
    console.log('Quiz data:', quizData);
    
    // For now, we'll just mark it as completed in localStorage
    localStorage.setItem('medHistoryQuizData', JSON.stringify(quizData));
    
    // Even if they complete it, we don't mark it as permanently completed
    // so it will show up next time too
    
    // Hide the quiz
    setShowQuiz(false);
  };
  
  const handleQuizSkip = () => {
    // Hide the quiz without marking as completed
    setShowQuiz(false);
  };

  // Placeholder component for tabs that are not yet implemented
  const WorkInProgress = ({ componentName }: { componentName: string }) => (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="text-3xl font-bold text-gray-300 mb-4">Work In Progress</div>
      <div className="text-gray-500">{componentName} component will be implemented here</div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <WorkInProgress componentName="UserProfile" />;
      case 'camera':
        return <WorkInProgress componentName="Camera" />;
      case 'history':
        return <WorkInProgress componentName="History" />;
      default:
        return <WorkInProgress componentName="Unknown" />;
    }
  };

  // If showing quiz, return the quiz component overlay
  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header remains visible during quiz */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Skinder</h1>
            <button 
              onClick={handleSignOut}
              className="flex items-center text-gray-600 hover:text-indigo-600"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Sign out</span>
            </button>
          </div>
        </header>
        
        {/* Quiz displayed in main content area with overlay styling */}
        <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Medical History Questionnaire</h2>
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

  // Regular dashboard view when not showing the quiz
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Skinder</h1>
          <button 
            onClick={handleSignOut}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Sign out</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Tab navigation */}
          <div className="flex border-b">
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
              <Camera className="h-5 w-5 mr-2" />
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
              <History className="h-5 w-5 mr-2" />
              History
            </button>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
}