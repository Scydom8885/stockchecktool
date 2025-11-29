// Temporary user credentials
// This will be replaced with backend authentication later

export const users = [
  // Workers (Myanmar language by default)
  {
    id: 1,
    username: 'worker1',
    password: 'worker1', // In production, passwords will be hashed
    language: 'mm',
    role: 'worker'
  },
  {
    id: 2,
    username: 'worker2',
    password: 'worker2',
    language: 'mm',
    role: 'worker'
  },
  {
    id: 3,
    username: 'worker3',
    password: 'worker3',
    language: 'mm',
    role: 'worker'
  },
  // Owner (English language by default)
  {
    id: 4,
    username: 'admin',
    password: 'admin', // Change this to your preferred password
    language: 'en',
    role: 'owner'
  }
]

// Validate user credentials
export const validateUser = (username, password) => {
  const user = users.find(
    u => u.username === username && u.password === password
  )

  if (user) {
    // Return user without password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  return null
}
