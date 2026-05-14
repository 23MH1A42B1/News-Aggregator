'use client';

import Link from 'next/link';
import { useOnlineStatus } from '@/hooks/usePWA';

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Business', slug: 'business' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Health', slug: 'health' },
  { name: 'Entertainment', slug: 'entertainment' },
];

export default function Navigation() {
  const isOnline = useOnlineStatus();

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="text-2xl font-bold">
            News PWA
          </Link>
          <div className="flex items-center gap-2">
            <div
              aria-hidden="true"
              className={`w-3 h-3 rounded-full ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span className="text-sm">{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-4 py-2 bg-secondary rounded-lg hover:bg-accent transition-colors whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/bookmarks"
            className="px-4 py-2 bg-secondary rounded-lg hover:bg-accent transition-colors whitespace-nowrap font-bold"
          >
            Bookmarks
          </Link>
        </div>
      </div>
    </nav>
  );
}
