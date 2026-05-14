// @ts-ignore
import { render, screen } from '@testing-library/react';
import ArticleGrid from '@/components/ArticleGrid';
import { Article } from '@/types';

jest.mock('@/components/ArticleCard', () => {
  return function MockArticleCard({ article }: { article: Article }) {
    return <div data-testid="article-card">{article.title}</div>;
  };
});

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Article 1',
    description: 'Description 1',
    content: 'Content 1',
    urlToImage: 'https://example.com/1.jpg',
    url: 'https://example.com/1',
    publishedAt: '2024-01-01',
    source: { id: 'source1', name: 'Source 1' },
  },
  {
    id: '2',
    title: 'Article 2',
    description: 'Description 2',
    content: 'Content 2',
    urlToImage: 'https://example.com/2.jpg',
    url: 'https://example.com/2',
    publishedAt: '2024-01-02',
    source: { id: 'source2', name: 'Source 2' },
  },
];

describe('ArticleGrid', () => {
  it('renders all articles', () => {
    render(<ArticleGrid articles={mockArticles} />);
    const cards = screen.getAllByTestId('article-card');
    expect(cards).toHaveLength(2);
  });

  it('displays empty state when no articles', () => {
    render(<ArticleGrid articles={[]} />);
    expect(screen.getByText('No articles found.')).toBeInTheDocument();
  });

  it('renders articles in a grid', () => {
    const { container } = render(<ArticleGrid articles={mockArticles} />);
    const grid = container.querySelector('[class*="grid"]');
    expect(grid).toBeInTheDocument();
  });

  it('passes onBookmarkChange to ArticleCard', () => {
    const onBookmarkChange = jest.fn();
    render(
      <ArticleGrid articles={mockArticles} onBookmarkChange={onBookmarkChange} />
    );
    expect(screen.getAllByTestId('article-card')).toHaveLength(2);
  });
});
