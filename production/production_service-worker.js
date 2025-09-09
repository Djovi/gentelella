const CACHE_NAME = 'posmachines-cache-v1';
const urlsToCache = [
    'posmachines.html',
    'manifest.json',
    'images/rechain.jpg',
    'images/pwa-192.png',
    'images/pwa-512.png',
    'images/fallback.jpg',
    // Add other resources (CSS, JS, images)
];

// Install SW and cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Activate SW and clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
});

// Fetch handler
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});