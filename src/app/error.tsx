'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.error(error);
  }, [error]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">⚠️ Error</h1>
          <p className="text-gray-600 mb-6">Something went wrong!</p>
          <p className="text-red-600 mb-6">{error.message}</p>
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
