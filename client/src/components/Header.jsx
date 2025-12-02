import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faDownload } from '@fortawesome/free-solid-svg-icons'

const Header = ({ currentLang, onLanguageToggle, onLogout }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Hide install button if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false)
    } else {
      // TEMPORARY: Force show button for testing on all browsers
      // This helps debug on browsers that might not fire beforeinstallprompt
      setShowInstallButton(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback: Show instructions for manual installation
      alert('To install this app:\n\n1. Tap the menu button (⋮) in your browser\n2. Select "Add to Home screen"\n3. Tap "Add" to install')
      return
    }
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowInstallButton(false)
    }
    setDeferredPrompt(null)
  }

  const languageFlags = {
    mm: '🇲🇲',
    en: 'EN',
    zh: '🇨🇳',
  }

  const headerText = {
    mm: 'စတော့စစ်ဆေးမှုကိရိယာ',
    en: 'Stock Check Tool',
    zh: '库存检查工具',
  }

  return (
    <header className="bg-primary shadow-md px-4 py-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-headerFont text-xl font-bold">
        {headerText[currentLang]}
      </h1>
      <div className="flex items-center gap-3">
        <button
          onClick={onLanguageToggle}
          className="text-headerFont text-lg px-3 py-1 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
        >
          {languageFlags[currentLang]}
        </button>
        {showInstallButton && (
          <button
            onClick={handleInstallClick}
            className="text-headerFont text-lg hover:opacity-80 transition-opacity"
            title="Install App"
          >
            <FontAwesomeIcon icon={faDownload} />
          </button>
        )}
        <button
          onClick={onLogout}
          className="text-headerFont text-lg hover:opacity-80 transition-opacity"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </header>
  )
}

export default Header
