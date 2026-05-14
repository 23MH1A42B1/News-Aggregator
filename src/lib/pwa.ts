const FALLBACK_VAPID_PUBLIC_KEY =
  'BBHyCrG0bldAuLkU21TmiRq9c6tZDTmt51zauiVzhFp4TMcrNn4c03DzycsVkx0Tmyff90Q1miE6TJi0fP2_7Mk';

export const SYNC_NEW_BOOKMARKS_TAG = 'sync-new-bookmarks';

export async function registerBookmarkSync() {
  if (
    typeof window === 'undefined' ||
    !('serviceWorker' in navigator) ||
    !('SyncManager' in window)
  ) {
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  await (registration as ServiceWorkerRegistration & {
    sync?: { register: (tag: string) => Promise<void> };
  }).sync?.register(SYNC_NEW_BOOKMARKS_TAG);
}

export function getVapidPublicKey() {
  const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  if (!key || key === 'your_vapid_public_key') {
    return FALLBACK_VAPID_PUBLIC_KEY;
  }

  return key;
}

export function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
