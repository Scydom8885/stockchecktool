// Service Worker for Stock Check Tool PWA
// Version-based cache name - increment manually on each deployment
const CACHE_VERSION = '5.1'  // UPDATE THIS ON EACH DEPLOYMENT!
const CACHE_NAME = `stock-check-v${CACHE_VERSION}`

// Install event - activate immediately
self.addEventListener('install', (event) => {
  console.log('Service Worker installing with cache:', CACHE_NAME)
  self.skipWaiting() // Activate immediately
})

// Activate event - aggressive cache clearing
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating with cache:', CACHE_NAME)
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      // Delete ALL old caches (aggressive clearing)
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log('All old caches cleared, taking control')
      return self.clients.claim() // Take control immediately
    })
  )
})

// Message event - handle SKIP_WAITING and CLEAR_CACHE from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    // Aggressive: Clear ALL caches immediately
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('Force clearing cache:', cacheName)
            return caches.delete(cacheName)
          })
        )
      })
    )
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
