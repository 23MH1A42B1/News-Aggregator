'use client';

import { useEffect } from 'react';
import { useBackgroundSync, useOnlineStatus } from '@/hooks/usePWA';

export default function PWAInitializer() {
  useOnlineStatus();
  useBackgroundSync();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker registered:', registration);
      }).catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
    }

    // Handle app installation
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      const deferredPrompt = e as BeforeInstallPromptEvent;
      if (deferredPrompt) {
        console.log('Install prompt available');
      }
    });

    // Handle app installed
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
    });
  }, []);

  return null;
}

declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => void;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  }

  interface Window {
    deferredPrompt?: BeforeInstallPromptEvent;
  }
}
