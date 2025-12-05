/**
 * LocalStorage utilities for managing app state
 */

const STORAGE_KEYS = {
  USER_SESSION: 'stockcheck_user_session',
  SUBMISSION_STATE: 'stockcheck_submission_state',
  LAST_SUBMIT_DATE: 'stockcheck_last_submit_date',
  SELECTED_ITEMS: 'stockcheck_selected_items',
  NOTES: 'stockcheck_notes'
}

/**
 * Save submission state to localStorage
 * @param {Object} state - Submission state to save
 * @param {Array} state.selectedItems - Selected items
 * @param {string} state.notes - Notes
 * @param {boolean} state.isSubmitted - Submission status
 * @param {string} state.submitDate - Date of submission (YYYY-MM-DD)
 */
export const saveSubmissionState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBMISSION_STATE, JSON.stringify(state))
    localStorage.setItem(STORAGE_KEYS.LAST_SUBMIT_DATE, state.submitDate)
  } catch (error) {
    console.error('Error saving submission state:', error)
  }
}

/**
 * Load submission state from localStorage
 * @returns {Object|null} - Saved state or null if not found
 */
export const loadSubmissionState = () => {
  try {
    const stateStr = localStorage.getItem(STORAGE_KEYS.SUBMISSION_STATE)
    if (!stateStr) {
      return null
    }

    const state = JSON.parse(stateStr)
    return state
  } catch (error) {
    console.error('Error loading submission state:', error)
    return null
  }
}

/**
 * Get last submission date
 * @returns {string|null} - Last submit date (YYYY-MM-DD) or null
 */
export const getLastSubmitDate = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.LAST_SUBMIT_DATE)
  } catch (error) {
    console.error('Error getting last submit date:', error)
    return null
  }
}

/**
 * Clear submission state (called on new day or logout)
 */
export const clearSubmissionState = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.SUBMISSION_STATE)
    localStorage.removeItem(STORAGE_KEYS.LAST_SUBMIT_DATE)
    localStorage.removeItem(STORAGE_KEYS.SELECTED_ITEMS)
    localStorage.removeItem(STORAGE_KEYS.NOTES)
  } catch (error) {
    console.error('Error clearing submission state:', error)
  }
}

/**
 * Clear all app data (complete reset)
 */
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  } catch (error) {
    console.error('Error clearing all data:', error)
  }
}

/**
 * Save user session to localStorage (stay logged in)
 * @param {Object} user - User data
 */
export const saveUserSession = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(user))
  } catch (error) {
    console.error('Error saving user session:', error)
  }
}

/**
 * Load user session from localStorage
 * @returns {Object|null} - User data or null if not logged in
 */
export const loadUserSession = () => {
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER_SESSION)
    if (!userStr) {
      return null
    }
    return JSON.parse(userStr)
  } catch (error) {
    console.error('Error loading user session:', error)
    return null
  }
}

/**
 * Clear user session (logout)
 */
export const clearUserSession = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION)
  } catch (error) {
    console.error('Error clearing user session:', error)
  }
}
