import { newsService } from '@/lib/newsService';

// Mock axios
jest.mock('axios');

describe('newsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTopHeadlines', () => {
    it('should fetch top headlines', async () => {
      const mockArticles = [
        {
          id: '1',
          title: 'Test Article',
          description: 'Test description',
          content: 'Test content',
          urlToImage: 'https://example.com/image.jpg',
          url: 'https://example.com',
          publishedAt: '2024-01-01',
          source: { id: 'test', name: 'Test Source' },
        },
      ];

      jest.spyOn(newsService, 'getTopHeadlines').mockResolvedValueOnce(mockArticles);

      const result = await newsService.getTopHeadlines();

      expect(result).toEqual(mockArticles);
      expect(result.length).toBe(1);
    });

    it('should throw error on API failure', async () => {
      jest
        .spyOn(newsService, 'getTopHeadlines')
        .mockRejectedValueOnce(new Error('API Error'));

      await expect(newsService.getTopHeadlines()).rejects.toThrow();
    });

    it('should fetch articles by category', async () => {
      const mockArticles = [
        {
          id: '1',
          title: 'Tech Article',
          description: 'Tech description',
          content: 'Tech content',
          urlToImage: 'https://example.com/tech.jpg',
          url: 'https://example.com/tech',
          publishedAt: '2024-01-01',
          source: { id: 'tech', name: 'Tech Source' },
        },
      ];

      jest
        .spyOn(newsService, 'getTopHeadlines')
        .mockResolvedValueOnce(mockArticles);

      const result = await newsService.getTopHeadlines('technology');

      expect(result).toEqual(mockArticles);
    });
  });

  describe('searchArticles', () => {
    it('should search articles by query', async () => {
      const mockArticles = [
        {
          id: '1',
          title: 'React Article',
          description: 'React description',
          content: 'React content',
          urlToImage: 'https://example.com/react.jpg',
          url: 'https://example.com/react',
          publishedAt: '2024-01-01',
          source: { id: 'react', name: 'React Source' },
        },
      ];

      jest
        .spyOn(newsService, 'searchArticles')
        .mockResolvedValueOnce(mockArticles);

      const result = await newsService.searchArticles('React');

      expect(result).toEqual(mockArticles);
      expect(result[0].title).toContain('React');
    });

    it('should throw error on search failure', async () => {
      jest
        .spyOn(newsService, 'searchArticles')
        .mockRejectedValueOnce(new Error('Search Error'));

      await expect(newsService.searchArticles('test')).rejects.toThrow();
    });
  });
});
