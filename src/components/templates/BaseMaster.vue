
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
    
    <u-view ref="uViewRef" class="w-full relative" flex1 scrollY>
      <!-- <div class="absolute inset-0 top-12">
        <u-load-spinner></u-load-spinner>
      </div> -->
      <div v-if="store.loading" class="w-full" >
        <slot name="loading">
          <u-load-spinner></u-load-spinner>
        </slot>
      </div>
      <u-list v-else-if="store.items.length" :items="store.items">
        <template #item="{ item }">
          <slot name="item" :item="item" />
        </template>
      </u-list>
      <u-empty :title="store.emptyTitle" :subtitle="store.emptySubtitle" v-else-if="!store.loading && !store.items.length" />
      <!-- ⬇️ Loading indicator ketika fetchMore aktif dan ketika mode loadMore -->
      <u-load-spinner v-if="store.loadingMore && isLoadMore" />
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
  onAdd: Function, // ✅ supaya tidak error saat dipanggil
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
