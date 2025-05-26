<template>
    <div>
    <header class="header">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <a href="/" class="text-xl font-semibold text-green-800">📝 MySite</a>
        </div>
        <nav class="space-x-4 text-black text-sm">
          <template v-if="user">
            <span class="text-black-700">Welcome, {{ user.name }}!</span>
            <a @click="onLogout" class="hover:text-green-600 transition">Logout</a>
          </template>
          <template v-else>
            <a href="/login" class="hover:text-green-600 transition">Login</a>
          </template>
        </nav>
      </div>
    </header>
</div>
</template>

<script setup lang="ts">
defineProps<{
  user: { name: string; email?: string } | null
}>()

const onLogout = () => {
  localStorage.clear();
  window.location.href = "/login"
}
</script>


<style scoped>
header {
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

</style>