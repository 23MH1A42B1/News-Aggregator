# Tests Directory

This directory contains the test suite for the PWA News Aggregator application.

## Test Structure

- **lib/**: Tests for core library functions
  - `newsService.test.ts`: Tests for the NewsAPI integration service
  - `indexedDB.test.ts`: Tests for IndexedDB operations and bookmarking

- **components/**: Tests for React components
  - `ArticleCard.test.tsx`: Tests for the ArticleCard component
  - `ArticleGrid.test.tsx`: Tests for the ArticleGrid component

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- newsService.test.ts

# Run tests with coverage
npm test -- --coverage
```

## Testing Libraries

- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Jest matchers for DOM elements

## Test Coverage

The test suite covers:
- ✅ News API service functions (getTopHeadlines, searchArticles)
- ✅ ArticleCard component rendering and interactions
- ✅ ArticleGrid component rendering
- ✅ IndexedDB bookmark operations (add, remove, query)
- ✅ Offline functionality

## Adding New Tests

When adding new features:
1. Create a `.test.ts` or `.test.tsx` file in the appropriate directory
2. Follow the existing test patterns
3. Run `npm test` to verify all tests pass
4. Ensure coverage remains high

## Mocking

The test suite includes:
- Mocks for the axios HTTP client
- Mocks for IndexedDB operations
- Mocks for component dependencies
