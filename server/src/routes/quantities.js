import express from 'express'
import { saveQuantity, getQuantityStatus } from '../controllers/quantityController.js'

const router = express.Router()

// POST /api/quantities - Save a new quantity submission
router.post('/', saveQuantity)

// GET /api/quantities/status - Get current lock status and today's quantities
router.get('/status', getQuantityStatus)

export default router
