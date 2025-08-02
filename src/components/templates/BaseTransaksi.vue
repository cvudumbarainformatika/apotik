<template>
  <u-page>
    <div class="flex-1 flex flex-row  gap-0 md:gap-2 w-full h-full" >
      <!-- KOLOM KIRI -->
      <div class="kiri flex-1 flex flex-col w-full h-full">
        <!-- <u-page padding="p-0 -pb-10" class=" "> -->
          <u-view class="w-full" padding="pt-0">
            <u-row flex1>
              <div class="font-medium text-lg text-primary">{{ title }}</div>
            </u-row>
          </u-view>
          <u-separator />

          <u-view flex1 scrollY class="w-full " padding="p-0">
            <slot name="kiri"></slot>
             
          </u-view>
        <!-- </u-page> -->
        
      </div>

      <!-- KOLOM KANAN -->
      <u-card class="kanan hidden sm:flex flex-col w-1/4 h-full bg-orange-500 overflow-y-scroll"   >
        <!-- <u-page padding="p-0" class="bg-yellow-500"> -->
          <u-view class="w-full" padding="pt-0">
            <u-row flex1>
              <div class="font-medium text-base text-primary">Riwayat Transaksi</div>
            </u-row>
          </u-view>
          <u-separator />

          <u-view flex1 scrollY class="w-full" padding="p-0">
            <slot name="kanan"></slot>
          </u-view>
        <!-- </u-page> -->

      </u-card>
    </div>
  </u-page>
</template>

<script setup>
const props = defineProps({
  store: { type: Object, required: true },
  title: { type: String, default: 'Title' },
  isLoadMore: { type: Boolean, default: true },
  onAdd: { type: Function, default: () => {} }, // ✅ supaya tidak error saat dipanggil
  onRefresh: Function // ✅ hanya dipanggil kalau diberikan
})
</script>