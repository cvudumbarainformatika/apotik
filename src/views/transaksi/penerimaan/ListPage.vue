<template>
  <u-list :items="items" anim>
    <template #item="{ item }">
      <u-view padding="px-3 py-3" flex1 class="w-full cursor-pointer" @click="handleEdit(item)">
        <u-row flex1 class="w-full">
          <u-row flex1>
            <!-- <u-row>
              <u-avatar size="w-8 h-8" :label="item?.supplier?.nama"></u-avatar>
            </u-row> -->
            <u-row flex1>
              <u-col gap="gap-0" class="w-full">
                <u-row flex1>

                  <u-text class="font-bold" color="text-gray-500">{{ item?.nopenerimaan }}</u-text>
                  <u-text class="" color="text-primary">Rp. {{ formatRupiah(totalPenerimaan) }}</u-text>
                </u-row>
                <u-row>
                  <u-icon size="14" name="file-check-2"></u-icon>
                  <u-text class="" color="text-gray-500">{{ item?.suplier?.nama }}</u-text>
                </u-row>
              </u-col>
            </u-row>
          </u-row>

          <u-col align="items-end" gap="gap-0" class="" padding="p-0">
            <u-icon name="lock-open" size="18" class="mb-1" :class="!item?.flag ? 'text-success' : 'text-danger'" />
            <u-text color="text-gray-500" style="font-size: 10px !important;">{{ useWaktuLaluReactive(item?.created_at)
              }}</u-text>
          </u-col>
          <!-- <u-col align="items-end" gap="gap-0" class="w-full -mt-4 p-0" padding="p-0">
            <u-text color="text-gray-400">{{ useWaktuLaluReactive(item?.created_at) }}</u-text>
          </u-col> -->
        </u-row>
      </u-view>
    </template>

  </u-list>
</template>

<script setup>
import { useWaktuLaluReactive } from '@/utils/dateHelper'
import { computed } from 'vue';
import { formatRupiah } from '../../../utils/numberHelper';
const props = defineProps({
  store: { type: Object, required: true },
  items: { type: Array, default: ()=> [] },
})


const handleEdit = (item) => {
  console.log('handleEdit', item);
  props.store.initModeEdit(item)
}

const totalPenerimaan = computed(() => {
  const data = props.items?.map((x) => x.rincian).flat();
  const totals = []
  for (let i = 0; i < data.length; i++) {
    const el = data[i];
    const total = parseFloat(el?.subtotal)
    totals.push(total);
  }
  console.log('totals', totals);
  return totals
});

</script>