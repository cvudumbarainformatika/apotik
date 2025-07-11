
<template>
  <u-page>
    <!-- Header Search & Action -->
    <u-view class="w-full" padding="py-1 px-4">
      <u-row flex1>
        <u-title :label="title" />
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
    <u-view flex1 :scrollY="store.items.length > 0">
      <u-list v-if="store.items.length" :items="store.items">
        <template #item="{ item }">
          <slot name="item" :item="item" />
        </template>
      </u-list>
      <u-empty :title="store.emptyTitle" :subtitle="store.emptySubtitle" v-else />
    </u-view>

    <!-- modal form -->
     <slot name="modal-form" />
  </u-page>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  store: { type: Object, required: true },
  title: { type: String, default: 'Data' },
  onAdd: { type: Function, default: () => {} }, // ✅ supaya tidak error saat dipanggil
  onRefresh: Function // ✅ hanya dipanggil kalau diberikan
})


// console.log(route);


</script>
