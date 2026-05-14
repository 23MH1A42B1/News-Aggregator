'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Loading() {
  return (
    <>
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded mb-4" />
              <div className="h-6 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-4" />
              <div className="flex gap-2">
                <div className="flex-1 h-10 bg-gray-200 rounded" />
                <div className="flex-1 h-10 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
