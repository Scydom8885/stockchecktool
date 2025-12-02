import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, saveSubmission as apiSaveSubmission, getTodaySubmissions } from '../utils/api'
import { openWhatsApp } from '../utils/whatsapp'
import { getCurrentDateMalaysia, isNewDay } from '../utils/dateUtils'
import { saveSubmissionState, loadSubmissionState, getLastSubmitDate, clearSubmissionState } from '../utils/storage'

const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState(null)

  // Language state
  const [currentLang, setCurrentLang] = useState('mm')

  // Active tab state
  const [activeTab, setActiveTab] = useState('main')

  // Selected items state (all items selected today)
  const [selectedItems, setSelectedItems] = useState([])

  // Submitted items state (items already sent to WhatsApp)
  const [submittedItems, setSubmittedItems] = useState([])

  // Notes state
  const [notes, setNotes] = useState('')

  // Load saved state when user logs in
  useEffect(() => {
    if (user) {
      checkAndLoadState()
    }
  }, [user])

  // Save state whenever it changes
  useEffect(() => {
    if (user && (selectedItems.length > 0 || submittedItems.length > 0 || notes)) {
      const currentDate = getCurrentDateMalaysia()
      saveSubmissionState({
        selectedItems,
        submittedItems,
        notes,
        submitDate: currentDate
      })
    }
  }, [selectedItems, submittedItems, notes, user])

  // Check for new day and load/reset state
  const checkAndLoadState = async () => {
    const lastSubmitDate = getLastSubmitDate()

    // Check if it's a new day
    if (isNewDay(lastSubmitDate)) {
      // New day - reset everything
      clearSubmissionState()
      setSelectedItems([])
      setSubmittedItems([])
      setNotes('')
    } else {
      // Same day - load saved state
      const savedState = loadSubmissionState()
      if (savedState) {
        setSelectedItems(savedState.selectedItems || [])
        setSubmittedItems(savedState.submittedItems || [])
        setNotes(savedState.notes || '')
      }
    }

    // Load team submissions from backend to sync across devices
    try {
      const teamSubmissions = await getTodaySubmissions()

      // Extract all items from team submissions
      const teamItems = []
      teamSubmissions.forEach(submission => {
        submission.items.forEach(item => {
          // Only add if not already in teamItems
          if (!teamItems.find(i => i.id === item.id)) {
            teamItems.push(item)
          }
        })
      })

      // Merge with local submittedItems
      setSubmittedItems(prevSubmitted => {
        const merged = [...prevSubmitted]
        teamItems.forEach(item => {
          if (!merged.find(i => i.id === item.id)) {
            merged.push(item)
          }
        })
        return merged
      })

      // Also add team items to selectedItems so they appear in the list
      setSelectedItems(prevSelected => {
        const merged = [...prevSelected]
        teamItems.forEach(item => {
          if (!merged.find(i => i.id === item.id)) {
            merged.push(item)
          }
        })
        return merged
      })
    } catch (error) {
      console.error('Error loading team submissions:', error)
      // Continue with local state even if backend fails
    }
  }

  // Login function
  const login = async (username, password) => {
    try {
      // Call backend API for authentication
      const userData = await apiLogin(username, password)

      if (userData) {
        setUser(userData)
        setCurrentLang(userData.language) // Auto-set language based on user
        return { success: true }
      }

      return { success: false, error: 'Login failed' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Invalid username or password' }
    }
  }

  // Logout function
  const logout = () => {
    // Don't clear localStorage - only clear session state
    // localStorage should only be cleared at midnight (new day)
    setUser(null)
    setCurrentLang('mm')
    setActiveTab('main')
    setSelectedItems([])
    setSubmittedItems([])
    setNotes('')
  }

  // Language toggle function
  const toggleLanguage = () => {
    const langs = ['mm', 'en', 'zh']
    const currentIndex = langs.indexOf(currentLang)
    setCurrentLang(langs[(currentIndex + 1) % langs.length])
  }

  // Add item to selected
  const addSelectedItem = (item) => {
    if (!selectedItems.find(i => i.id === item.id)) {
      setSelectedItems([...selectedItems, item])
    }
  }

  // Remove item from selected (only if not submitted yet)
  const removeSelectedItem = (item) => {
    // Check if item has been submitted
    const isSubmitted = submittedItems.find(i => i.id === item.id)

    if (!isSubmitted) {
      // Item not submitted yet, allow deletion
      setSelectedItems(selectedItems.filter(i => i.id !== item.id))
    }
    // If item is submitted, ignore the delete request
  }

  // Submit function
  const submit = async () => {
    // Get only NEW items (items not yet submitted)
    const newItems = selectedItems.filter(
      item => !submittedItems.find(submitted => submitted.id === item.id)
    )

    if (newItems.length === 0) {
      return // Nothing new to submit
    }

    try {
      // Send only NEW items to WhatsApp
      openWhatsApp(user.username, newItems, notes)

      // Save to backend API
      await apiSaveSubmission(user.id, newItems, notes)

      // Add new items to submitted list
      setSubmittedItems([...submittedItems, ...newItems])

      // Save state to localStorage as backup
      const currentDate = getCurrentDateMalaysia()
      saveSubmissionState({
        selectedItems,
        submittedItems: [...submittedItems, ...newItems],
        notes,
        submitDate: currentDate
      })
    } catch (error) {
      console.error('Submit error:', error)
      // Even if backend fails, WhatsApp was opened successfully
      // So we still update local state
      setSubmittedItems([...submittedItems, ...newItems])

      const currentDate = getCurrentDateMalaysia()
      saveSubmissionState({
        selectedItems,
        submittedItems: [...submittedItems, ...newItems],
        notes,
        submitDate: currentDate
      })
    }
  }

  const value = {
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
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
