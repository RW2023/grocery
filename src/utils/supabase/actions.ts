// src/utils/supabase/actions.ts
import { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = new SupabaseClient(supabaseUrl, supabaseAnonKey);

export const login = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user, error };
};

export const signup = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signUp({ email, password });
  return { user, error };
};

export const createClient = () => {
  return supabase;
};
