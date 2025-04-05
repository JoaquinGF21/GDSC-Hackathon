import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Stethoscope } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const [userType, setUserType] = useState<'personal' | 'medical' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Store the user type in localStorage to persist it
      localStorage.setItem('userType', userType || 'personal');
      
      // Navigate to the appropriate dashboard based on user type
      navigate(userType === 'medical' ? '/medical-dashboard' : '/personal-dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeSelect = (type: 'personal' | 'medical') => {
    setUserType(type);
    // Reset form when switching user types
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleBackToSelection = () => {
    setUserType(null);
    setEmail('');
    setPassword('');
    setError('');
  };

  // User type selection screen
  if (userType === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
            <p className="text-gray-600 mt-2">Please select your user type</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={() => handleUserTypeSelect('personal')}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all"
            >
              <User className="h-12 w-12 text-indigo-600 mb-3" />
              <span className="font-medium text-gray-900">Personal User</span>
              <p className="text-xs text-gray-500 mt-1 text-center">Track and monitor your skin health</p>
            </button>
            
            <button
              onClick={() => handleUserTypeSelect('medical')}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all"
            >
              <Stethoscope className="h-12 w-12 text-indigo-600 mb-3" />
              <span className="font-medium text-gray-900">Medical Professional</span>
              <p className="text-xs text-gray-500 mt-1 text-center">Access patient data and diagnostic tools</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login form for the selected user type
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {userType === 'medical' ? 'Medical Professional Login' : 'Personal User Login'}
          </h1>
          <p className="text-gray-600 mt-2">Please sign in to your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          
          <button
            type="button"
            onClick={handleBackToSelection}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to selection
          </button>
        </form>
      </div>
    </div>
  );
}import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Stethoscope } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const [userType, setUserType] = useState<'personal' | 'medical' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Store the user type in localStorage to persist it
      localStorage.setItem('userType', userType || 'personal');
      
      // Navigate to the appropriate dashboard based on user type
      navigate(userType === 'medical' ? '/medical-dashboard' : '/personal-dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeSelect = (type: 'personal' | 'medical') => {
    setUserType(type);
    // Reset form when switching user types
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleBackToSelection = () => {
    setUserType(null);
    setEmail('');
    setPassword('');
    setError('');
  };

  // User type selection screen
  if (userType === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
            <p className="text-gray-600 mt-2">Please select your user type</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={() => handleUserTypeSelect('personal')}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all"
            >
              <User className="h-12 w-12 text-indigo-600 mb-3" />
              <span className="font-medium text-gray-900">Personal User</span>
              <p className="text-xs text-gray-500 mt-1 text-center">Track and monitor your skin health</p>
            </button>
            
            <button
              onClick={() => handleUserTypeSelect('medical')}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all"
            >
              <Stethoscope className="h-12 w-12 text-indigo-600 mb-3" />
              <span className="font-medium text-gray-900">Medical Professional</span>
              <p className="text-xs text-gray-500 mt-1 text-center">Access patient data and diagnostic tools</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login form for the selected user type
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {userType === 'medical' ? 'Medical Professional Login' : 'Personal User Login'}
          </h1>
          <p className="text-gray-600 mt-2">Please sign in to your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          
          <button
            type="button"
            onClick={handleBackToSelection}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to selection
          </button>
        </form>
      </div>
    </div>
  );
}