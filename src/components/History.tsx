import React from 'react';
import { History as HistoryIcon, Clock, Calendar, BarChart, AlertTriangle } from 'lucide-react';

const History: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-lg mb-6">
        <div className="flex items-center mb-6">
          <HistoryIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Scan History</h2>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Coming Soon
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  The history feature is currently under development. Soon you'll be able to track all your skin scans,
                  see patterns over time, and monitor changes.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Placeholder for future history list */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-24 h-24 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <Clock className="h-12 w-12 text-indigo-200" />
              </div>
              <svg className="animate-spin-slow" viewBox="0 0 100 100" width="100" height="100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#c7d2fe"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset="188.4"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">History Under Development</h3>
            <p className="text-gray-500 text-center max-w-sm">
              We're working on building a comprehensive history tracking system for all your skin analyses.
            </p>
          </div>
        </div>
        
        {/* Preview of future features */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
            Future Features
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium text-indigo-800 mb-2">Chronological View</h4>
              <p className="text-sm text-indigo-600">
                Track all your scans in order with detailed timestamps.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium text-indigo-800 mb-2">Body Mapping</h4>
              <p className="text-sm text-indigo-600">
                View scan history on an interactive body map.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium text-indigo-800 mb-2">Trend Analysis</h4>
              <p className="text-sm text-indigo-600">
                Monitor changes in your skin health over time.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium text-indigo-800 mb-2">Export Options</h4>
              <p className="text-sm text-indigo-600">
                Share history with your healthcare professionals.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-center">
          <BarChart className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-gray-500 text-sm italic">
            Statistics and trends will appear here once you have scan history.
          </span>
        </div>
      </div>
    </div>
  );
};

export default History;