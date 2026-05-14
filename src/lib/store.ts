import { create } from 'zustand';
import { Article } from '@/types';

interface AppState {
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  isPushSubscribed: boolean;
  setIsPushSubscribed: (subscribed: boolean) => void;
  bookmarks: Article[];
  setBookmarks: (bookmarks: Article[]) => void;
  addBookmark: (article: Article) => void;
  removeBookmark: (articleId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOnline: typeof window !== 'undefined' ? navigator.onLine : true,
  setIsOnline: (online: boolean) => set({ isOnline: online }),
  isPushSubscribed: false,
  setIsPushSubscribed: (subscribed: boolean) =>
    set({ isPushSubscribed: subscribed }),
  bookmarks: [],
  setBookmarks: (bookmarks: Article[]) => set({ bookmarks }),
  addBookmark: (article: Article) =>
    set((state) => ({
      bookmarks: [article, ...state.bookmarks.filter((a) => a.id !== article.id)],
    })),
  removeBookmark: (articleId: string) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((a) => a.id !== articleId),
    })),
}));
