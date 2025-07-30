<template>
  <base-transaksi :title="title" :store="store">
    <template #kiri>
      <u-page padding="p-0">
        <u-view flex1 class="w-full bg-amber-700" padding="pt-0">
          <!--  -->
        </u-view>
        <u-view flex1 class="w-full bg-accent-700" padding="pt-0">
          aaa
        </u-view>
      </u-page>
    </template>
  </base-transaksi>
</template>

<script setup>
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useOrderStore } from '@/stores/template/register'
import { useRoute } from 'vue-router'
const BaseTransaksi = defineAsyncComponent(() => import('@/components/templates/BaseTransaksi.vue'))



const store = useOrderStore()
const route = useRoute()
const title = computed(() => route?.meta?.title)

</script>