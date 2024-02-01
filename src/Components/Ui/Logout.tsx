import { FC, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient'

const LogoutButton: FC = () => {
  const router = useRouter();

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      // Redirect to the login page after successful logout
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <button onClick={signOut} className="btn btn-secondary">
      Logout
    </button>
  );
};

export default LogoutButton;
