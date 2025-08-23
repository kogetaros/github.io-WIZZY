// /sw.js
const CACHE = 'wizzy-v1';
const ASSETS = [
  '/', '/index.html',
  '/styles.css', '/script.js',
  '/icon/icon-192.png', '/icon/icon-512.png',
  '/site.webmanifest'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
