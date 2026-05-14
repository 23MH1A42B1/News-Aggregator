'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Article } from '@/types';

interface ArticleLink {
  article: Article;
  children: React.ReactNode;
  className?: string;
}

export default function ArticleLink({
  article,
  children,
  className = '',
}: ArticleLink) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Store article in session storage for retrieval on detail page
    sessionStorage.setItem('currentArticle', JSON.stringify({
      ...article,
      id: article.url, // Use URL as ID since API doesn't provide consistent IDs
    }));

    // Navigate to article detail page
    router.push(`/article/${encodeURIComponent(article.url)}`);
  };

  return (
    <a href="#" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
