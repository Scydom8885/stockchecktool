import express from 'express'
import { saveSubmission, checkTodaySubmission } from '../controllers/submissionController.js'

const router = express.Router()

// POST /api/submissions - Save a new submission
router.post('/', saveSubmission)

// GET /api/submissions/today/:userId - Check if user submitted today
router.get('/today/:userId', checkTodaySubmission)

export default router
