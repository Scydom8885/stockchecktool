import { useAppContext } from './context/AppContext'
import Header from './components/Header'
import Tabs from './components/Tabs'
import ItemGrid from './components/ItemGrid'
import QuantitySection from './components/QuantitySection'
import SelectedItems from './components/SelectedItems'
import LoginForm from './components/LoginForm'
import UpdateNotification from './components/UpdateNotification'
import { items } from './data/items'
import { sendQuantityWhatsApp } from './utils/whatsapp'
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
    refreshSync,
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

  // Handle quantity submission
  const handleQuantitySubmit = async (braisedPork, kongBak, period) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

      // Save to backend
      const response = await fetch(`${API_URL}/quantities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          braised_pork: braisedPork,
          kong_bak: kongBak,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Send to WhatsApp (brother's number only, in Chinese)
        sendQuantityWhatsApp(user.username, braisedPork, kongBak, period, '012-8533050')
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Quantity submit error:', error)
      return { success: false, error: 'Failed to submit quantity' }
    }
  }

  // If not logged in, show login form
  if (!user) {
    return <LoginForm onLogin={login} />
  }

  // Main app
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <UpdateNotification />
      <Header
        currentLang={currentLang}
        onLanguageToggle={toggleLanguage}
        onLogout={logout}
        onRefresh={refreshSync}
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

        <QuantitySection
          currentLang={currentLang}
          userId={user.id}
          onQuantitySubmit={handleQuantitySubmit}
        />
      </div>
    </div>
  )
}

export default App
