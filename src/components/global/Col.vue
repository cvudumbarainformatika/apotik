<script setup>
const props = defineProps({
  gap: { type: String, default: 'gap-2' },
  justify: { type: String, default: 'justify-start' },
  align: { type: String, default: 'items-start' },
  wrap: { type: Boolean, default: false },
  class: { type: String, default: '' },
})
</script>

<template>
  <div :class="`flex flex-col ${gap} ${justify} ${align} ${wrap ? 'flex-wrap' : ''} ${props.class}`">
    <slot />
  </div>
</template>
