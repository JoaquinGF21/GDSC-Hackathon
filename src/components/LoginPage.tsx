import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        const role = profile?.role;
        if (role === 'medical-professional') navigate('/med-dashboard');
        else if (role === 'patient') navigate('/dashboard');
      }
    })();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Login failed: ' + error.message);
      return;
    }

    const user = data.user;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile?.role) {
      alert('User role is missing in profile. Please contact support.');
      return;
    }

    const role = profile.role;

    if (role === 'medical-professional') {
      navigate('/med-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-6 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700">Welcome Back</h2>
        <p className="text-sm text-gray-500 text-center">
          Enter your credentials to access your dashboard.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Log In
        </button>

        <div className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up here
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;