import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Header = ({ currentLang, onLanguageToggle, onLogout }) => {
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
