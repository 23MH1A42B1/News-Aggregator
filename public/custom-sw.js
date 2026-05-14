self.addEventListener('sync', (event) => {
  if (event.tag !== 'sync-new-bookmarks') {
    return;
  }

  event.waitUntil(
    self.registration.showNotification('Bookmarks synced', {
      body: 'Your offline bookmark changes are ready.',
      icon: '/logo192.png',
      badge: '/logo192.png',
      tag: 'sync-new-bookmarks',
    })
  );
});

self.addEventListener('push', (event) => {
  const fallback = {
    title: 'PWA News Aggregator',
    body: 'Fresh headlines are ready to read.',
  };

  const payload = event.data ? event.data.json() : fallback;
  event.waitUntil(
    self.registration.showNotification(payload.title || fallback.title, {
      body: payload.body || fallback.body,
      icon: '/logo192.png',
      badge: '/logo192.png',
    })
  );
});
