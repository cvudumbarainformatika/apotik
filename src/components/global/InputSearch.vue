<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  id: { type: String, default: () => `input-${Math.random().toString(36).substring(2, 8)}` },
  placeholder: { type: String, default: 'Cari ... ' }, // default harus ada spasi agar placeholder-shown berfungsi
  debounce: { type: Number, default: 500 },
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])


const inputValue = ref(props.modelValue)
const isFocussed = ref(false)

const hasValue = computed(() => !!inputValue.value)

// ✅ Sinkronisasi ke modelValue luar
watch(() => props.modelValue, (val) => {
  inputValue.value = val
})

const handleFocus = () => {
  emit('focus')
  isFocussed.value = true
}

const handleBlur = () => {
  emit('blur')
  isFocussed.value = false
}


let debounceTimeout
const handleSearch = (e) => {
  inputValue.value = e.target.value

  if (props.debounce > 0) {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      emit('update:modelValue', inputValue.value)
    }, props.debounce)
  } else {
    emit('update:modelValue', inputValue.value)
  }
  
}

function clear() {
  inputValue.value = ''
  emit('update:modelValue', '')
}

</script>

<template>
  <div class="relative w-full min-w-[280px]">
    <!-- Input -->
    <input
      :id="id"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      :aria-label="placeholder"
      @input="handleSearch"
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
    <div
      v-if="hasValue"
      class="absolute right-14 top-1/2 -translate-y-1/2 cursor-pointer bg-secondary rounded-md p-1"
      @click="clear"
    >
      <u-icon name="x" class="w-4 h-4 text-primary hover:text-red-500" />
    </div>
  </div>
</template>

<style scoped>
input:focus + div {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
</style>