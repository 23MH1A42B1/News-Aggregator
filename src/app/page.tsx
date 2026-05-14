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
      <main className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Top headlines</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Latest News
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Fast headlines, offline bookmarks, and a PWA-ready reading flow.
            </p>
          </div>
          <PushNotificationToggle />
        </div>

        {error && (
          <div className="status-banner border-red-200 bg-red-50 text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="muted-panel">
            <p className="text-xl font-black text-slate-800">Loading articles...</p>
            <p className="mt-2 text-slate-500">Fetching the newest feed.</p>
          </div>
        ) : (
          <ArticleGrid articles={articles} />
        )}
      </main>
      <Footer />
    </>
  );
}
