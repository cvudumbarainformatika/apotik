<script setup>
const props = defineProps({
  flex: { type: String, default: 'flex' },
  padding: { type: String, default: 'p-2' },
  class: { type: String, default: '' },
  flex1: { type: Boolean, default: false },
  scrollY: { type: Boolean, default: false },
  rounded: { type: String, default: '' },
})
</script>

<template>
  <div :class="[
    rounded, flex, props.class, padding, 
    flex1 ? 'flex-1' : '', scrollY ? 'overflow-y-scroll pb-32' : ''
  ]">
    <slot />
  </div>
</template>
