const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  importScripts: ['/custom-sw.js'],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/newsapi\.org\/v2\/.*$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'news-api',
        expiration: {
          maxEntries: 80,
          maxAgeSeconds: 24 * 60 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: ({ request, url }) =>
        request.destination === 'image' ||
        /\.(?:png|jpg|jpeg|gif|webp|svg|ico)$/i.test(url.pathname),
      handler: 'CacheFirst',
      options: {
        cacheName: 'news-images',
        expiration: {
          maxEntries: 120,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.newsapi.org',
      },
      {
        protocol: 'https',
        hostname: '**.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.com',
      },
      {
        protocol: 'http',
        hostname: '**.com',
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
