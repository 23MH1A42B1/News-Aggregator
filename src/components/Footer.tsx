export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-2">News PWA</h3>
            <p className="text-gray-300">
              A progressive web app for aggregating and reading news articles.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-2">Features</h4>
            <ul className="text-gray-300 space-y-1">
              <li>Works offline</li>
              <li>Bookmark articles</li>
              <li>Push notifications</li>
              <li>Lightning fast</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-2">Data Source</h4>
            <p className="text-gray-300">
              News data provided by{' '}
              <a
                href="https://newsapi.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                NewsAPI
              </a>
            </p>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        <div className="text-center text-gray-400">
          <p>&copy; 2026 PWA News Aggregator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
