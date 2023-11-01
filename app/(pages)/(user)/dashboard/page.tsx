"use client"

import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/firebase';

export default function Dashboard() {
  const router = useRouter();

  const signOut = async () => {
    try {
      await auth.signOut();
      // User signed out successfully.
      // Redirect to home or sign-in page.
      router.push('/'); // replace with the path to your home or sign-in page
    } catch (error) {
      // Error occurred during sign out.
      // Handle error here.
    }
  };

  return (
    <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
      Dashboard
      <button onClick={signOut}>Logout</button>
    </main>
  );
}