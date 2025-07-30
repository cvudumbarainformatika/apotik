<template>
  <u-page>
    <div class="flex-1 flex flex-row bg-red-500 gap-0 md:gap-2">
      <!-- KOLOM KIRI -->
      <div class="kiri flex-1 flex flex-col  overflow-hidden">
        <u-page padding="p-0" class="bg-yellow-500">
          <u-view class="w-full" padding="pt-0">
            <u-row flex1>
              <div class="font-medium text-lg text-primary">{{ title }}</div>
            </u-row>
          </u-view>
          <u-separator />

          <u-view flex1 class="w-full bg-amber-100" padding="p-0">
            <slot name="kiri"></slot>
          </u-view>
        </u-page>
        
      </div>

      <!-- KOLOM KANAN -->
      <div class="kanan hidden sm:flex flex-col bg-orange-500">
        <u-page padding="p-0" class="bg-yellow-500">
          <u-view class="w-full" padding="pt-0">
            <u-row flex1>
              <div class="font-bold text-lg text-primary">Riwayat Transaksi</div>
            </u-row>
          </u-view>
          <u-separator />
        </u-page>

      </div>
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