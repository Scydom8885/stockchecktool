// Service Worker for Stock Check Tool PWA
const CACHE_NAME = 'stock-check-v3'

// Install event - activate immediately
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  self.skipWaiting() // Activate immediately
})

// Activate event - take control immediately
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      return self.clients.claim() // Take control immediately
    })
  )
})

// Message event - handle SKIP_WAITING from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Fetch event - Network First strategy with cache fallback
self.addEventListener('fetch', (event) => {
  // Don't cache API calls - only cache app assets
  if (event.request.url.includes('/api/')) {
    return event.respondWith(fetch(event.request))
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response before caching
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
      })
  )
})
