<script setup>
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  id: { type: String, default: () => `input-${Math.random().toString(36).substring(2, 8)}` },
  placeholder: { type: String, default: ' ' }, // default harus ada spasi agar placeholder-shown berfungsi
  error: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
  noMatchText: { type: String, default: 'Tidak ditemukan' },

  options: { type: Array, default: () => [] }, // [{ label, value }]
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const hasValue = computed(() => !!modelValue)

const isFocussed = ref(false)

const query = ref('')
const open = ref(false)
const activeIndex = ref(-1)

watch(() => props.modelValue, () => {
  const match = props.options.find(opt => opt.value === props.modelValue)
  query.value = match?.label || ''
})

const filteredOptions = computed(() =>
  query.value.trim() === ''
    ? props.options
    : props.options.filter(opt =>
        opt.label.toLowerCase().includes(query.value.toLowerCase())
      )
)

const matchingValue = computed(() =>
  query.value.trim().toLowerCase()
)

const allOptions = computed(() => props.options)

function isActive(opt) {
  return matchingValue.value && opt.label.toLowerCase().includes(matchingValue.value)
}

function select(opt) {
  console.log('opt',opt);
  
  query.value = opt.label
  open.value = false
  emit('update:modelValue', opt.value)
  activeIndex.value = -1
}

function clear() {
  query.value = ''
  emit('update:modelValue', null)
  open.value = false
}

const handleFocus = () => {
  emit('focus')
  isFocussed.value = true
  open.value = true
}

const handleBlur = () => {
  console.log('blur');
  
  emit('blur')
  isFocussed.value = false
  // open.value = false
}

function onKeyDown(e) {
  if (!open.value && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
    open.value = true
  }
  const max = props.options.length

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % max
    scrollToActive()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + max) % max
    scrollToActive()
  } else if (e.key === 'Enter') {
    if (activeIndex.value >= 0) {
      select(props.options[activeIndex.value])
      e.preventDefault()
    }
  } else if (e.key === 'Escape') {
    open.value = false
    activeIndex.value = -1
  }
}

// Klik di luar = tutup dropdown
function handleClickOutside(e) {
  if (!e.target.closest('.autocomplete-wrapper')) {
    open.value = false
    activeIndex.value = -1
  }
}

function scrollToActive() {
  nextTick(() => {
    const el = document.querySelector('.autocomplete-active')
    if (el) el.scrollIntoView({ block: 'nearest' })
  })
}

function getHighlightedLabel(label) {
  if (!matching.value) return label
  const regex = new RegExp(`(${matching.value})`, 'gi')
  return label.replace(regex, '<strong>$1</strong>')
}

onMounted(() => window.addEventListener('click', handleClickOutside))
onUnmounted(() => window.removeEventListener('click', handleClickOutside))

</script>

<template>
  <div class="relative w-full autocomplete-wrapper">
    <!-- Input -->
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="open = true"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="onKeyDown"
      v-bind="$attrs"

      :class="[
        'peer w-full px-5 py-3 text-sm bg-transparent  border  rounded-full focus:outline-none focus:ring-1  transition duration-200',
        error ? 'border-danger focus:border-danger focus:ring-danger text-danger' : 'border-light-primary focus:border-primary focus:ring-primary text-primary',
      ]"

    />

    <!-- Floating Label (Overlay on border top) -->
    <label
      :for="id"
      :class="[
        'absolute left-4 -top-2 px-2 text-xs text-background  rounded-lg transition-all duration-200',
        'peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm  peer-placeholder-shown:bg-transparent',
        'peer-focus:-top-2 peer-focus:text-xs peer-focus:text-background ',
        error ? 'bg-danger peer-placeholder-shown:text-danger peer-focus:bg-danger peer-focus' : 'bg-light-primary peer-placeholder-shown:text-gray-600 peer-focus:bg-light-primary peer-focus'
      ]"
    >
      {{ label }}
    </label>

    <!-- Clear button -->
    <button
      v-if="query"
      type="button"
      class="absolute right-4 top-1/2 -translate-y-1/2 text-light-primary hover:text-primary transition duration-200"
      @click="clear"
    >
      &times;
    </button>


   <!-- Error icon & message overlay -->
    <div
      v-if="error && errorMessage && !isFocussed"
      class="absolute inset-y-0 right-0 flex items-center gap-1 px-2 bg-transparent rounded-r-xl"
    >
      <!-- Error message -->
      <p class="text-xs text-danger whitespace-nowrap mr-2">
        {{ label }} {{ errorMessage }}
      </p>
      <!-- Error icon -->
      <div class="w-5 h-5 flex items-center justify-center text-danger border border-danger border-2 rounded-sm text-sm font-bold rotate-45">
        <span class="-rotate-45 text-md font-bold">!</span>
      </div>

      
    </div>



    <!-- Dropdown -->
    <div
      v-if="open"
      class="absolute z-50 w-full bg-secondary border rounded-xl shadow-lg max-h-90 overflow-auto"
    >
      <template v-if="filteredOptions.length > 0">

        <div
          v-for="(opt, idx) in allOptions"
          :key="opt.value"
          @click="select(opt)"
          class="px-4 py-2 hover:bg-primary/10 hover:text-white cursor-pointer transition"
          :class="{ 
            'bg-primary/10': idx === activeIndex, 
            'bg-light-primary text-white font-semibold': isActive(opt)
            }"
        >
          <slot name="option" :option="opt">{{ opt.label }} <span v-if="isActive(opt)">✔</span></slot>
        </div>
      </template>
      <div v-else class="px-4 py-2 text-sm ">
        {{ noMatchText }}
      </div>
    </div>



  </div>
</template>

<style scoped>
</style>