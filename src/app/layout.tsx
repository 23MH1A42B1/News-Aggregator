import type { Metadata, Viewport } from 'next';
import PWAInitializer from '@/components/PWAInitializer';
import './globals.css';

export const metadata: Metadata = {
  title: 'PWA News Aggregator',
  description: 'Stay informed with our progressive web app news aggregator',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'News PWA',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <PWAInitializer />
        {children}
      </body>
    </html>
  );
}
