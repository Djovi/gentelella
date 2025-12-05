const CACHE_NAME = 'rechain-cache-v1';
const PRECACHE_URLS = [
  './index.html',
  './offline.html',
  './manifest.json',
  './ai.css',
  './ai.js',
  // Add important assets you want pre-cached (images, css, fonts)
  './images/rglobal.jpg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Helper strategies
async function networkFirst(req) {
  try {
    const fresh = await fetch(req);
    const cache = await caches.open(CACHE_NAME);
    cache.put(req, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = await caches.match(req);
    return cached || caches.match('./offline.html');
  }
}

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    const cache = await caches.open(CACHE_NAME);
    cache.put(req, res.clone());
    return res;
  } catch (err) {
    return caches.match('./offline.html');
  }
}

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests
  if (req.method !== 'GET') return;

  // Navigation requests => network first (with offline fallback)
  if (req.mode === 'navigate') {
    event.respondWith(networkFirst(req));
    return;
  }

  // Same-origin requests => cache-first (static assets)
  if (url.origin === location.origin) {
    // Use cache-first for images / CSS / JS
    if (req.destination === 'style' || req.destination === 'script' || req.destination === 'image' || req.destination === 'font') {
      event.respondWith(cacheFirst(req));
      return;
    }
    // Otherwise network-first
    event.respondWith(networkFirst(req));
    return;
  }

  // For cross-origin requests (CDN) try network then fallback to cache/offline
  event.respondWith(
    fetch(req).catch(() => caches.match(req).then(cached => cached || caches.match('./offline.html')))
  );
});
