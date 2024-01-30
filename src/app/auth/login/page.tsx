'use client';
import { useState } from 'react';
import {
  createClientComponentClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const supabase: SupabaseClient = createClientComponentClient();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (response.error) {
      setError(response.error.message);
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    const response = await supabase.auth.signUp({ email, password });
    if (response.error) {
      setError(response.error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-background p-10 rounded-md w-fit mx-auto justify-center items-center mt-6 border border-1 drop-shadow-md">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full max-w-xs"
          disabled={loading}
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full max-w-xs"
          disabled={loading}
        />
      </div>
      <button
        onClick={handleLogin}
        className="btn btn-primary mr-2"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <button
        onClick={handleSignup}
        className="btn btn-secondary"
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </div>
  );
};

export default Auth;
