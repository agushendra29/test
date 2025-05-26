<template>
    <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2 context-title">
            💬 Spelled Out
        </h1>
        <p class="mt-2 text-gray-800 text-lg">
            Instantly convert numbers to words — perfect for checks, letters, and more.
        </p>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <div class="relative w-full sm:w-2/3">
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">Rp</span>
            <input :value="formattedAmount" @input="onInputChange($event?.target?.value)" type="text"
                placeholder="e.g. 1,000,000"
                class="w-full pl-10 pr-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm transition" />
        </div>
        <button @click="open = true"
            class="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition cursor-pointer">
            🔄 Convert
        </button>
    </div>

    <transition name="fade-slide">
        <div v-if="spelledOut"
            class="mt-6 mx-auto max-w-3xl bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3 text-xl font-bold text-gray-800">
                <span class="text-green-800 text-2xl">🗣️</span>
                {{ spelledOut }}
            </div>
            <button @click="copyToClipboard()" class="text-sm text-blue-600 hover:underline cursor-pointer">
                📋 Copy
            </button>
        </div>
    </transition>

    <UModal v-model:open="open" title="Ready to Spelled out?"
        description="You’ll get your currency amount spelled out. Ready to go?"
        :ui="{ footer: 'justify-end', base: 'bg-white text-gray-900' }">
        <template #footer>
            <UButton label="Cancel" color="red" @click="open = false" />
            <UButton label="Confirm" color="green" @click="onConfirm" />
        </template>
    </UModal>
</template>

<script setup lang="ts">

import { ref } from 'vue'

const open = ref(false)
const rawAmount = ref<number | null>(null)
const formattedAmount = ref('')
const spelledOut = ref('')

const formatRupiah = (value: string): string => {
  const digitsOnly = value.replace(/[^\d]/g, '')
  return digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const onInputChange = (val: string) => {
  const cleaned = val.replace(/[^\d]/g, '')
  rawAmount.value = cleaned ? parseInt(cleaned) : null
  formattedAmount.value = formatRupiah(cleaned)
}

const blockNonDigits = (e: KeyboardEvent) => {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault()
  }
}

const convertToWords = () => {
  if (rawAmount.value !== null) {
    spelledOut.value = terbilang(rawAmount.value)
  }
}

const onConfirm = () => {
    convertToWords()
      open.value = false
}

const satuan = [
  '', 'satu', 'dua', 'tiga', 'empat',
  'lima', 'enam', 'tujuh', 'delapan',
  'sembilan', 'sepuluh', 'sebelas'
];

const convert = (n: number): string => {
  if (n < 12) return satuan[n]
  if (n < 20) return satuan[n - 10] + ' belas'
  if (n < 100) return convert(Math.floor(n / 10)) + ' puluh' + (n % 10 !== 0 ? ' ' + convert(n % 10) : '')
  if (n < 200) return 'seratus' + (n % 100 !== 0 ? ' ' + convert(n - 100) : '')
  if (n < 1000) return convert(Math.floor(n / 100)) + ' ratus' + (n % 100 !== 0 ? ' ' + convert(n % 100) : '')
  if (n < 2000) return 'seribu' + (n % 1000 !== 0 ? ' ' + convert(n - 1000) : '')
  if (n < 1000000) {
    const ribu = Math.floor(n / 1000)
    const sisa = n % 1000
    return convert(ribu) + ' ribu' + (sisa !== 0 ? ' ' + convert(sisa) : '')
  }
  if (n < 1000000000) {
    const juta = Math.floor(n / 1000000)
    const sisa = n % 1000000
    return convert(juta) + ' juta' + (sisa !== 0 ? ' ' + convert(sisa) : '')
  }
  return 'jumlah terlalu besar'
}

const terbilang = (number: number): string => {
  if (isNaN(number) || number < 0) return 'Jumlah tidak valid'
  return convert(number).replace(/\s+/g, ' ').trim() + ' rupiah'
}

const copyToClipboard = async () => {
  if (spelledOut.value) {
    try {
      await navigator.clipboard.writeText(spelledOut.value)
      alert('Copied to clipboard!')
    } catch (err) {
      alert('Failed to copy text')
    }
  }
}

</script>

<style scoped>
.context-title {
  font-weight:700;
  color: #121212 !important;
  font-size: 40px;
  padding-bottom:20px;
}

.context-sub-description {
  font-weight:400;
  color: #2b2b2b;
  font-size: 17px;
  padding-bottom:20px;
}

.container-star {
  border-radius:8px;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

</style>

