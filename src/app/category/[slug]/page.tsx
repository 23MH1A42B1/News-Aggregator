'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import ArticleGrid from '@/components/ArticleGrid';
import Footer from '@/components/Footer';
import { newsService } from '@/lib/newsService';
import { Article } from '@/types';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const categoryNames: Record<string, string> = {
  technology: 'Technology',
  business: 'Business',
  sports: 'Sports',
  health: 'Health',
  entertainment: 'Entertainment',
  all: 'All Categories',
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const categoryName = categoryNames[params.slug] || params.slug;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const category = params.slug === 'all' ? undefined : params.slug;
        const data = await newsService.getTopHeadlines(category);
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
  }, [params.slug]);

  return (
    <>
      <Navigation />
      <main className="page-shell">
        <header className="page-header">
          <div>
            <p className="eyebrow">Category</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {categoryName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Articles in {categoryName}
            </p>
          </div>
        </header>

        {error && (
          <div className="status-banner border-red-200 bg-red-50 text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="muted-panel">
            <p className="text-xl font-black text-slate-800">Loading articles...</p>
            <p className="mt-2 text-slate-500">Checking the latest category feed.</p>
          </div>
        ) : (
          <ArticleGrid articles={articles} />
        )}
      </main>
      <Footer />
    </>
  );
}
