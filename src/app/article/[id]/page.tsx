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
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="muted-panel">
            <p className="text-xl font-black text-slate-800">Loading article...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navigation />
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="muted-panel">
          <p className="text-xl font-black text-slate-800">Article not found</p>
          <Link href="/" className="mt-4 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">
            Back to home
          </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-5 inline-flex rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          Back to articles
        </Link>

        {article.urlToImage && (
          <div className="relative mb-8 h-72 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-200 shadow-sm sm:h-96">
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          {article.title}
        </h1>

        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
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

        <div className="mb-8 flex flex-col gap-2 sm:flex-row">
          <button
            data-testid="bookmark-button"
            onClick={handleBookmark}
            className={`rounded-md px-4 py-2.5 text-sm font-bold shadow-sm transition ${
              isBookmarked
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
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
            className="rounded-md bg-blue-600 px-4 py-2.5 text-center text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Read Full Article
          </a>
        </div>

        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          {article.description && (
            <p className="mb-5 text-lg font-semibold leading-8 text-slate-700">
              {article.description}
            </p>
          )}

          {article.content && (
            <div className="leading-8 text-slate-600">
              {article.content}
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
