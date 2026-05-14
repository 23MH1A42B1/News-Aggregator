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
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Bookmarks</h1>
        <p className="text-gray-600 mb-8">
          Your saved articles ({bookmarks.length})
        </p>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Loading bookmarks...</p>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-600">No bookmarks yet.</p>
            <p className="text-gray-500">
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
