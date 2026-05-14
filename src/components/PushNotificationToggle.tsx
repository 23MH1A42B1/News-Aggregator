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
      className={`w-full rounded-md px-4 py-2.5 text-sm font-bold shadow-sm transition sm:w-auto ${
        isPushSubscribed
          ? 'border border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isLoading ? 'Working...' : isPushSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </button>
  );
}
