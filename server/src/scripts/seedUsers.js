import bcrypt from 'bcryptjs'
import { getUsers, createUser, getUserByUsername } from '../database/db.js'

// Default users to seed
const defaultUsers = [
  { username: 'worker1', password: 'worker1', language: 'mm' },
  { username: 'worker2', password: 'worker2', language: 'mm' },
  { username: 'worker3', password: 'worker3', language: 'mm' },
  { username: 'admin', password: 'admin', language: 'en' }
]

const seedUsers = async () => {
  console.log('\n<1 Seeding default users...\n')

  let created = 0
  let skipped = 0

  for (const userData of defaultUsers) {
    // Check if user already exists
    const existingUser = await getUserByUsername(userData.username)
    if (existingUser) {
      console.log(`í  Skipped: ${userData.username} (already exists)`)
      skipped++
      continue
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    // Create user
    const newUser = await createUser({
      username: userData.username,
      password: hashedPassword,
      language: userData.language
    })

    console.log(` Created: ${newUser.username} (${newUser.language})`)
    created++
  }

  console.log(`\n=Ê Summary:`)
  console.log(`   Created: ${created}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Total users: ${(await getUsers()).length}\n`)
}

// Run seed
await seedUsers()
