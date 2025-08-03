
<template>
  <u-page>
    <!-- Header Search & Action -->
    <u-view class="w-full" padding="pt-1 px-4">
      <u-row flex1>
        <div class="font-bold text-lg text-primary">{{ title }}</div>
      </u-row>
    </u-view>
    <u-separator />
    <u-view>
      
      <u-row flex1 class="w-full justify-between">
        <u-row>
          <slot name="search">
            <u-input-search
              v-model="store.q"
              @update:modelValue="store.setSearch"
              :debounce="500"
            />
          </slot>
        </u-row>

        <u-row class="gap-2">
          <slot name="actions">
            <u-btn-icon tooltip="Tambah Data" @click="onAdd" />
            <u-btn-icon icon="rotate-cw" tooltip="Refresh" @click="onRefresh" />
          </slot>
        </u-row>
      </u-row>
    </u-view>

    <!-- Content -->
    
    <u-view ref="uViewRef" class="w-full" flex1 :scrollY="store.items.length > 0">
      <u-list v-if="store.items.length" :items="store.items">
        <template #item="{ item }">
          <slot name="item" :item="item" />
        </template>
      </u-list>
      <u-empty :title="store.emptyTitle" :subtitle="store.emptySubtitle" v-else-if="!store.loading" />
      <!-- ⬇️ Loading indicator ketika fetchMore aktif dan ketika mode loadMore -->
      <div v-if="store.loadingMore && isLoadMore"  class="flex justify-center items-center py-1">
        <svg
          class="animate-spin h-6 w-6 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span class="ml-2 text-sm text-gray-500">Memuat data...</span>
      </div>
    </u-view>

    <!-- modal form -->
     <slot name="modal-form" />
  </u-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'

const props = defineProps({
  store: { type: Object, required: true },
  title: { type: String, default: 'Data' },
  isLoadMore: { type: Boolean, default: true },
  onAdd: { type: Function, default: () => {} }, // ✅ supaya tidak error saat dipanggil
  onRefresh: Function // ✅ hanya dipanggil kalau diberikan
})

const emit = defineEmits(['close', 'save'])

// Ref ke u-view
const uViewRef = ref()

// Scroll bottom watcher
watch(
  () => uViewRef.value?.arrivedState?.bottom,
  (val) => {
    // console.log('on bottom', val);
    if (val && !props.store.loadingMore && props.store?.page < props.store?.meta?.last_page) {
      props.store?.fetchMore()
      
    }
  }
)

</script>
