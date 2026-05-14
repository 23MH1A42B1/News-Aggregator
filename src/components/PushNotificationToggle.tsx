'use client';

import { useState } from 'react';
import { usePushNotifications } from '@/hooks/usePWA';

export default function PushNotificationToggle() {
  const { isPushSubscribed, subscribe, unsubscribe } = usePushNotifications();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      if (isPushSubscribed) {
        await unsubscribe();
      } else {
        await subscribe();
      }
    } catch (error) {
      console.error('Error toggling push notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (typeof window === 'undefined') return null;

  return (
    <button
      data-testid="subscribe-push-button"
      onClick={handleToggle}
      disabled={isLoading}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isPushSubscribed
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-green-500 text-white hover:bg-green-600'
      }`}
    >
      {isLoading ? '...' : isPushSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </button>
  );
}
