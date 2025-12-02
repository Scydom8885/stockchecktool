import { createSubmission, getUserSubmissionToday, getSubmissionsByDate } from '../database/db.js'

// Helper to get current date in Malaysia timezone (YYYY-MM-DD format)
const getCurrentDateMalaysia = () => {
  const now = new Date()
  const malaysiaDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }))
  const year = malaysiaDate.getFullYear()
  const month = String(malaysiaDate.getMonth() + 1).padStart(2, '0')
  const day = String(malaysiaDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// POST /api/submissions - Save a new submission
export const saveSubmission = async (req, res) => {
  try {
    const { userId, items, notes } = req.body

    // Validate input
    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required'
      })
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'Items array is required and cannot be empty'
      })
    }

    // Get current date in Malaysia timezone
    const date = getCurrentDateMalaysia()

    // Create submission
    const submission = await createSubmission({
      userId,
      date,
      items,
      notes: notes || ''
    })

    res.status(201).json({
      success: true,
      submission,
      message: 'Submission saved successfully'
    })
  } catch (error) {
    console.error('Save submission error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}

// GET /api/submissions/today/:userId - Check if user submitted today
export const checkTodaySubmission = async (req, res) => {
  try {
    const { userId } = req.params

    // Validate input
    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required'
      })
    }

    // Get current date in Malaysia timezone
    const date = getCurrentDateMalaysia()

    // Find submission for today
    const submission = await getUserSubmissionToday(parseInt(userId), date)

    if (submission) {
      res.json({
        success: true,
        submitted: true,
        submission
      })
    } else {
      res.json({
        success: true,
        submitted: false,
        submission: null
      })
    }
  } catch (error) {
    console.error('Check submission error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}

// GET /api/submissions/today - Get all team submissions for today
export const getTodaySubmissions = async (req, res) => {
  try {
    // Get current date in Malaysia timezone
    const date = getCurrentDateMalaysia()

    // Get all submissions for today
    const submissions = await getSubmissionsByDate(date)

    res.json({
      success: true,
      submissions,
      date
    })
  } catch (error) {
    console.error('Get today submissions error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}
