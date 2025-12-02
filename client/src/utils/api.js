// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'API request failed')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Authentication API calls

/**
 * Login user
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} User data
 */
export const login = async (username, password) => {
  const data = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  return data.user
}

/**
 * Logout user
 * @returns {Promise<Object>}
 */
export const logout = async () => {
  return await apiCall('/auth/logout', {
    method: 'POST',
  })
}

// Submission API calls

/**
 * Save submission
 * @param {number} userId
 * @param {Array} items
 * @param {string} notes
 * @returns {Promise<Object>} Submission data
 */
export const saveSubmission = async (userId, items, notes) => {
  const data = await apiCall('/submissions', {
    method: 'POST',
    body: JSON.stringify({ userId, items, notes }),
  })
  return data.submission
}

/**
 * Check if user submitted today
 * @param {number} userId
 * @returns {Promise<Object>} { submitted: boolean, submission: Object|null }
 */
export const checkTodaySubmission = async (userId) => {
  const data = await apiCall(`/submissions/today/${userId}`)
  return {
    submitted: data.submitted,
    submission: data.submission,
  }
}

/**
 * Get all team submissions for today
 * @returns {Promise<Array>} Array of all submissions for today
 */
export const getTodaySubmissions = async () => {
  const data = await apiCall('/submissions/today')
  return data.submissions
}
