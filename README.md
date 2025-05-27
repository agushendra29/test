Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev


## Notes =========== 

register.post.ts dan login.post.ts dalam menyimpan data hanya tersimpan ke directory data/users.json sebagai mock DB
sehingga kondisi setelah deployment vercel yang serverless maka write file tidak bisa dilakukan

1. Login pada vercel bisa menggunakan email: agushendra29@gmail.com dan password: 789789

2. Register tidak dapat dilakukan pada vercel sehingga hanya akan muncul alert register successfull jika semua form diisi 

3. login.post.ts dan register.post.ts hanya berhasil dilakukan pada localhost saja 


Terima kasih dan mohon maaf pada aplikasi yang serba kekurangan


=============================================================================================================

