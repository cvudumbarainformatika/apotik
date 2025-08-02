<template>
  <base-transaksi :title="title" :titleKanan="`Riwayat ${title}`" :store="store">
    <template #kiri>
      <FormPage :store="store" :title="title" :mode="store.mode" />
    </template>
    <template #kanan>
      <ListPage :store="store" :items="store.items" />
    </template>
  </base-transaksi>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useOrderStore } from '@/stores/template/register'
import { useRoute } from 'vue-router'
const BaseTransaksi = defineAsyncComponent(() => import('@/components/templates/BaseTransaksi.vue'))
const FormPage = defineAsyncComponent(() => import('./FormPage.vue'))
const ListPage = defineAsyncComponent(() => import('./ListPage.vue'))



const store = useOrderStore()
const route = useRoute()
const title = computed(() => route?.meta?.title)

onMounted(() => {
  // console.log('Mounted ', title.value);
  
  store.per_page = 20
  Promise.all([
    store.fetchAll()
  ])
})

</script>