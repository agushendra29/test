import { defineEventHandler, readBody, setResponseStatus } from 'h3'
import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    setResponseStatus(event, 400)
    return { message: 'Email and password are required' }
  }

  try {
    const filePath = join(process.cwd(), 'server/data/users.json')
    const file = await readFile(filePath, 'utf-8')
    const users = JSON.parse(file)

    const user = users.find((u: any) => u.email === email && u.password === password)

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
