'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    setFeedback('');
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (response.error) {
      setFeedback('Signup failed: ' + response.error.message);
    } else if (response.data.user) {
      setFeedback('Signup successful. Redirecting to dashboard...');
      router.push('/devdash');
    }
  };

  const handleSignIn = async () => {
    setFeedback('');
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (response.error) {
      setFeedback('Login failed: ' + response.error.message);
    } else if (response.data.user) {
      setFeedback('Login successful. Redirecting to dashboard...');
      router.push('/devdash');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="bg-background p-10 rounded-md w-full max-w-xs mx-auto mt-6 border border-1 drop-shadow-md">
      <form className="space-y-4">
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <button
            type="button"
            onClick={handleSignUp}
            className="btn btn-primary"
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={handleSignIn}
            className="btn btn-secondary"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="btn btn-accent"
          >
            Sign out
          </button>
        </div>
      </form>
    </div>
  );
}
