<template>
  <u-page>
    <u-view>
      <u-row flex1 class="w-full">
        <u-row class="">
          <u-input-search />
          <u-btn-icon tooltip="Tambah Data" />
          <u-btn-icon icon="rotate-cw" tooltip="Refresh" />
        </u-row>
      </u-row>
    </u-view>
     <u-view flex1 :scrollY="items.length > 0">
      <u-list v-if="items.length" :items="items">
        <template #item="{ item }">
          <u-col gap="gap-1" class="w-full px-4 py-1">
            <u-view padding="0" flex1 class="w-full">
              <u-row class=" ">
                <div class="font-bold">Header</div>
              </u-row>
              <u-row flex1 right class="">
                bbb
              </u-row>
            </u-view>
            <u-separator />
            <u-view padding="0" flex1 class="w-full">
              <u-row class="">
                <u-col gap="gap-1">
                  <div class="">Header</div>
                  <div class="text-sm text-light-primary">Sub Header</div>
                </u-col>
              </u-row>
              <u-row flex1 right class="">
                <u-btndrop label="Menu" :items="['Profile', 'Settings', 'Logout']" />
              </u-row>
            </u-view>
          </u-col>
        </template>
      </u-list>
      <u-empty v-else></u-empty>
     </u-view>
  </u-page>
</template>

<script setup>
import { ref } from 'vue'
const items = ref([])
</script>