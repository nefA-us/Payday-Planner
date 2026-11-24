// Network first, so a new version of the app shows up as soon as the device is online.
// If the network is unavailable, the last copy saved on the device is used.
const CACHE = 'payday-planner-v6';
const FILES = ['./', 'index.html', 'app.html', 'auth.html', 'privacy.html', 'terms.html', 'sb-config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'shot-dashboard.png', 'shot-calendar.png'];
const LIB = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@';

self.addEventListener('install', e => {
  // One missing file must not stop the update, so each file is added on its own.
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => c.add(new Request(f, { cache: 'reload' })).catch(() => {})))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const sameSite = u.origin === location.origin;
  const isLib = r.url.startsWith(LIB);
  if (!sameSite && !isLib) return; // everything else (the database, fonts) goes straight to the network
  e.respondWith(
    fetch(r, sameSite ? { cache: 'no-cache' } : undefined)
      .then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(r, copy));
        }
        return res;
      })
      .catch(() => caches.match(r).then(m => m || (sameSite ? caches.match('index.html') : Response.error())))
  );
});
