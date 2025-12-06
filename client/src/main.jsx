import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration)

        // Check for updates every 30 seconds
        setInterval(() => {
          registration.update()
        }, 30000)

        // Also check for updates when page becomes visible
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            registration.update()
          }
        })
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error)
      })
  })
}
