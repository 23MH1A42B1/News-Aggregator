'use client';

import Navigation from '@/components/Navigation';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-600 mb-6">Page not found</p>
          <Link
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Go home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
