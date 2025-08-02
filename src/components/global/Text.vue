<template>
  <div 
    :class="`text-${size} text-gray-900 dark:text-white ${props.class}`"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  label: { type: String, default: '' },
  class: { type: String, default: '' },
  size: { type: String, default: 'xs' },
})

const textClass = computed(() => `text-${props.size} text-gray-900 dark:text-white`)
</script>