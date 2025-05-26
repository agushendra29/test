<template>
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2 context-title">
      📝 Register Form
    </h1>
    <p class="mt-2 text-gray-800 text-lg">
      Fill out the form below to complete your registration.
    </p>
  </div>

  <div class="w-[768px] mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-gray-200">
    <form @submit.prevent="open = true" class="grid grid-cols-2 sm:grid-cols-2 gap-6">
      <div>
        <label class="block text-gray-700 font-medium mb-1">Name</label>
        <input v-model="form.name" type="text" placeholder="Full Name"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm transition" required />
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-1">Phone Number</label>
        <input v-model="form.phone" type="tel" placeholder="08xxxxxxxxxx"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm transition" required/>
      </div>

      <div class="sm:col-span-2">
        <label class="block text-gray-700 font-medium mb-1">Email</label>
        <input v-model="form.email" type="email" placeholder="example@mail.com"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm transition" required />
      </div>
   <div class="sm:col-span-2 relative">
  <label class="block text-gray-700 font-medium mb-1">Password</label>
  <input
    :type="showPassword ? 'text' : 'password'"
    v-model="form.password"
    placeholder="Enter your password"
    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm transition"
    required
  />

  <!-- Toggle Button -->
  <button
    type="button"
    class="absolute right-3 top-11 text-gray-600 hover:text-gray-800 cursor-pointer"
    @click="showPassword = !showPassword"
  >
    {{ showPassword ? '🙈' : '👁️' }}
  </button>
</div>

      <div class="sm:col-span-2">
        <label class="block text-gray-700 font-medium mb-1">Address</label>
        <textarea v-model="form.address" rows="3" placeholder="Your full address"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm transition resize-none"></textarea>
      </div>
      <div>
       <div>
        <label class="block text-gray-700 font-medium mb-1">Province</label>
        <select v-model="form.province" @change="onProvinceSelect" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm transition">
          <option value="" disabled selected>Select Province</option>
          <option v-for="province in provinces?.data" :key="province.id" :value="province.id">
            {{ province.name }}
          </option>
        </select>
      </div>
      </div>
      <div>
        <label class="block text-gray-700 font-medium mb-1">City</label>
        <select v-model="form.city" @change="onCitySelect" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm transition" :disabled="!cities?.data?.length">
          <option value="" disabled selected>Select City</option>
          <option v-for="city in cities?.data" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-1">District</label>
        <select v-model="form.district" @change="onDistrictSelect" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm transition" :disabled="!districts?.data?.length">
          <option value="" disabled selected>Select District</option>
          <option v-for="district in districts.data" :key="district.id" :value="district.id">
            {{ district.name }}
          </option>
        </select>
      </div>

       <div>
        <label class="block text-gray-700 font-medium mb-1">Village</label>
        <select v-model="form.village" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm transition" :disabled="!villages?.data?.length">
          <option value="" disabled selected>Select Village</option>
          <option v-for="village in villages.data" :key="village.id" :value="village.id">
            {{ village.name }}
          </option>
        </select>
      </div>


      <div class="sm:col-span-2 text-right">
        <button type="submit"
          class="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition">
          🚀 Submit
        </button>
      </div>
    </form>
  </div>

   <UModal v-model:open="open" title="Ready to Submit?" 
    description="Your submit data will be saved so make sure your all data is filled correctly"
    :ui="{ footer: 'justify-end', base: 'bg-white text-gray-900' }">
    <template #footer>
      <UButton label="Cancel" color="red" @click="open = false" />
      <UButton label="Confirm" color="green" @click="onConfirm" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const provinces = ref([])
const cities = ref([])
const districts = ref([])
const villages = ref([])
const showPassword = ref(false)
const open = ref(false)

const form = ref({
  name: '',
  phone: '',
  password: "",
  email: '',
  address: '',
  province: '',
  city: '',
  district: '',
  village: ''
})

const onConfirm = () => {
    onSubmit()
    open.value = false
}

const onSubmit = async () => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Registration failed')
    }

    alert('🎉 Registration successful!')
    console.log(result)

    // Reset form (optional)
    form.value = {
      name: '',
      phone: '',
      email: '',
      address: '',
      password: "",
      province: '',
      city: '',
      district: '',
      village: ''
    }
    cities.value = []
    districts.value = []
    villages.value = []

  } catch (err: any) {
    alert('❌ ' + err.message)
    console.error(err)
  }
}

const fetchProvinces = async () => {
  try {
    const res = await fetch('https://api-regional-indonesia.vercel.app/api/provinces')
    provinces.value = await res.json()
  } catch (e) {
    console.error('Failed to fetch provinces', e)
  }
}

const onProvinceSelect = async (province: { id: string }) => {
  form.value.city = ""
  form.value.district = ""
  form.value.village = ""
  districts.value = []
  cities.value = []
  villages.value = []

  const res = await fetch(`https://api-regional-indonesia.vercel.app/api/cities/${form.value.province}`)
  cities.value = await res.json()
}

const onCitySelect = async (city: { id:string }) => {
    form.value.district = ""
    form.value.village = ""
    districts.value = []
    villages.value = []
   const res = await fetch(`https://api-regional-indonesia.vercel.app/api/districts/${form.value.city}`)
    districts.value = await res.json()
}

const onDistrictSelect = async (district: { id:string }) => {
    form.value.village = ""
    villages.value = []
   const res = await fetch(`https://api-regional-indonesia.vercel.app/api/villages/${form.value.district}`)
    villages.value = await res.json()
}

onMounted(() => {
  fetchProvinces()
})

</script>

<style scoped>
.context-title {
  font-weight: 700;
  font-size: 40px;
  color: #121212 !important;
  padding-bottom: 20px;
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
