<template>
  <u-list :items="items" anim>
    <template #item="{ item }">
      <u-view padding="px-3 py-3" flex1 class="w-full cursor-pointer" @click="handleEdit(item)">
        <u-grid cols="2" >
          <u-row flex1>
            <u-row>
              <u-avatar size="w-8 h-8" :label="item?.supplier?.nama"></u-avatar>
            </u-row>
            <u-row flex1>
              <u-col gap="gap-0" class="w-full">
                <u-text class="font-bold" color="text-gray-500">{{ item?.supplier?.nama }}</u-text>
                <u-row>
                  <u-icon size="14" name="shopping-cart"></u-icon>
                  <u-text class="" color="text-gray-500">{{ item?.order_records?.length }} items</u-text>
                </u-row>
              </u-col>
            </u-row>
          </u-row>

          <u-col align="items-end" gap="gap-0" class="" padding="p-0">
            <u-icon name="lock-open" size="18" class="mb-1" :class="!item?.flag ? 'text-success' : 'text-danger'" />
            <u-text color="text-gray-500" style="font-size: 10px !important;">{{ useWaktuLaluReactive(item?.created_at) }}</u-text>
          </u-col>

          <!-- <u-col align="items-end" gap="gap-0" class="w-full -mt-4 p-0" padding="p-0">
            <u-text color="text-gray-400">{{ useWaktuLaluReactive(item?.created_at) }}</u-text>
          </u-col> -->
        </u-grid>
      </u-view>
    </template>
  </u-list>
</template>

<script setup>
import { useWaktuLaluReactive } from '@/utils/dateHelper'
const props = defineProps({
  store: { type: Object, required: true },
  items: { type: Array, default: ()=> [] },
})


const handleEdit = (item) => {
  props.store.initModeEdit(item)
}

</script>