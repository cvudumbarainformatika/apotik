<template>
  <u-page>
    <div class="flex-1 flex flex-row  gap-0 md:gap-2 w-full h-full" >
      <!-- KOLOM KIRI -->
      <div class="kiri h-full" :class="store?.maxRight ? 'hidden' : 'flex-1 flex flex-col w-full'">
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
      <u-card padding="p-4" class="kanan hidden sm:flex flex-col h-full overflow-y-scroll transition-all duration-100" :class="store?.maxRight ? 'w-full' : ' w-1/4'"   >
        <!-- <u-page padding="p-0" class="bg-yellow-500"> -->
          <u-view class="w-full" padding="pt-0">
            <u-row flex1>
              <div class="font-medium text-base text-primary flex-1">{{ titleKanan }}</div>
              <u-icon :name="store.maxRight ? 'shrink' : 'maximize'" 
                class="w-5 h-5 cursor-pointer" 
                @click="store.maxRight = !store.maxRight" 
              />
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
  titleKanan: { type: String, default: 'Riwayat' },
  isLoadMore: { type: Boolean, default: true },
  onAdd: { type: Function, default: () => {} }, // ✅ supaya tidak error saat dipanggil
  onRefresh: Function // ✅ hanya dipanggil kalau diberikan
})
</script>