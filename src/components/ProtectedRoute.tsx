import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Props {
  children: JSX.Element;
  allowedRole: 'patient' | 'medical-professional';
}

export default function ProtectedRoute({ children, allowedRole }: Props) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role === allowedRole) {
        setAllowed(true);
      } else {
        navigate('/dashboard'); // fallback
      }

      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return allowed ? children : null;
}
