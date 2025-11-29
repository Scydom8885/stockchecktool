import bcrypt from 'bcryptjs'
import { getUsers, createUser, deleteUser, getUserByUsername } from '../database/db.js'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

// Add new user
const addUser = async () => {
  console.log('\n=Ý Add New User\n')

  const username = await question('Username: ')
  if (!username || username.trim() === '') {
    console.log('L Username cannot be empty')
    rl.close()
    return
  }

  // Check if user already exists
  const existingUser = await getUserByUsername(username.trim())
  if (existingUser) {
    console.log(`L User "${username}" already exists`)
    rl.close()
    return
  }

  const password = await question('Password: ')
  if (!password || password.trim() === '') {
    console.log('L Password cannot be empty')
    rl.close()
    return
  }

  const language = await question('Language (mm/en/zh): ')
  if (!['mm', 'en', 'zh'].includes(language.trim())) {
    console.log('L Language must be mm, en, or zh')
    rl.close()
    return
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password.trim(), 10)

  // Create user
  const newUser = await createUser({
    username: username.trim(),
    password: hashedPassword,
    language: language.trim()
  })

  console.log(`\n User created successfully!`)
  console.log(`   ID: ${newUser.id}`)
  console.log(`   Username: ${newUser.username}`)
  console.log(`   Language: ${newUser.language}`)

  rl.close()
}

// Remove user
const removeUser = async () => {
  console.log('\n=Ñ  Remove User\n')

  const username = await question('Username to remove: ')
  if (!username || username.trim() === '') {
    console.log('L Username cannot be empty')
    rl.close()
    return
  }

  const confirm = await question(`Are you sure you want to remove "${username}"? (yes/no): `)
  if (confirm.toLowerCase() !== 'yes') {
    console.log('L Cancelled')
    rl.close()
    return
  }

  const success = await deleteUser(username.trim())
  if (success) {
    console.log(` User "${username}" removed successfully`)
  } else {
    console.log(`L User "${username}" not found`)
  }

  rl.close()
}

// List all users
const listUsers = async () => {
  console.log('\n=e All Users\n')

  const users = await getUsers()

  if (users.length === 0) {
    console.log('No users found')
  } else {
    console.log(`Found ${users.length} user(s):\n`)
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.username}`)
      console.log(`   ID: ${user.id}`)
      console.log(`   Language: ${user.language}`)
      console.log(`   Created: ${user.createdAt}\n`)
    })
  }

  rl.close()
}

// Main
const command = process.argv[2]

switch (command) {
  case 'add':
    await addUser()
    break
  case 'remove':
    await removeUser()
    break
  case 'list':
    await listUsers()
    break
  default:
    console.log('\n=Ú Usage:')
    console.log('  npm run add-user     - Add a new user')
    console.log('  npm run remove-user  - Remove a user')
    console.log('  npm run list-users   - List all users\n')
    rl.close()
}
