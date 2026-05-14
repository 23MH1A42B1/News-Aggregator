import { indexedDBService, db } from '@/lib/indexedDB';
import { Article } from '@/types';

const mockArticle: Article = {
  id: 'test-1',
  title: 'Test Article',
  description: 'Test description',
  content: 'Test content',
  urlToImage: 'https://example.com/image.jpg',
  url: 'https://example.com',
  publishedAt: '2024-01-01',
  source: { id: 'test', name: 'Test Source' },
};

describe('indexedDBService', () => {
  beforeEach(async () => {
    // Clear database before each test
    await indexedDBService.clearAllBookmarks();
  });

  afterAll(async () => {
    // Clean up after all tests
    await db.delete();
  });

  describe('addBookmark', () => {
    it('should add a bookmark', async () => {
      const result = await indexedDBService.addBookmark(mockArticle);
      expect(result).toBeDefined();

      const bookmark = await indexedDBService.getBookmark(mockArticle.id);
      expect(bookmark).toBeDefined();
      expect(bookmark?.title).toBe('Test Article');
    });

    it('should add bookmarkedAt timestamp', async () => {
      await indexedDBService.addBookmark(mockArticle);
      const bookmark = await indexedDBService.getBookmark(mockArticle.id);

      expect(bookmark?.bookmarkedAt).toBeDefined();
      expect(typeof bookmark?.bookmarkedAt).toBe('number');
    });
  });

  describe('removeBookmark', () => {
    it('should remove a bookmark', async () => {
      await indexedDBService.addBookmark(mockArticle);
      let bookmark = await indexedDBService.getBookmark(mockArticle.id);
      expect(bookmark).toBeDefined();

      await indexedDBService.removeBookmark(mockArticle.id);
      bookmark = await indexedDBService.getBookmark(mockArticle.id);
      expect(bookmark).toBeUndefined();
    });
  });

  describe('getAllBookmarks', () => {
    it('should return empty array when no bookmarks', async () => {
      const bookmarks = await indexedDBService.getAllBookmarks();
      expect(bookmarks).toEqual([]);
    });

    it('should return all bookmarks', async () => {
      const article1 = { ...mockArticle, id: 'test-1', title: 'Article 1' };
      const article2 = { ...mockArticle, id: 'test-2', title: 'Article 2' };

      await indexedDBService.addBookmark(article1);
      await indexedDBService.addBookmark(article2);

      const bookmarks = await indexedDBService.getAllBookmarks();
      expect(bookmarks.length).toBe(2);
    });
  });

  describe('isBookmarked', () => {
    it('should return true for bookmarked article', async () => {
      await indexedDBService.addBookmark(mockArticle);
      const isBookmarked = await indexedDBService.isBookmarked(mockArticle.id);
      expect(isBookmarked).toBe(true);
    });

    it('should return false for non-bookmarked article', async () => {
      const isBookmarked = await indexedDBService.isBookmarked('non-existent');
      expect(isBookmarked).toBe(false);
    });
  });

  describe('clearAllBookmarks', () => {
    it('should clear all bookmarks', async () => {
      await indexedDBService.addBookmark(mockArticle);
      let bookmarks = await indexedDBService.getAllBookmarks();
      expect(bookmarks.length).toBe(1);

      await indexedDBService.clearAllBookmarks();
      bookmarks = await indexedDBService.getAllBookmarks();
      expect(bookmarks).toEqual([]);
    });
  });
});
