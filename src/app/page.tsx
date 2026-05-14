'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import ArticleGrid from '@/components/ArticleGrid';
import Footer from '@/components/Footer';
import PushNotificationToggle from '@/components/PushNotificationToggle';
import { newsService } from '@/lib/newsService';
import { Article } from '@/types';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await newsService.getTopHeadlines();
        setArticles(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch articles'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Latest News</h1>
            <p className="text-gray-600">
              Stay informed with the latest headlines
            </p>
          </div>
          <PushNotificationToggle />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Loading articles...</p>
          </div>
        ) : (
          <ArticleGrid articles={articles} />
        )}
      </main>
      <Footer />
    </>
  );
}
