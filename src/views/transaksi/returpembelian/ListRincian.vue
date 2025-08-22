<template>
  <u-view flex1 class="w-full">
    <u-grid cols="4">
      <u-col class="col-span-2" gap="gap-0">
        <u-text class="font-bold">{{ item?.barang?.nama || '-' }}</u-text>
        <u-text size="xs" color="text-gray-500">{{ item?.barang?.kode || '-' }} | Exp : {{ item?.tgl_exprd || '-' }}</u-text>
         <u-text size="xs" color="text-gray-500">No Batch : {{ item?.nobatch || '-' }}</u-text>
      </u-col>
      <u-col align="items-end" class="col-span-2" gap="gap-0">
        <u-text size="lg" class="font-bold" color="text-gray-500">{{ item?.jumlahretur_b || 0 }} <span class="text-xs font-normal">{{ item?.satuan_b }}</span></u-text>
       

      </u-col>
    </u-grid>
  </u-view>
</template>

<script setup>
import { formatDateIndo } from '@/utils/dateHelper'
const props = defineProps({
  item: { type: Object, default: null },
  store: { type: Object, required: true },
})


console.log('item', props.item);

</script>