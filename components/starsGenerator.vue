<template>
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2 context-title">
      ✨ Get The Stars
    </h1>
    <p class="mt-2 text-gray-800 text-lg">
      Choose how many rows you want, and how they should align — then light up the sky!
    </p>
  </div>

  <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
    <div class="w-full sm:w-2/3 flex flex-col sm:flex-row gap-4 justify-center items-center">
      <UInputNumber v-model="amount" size="lg" class="w-full max-w-xs">
        <template #decrement>
          <UButton size="xs" icon="i-lucide-minus" />
        </template>
        <template #increment>
          <UButton size="xs" icon="i-lucide-plus" />
        </template>
      </UInputNumber>

      <UButton @click="open = true"
        class="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition cursor-pointer">
        🚀 Generate
      </UButton>
    </div>
  </div>

  <div class="mt-6 flex justify-center">
    <URadioGroup
      v-model="alignType"
      :items="items"
      orientation="horizontal"
      :ui="{ label: 'text-gray-700', container: 'gap-8 flex-wrap justify-center' }"
    />
  </div>

  <UModal v-model:open="open" title="Ready to Launch?" 
    description="You’ll get a star pyramid based on your settings. Ready to go?"
    :ui="{ footer: 'justify-end', base: 'bg-white text-gray-900' }">
    <template #footer>
      <UButton label="Cancel" color="red" @click="open = false" />
      <UButton label="Confirm" color="green" @click="onConfirm" />
    </template>
  </UModal>

  <transition name="fade-slide">
    <div v-if="starAmount" class="mt-6 mx-auto max-w-3xl bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 px-6 py-4 text-center">
      <div class="text-xl font-semibold text-gray-800 mb-4">
        🎉 You've created <strong>{{ starAmount }}</strong> stars!
      </div>
      <div class="container-star bg-slate-700 py-4 px-2">
        <StarsDrawing :stars="starAmount" :aligned="selectedType" />
      </div>
    </div>
  </transition>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import StarsDrawing from './star/starsDrawing.vue'

enum StarAligned {
  Left = 'Left-Aligned',
  Center = 'Centered',
  Right = 'Right-Aligned'
}

const amount = ref(0)
const alignType = ref<StarAligned>(StarAligned.Left)

const selectedType = ref<StarAligned>()
const starAmount = ref(0)
const open = ref(false)


const onConfirm = () => {
  if(amount.value > 0) {
     starAmount.value = amount.value
     selectedType.value = alignType.value
     open.value = false
  }
}

const items = [
  { label: 'Left-Aligned', value: StarAligned.Left },
  { label: 'Centered', value: StarAligned.Center },
  { label: 'Right-Aligned', value: StarAligned.Right }
]
</script>

<style scoped>
.context-title {
  font-weight: 700;
  font-size: 40px;
  padding-bottom: 20px;
}

.container-star {
  border-radius: 12px;
  background-color: #1e293b; /* Tailwind slate-800 fallback */
  color: white;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>
