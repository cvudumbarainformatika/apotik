<script setup>
const props = defineProps({
  label: { type: String, required: true },
  modelValue: [String, Number],
  id: { type: String, default: () => `select-${Math.random().toString(36).substring(2, 8)}` },
  options: {
    type: Array,
    required: true, // Format: [{ label: 'Tampilkan', value: '1' }, ...]
  },
  placeholder: { type: String, default: ' ' },
  error: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative w-full">
    <!-- Select -->
    <select
      :id="id"
      :value="modelValue"
      @change="emit('update:modelValue', $event.target.value)"

      v-bind="$attrs"
      :class="[
        'peer w-full px-5 py-3 text-sm bg-transparent  border  rounded-full focus:outline-none focus:ring-1  transition appearance-none duration-200',
        error ? 'border-danger focus:border-danger focus:ring-danger text-danger' : 'border-light-primary focus:border-primary focus:ring-primary text-primary',
      ]"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value"> 
        {{ opt.label }}
      </option>
    </select>

    <!-- Floating Label -->
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

    <!-- Error icon & message -->
    <div
      v-if="error && errorMessage"
      class="absolute inset-y-0 right-0 flex items-center gap-1 px-2 bg-white dark:bg-background rounded-r-xl"
    >
      <!-- Kotak error diputar 90 -->
      <div class="w-6 h-6 flex items-center justify-center border border-danger text-danger bg-white dark:bg-background rounded-sm rotate-90">
        <span class="-rotate-90 text-md font-bold">!</span>
      </div>
      <!-- Pesan -->
      <p class="text-xs text-danger whitespace-nowrap">{{ errorMessage }}</p>
    </div>
  </div>
</template>
