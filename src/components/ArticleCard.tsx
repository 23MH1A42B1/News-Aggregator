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
    <article className="card overflow-hidden flex flex-col h-full">
      {article.urlToImage && (
        <div className="relative w-full h-48 bg-gray-200">
          <LazyArticleImage
            src={article.urlToImage}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-accent">
          <InternalArticleLink article={article}>
            {article.title}
          </InternalArticleLink>
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {article.description}
        </p>

        <div className="mt-auto">
          <p className="text-xs text-gray-500 mb-2">
            <span>{article.source.name}</span> -{' '}
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>

          <div className="flex gap-2">
            <button
              data-testid="bookmark-button"
              onClick={handleBookmark}
              disabled={isLoading}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                isBookmarked
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {isBookmarked ? 'Saved' : 'Bookmark'}
            </button>

            <InternalArticleLink
              article={article}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center font-medium transition-colors inline-block"
            >
              Read
            </InternalArticleLink>
          </div>
        </div>
      </div>
    </article>
  );
}
