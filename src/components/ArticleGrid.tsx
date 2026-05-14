'use client';

import ArticleCard from './ArticleCard';
import { Article } from '@/types';

interface ArticleGridProps {
  articles: Article[];
  onBookmarkChange?: () => void;
}

export default function ArticleGrid({ articles, onBookmarkChange }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No articles found.</p>
        <p className="text-gray-500">Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard
          key={article.id || article.url}
          article={article}
          onBookmarkChange={onBookmarkChange}
        />
      ))}
    </div>
  );
}
