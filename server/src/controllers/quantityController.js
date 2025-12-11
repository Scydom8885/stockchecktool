import { createQuantity, getQuantityByPeriod } from '../database/db.js'

// Helper to get current date in Malaysia timezone (YYYY-MM-DD format)
const getCurrentDateMalaysia = () => {
  const now = new Date()
  const malaysiaDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }))
  const year = malaysiaDate.getFullYear()
  const month = String(malaysiaDate.getMonth() + 1).padStart(2, '0')
  const day = String(malaysiaDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Helper to get current time in Malaysia timezone
const getCurrentTimeMalaysia = () => {
  const now = new Date()
  const malaysiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }))
  return malaysiaTime
}

// Helper to determine current period and lock status
const getPeriodStatus = () => {
  const malaysiaTime = getCurrentTimeMalaysia()
  const hours = malaysiaTime.getHours()
  const minutes = malaysiaTime.getMinutes()
  const currentMinutes = hours * 60 + minutes

  // 10:00 AM = 600 minutes, 9:55 PM = 1315 minutes
  const morningUnlockTime = 10 * 60  // 10:00 AM
  const eveningUnlockTime = 21 * 60  // 9:55 PM

  if (currentMinutes >= morningUnlockTime && currentMinutes < eveningUnlockTime) {
    return { period: 'morning', canSubmit: true }
  } else if (currentMinutes >= eveningUnlockTime) {
    return { period: 'evening', canSubmit: true }
  } else {
    return { period: 'morning', canSubmit: false }  // Before 10 AM
  }
}

// POST /api/quantities - Save a new quantity submission
export const saveQuantity = async (req, res) => {
  try {
    const { userId, braised_pork, kong_bak ,shiitake} = req.body

    // Validate input
    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required'
      })
    }

    if (braised_pork === undefined || kong_bak === undefined || shiitake === undefined) {
      return res.status(400).json({
        error: 'braised_pork ,kong_bak and shiitake quantities are required'
      })
    }

    // Get current date and period status
    const date = getCurrentDateMalaysia()
    const { period, canSubmit } = getPeriodStatus()

    // Check if submission is allowed
    if (!canSubmit) {
      return res.status(403).json({
        error: 'Submission not allowed at this time'
      })
    }

    // Check if already submitted for this period
    const existingQuantity = await getQuantityByPeriod(date, period)
    if (existingQuantity) {
      return res.status(400).json({
        error: `Quantity already submitted for ${period} period`
      })
    }

    // Create quantity submission
    const quantity = await createQuantity({
      userId,
      date,
      time_period: period,
      braised_pork: parseInt(braised_pork),
      kong_bak: parseInt(kong_bak),
      shiitake: parseInt(shiitake),
      submitted_at: new Date().toISOString()
    })

    res.status(201).json({
      success: true,
      quantity,
      message: 'Quantity saved successfully'
    })
  } catch (error) {
    console.error('Save quantity error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}

// GET /api/quantities/status - Get current lock status and today's quantities
export const getQuantityStatus = async (req, res) => {
  try {
    const date = getCurrentDateMalaysia()
    const { period, canSubmit } = getPeriodStatus()

    // Get quantities for both periods
    const morningQuantity = await getQuantityByPeriod(date, 'morning')
    const eveningQuantity = await getQuantityByPeriod(date, 'evening')

    res.json({
      success: true,
      date,
      current_period: period,
      can_submit: canSubmit,
      morning: morningQuantity || null,
      evening: eveningQuantity || null
    })
  } catch (error) {
    console.error('Get quantity status error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}
