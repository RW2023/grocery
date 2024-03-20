'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { Database } from '@/lib/database.types';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
        <div className="w-full max-w-xs">
          <form className="bg-black rounded px-6 pt-6 pb-8 mb-4 border">
            <div className="mb-4">
              <label
                className="block text-base-content text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-base-content leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-base-content text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-base-content mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex items-center justify-between">
              {/* <button
                className="btn btn-info text-base-content font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSignUp}
              >
                Sign up
              </button> */}
              <button
                className="btn btn-success text-base-content-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSignIn}
              >
                Sign in
              </button>
              <button
                className="btn btn-error text-base-content font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
