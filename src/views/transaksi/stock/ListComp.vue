<template>
  <u-col gap="gap-1" class="w-full px-4 py-1">
    <u-view padding="0" flex1 class="w-full">
      <u-row flex1 class="w-full">
        <u-col flex1 class="w-full" gap="gap-1">
          <u-row flex1 class="w-full pt-1">
            <u-row flex1 class="w-full">
              <div class="font-bold uppercase">{{ item?.barang.nama }}</div>
              <div class="italic text-light-primary text-xs">{{ item?.barang.kode }}</div>
            </u-row>
            <u-row class="">
              <span>Stok : {{ formatStock(item) }}</span>
            </u-row>
          </u-row>
          <u-separator></u-separator>

          <u-grid cols="10">
            <u-row class="col-span-1">
              <span class="font-medium">No Penerimaan</span>
            </u-row>
            <u-row class="col-span-9">
              <span>: {{ item?.nopenerimaan }}</span>
            </u-row>
          </u-grid>

          <u-grid cols="10">
            <u-row class="col-span-1">
              <span class="font-medium">No Batch</span>
            </u-row>
            <u-row class="col-span-9">
              <span>: {{ item?.nobatch }}</span>
            </u-row>
          </u-grid>

          <u-grid cols="10">
            <u-row class="col-span-5">
              <u-grid cols="5">
                <u-row class="col-span-2">
                  <span class="font-medium">Satuan Besar</span>
                </u-row>
                <u-row class="col-span-3">
                  <span>: {{ item?.satuan_b }}</span>
                </u-row>
              </u-grid>
              <u-grid cols="5">
                <u-row class="col-span-2">
                  <span class="font-medium">Satuan Kecil</span>
                </u-row>
                <u-row class="col-span-3">
                  <span>: {{ item?.satuan_k }}</span>
                </u-row>
              </u-grid>
            </u-row>
            <u-row class="col-span-5">
            </u-row>
          </u-grid>

          <u-grid cols="10">
            <u-row class="col-span-1">
              <span class="font-medium">Isi Satuan Besar</span>
            </u-row>
            <u-row class="col-span-9">
              <span>: {{ item?.isi }}</span>
            </u-row>
          </u-grid>

          <u-grid cols="10">
            <u-row class="col-span-5">
              <u-grid cols="5">
                <u-row class="col-span-2">
                  <span class="font-medium">Harga Resep</span>
                </u-row>
                <u-row class="col-span-3">
                  <span>: {{ item?.barang.harga_jual_resep_k }}</span>
                </u-row>
              </u-grid>
              <u-grid cols="5">
                <u-row class="col-span-2">
                  <span class="font-medium">Harga Biasa</span>
                </u-row>
                <u-row class="col-span-3">
                  <span>: {{ item?.barang.harga_jual_biasa_k }}</span>
                </u-row>
              </u-grid>
            </u-row>
            <u-row class="col-span-5">

            </u-row>
          </u-grid>

          <u-grid cols="10">
            <u-row class="col-span-1">
              <span class="font-medium">Kandungan</span>
            </u-row>
            <u-row class="col-span-9">
              <span>: {{ item?.barang.kandungan }}</span>
            </u-row>
          </u-grid>

          <u-grid cols="10">
            <u-row class="col-span-1">
              <span class="font-medium">Tgl Expired</span>
            </u-row>
            <u-row class="col-span-9">
              <span>: {{ item?.tgl_exprd }}</span>
            </u-row>
          </u-grid>
        </u-col>
      </u-row>
      <u-row right class="">
      </u-row>
    </u-view>
  </u-col>
</template>

<script setup>
import { useWaktuLaluReactive } from '@/utils/dateHelper'

const props = defineProps({
  item: { type: Object, default: null },
})

const emit = defineEmits(['show-detail'])

function showDetail() {
  emit('show-detail', props.item)
}

function formatStock(item) {
  if (!item) return '-'
  const jumlah = item.jumlah_k || 0
  const satuan = item.satuan_k || ''
  return `${jumlah} ${satuan}`.trim() || '-'
}
</script>