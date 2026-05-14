'use client';

import { useEffect, useState } from 'react';
import { Article } from '@/types';
import { indexedDBService } from '@/lib/indexedDB';
import { registerBookmarkSync } from '@/lib/pwa';
import InternalArticleLink from './InternalArticleLink';
import LazyArticleImage from './LazyArticleImage';

interface ArticleCardProps {
  article: Article;
  onBookmarkChange?: () => void;
}

export default function ArticleCard({
  article,
  onBookmarkChange,
}: ArticleCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      const articleId = article.id || article.url;
      const bookmarked = await indexedDBService.isBookmarked(articleId);
      setIsBookmarked(bookmarked);
    };

    checkBookmark();
  }, [article.id, article.url]);

  const handleBookmark = async () => {
    setIsLoading(true);
    try {
      const articleId = article.id || article.url;
      if (isBookmarked) {
        await indexedDBService.removeBookmark(articleId);
      } else {
        await indexedDBService.addBookmark(article);
      }

      if (!navigator.onLine) {
        await registerBookmarkSync();
      }

      setIsBookmarked(!isBookmarked);
      onBookmarkChange?.();
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="card flex h-full flex-col">
      {article.urlToImage && (
        <div className="relative h-48 w-full overflow-hidden bg-slate-200">
          <LazyArticleImage
            src={article.urlToImage}
            alt={article.title}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase text-slate-500">
          <span className="truncate">{article.source.name}</span>
          <span className="shrink-0">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </p>

        <h3 className="mb-3 line-clamp-2 text-xl font-black leading-snug text-slate-950 transition hover:text-blue-700">
          <InternalArticleLink article={article}>
            {article.title}
          </InternalArticleLink>
        </h3>

        <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">
          {article.description}
        </p>

        <div className="mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <button
              data-testid="bookmark-button"
              onClick={handleBookmark}
              disabled={isLoading}
              className={`rounded-md px-3 py-2.5 text-sm font-bold transition ${
                isBookmarked
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isBookmarked ? 'Saved' : 'Bookmark'}
            </button>

            <InternalArticleLink
              article={article}
              className="rounded-md bg-blue-600 px-3 py-2.5 text-center text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Read
            </InternalArticleLink>
          </div>
        </div>
      </div>
    </article>
  );
}
