import express from 'express'
import { login, logout, verify } from '../controllers/authController.js'

const router = express.Router()

// POST /api/auth/login - Login user
router.post('/login', login)

// POST /api/auth/logout - Logout user
router.post('/logout', logout)

// GET /api/auth/verify - Verify user session
router.get('/verify', verify)

export default router
