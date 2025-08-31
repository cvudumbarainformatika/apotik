<template>
  <u-view padding="0" flex1 class="w-full">
    <table flex1 class="w-full text-sm border-separate [border-spacing:0]">
      <thead>
        <tr>
          <td class="td text-left p-1">Tanggal Penerimaan</td>
          <td class="td text-left p-1">Nomor Penerimaan</td>
          <td class="td text-left p-1">Supplier</td>
          <td class="td text-left p-1">Penerimaan</td>
          <td class="td text-left p-1">Retur</td>
          <td class="td text-right p-1">Saldo</td>
        </tr>
      </thead>
      <tbody>
        <template v-for="(it, index) in store.items" :key="index">
          <tr>
            <td class="td p-1 align-top text-left">{{ formatDateIndo(it.tgl_penerimaan) }}</td>
            <td class="td p-1 align-top text-left">{{ it?.nopenerimaan || '-' }}</td>
            <td class="td p-1 align-top text-left">{{ it?.suplier || '-' }}</td>
          </tr>
          <template v-for="el in it.rincian" :key="el">
            <tr>
              <td colspan="3" class="td p-1 align-top text-left"></td>
              <td class="td p-1 align-top text-left">
                <div> {{ el?.barang?.nama }}</div>
                <div>Jumlah Item {{ el?.jumlah_b }} {{ el?.satuan_b }} </div>
              </td>
            </tr>
          </template>
          
        </template>
      </tbody>
    </table>
    <div> {{ mapItems }} </div>
    <!-- <modal-detail v-if="openModalDetail" v-model="openModalDetail" title="Detail Kartu Stok" :store="store" 
    @close="handleCloseModalNota" /> -->
  </u-view>
</template>

<script setup>
import { api } from '@/services/api'
import { formatDateIndo, useWaktuLaluReactive } from '@/utils/dateHelper'
import { formatRupiah } from '@/utils/numberHelper'
import { defineAsyncComponent, onMounted, ref, watch } from 'vue'
import { computed } from 'vue'
const props = defineProps({
  store: { type: Object, required: true },
  item: { type: Object, default: null },
  range: { type: Object, default: null },
})
// const ModalDetail = defineAsyncComponent(() => import('./ModalDetail.vue'))
// const openModalDetail = ref(false)
onMounted(() => {

  // if (props.range) {
  //   fetchDetail()
  // }
})  
const mapItems = computed(() => {
  const map = new Map()
  const items = props.store.items
  items.forEach(item => {
    const key = item.nopenerimaan
    const rinci = item.rincian
    console.log('key', key)
    if (!map.has(key)) {
      map.set(key, {
        nopenerimaan: item.nopenerimaan,
        tanggal: item.tgl_penerimaan,
        suplier: item.suplier,
        totalpenerimaan: rinci
      })
    }
  })
  console.log('map', map)

})

</script>