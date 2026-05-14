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
      <div className="muted-panel">
        <p className="text-xl font-black text-slate-800">No articles found.</p>
        <p className="mt-2 text-slate-500">Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
