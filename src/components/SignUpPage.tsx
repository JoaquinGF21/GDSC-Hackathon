import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'medical-professional'>('patient');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!role) {
      alert('Please select a role.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role,
        },
      },
    });

    if (error) {
      if (error.message.includes('already registered')) {
        alert('This email is already registered. Try logging in.');
      } else {
        alert('Signup failed: ' + error.message);
      }
      return;
    }

    const user = data.user;
    if (!user || !user.id) {
      alert('Signup failed: user not returned');
      return;
    }

    // Insert into profiles table
    const { error: profileError } = await supabase.from('profiles').insert({
      id: user.id,
      email: user.email,
      role: role,
      created_at: new Date().toISOString()
    });

    if (profileError) {
      console.error('Failed to insert profile:', profileError);
    }

    // Redirect
    if (role === 'medical-professional') {
      navigate('/med-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md space-y-4 w-96">
        <h2 className="text-2xl font-bold">Create Account</h2>

        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Account Type</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'patient' | 'medical-professional')}
            className="w-full border p-2 rounded"
          >
            <option value="patient">Patient</option>
            <option value="medical-professional">Medical Professional</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
