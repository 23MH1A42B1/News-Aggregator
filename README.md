# PWA News Aggregator

A production-ready Progressive Web App (PWA) for aggregating news from around the world. Built with Next.js, Workbox, and IndexedDB, this application provides a seamless offline-first experience with advanced caching strategies, push notifications, and background synchronization.

## 🚀 Features

- **Progressive Web App (PWA)**: Install on any device and use like a native app
- **Offline Support**: Full offline functionality with service workers and IndexedDB
- **Smart Caching**: Multiple caching strategies optimized for different content types
- **Bookmarks**: Save articles offline with IndexedDB persistence
- **Push Notifications**: Subscribe to push notifications for breaking news
- **Background Sync**: Automatic synchronization when network is restored
- **Lazy Loading**: Efficient image loading with intersection observer
- **Web Share API**: Native sharing capabilities on supported platforms
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **High Performance**: Optimized Lighthouse scores (90+)

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Docker and Docker Compose (optional, for containerized deployment)
- Modern web browser with PWA support

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd News\ Aggregator
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and add your API key:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_NEWS_API_BASE_URL=https://newsapi.org/v2
NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
```

**Getting API Keys:**

- **NewsAPI Key**: Sign up at [https://newsapi.org](https://newsapi.org) for a free developer account
- **VAPID Public Key**: Generate using `npm run generate-vapid-keys` (or use a demo key for testing)

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

### With Docker Compose

```bash
docker-compose up --build
```

The app will be available at `http://localhost:3000`

## 📦 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── category/
│   │   └── [slug]/         # Category pages
│   ├── article/
│   │   └── [id]/           # Article detail pages
│   └── bookmarks/          # Bookmarks page
├── components/
│   ├── Navigation.tsx      # Main navigation component
│   ├── ArticleCard.tsx     # Article card component
│   ├── ArticleGrid.tsx     # Article grid layout
│   ├── Footer.tsx          # Footer component
│   ├── PushNotificationToggle.tsx
│   └── WebShareButton.tsx
├── lib/
│   ├── newsService.ts      # News API integration
│   ├── indexedDB.ts        # IndexedDB operations
│   └── store.ts            # Zustand state management
├── hooks/
│   └── usePWA.ts           # PWA-related hooks
├── types/
│   └── index.ts            # TypeScript type definitions
└── api/
    └── (future routes)

public/
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker configuration
├── logo192.png             # PWA icon (192x192)
└── logo512.png             # PWA icon (512x512)

tests/
├── lib/
│   ├── newsService.test.ts # API service tests
│   └── indexedDB.test.ts   # IndexedDB tests
├── components/
│   ├── ArticleCard.test.tsx
│   └── ArticleGrid.test.tsx
```

## 🧪 Testing

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Test files cover:

- News API service functions
- ArticleCard and ArticleGrid components
- IndexedDB bookmark operations
- Zustand store mutations

## 🔍 Key Implementation Details

### Service Workers & Caching

The application uses Workbox with multiple caching strategies:

1. **Precache**: App shell (HTML, CSS, JS) cached on install
2. **CacheFirst**: Images cached for 30 days
3. **StaleWhileRevalidate**: API responses served from cache immediately, updated in background
4. **NetworkFirst**: External resources with 3-second network timeout

### IndexedDB & Bookmarks

- Articles are stored in IndexedDB when bookmarked
- Full offline access to saved articles
- Background Sync API triggers on reconnection
- Automatic cleanup and expiration handling

### PWA Installation

The app is installable on all major platforms:

- iOS: Add to Home Screen from Safari
- Android: Install prompt or "Add to Home Screen"
- Desktop (Chrome/Edge): Install button in address bar

### Offline Support

- Service worker intercepts network requests
- Cached resources served when offline
- User sees online/offline status indicator
- Graceful error handling and fallbacks

## 📊 Performance Optimization

### Lighthouse Targets

- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
- PWA: 90+

### Optimization Techniques

- Image lazy loading with intersection observer
- Code splitting with Next.js dynamic imports
- CSS minification via Tailwind
- JavaScript tree-shaking
- Service worker caching strategies
- CDN optimization for remote images
- Preconnect to external APIs

## 📲 PWA Features

### Installation

1. Visit the application in a supported browser
2. Look for the install prompt or app installation button
3. Click "Install" and follow the prompts
4. The app appears on your home screen

### Offline Usage

1. Open the app once while online to cache the shell
2. Go offline (use DevTools or turn off internet)
3. All cached pages and bookmarks remain accessible
4. New articles can be bookmarked while offline

### Push Notifications

1. Click the notification bell icon (🔔 Subscribe)
2. Grant permission when prompted
3. Receive notifications about new articles and events

### Background Sync

1. Actions like bookmarking while offline are queued
2. When connection is restored, queued actions sync automatically
3. User receives a notification when sync completes

## 🔧 Development

### Building for Production

```bash
npm run build
```

### Analyzing Bundle Size

```bash
npm run build
# Check .next/static for bundle analysis
```

### Code Quality

The project uses:

- **TypeScript**: Type safety
- **ESLint**: Code linting
- **Tailwind CSS**: Utility-first styling
- **Jest**: Unit testing
- **Testing Library**: Component testing

### Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_NEWS_API_BASE_URL=https://newsapi.org/v2
NEXT_PUBLIC_NEWS_API_KEY=demo
NEXT_PUBLIC_VAPID_PUBLIC_KEY=demo_key
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t news-aggregator-pwa .
```

### Run with Docker Compose

```bash
docker-compose up --build -d
```

### Verify Health

```bash
docker-compose ps
# Check the "news-aggregator-pwa" service status
```

### Access Application

Open `http://localhost:3000` in your browser

### Logs

```bash
docker-compose logs -f webapp
```

### Stop Service

```bash
docker-compose down
```

## 📋 Submission Checklist

- [x] README.md with complete documentation
- [x] docker-compose.yml for containerized deployment
- [x] Dockerfile for Next.js application
- [x] .env.example documenting required variables
- [x] public/manifest.json for PWA installability
- [x] Service worker with Workbox integration
- [x] IndexedDB for offline bookmark storage
- [x] Background Sync API implementation
- [x] Push Notifications subscription flow
- [x] Lazy loading for images
- [x] Web Share API integration
- [x] Comprehensive test suite
- [x] Lighthouse performance report (90+)
- [x] All source code and configuration files

## 📖 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [MDN Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [MDN IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [NewsAPI](https://newsapi.org)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

## 🤝 Contributing

This is a submission project. For feedback or issues, please use the submission review process.

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

For issues or questions:

1. Check the README and documentation
2. Review the test files for usage examples
3. Check browser DevTools for service worker logs
4. Verify environment variables are set correctly

---

**Built with ❤️ using Next.js, Workbox, and PWA technologies**
