export const CACHE_VERSION = 'v1';

export const CACHE_NAMES = {
  PRECACHE: `workbox-precache-${CACHE_VERSION}`,
  IMAGES: `images-${CACHE_VERSION}`,
  API: `api-cache-${CACHE_VERSION}`,
  EXTERNAL: `external-api-${CACHE_VERSION}`,
};

export const SYNC_TAGS = {
  BOOKMARKS: 'sync-new-bookmarks',
};

export const NOTIFICATION_TAGS = {
  SYNC: 'sync-notification',
};

export const CATEGORIES = [
  { name: 'All', slug: 'all' },
  { name: 'Business', slug: 'business' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Health', slug: 'health' },
  { name: 'Science', slug: 'science' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Technology', slug: 'technology' },
];

export const DEFAULT_PAGE_SIZE = 20;
