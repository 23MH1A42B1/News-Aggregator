'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import ArticleGrid from '@/components/ArticleGrid';
import Footer from '@/components/Footer';
import { indexedDBService, BookmarkedArticle } from '@/lib/indexedDB';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadBookmarks = async () => {
    try {
      setIsLoading(true);
      const data = await indexedDBService.getAllBookmarks();
      setBookmarks(data);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  return (
    <>
      <Navigation />
      <main className="page-shell">
        <header className="page-header">
          <div>
            <p className="eyebrow">Offline library</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Bookmarks
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Your saved articles ({bookmarks.length})
            </p>
          </div>
        </header>

        {isLoading ? (
          <div className="muted-panel">
            <p className="text-xl font-black text-slate-800">Loading bookmarks...</p>
            <p className="mt-2 text-slate-500">Reading from IndexedDB.</p>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="muted-panel">
            <p className="text-xl font-black text-slate-800">No bookmarks yet</p>
            <p className="mt-2 text-slate-500">
              Start bookmarking articles to see them here.
            </p>
          </div>
        ) : (
          <ArticleGrid articles={bookmarks} onBookmarkChange={loadBookmarks} />
        )}
      </main>
      <Footer />
    </>
  );
}
