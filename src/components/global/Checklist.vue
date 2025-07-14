<template>
  <label class="inline-flex items-center space-x-2 cursor-pointer select-none">
    <input
      type="checkbox"
      class="form-checkbox h-5 w-5 text-primary rounded-md border-primary focus:ring-primary"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="text-primary">{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>
