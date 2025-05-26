<template>
  <div class="login-page flex items-center justify-center">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import LoginForm from '~/components/loginForm.vue'
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: "Montserrat", sans-serif;
  background: linear-gradient(to bottom right, #f8f9fc, #ffffff);
  height:100vh
}
</style>
