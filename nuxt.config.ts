import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
   css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
   nitro: {
    storage: {
      data: {
        driver: 'fs',
        base: './data'
      }
    }
  }
})
