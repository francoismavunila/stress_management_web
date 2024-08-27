'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('stm_token');
    console.log("the token is", token)
    if (token && token != "undefined") {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  }, []);

  return (
    <main className="h-screen">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
        </div>
    </main>
  );
}