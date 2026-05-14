'use client';

import Link from 'next/link';
import React from 'react';
import { Article } from '@/types';

interface InternalArticleLinkProps {
  article: Article;
  children: React.ReactNode;
  className?: string;
}

export default function InternalArticleLink({
  article,
  children,
  className = '',
}: InternalArticleLinkProps) {
  const handleClick = () => {
    // Store article in session storage for retrieval on detail page
    sessionStorage.setItem(
      'currentArticle',
      JSON.stringify({
        ...article,
        id: article.url,
      })
    );
  };

  return (
    <Link
      href={`/article/${encodeURIComponent(article.url)}`}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
