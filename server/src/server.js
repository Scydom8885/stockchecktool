import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import submissionRoutes from './routes/submissions.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/submissions', submissionRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Stock Check API is running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`=€ Server running on port ${PORT}`)
  console.log(`=á API available at http://localhost:${PORT}/api`)
})
