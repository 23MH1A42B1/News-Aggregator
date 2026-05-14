'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyArticleImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LazyArticleImage({
  src,
  alt,
  className = '',
}: LazyArticleImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '160px' }
    );

    observer.observe(image);

    return () => observer.disconnect();
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imageRef}
      src={isVisible ? src : undefined}
      data-src={src}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
}
