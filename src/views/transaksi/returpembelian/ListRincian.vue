<template>
  <u-view flex1 class="w-full">
    <u-grid cols="4">
      <u-col class="col-span-2" gap="gap-0">
        <u-text class="font-bold">{{ item?.barang?.nama || '-' }}</u-text>
        <u-text color="text-gray-400">{{ item?.barang?.kode || '-' }}</u-text>
      </u-col>
      <u-col align="items-end" class="col-span-2" gap="gap-0">
        <u-text size="lg" class="font-bold" color="text-gray-500">{{ item?.jumlahretur_b || 0 }} <span class="text-xs">{{ item?.satuan_b }}</span></u-text>
      </u-col>
    </u-grid>
  </u-view>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, default: null },
  store: { type: Object, required: true },
})
</script>