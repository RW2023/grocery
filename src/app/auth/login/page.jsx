//src/app/auth/login/page.jsx
'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const supabase = createClientComponentClient();

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) console.error(error);
    };

    const handleSignup = async () => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) console.error(error);
    };

    return (
        <div className="bg-background p-10 rounded-md w-fit mx-auto justify-center items-center mt-6 border border-1 drop-shadow-md">
            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className="mb-6">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <button onClick={handleLogin} className="btn btn-primary mr-2">Login</button>
            <button onClick={handleSignup} className="btn btn-secondary">Sign Up</button>
        </div>
    );
};

export default Auth;

