import bcrypt from 'bcryptjs'

// Create a demo user for testing
const createDemoUser = async () => {
  const email = 'demo@vikepress.com'
  const password = 'Demo123456'
  const name = 'Demo User'
  
  const saltRounds = 12
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  
  const user = {
    id: 'demo-user-id',
    email,
    name,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  }
  
  console.log('Demo user created:')
  console.log('Email:', email)
  console.log('Password:', password)
  console.log('Name:', name)
  console.log('Hashed Password:', hashedPassword)
  
  return user
}

// Run the function
createDemoUser().then(() => {
  console.log('Demo user creation complete')
})