import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope as LesionIcon,
  LogOut,
  NotebookPen,
} from 'lucide-react';
import LesionAnalyzer from './LesionAnalyzer';
import PatientManager from './PatientManager';
import CalendarManager from './CalendarManager';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function MedicalDashboard() {
  const [activeTab, setActiveTab] = useState('patients');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'patients':
        return <PatientManager />;
      case 'lesions':
        return <LesionAnalyzer />;
      case 'calendar':
        return <CalendarManager />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Med Dashboard</h1>
          </div>
          <nav className="mt-6 space-y-2">
            <button
              onClick={() => setActiveTab('patients')}
              className={`flex items-center px-6 py-3 w-full ${activeTab === 'patients' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Users className="h-5 w-5 mr-3" />
              Patients
            </button>
            <button
              onClick={() => setActiveTab('lesions')}
              className={`flex items-center px-6 py-3 w-full ${activeTab === 'lesions' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <LesionIcon className="h-5 w-5 mr-3" />
              Lesion Analyzer
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center px-6 py-3 w-full ${activeTab === 'calendar' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <CalendarDays className="h-5 w-5 mr-3" />
              Calendar
            </button>
          </nav>
          <div className="absolute bottom-0 w-64 p-6">
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
