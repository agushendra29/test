// server/api/login.post.ts
import { readBody, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    setResponseStatus(event, 400)
    return { message: 'Email and password are required' }
  }

  const storage = useStorage('data')

  try {
    const storedUsers = await storage.getItem('users.json')
    const users: any[] = Array.isArray(storedUsers) ? storedUsers : []

    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      setResponseStatus(event, 401)
      return { message: 'Invalid email or password' }
    }

    setResponseStatus(event, 200)
    return {
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    }
  } catch (err: any) {
    setResponseStatus(event, 500)
    return {
      message: 'Failed to read user data',
      error: err.message
    }
  }
})
