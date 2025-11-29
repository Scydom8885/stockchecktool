import bcrypt from 'bcryptjs'
import { getUserByUsername } from '../database/db.js'

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        error: 'Username and password are required'
      })
    }

    // Find user
    const user = await getUserByUsername(username)
    if (!user) {
      return res.status(401).json({
        error: 'Invalid username or password'
      })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid username or password'
      })
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    res.json({
      success: true,
      user: userWithoutPassword,
      message: 'Login successful'
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}

// Logout user
export const logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logout successful'
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}

// Verify user session (for future use)
export const verify = async (req, res) => {
  try {
    // This would be used with JWT/session tokens in the future
    // For now, just return a basic response
    res.json({
      success: true,
      message: 'Session verification endpoint'
    })
  } catch (error) {
    console.error('Verify error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}
