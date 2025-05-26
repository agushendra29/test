<template>
    <div class="flex items-center justify-between border-b-gray-100 border-b-1 p-2 gap-x-5">
        <div class="flex justify-between gap-x-5 items-center">
        <span class="text-white font-thin text-md">{{stars}} ★</span>
         <span class="text-white font-thin">{{aligned}}</span>
        </div>
    <UPopover>
    <UButton label="Choose star color" color="neutral" variant="outline" class="font-thin">
      <template #leading>
        <span :style="chip" class="size-3 rounded-full" />
      </template>
    </UButton>

    <template #content>
      <UColorPicker v-model="color" class="p-2" />
    </template>
  </UPopover>
</div>
    <div class="inline-block p-4" :class="aligned === StarAligned.Center ? 'text-center' : aligned === StarAligned.Right ? 'text-right' : 'text-left'">
      <div v-for="row in stars" :key="row">
        <span v-for="star in row" :key="'star-' + row + '-' + star" :style="{ color: color }">★</span>
      </div>
    </div>
</template>

<script setup lang="ts">
enum StarAligned {
    Left = "Left-Aligned",
    Center = "Centered",
    Right = "Right-Aligned"
}
const props = defineProps({stars: Number, aligned: StarAligned})
const color = ref('#FFFFFF')

const chip = computed(() => ({ backgroundColor: color.value }))

</script>
