import React from 'react';
import { LogOut, AlertCircle, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function MedicalDashboard() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-indigo-600">Skinder Medical</h1>
          <button 
            onClick={handleSignOut}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white shadow rounded-lg overflow-hidden p-6 md:p-8">
          <div className="flex flex-col items-center justify-center text-center py-8 md:py-12">
            <div className="bg-yellow-50 p-4 rounded-full mb-6">
              <AlertCircle className="h-10 md:h-12 w-10 md:w-12 text-yellow-500" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Medical Dashboard Coming Soon
            </h2>
            <p className="text-gray-600 max-w-lg mb-6 px-4">
              The Medical Professional Dashboard is currently under development. 
              This interface will provide specialized tools for medical professionals 
              to analyze patient data, track trends, and provide diagnostic assistance.
            </p>
            <div className="bg-indigo-50 rounded-lg p-4 max-w-md mx-4">
              <p className="text-indigo-700 text-sm font-medium">
                We're working hard to deliver a comprehensive suite of tools for medical professionals.
                Check back in the near future!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}