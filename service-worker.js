const CACHE_NAME = "pwa-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/src/style.css",
  "/src/main.js",
  "/src/assets/images/1.png",
  "/src/assets/images/ar_hand_prompt-human-hand.png",
  "/src/assets/images/ar_hand_prompt.png",
  "/src/assets/images/ar_icon.png",
  "/src/assets/images/poster.webp",
  "/src/assets/models/upperbody_skeleton_heart_lungs.glb",
  "/src/assets/poster/heart.webp",
  "/localhost-cert.pem",
  "/localhost-key.pem"
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
