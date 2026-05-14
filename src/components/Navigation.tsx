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
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 text-slate-950">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
              NP
            </span>
            <span>
              <span className="block text-lg font-black leading-5">News PWA</span>
              <span className="hidden text-xs font-medium text-slate-500 sm:block">
                Offline-first headlines
              </span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
            <div
              aria-hidden="true"
              className={`h-2.5 w-2.5 rounded-full ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="whitespace-nowrap rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/bookmarks"
            className="whitespace-nowrap rounded-md bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Bookmarks
          </Link>
        </div>
      </div>
    </nav>
  );
}
