'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false); // State to toggle between login and signup
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFeedback('');

    const response = isSigningUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (response.error) {
      setFeedback(
        `${isSigningUp ? 'Signup' : 'Login'} failed: ${response.error.message}`,
      );
    } else if (response.data.user) {
      setFeedback(
        `${
          isSigningUp ? 'Signup' : 'Login'
        } successful. Redirecting to dashboard...`,
      );
      router.push('/dashboard');
    }
  };

  return (
    <div className="bg-background p-10 rounded-md w-full max-w-xs mx-auto mt-6 border border-1 drop-shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {feedback && <p className="text-red-500 text-center">{feedback}</p>}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <button
            type="submit"
            onClick={() => setIsSigningUp(false)}
            className="btn btn-primary"
          >
            Sign in
          </button>
          <button
            type="submit"
            onClick={() => setIsSigningUp(true)}
            className="btn btn-secondary"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
