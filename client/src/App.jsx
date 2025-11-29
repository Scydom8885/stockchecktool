import { useAppContext } from './context/AppContext'
import Header from './components/Header'
import Tabs from './components/Tabs'
import ItemGrid from './components/ItemGrid'
import SelectedItems from './components/SelectedItems'
import LoginForm from './components/LoginForm'
import { items } from './data/items'
import './App.css'

function App() {
  const {
    user,
    currentLang,
    activeTab,
    selectedItems,
    submittedItems,
    notes,
    login,
    logout,
    toggleLanguage,
    setActiveTab,
    addSelectedItem,
    removeSelectedItem,
    setNotes,
    submit,
  } = useAppContext()

  // Get available items (items not yet selected)
  const availableItems = items[activeTab]?.filter(
    item => !selectedItems.find(selected => selected.id === item.id)
  ) || []

  // Handle item click (add to selected)
  const handleItemClick = (item) => {
    addSelectedItem(item)
  }

  // Handle delete item (remove from selected)
  const handleDeleteItem = (item) => {
    removeSelectedItem(item)
  }

  // If not logged in, show login form
  if (!user) {
    return <LoginForm onLogin={login} />
  }

  // Main app
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        currentLang={currentLang}
        onLanguageToggle={toggleLanguage}
        onLogout={logout}
      />

      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentLang={currentLang}
      />

      <div className="flex-1 p-4">
        <ItemGrid
          items={availableItems}
          activeTab={activeTab}
          currentLang={currentLang}
          onItemClick={handleItemClick}
        />

        <SelectedItems
          selectedItems={selectedItems}
          submittedItems={submittedItems}
          currentLang={currentLang}
          notes={notes}
          onNotesChange={setNotes}
          onDeleteItem={handleDeleteItem}
          onSubmit={submit}
        />
      </div>
    </div>
  )
}

export default App
