<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  id: { type: String, default: () => `input-${Math.random().toString(36).substring(2, 8)}` },
  placeholder: { type: String, default: 'Cari ... ' }, // default harus ada spasi agar placeholder-shown berfungsi
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const hasValue = computed(() => !!modelValue)

const isFocussed = ref(false)

const handleFocus = () => {
  emit('focus')
  isFocussed.value = true
}

const handleBlur = () => {
  emit('blur')
  isFocussed.value = false
}

</script>

<template>
  <div class="relative w-full min-w-[280px]">
    <!-- Input -->
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
      @focus="handleFocus"
      @blur="handleBlur"
      v-bind="$attrs"

      :class="[
        'peer w-full px-5 py-2 bg-transparent border rounded-full focus:outline-none focus:ring-1 transition duration-200'
      ]"

    />
    <div class="absolute inset-y-0 right-0 flex items-center gap-1 px-4 bg-transparent rounded-r-full bg-grady-primary text-secondary peer-focus:text-background peer-focus:bg-grady-primary-hover">
      <u-icon name="search" class="w-5 h-5" />
    </div>
  </div>
</template>

<style scoped>
</style>