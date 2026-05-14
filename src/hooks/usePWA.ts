import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import {
  getVapidPublicKey,
  registerBookmarkSync,
  urlBase64ToUint8Array,
} from '@/lib/pwa';

export const useOnlineStatus = () => {
  const { isOnline, setIsOnline } = useAppStore();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setIsOnline]);

  return isOnline;
};

export const useBackgroundSync = () => {
  useEffect(() => {
    const registerSync = async () => {
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        try {
          await registerBookmarkSync();
        } catch (error) {
          console.error('Failed to register sync:', error);
        }
      }
    };

    registerSync();
  }, []);
};

export const usePushNotifications = () => {
  const { isPushSubscribed, setIsPushSubscribed } = useAppStore();

  useEffect(() => {
    const checkSubscription = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.getSubscription();
          setIsPushSubscribed(!!subscription);
        } catch (error) {
          console.error('Failed to check push subscription:', error);
        }
      }
    };

    checkSubscription();
  }, [setIsPushSubscribed]);

  const subscribe = async (): Promise<PushSubscription | undefined> => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(getVapidPublicKey()),
          });
          setIsPushSubscribed(true);
          return subscription;
        }
      } catch (error) {
        console.error('Failed to subscribe to push notifications:', error);
      }
    }
    return undefined;
  };

  const unsubscribe = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          await subscription.unsubscribe();
          setIsPushSubscribed(false);
        }
      } catch (error) {
        console.error('Failed to unsubscribe from push notifications:', error);
      }
    }
  };

  return { isPushSubscribed, subscribe, unsubscribe };
};
