/**
 * Date utilities for Malaysia timezone (Asia/Kuala_Lumpur)
 */

const MALAYSIA_TIMEZONE = 'Asia/Kuala_Lumpur'

/**
 * Get current date in Malaysia timezone (YYYY-MM-DD format)
 * @returns {string} - Date string in YYYY-MM-DD format
 */
export const getCurrentDateMalaysia = () => {
  const now = new Date()

  // Get date in Malaysia timezone
  const malaysiaDate = new Date(now.toLocaleString('en-US', { timeZone: MALAYSIA_TIMEZONE }))

  const year = malaysiaDate.getFullYear()
  const month = String(malaysiaDate.getMonth() + 1).padStart(2, '0')
  const day = String(malaysiaDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * Check if it's a new day compared to stored date
 * @param {string} storedDate - Previously stored date (YYYY-MM-DD)
 * @returns {boolean} - True if it's a new day
 */
export const isNewDay = (storedDate) => {
  if (!storedDate) {
    return true // No stored date means it's a new session
  }

  const currentDate = getCurrentDateMalaysia()
  return currentDate !== storedDate
}

/**
 * Get formatted timestamp for Malaysia timezone
 * @returns {string} - Formatted timestamp
 */
export const getFormattedTimestamp = () => {
  const now = new Date()
  return now.toLocaleString('zh-CN', { timeZone: MALAYSIA_TIMEZONE })
}

/**
 * Check if current time is past midnight (for testing)
 * @returns {Object} - Current Malaysia date and time info
 */
export const getMalaysiaTimeInfo = () => {
  const now = new Date()
  const malaysiaDate = new Date(now.toLocaleString('en-US', { timeZone: MALAYSIA_TIMEZONE }))

  return {
    date: getCurrentDateMalaysia(),
    hours: malaysiaDate.getHours(),
    minutes: malaysiaDate.getMinutes(),
    timestamp: malaysiaDate.toLocaleString('en-US', { timeZone: MALAYSIA_TIMEZONE })
  }
}
