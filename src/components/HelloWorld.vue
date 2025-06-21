<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="flex h-full gap-4 p-8">
    <div class="flex flex-col min-w-[20%] gap-4">
      <div class="bg-primary text-white p-4">primary</div>
      <div class="bg-light-primary text-white p-4">light-primary</div>
      <div class="bg-secondary text-dark p-4">secondary</div>
      <div class="bg-background text-black p-4">background</div>
      <div class="bg-dark text-white p-4">dark</div>
    </div>
    <div class="flex flex-col min-w-[80%] gap-4">
      <div class="flex flex-row gap-2">
        <u-btn />
        <u-btn variant="secondary"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
