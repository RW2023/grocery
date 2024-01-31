'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('error'); // 'success' or 'error'
  const [isSigningUp, setIsSigningUp] = useState(false);
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
      setFeedbackType('error');
    } else if (response.data.user) {
      setFeedback(
        `${
          isSigningUp ? 'Signup' : 'Login'
        } successful. Redirecting to devdash...`,
      );
      setFeedbackType('success');
      router.push('/devdash');
    }
  };

  return (
    <div className="bg-background p-10 rounded-md w-full max-w-xs mx-auto mt-6 border border-1 drop-shadow-md">
      <h2 className="text-center text-lg font-bold mb-4">
        {isSigningUp ? 'Sign Up' : 'Log In'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {feedback && (
          <p
            className={`text-center py-2 px-4 rounded-md ${
              feedbackType === 'error'
                ? 'bg-black text-red-700 rounded border border-border'
                : 'bg-black text-green-700 rounded border border-border'
            }`}
          >
            {feedback}
          </p>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium"
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
            className="block text-sm font-medium "
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
            Log in
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
