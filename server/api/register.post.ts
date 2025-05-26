import { readBody } from 'h3'
import fs from 'fs/promises'
import path from 'path'

const dbPath = path.resolve('server/data/users.json')

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Read existing users
  const raw = await fs.readFile(dbPath, 'utf-8')
  const users = JSON.parse(raw)

  // Add new user
  users.push(body)

  // Save back to file
  await fs.writeFile(dbPath, JSON.stringify(users, null, 2), 'utf-8')

  return {
    status: 'success',
    message: 'User registered!',
    user: body,
  }
})