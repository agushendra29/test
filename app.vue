<template>
    <NuxtPage />
</template>


<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// onMounted(() => {
//   const user = localStorage.getItem('user')
//   if (user) {
//     router.push('/') // Redirect to home page
//   } else router.push('/login')
// })

</script>