<template>
  <div class="text-xl font-bold">
    <slot>{{ label }}</slot>
  </div>
</template>
<script setup>
const props = defineProps({
  label: { type: String, default: '' },
})
</script>