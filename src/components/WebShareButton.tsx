'use client';

import { useState } from 'react';

interface WebShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export default function WebShareButton({ title, text, url }: WebShareButtonProps) {
  const [isSupported] = useState(
    typeof window !== 'undefined' && !!navigator.share
  );

  const handleShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title,
        text,
        url,
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  };

  if (!isSupported) return null;

  return (
    <button
      data-testid="web-share-button"
      onClick={handleShare}
      className="rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
    >
      Share
    </button>
  );
}
