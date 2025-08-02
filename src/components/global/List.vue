<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  striped: {
    type: Boolean,
    default: false,
  },
  spaced: {
    type: Boolean,
    default: true,
  },
  anim: {
    type: Boolean,
    default: false,
  },
  mb: {
    type: [String, Number],
    default: 80,
  }
})
</script>

<template>
  <div class="w-full">
    <!-- Optional Header -->
    <div v-if="$slots.header" class="mb-2">
      <slot name="header" />
    </div>

    <ul
      class="w-full divide-y divide-gray-200 rounded-md overflow-visible"
      :class="[
        bordered && !spaced ? 'border border-gray-300' : '',
        spaced ? 'space-y-1' : '',
      ]"
    >
      <li
        v-for="(item, index) in items"
        :key="item"
        :class="[
          `flex items-center flex-1 bg-background hover:bg-secondary  transition-all duration-300  hover:shadow-lg relative ${anim ? 'hover:translate-y-[2px]'  : ''}`,
          striped && index % 2 === 1 ? 'bg-gray-50' : '',
          spaced ? 'border border-light-primary/50 hover:border-light-primary rounded-md' : 'border border-light-primary/50 hover:border-light-primary',
        ]"
      >
        <!-- If item slot provided, use it -->
        <slot name="item" :item="item" :index="index">
          <!-- Default rendering -->
          <div >{{ item }}</div>
        </slot>
      </li>

      <div v-if="mb" :style="`margin-bottom: ${mb}px`"></div>
    </ul>
  </div>
</template>
