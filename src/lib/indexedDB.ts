import Dexie, { Table } from 'dexie';
import { Article } from '@/types';

export interface BookmarkedArticle extends Article {
  bookmarkedAt: number;
}

export class NewsDB extends Dexie {
  bookmarks!: Table<BookmarkedArticle>;

  constructor() {
    super('NewsAggregatorDB');
    this.version(1).stores({
      bookmarks: 'id, bookmarkedAt',
    });
  }
}

class MemoryTable {
  private records = new Map<string, BookmarkedArticle>();

  async put(article: BookmarkedArticle) {
    this.records.set(article.id, article);
  }

  async delete(articleId: string) {
    this.records.delete(articleId);
  }

  async toArray() {
    return Array.from(this.records.values());
  }

  async get(articleId: string) {
    return this.records.get(articleId);
  }

  async clear() {
    this.records.clear();
  }
}

class MemoryDB {
  bookmarks = new MemoryTable();

  async delete() {
    await this.bookmarks.clear();
  }
}

export const db =
  typeof indexedDB === 'undefined'
    ? (new MemoryDB() as unknown as NewsDB)
    : new NewsDB();

export const indexedDBService = {
  async addBookmark(article: Article): Promise<string> {
    try {
      const articleId = article.id || article.url || String(Date.now());
      const bookmarkedArticle: BookmarkedArticle = {
        ...article,
        id: articleId,
        bookmarkedAt: Date.now(),
      };
      await db.bookmarks.put(bookmarkedArticle);
      return articleId;
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw new Error('Failed to add bookmark');
    }
  },

  async removeBookmark(articleId: string): Promise<void> {
    try {
      await db.bookmarks.delete(articleId);
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw new Error('Failed to remove bookmark');
    }
  },

  async getAllBookmarks(): Promise<BookmarkedArticle[]> {
    try {
      return await db.bookmarks.toArray();
    } catch (error) {
      console.error('Error getting bookmarks:', error);
      throw new Error('Failed to get bookmarks');
    }
  },

  async getBookmark(articleId: string): Promise<BookmarkedArticle | undefined> {
    try {
      return await db.bookmarks.get(articleId);
    } catch (error) {
      console.error('Error getting bookmark:', error);
      return undefined;
    }
  },

  async isBookmarked(articleId: string): Promise<boolean> {
    try {
      const bookmark = await this.getBookmark(articleId);
      return !!bookmark;
    } catch (error) {
      console.error('Error checking bookmark:', error);
      return false;
    }
  },

  async clearAllBookmarks(): Promise<void> {
    try {
      await db.bookmarks.clear();
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
      throw new Error('Failed to clear bookmarks');
    }
  },
};
