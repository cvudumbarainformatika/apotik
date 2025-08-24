<template>
  <base-master :title="title" :store="store" :showDateButton="true" :showAddButton="false" :onRange="handleRange" :onRefresh="handleRefresh">
    <template #loading>
      <LoaderItem />
    </template>
    <template #item="{ item }">
      <Suspense>
        <template #default>
          <list-comp :item="item" :store="store" :range="dateRange"  />
        </template>
        <template #fallback>
          <LoaderItem />
        </template>
      </Suspense>
    </template>
    <!-- <template #modal-form>
      <modal-form v-if="store.modalFormOpen" v-model="store.modalFormOpen" :mode="store.item ? 'edit' : 'add'"
        :title="title" :store="store" @close="store.modalFormOpen = false" @save="handleSave" />
    </template> -->

  </base-master>
</template>

<script setup>
import { defineAsyncComponent, onMounted, computed, ref, onBeforeMount } from 'vue'
import { useKartuStokStore } from '@/stores/template/register'
import { useRoute } from 'vue-router'
import { inject } from 'vue'
import BaseMaster from '@/components/templates/BaseMaster.vue'
import LoaderItem from './LoaderItem.vue'
import { api } from '@/services/api'
const $confirm = inject('confirm')


const ListComp = defineAsyncComponent(() => import('./ListComp.vue'))
const ModalForm = defineAsyncComponent(() => import('./ModalDetail.vue'))
const store = useKartuStokStore()
const route = useRoute()
const title = computed(() => route.meta.title)
const dateRange = ref({})
onMounted(async () => {
 
  store.per_page = 100
  Promise.all([
    handleRange(),
    getCurrentDate()
  ])
})
function toLocalDateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
const getCurrentDate = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  dateRange.value = {
    start_date: toLocalDateString(start),
    end_date: toLocalDateString(end),
  }
}
const handleRange = async () => {
  // console.log('handleRange', store.range);
  store.loading = true
  store.items = []
  try {
    const response = await api.get(`api/v1/transactions/stok/get-kartu-stok`, {params: dateRange.value})
    if (response) {
      store.items = response.data.data
    }
  } catch (error) {
    console.error('Error fetching Kartu Stok:', error)
  } finally {
    store.loading = false
  }
  // console.log('items', store.items);
}
function handleRefresh() {
  // console.log('Refresh List')
  handleRange()
}

</script>

