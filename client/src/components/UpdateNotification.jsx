import { useState, useEffect } from 'react'

const UpdateNotification = () => {
  const [showUpdate, setShowUpdate] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState(null)

  useEffect(() => {
    // Check if service worker is supported
    if (!('serviceWorker' in navigator)) return

    // Listen for service worker updates
    navigator.serviceWorker.ready.then(registration => {
      // Check if there's an update waiting
      if (registration.waiting) {
        setWaitingWorker(registration.waiting)
        setShowUpdate(true)
      }

      // Listen for new service worker installing
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker is ready
            setWaitingWorker(newWorker)
            setShowUpdate(true)
          }
        })
      })
    })

    // Listen for controller change (new SW activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })
  }, [])

  const handleUpdate = () => {
    if (waitingWorker) {
      // Tell waiting service worker to skip waiting
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
    }
  }

  if (!showUpdate) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black px-4 py-3 shadow-lg z-50 flex items-center justify-between">
      <div className="flex-1">
        <p className="font-semibold">New version available!</p>
        <p className="text-sm">Click update to get the latest features</p>
      </div>
      <button
        onClick={handleUpdate}
        className="bg-black text-yellow-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors ml-4"
      >
        Update Now
      </button>
    </div>
  )
}

export default UpdateNotification
