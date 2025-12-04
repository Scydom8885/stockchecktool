import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USERS_FILE = path.join(__dirname, 'users.json')
const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.json')
const QUANTITIES_FILE = path.join(__dirname, 'quantities.json')

// Initialize database files if they don't exist
export const initDatabase = async () => {
  try {
    // Check and initialize users.json
    try {
      await fs.access(USERS_FILE)
      const content = await fs.readFile(USERS_FILE, 'utf-8')
      if (!content || content.trim() === '') {
        await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2))
      }
    } catch {
      await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2))
    }

    // Check and initialize submissions.json
    try {
      await fs.access(SUBMISSIONS_FILE)
      const content = await fs.readFile(SUBMISSIONS_FILE, 'utf-8')
      if (!content || content.trim() === '') {
        await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify([], null, 2))
      }
    } catch {
      await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify([], null, 2))
    }

    // Check and initialize quantities.json
    try {
      await fs.access(QUANTITIES_FILE)
      const content = await fs.readFile(QUANTITIES_FILE, 'utf-8')
      if (!content || content.trim() === '') {
        await fs.writeFile(QUANTITIES_FILE, JSON.stringify([], null, 2))
      }
    } catch {
      await fs.writeFile(QUANTITIES_FILE, JSON.stringify([], null, 2))
    }

    console.log(' Database initialized')
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

// Read data from JSON file
const readData = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return []
  }
}

// Write data to JSON file
const writeData = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error)
    return false
  }
}

// User operations
export const getUsers = async () => {
  return await readData(USERS_FILE)
}

export const getUserById = async (id) => {
  const users = await getUsers()
  return users.find(u => u.id === id)
}

export const getUserByUsername = async (username) => {
  const users = await getUsers()
  return users.find(u => u.username === username)
}

export const createUser = async (user) => {
  const users = await getUsers()
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    ...user,
    createdAt: new Date().toISOString()
  }
  users.push(newUser)
  await writeData(USERS_FILE, users)
  return newUser
}

export const deleteUser = async (username) => {
  const users = await getUsers()
  const filteredUsers = users.filter(u => u.username !== username)
  if (users.length === filteredUsers.length) {
    return false // User not found
  }
  await writeData(USERS_FILE, filteredUsers)
  return true
}

// Submission operations
export const getSubmissions = async () => {
  return await readData(SUBMISSIONS_FILE)
}

export const getSubmissionsByDate = async (date) => {
  const submissions = await getSubmissions()
  return submissions.filter(s => s.date === date)
}

export const getUserSubmissionToday = async (userId, date) => {
  const submissions = await getSubmissions()
  return submissions.find(s => s.userId === userId && s.date === date)
}

export const createSubmission = async (submission) => {
  const submissions = await getSubmissions()
  const newSubmission = {
    id: submissions.length > 0 ? Math.max(...submissions.map(s => s.id)) + 1 : 1,
    ...submission,
    createdAt: new Date().toISOString()
  }
  submissions.push(newSubmission)
  await writeData(SUBMISSIONS_FILE, submissions)
  return newSubmission
}

// Quantity operations
export const getQuantities = async () => {
  return await readData(QUANTITIES_FILE)
}

export const getTodayQuantities = async (date) => {
  const quantities = await getQuantities()
  return quantities.filter(q => q.date === date)
}

export const getQuantityByPeriod = async (date, period) => {
  const quantities = await getQuantities()
  return quantities.find(q => q.date === date && q.time_period === period)
}

export const createQuantity = async (quantity) => {
  const quantities = await getQuantities()
  const newQuantity = {
    id: quantities.length > 0 ? Math.max(...quantities.map(q => q.id)) + 1 : 1,
    ...quantity,
    createdAt: new Date().toISOString()
  }
  quantities.push(newQuantity)
  await writeData(QUANTITIES_FILE, quantities)
  return newQuantity
}

// Initialize database on module load
await initDatabase()
