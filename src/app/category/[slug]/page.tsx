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
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
        <p className="text-gray-600 mb-8">Articles in {categoryName}</p>

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
