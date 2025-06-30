<template>
  <div class="text-xl font-bold">
    {{ label }}
  </div>
</template>
<script setup>
const props = defineProps({
  label: { type: String, default: '' },
})
</script>