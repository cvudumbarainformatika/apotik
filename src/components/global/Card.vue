<template>
  <div class="bg-secondary relative rounded-lg shadow-md p-4"
    :class="class"
  >
    <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  class: { type: String, default: '' },
})
</script>