// server/api/register.post.ts
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const storage = useStorage('data') // Menggunakan penyimpanan 'data'

  const storedUsers = await storage.getItem('users.json')
  const users: any[] = Array.isArray(storedUsers) ? storedUsers : []
  users.push(body)

  await storage.setItem('users.json', users)

  return {
    status: 'success',
    message: 'User registered!',
    user: body,
  }
})
