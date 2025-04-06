import React, { useState } from 'react';
import { Users, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Training from './Training';
import Patients from './Patients';
import TrainingIcon from './TrainingIcon'; // Added import for TrainingIcon

export default function MedicalDashboard() {
  const [activeTab, setActiveTab] = useState('patients');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'training':
        return <Training />;
      case 'patients':
        return <Patients />;
      default:
        return <Patients />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-indigo-600">Skinder Medical</h1>
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
                activeTab === 'patients'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } focus:outline-none transition duration-150 ease-in-out`}
              onClick={() => setActiveTab('patients')}
            >
              <Users className="h-5 w-5 mr-2" />
              Patients
            </button>

            <button
              className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 ${
                activeTab === 'training'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } focus:outline-none transition duration-150 ease-in-out`}
              onClick={() => setActiveTab('training')}
            >
              <TrainingIcon className="h-5 w-5 mr-2" />
              Training
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
              activeTab === 'patients'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-indigo-600'
            }`}
            onClick={() => setActiveTab('patients')}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs mt-1">Patients</span>
          </button>

          <button
            className={`flex flex-col items-center px-4 py-2 ${
              activeTab === 'training'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-indigo-600'
            }`}
            onClick={() => setActiveTab('training')}
          >
            <TrainingIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Training</span>
          </button>
        </div>
      </nav>
    </div>
  );
}