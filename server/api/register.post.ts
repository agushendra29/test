// server/api/register.post.ts
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const storage = useStorage('data') // Menggunakan penyimpanan 'data'

  // Baca data pengguna yang ada
  const storedUsers = await storage.getItem('users.json')

  // Periksa apakah storedUsers adalah array
  const users: any[] = Array.isArray(storedUsers) ? storedUsers : []

  // Tambahkan pengguna baru
  users.push(body)

  // Simpan kembali ke penyimpanan
  await storage.setItem('users.json', users)

  return {
    status: 'success',
    message: 'User registered!',
    user: body,
  }
})
