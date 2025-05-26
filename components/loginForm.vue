<template>
  <div class="login-container w-[468px] mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-gray-200">
    <h1 class="text-3xl font-semibold text-green-800 mb-6 flex items-center justify-center gap-2">
      📝 MySite
    </h1>

    <form @submit.prevent="onSubmit" class="space-y-6">
      <div>
        <label class="block text-black font-semimedium mb-1" for="email">Email</label>
        <input
          v-model="form.email"
          id="email"
          type="email"
          placeholder="example@mail.com"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm transition text-black"
          required
        />
      </div>

      <div class="relative">
        <label class="block text-black font-semimedium mb-1" for="password">Password</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="form.password"
          id="password"
          placeholder="Enter your password"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm transition text-black"
          required
        />
        <button
          type="button"
          class="absolute right-3 top-11 text-gray-600 hover:text-gray-800 cursor-pointer"
          @click="showPassword = !showPassword"
          aria-label="Toggle password visibility"
        >
          {{ showPassword ? '🙈' : '👁️' }}
        </button>
      </div>

      <button
        type="submit"
        class="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
      >
        🚀 Login
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showPassword = ref(false)

const form = ref({
  email: '',
  password: ''
})

const onSubmit = async () => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Login failed')
    }
    
    alert('🎉 Login successful!')
    localStorage.setItem('user', JSON.stringify(result.user))
    window.location.href = "/"
    form.value.email = ''
    form.value.password = ''
  } catch (err: any) {
    alert('❌ ' + err.message)
    console.error('Login error:', err)
  }
}
</script>
