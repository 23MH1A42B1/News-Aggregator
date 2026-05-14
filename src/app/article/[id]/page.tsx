'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WebShareButton from '@/components/WebShareButton';
import { Article } from '@/types';
import { indexedDBService } from '@/lib/indexedDB';
import { registerBookmarkSync } from '@/lib/pwa';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const articleUrl = decodeURIComponent(params.id);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setIsLoading(true);
        const stored = sessionStorage.getItem('currentArticle');
        if (stored) {
          const data = JSON.parse(stored) as Article;
          setArticle(data);
          const bookmarked = await indexedDBService.isBookmarked(
            data.id || data.url
          );
          setIsBookmarked(bookmarked);
        }
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, []);

  const handleBookmark = async () => {
    if (!article) return;

    try {
      if (isBookmarked) {
        await indexedDBService.removeBookmark(article.id || article.url);
      } else {
        await indexedDBService.addBookmark(article);
      }

      if (!navigator.onLine) {
        await registerBookmarkSync();
      }

      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <p>Loading article...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-xl text-gray-600">Article not found.</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to home
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          Back to articles
        </Link>

        {article.urlToImage && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

        <div className="flex items-center gap-4 mb-6 text-gray-600">
          <span>{article.source.name}</span>
          <span>-</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          {article.author && (
            <>
              <span>-</span>
              <span>{article.author}</span>
            </>
          )}
        </div>

        <div className="flex gap-2 mb-8">
          <button
            data-testid="bookmark-button"
            onClick={handleBookmark}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isBookmarked
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            {isBookmarked ? 'Saved' : 'Bookmark'}
          </button>

          <WebShareButton
            title={article.title}
            text={article.description}
            url={articleUrl}
          />

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Read Full Article
          </a>
        </div>

        <article className="prose max-w-none">
          {article.description && (
            <p className="text-lg text-gray-700 mb-4">{article.description}</p>
          )}

          {article.content && (
            <div className="text-gray-700 leading-relaxed">
              {article.content}
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
