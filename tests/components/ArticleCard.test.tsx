import { render, screen, fireEvent } from '@testing-library/react';
import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/types';

// Mock the indexedDB service
jest.mock('@/lib/indexedDB', () => ({
  indexedDBService: {
    isBookmarked: jest.fn().mockResolvedValue(false),
    addBookmark: jest.fn().mockResolvedValue('1'),
    removeBookmark: jest.fn().mockResolvedValue(void 0),
  },
}));

const mockArticle: Article = {
  id: 'test-1',
  title: 'Test Article Title',
  description: 'This is a test article description',
  content: 'This is the full content of the test article',
  urlToImage: 'https://example.com/image.jpg',
  url: 'https://example.com/article',
  publishedAt: '2024-01-01T00:00:00Z',
  author: 'Test Author',
  source: {
    id: 'test-source',
    name: 'Test News',
  },
};

describe('ArticleCard', () => {
  it('renders article title', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
  });

  it('renders article description', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(
      screen.getByText('This is a test article description')
    ).toBeInTheDocument();
  });

  it('renders bookmark button', () => {
    render(<ArticleCard article={mockArticle} />);
    const bookmarkButton = screen.getByTestId('bookmark-button');
    expect(bookmarkButton).toBeInTheDocument();
  });

  it('renders read button with correct link', () => {
    render(<ArticleCard article={mockArticle} />);
    const readButton = screen.getByText('Read');
    expect(readButton).toBeInTheDocument();
    expect(readButton.closest('a')).toHaveAttribute(
      'href',
      expect.stringContaining('article')
    );
  });

  it('displays article source name', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('Test News')).toBeInTheDocument();
  });

  it('formats and displays publish date', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText(/1\/1\/2024/)).toBeInTheDocument();
  });

  it('calls onBookmarkChange when bookmark button clicked', async () => {
    const onBookmarkChange = jest.fn();
    render(
      <ArticleCard article={mockArticle} onBookmarkChange={onBookmarkChange} />
    );

    const bookmarkButton = screen.getByTestId('bookmark-button');
    fireEvent.click(bookmarkButton);

    // Wait for the state update
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(onBookmarkChange).toHaveBeenCalled();
  });
});
