import axios from 'axios';
import { Article, NewsResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_NEWS_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const fallbackArticles: Article[] = [
  {
    id: 'sample-technology',
    title: 'Offline-ready PWAs make news reading resilient',
    description:
      'A sample technology story is available when no API key is configured.',
    content:
      'This sample article keeps the PWA usable during local review, offline testing, and first-run setup before a NewsAPI key is added.',
    urlToImage: 'https://images.unsplash.com/photo-1495020689067-958852a7765e',
    url: 'https://example.com/offline-ready-pwas',
    publishedAt: new Date().toISOString(),
    author: 'News PWA Desk',
    source: { id: 'sample', name: 'News PWA' },
  },
  {
    id: 'sample-business',
    title: 'Caching strategies improve reader experience',
    description:
      'Stale-while-revalidate helps people see headlines quickly while updates happen in the background.',
    content:
      'Workbox runtime caching gives the application a fast path for cached articles and a freshness path for live API responses.',
    urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
    url: 'https://example.com/caching-strategies',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    author: 'News PWA Desk',
    source: { id: 'sample', name: 'News PWA' },
  },
];

function normalizeArticles(articles: Article[]) {
  return articles.map((article) => ({
    ...article,
    id: article.id || article.url,
    description: article.description || article.title,
    content: article.content || article.description || article.title,
    urlToImage: article.urlToImage || '',
  }));
}

export const newsService = {
  async getTopHeadlines(
    category?: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<Article[]> {
    try {
      if (!API_KEY || API_KEY === 'your_api_key_here') {
        return fallbackArticles;
      }

      const params: any = {
        apiKey: API_KEY,
        page,
        pageSize,
        sortBy: 'publishedAt',
      };

      if (category && category !== 'all') {
        params.category = category;
        params.country = 'us';
        const response = await apiClient.get<NewsResponse>(
          '/top-headlines',
          { params }
        );
        return normalizeArticles(response.data.articles);
      } else {
        params.country = 'us';
        const response = await apiClient.get<NewsResponse>(
          '/top-headlines',
          { params }
        );
        return normalizeArticles(response.data.articles);
      }
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw new Error('Failed to fetch top headlines');
    }
  },

  async searchArticles(
    query: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<Article[]> {
    try {
      if (!API_KEY || API_KEY === 'your_api_key_here') {
        return fallbackArticles.filter((article) =>
          article.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      const response = await apiClient.get<NewsResponse>('/everything', {
        params: {
          q: query,
          apiKey: API_KEY,
          page,
          pageSize,
          sortBy: 'publishedAt',
        },
      });
      return normalizeArticles(response.data.articles);
    } catch (error) {
      console.error('Error searching articles:', error);
      throw new Error('Failed to search articles');
    }
  },

  async getArticlesByCategory(
    category: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<Article[]> {
    return this.getTopHeadlines(category, page, pageSize);
  },
};
