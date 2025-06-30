<script setup>
const props = defineProps({
  gap: { type: String, default: 'gap-2' },
  justify: { type: String, default: 'justify-start' },
  align: { type: String, default: 'items-start' },
  wrap: { type: Boolean, default: false },
  class: { type: String, default: '' },
  flex1: { type: Boolean, default: false },
  separator: { type: Boolean, default: false },
})
</script>

<template>
  <div :class="`flex flex-row ${gap} ${justify} ${align} ${wrap ? 'flex-wrap' : ''} ${flex1 ? 'flex-1' : ''} ${props.class} ${separator ? 'border-b border-primary dark:border-gray-700' : ''}`">
    <slot />
  </div>
</template>
