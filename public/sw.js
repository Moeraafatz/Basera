const CACHE_NAME = "baseera-v1";
const STATIC_CACHE = "baseera-static-v1";
const DYNAMIC_CACHE = "baseera-dynamic-v1";

const STATIC_ASSETS = [
  "/",
  "/text",
  "/cv",
  "/image",
  "/video",
  "/manifest.json",
  "/favicon.ico",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET") return;

  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2|ttf)$/)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Use network-first for HTML pages to avoid showing offline page on first load
  if (url.pathname.endsWith("/") || url.pathname.endsWith(".html")) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || caches.match("/offline.html");
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return caches.match("/offline.html");
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      caches.open(DYNAMIC_CACHE).then((cache) => {
        cache.put(request, response.clone());
      });
    }
    return response;
  }).catch(() => cached || caches.match("/offline.html"));

  return cached || fetchPromise;
}

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
