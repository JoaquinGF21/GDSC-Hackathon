import React from 'react';
import { UserCircle, Settings, FileText, CalendarClock } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-lg bg-gradient-to-b from-indigo-100 to-white p-8 rounded-lg text-center mb-8">
        <div className="flex justify-center mb-4">
          <UserCircle className="h-24 w-24 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">User Profile</h2>
        <p className="text-gray-600 mb-6">Coming Soon</p>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-center">
            <Settings className="h-6 w-6 text-indigo-500 mr-2 animate-pulse" />
            <span className="text-gray-700 font-medium">Under Development</span>
          </div>
          <p className="text-gray-500 mt-4 text-sm">
            The profile management feature is currently being developed. 
            Soon you'll be able to update your personal information, 
            skin care preferences, and notification settings.
          </p>
        </div>
      </div>
      
      <div className="w-full max-w-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-indigo-600" />
          Upcoming Features
        </h3>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center mb-2">
              <div className="h-3 w-3 rounded-full bg-indigo-600 mr-2"></div>
              <span className="font-medium text-gray-700">Personal Health Records</span>
            </div>
            <p className="text-gray-600 text-sm">
              Track your skin health journey over time.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center mb-2">
              <div className="h-3 w-3 rounded-full bg-indigo-600 mr-2"></div>
              <span className="font-medium text-gray-700">Personalized Recommendations</span>
            </div>
            <p className="text-gray-600 text-sm">
              Get custom skin care tips based on your profile and history.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center mb-2">
              <div className="h-3 w-3 rounded-full bg-indigo-600 mr-2"></div>
              <span className="font-medium text-gray-700">Appointment Scheduling</span>
            </div>
            <p className="text-gray-600 text-sm">
              Book appointments with dermatologists directly from the app.
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-4 border border-indigo-100 rounded-lg bg-indigo-50 flex items-center">
          <CalendarClock className="h-10 w-10 text-indigo-500 mr-4 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-indigo-800 mb-1">Stay Tuned!</h4>
            <p className="text-sm text-indigo-700">
              We're working hard to bring you a comprehensive profile management system.
              Check back soon for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;