<template>
  <u-col class="w-full pb-4 pt-1 px-2 relative">
    <!-- <u-grid cols="5">
    </u-grid>
   -->
    <!-- CONTENT -->
    <u-grid cols="12">

      <!-- List Items -->
      <u-card class="col-span-8 h-full space-y-4">
        <u-row>
          <u-icon name="baggage-claim" class="w-4 h-4" />
          <u-text class="font-bold">Informasi Penerimaan</u-text>
        </u-row>
        <u-row>
          <u-autocomplete v-model="searchPenerimaan" placeholder="Cari No Transaksi Penerimaan" :debounce="300"
            :min-search-length="5" item-key="id" item-label="nama" not-found-text="Data Penerimaan tidak ditemukan"
            not-found-subtext="Coba kata kunci lain" :show-add-button="false"
            api-url="/api/v1/transactions/pembayaran-hutang/get-one-hutang" api-response-path="data.data"
            :api-params="{ per_page: 10 }" search-key="q" :use-api="true" @select="handleSelectedPenerimaan"
            @items-loaded="onItemsLoadedBarang">
            <template #item="{ item }">
              <u-col gap="gap-1">
                <u-text size="sm" class="font-medium">{{ item?.suplier?.nama }} ({{ item?.nopenerimaan }})</u-text>
                <u-row class="-mt-1" gap="gap-1">
                  <u-icon name="box" class="w-4 h-4" />
                  <u-text class="">Rp. {{ formatRupiah(item?.nominal_total) }}</u-text>
                </u-row>
              </u-col>
            </template>
          </u-autocomplete>
        </u-row>

        <u-row class="relative -mt-4">
          <div v-if="store?.penerimaanSelected" ref="menuBarangRef"
            class="bg-background border-1 border-primary rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md w-full absolute z-10 -top-4">
            <u-grid cols="12" gap="gap-4">
              <div class="col-span-4">
                <u-text class="font-bold">Nama Supplier (PBF)</u-text>
                <u-text>{{ store.penerimaanSelected?.suplier?.nama || '-' }}</u-text>
              </div>
              <div class="col-span-4 text-center">
                <!-- <u-text class="font-bold">Satuan</u-text>
                  <u-text>{{ store.barangSelected?.satuan_k || '-' }} | {{ store.barangSelected?.satuan_b || '-' }}, {{ store.barangSelected?.isi || 0 }}</u-text> -->
              </div>
              <div class="col-span-4 text-right">
                <u-text class="font-bold">No Penerimaan</u-text>
                <u-text>{{ store.penerimaanSelected?.nopenerimaan || '-' }}</u-text>
              </div>

              <div class="col-span-12">
                <u-separator spacing="-mt-1 mb-1"></u-separator>
                <u-col flex1 class="w-full" gap="gap-0">
                  <!-- <u-row flex1 class="w-full bg-secondary" gap="gap-2" padding="px-2 py-3">
                    <u-text> Nilai Hutang Rp. {{ formatRupiah(store.penerimaanSelected?.nominal_total) }} </u-text>
                  </u-row> -->
                  <template v-if="store.penerimaanSelected">
                    <!-- <template v-for="(item) in store.penerimaanSelected?.rincian" :key="item.id"> -->
                      <u-row flex1 class="w-full bg-secondary" gap="gap-2" padding="px-2 py-3">
                        <u-col flex1 class="w-full" gap="gap-1">
                          <u-row flex1 class="w-full items-start">
                            <u-text class="font-bold"> Nilai Hutang </u-text>
                          </u-row>
                          <u-row>
                            <u-text class="font-medium italic">
                              Rp. {{ formatRupiah(store.penerimaanSelected?.nominal_total) }}
                            </u-text>
                          </u-row>
                        </u-col>
                        <u-row gap="gap-3">
                          <div class="flex flex-col">
                          </div>
                          <div class="w-64"
                            :class="{ 'animate-shake': parseInt(form?.nominal) > parseInt(form?.total_dibayar) }">
                            <u-input type="number" v-model.number="form.total_dibayar" label="Jumlah Bayar"
                              @focus="handleFocusJumlah" :error="parseInt(form?.nominal) > parseInt(form?.total_dibayar)" />
                          </div>

                          <u-btn
                            :disabled="(parseInt(form?.nominal) > parseInt(form?.total_dibayar)) || parseInt(form?.total_dibayar) === 0"
                            :loading="store.loadingSave" variant="secondary" size="sm"
                            @click.stop="handleSave(item)">Save</u-btn>
                        </u-row>
                      </u-row>
                      <u-separator spacing=""></u-separator>
                    <!-- </template> -->

                  </template>
                  <u-row flex1 right class="w-full mt-2" gap="gap-2">
                    <u-btn @click="handleOk">Tutup</u-btn>
                  </u-row>
                </u-col>
              </div>
            </u-grid>
          </div>
        </u-row>
        <u-row>
          <u-empty v-if="!store.form?.rinci?.length" title="Belum Ada Items" icon="baggage-claim" />
          <u-list v-else :spaced="true" anim :items="store.form?.rinci">
            <template #item="{ item, isHovered }">
              <ListRincian :item="item" :store="store" :is-hovered="isHovered" />
            </template>
          </u-list>
        </u-row>

      </u-card>

      <u-col align="items-end" class="col-span-4">

        <u-card class="w-full space-y-4">
          <u-row>
            <u-icon name="layers" class="w-4 h-4" />
            <u-text class="font-bold">Informasi Pembayaran</u-text>
          </u-row>
          <u-row>
            <u-input-date type="date" v-model="form.tgl_pelunasan" :error="errorMessage('tgl_pelunasan')" />
          </u-row>
          <u-row>
            <u-input v-model="form.nopelunasan" label="Nomor Pembayaran (Auto)" readonly :error="isError('nopelunasan')"
              :error-message="errorMessage('nopelunasan')" />
          </u-row>
        </u-card>


        <u-text class="font-bold" size="sm">Ringkasan Pembayaran Hutang</u-text>
        <u-separator spacing="-my-2"></u-separator>
        <!-- <u-row class="-mb-2">
          <u-text>No. Penerimaan : {{ store.penerimaanSelected?.nopenerimaan }}</u-text>
          <u-text class="font-bold" size="sm">{{ store.form?.nopenerimaan || '-' }}</u-text>
        </u-row> -->
        <u-row>
          <u-text>Total Pelunasan : </u-text>
          <u-text class="font-bold" size="sm">Rp. {{ formatRupiah(totalPembayaran) }}</u-text>
        </u-row>
        <u-row>
          <u-badge v-if="store.form?.flag" variant="danger">Terkunci</u-badge>
          <u-badge v-else :variant="store.mode === 'add' ? 'success' : 'warning'">Mode {{ store.mode === 'add' ?
            'Tambah' : 'Edit' }}</u-badge>
        </u-row>
        <u-separator spacing="-my-1"></u-separator>
        <u-row class="z-9">
          <u-btn v-if="store.mode === 'edit'" variant="secondary" @click="initForm">Form Baru</u-btn>
          <u-btn v-if="store.form" :loading="loadingLock" @click.stop="handleKunci">{{ store.form?.flag ? 'Cetak' :
            'Kunci' }}</u-btn>
        </u-row>
      </u-col>
    </u-grid>

    <div v-if="store.form?.flag"
      class="absolute top-0 left-0 right-0 w-full h-full rounded-2xl flex items-center justify-center p-4 bg-light-primary/10"
      padding="p-0"></div>


    <!-- Cetak -->
    <modal-cetak v-model="modalCetak" title="Pembayaran Hutang" :store="store" @close="modalCetak = false" />
  </u-col>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted, watch, defineAsyncComponent } from 'vue'
import { formatRupiah } from '@/utils/numberHelper'
import { useNotificationStore } from '@/stores/notification'
const notify = useNotificationStore().notify

import { api } from '@/services/api'
import ModalCetak from './ModalCetak.vue'

const ListRincian = defineAsyncComponent(() => import('./ListRincian.vue'))

const props = defineProps({
  store: { type: Object, required: true },
  title: { type: String, default: 'Data' },
  mode: { type: String, default: 'add' }
})

const searchSupplier = ref('')
const searchPenerimaan = ref('')
const menuBarangRef = ref(null)
const inpJumlahRef = ref(null)
const loadingLock = ref(false)
const modalCetak = ref(false)

const form = ref({
  nopelunasan: null,
  tgl_pelunasan: null,
  total_dibayar: null,
  noorder: null,
  nopenerimaan: null,
  nofaktur: null,
  kode_suplier: null,
  nominal: null,
  pajak: null,
  diskon: null,
  total: null,
  
})
const totalPembayaran = computed(() => {
  const items = props?.store?.form?.rinci ?? []
  return items.reduce((a, b) => a + Number(b?.total), 0)
})
const error = computed(() => {
  const err = props.store.error
  const status = err?.status === 422
  if (status) {
    return err?.response?.data?.errors
  }
  return null
})

function isError(field){
  return !!error.value?.[field]
}

function errorMessage(field){
  return error.value?.[field]?.[0] ?? null
} 

const handleSelected = (item) => {
  props.store.supplierSelected = item
  form.value.kode_suplier = item?.kode ?? null
  searchSupplier.value = ''
  
}
const handleSelectedPenerimaan = (item) => {
  props.store.penerimaanSelected = item
  searchPenerimaan.value = ''
  handleFocus(inpJumlahRef)
}

const handleOk = () => {
  console.log('handleOk');
  clearSelectedBarang()
  
}

const handleFocus = async (e) => {
  
  await nextTick()
  const el = e?.value
  // console.log('handleFocus', el);
  el?.inputRef?.focus()
  el?.inputRef?.select()
  
}

function handleClickOutside(event) {
  if (menuBarangRef.value && !menuBarangRef.value.contains(event.target)) {
    clearSelectedBarang()
  }
}

const onItemsLoaded = (items) => {
  // console.log('items', items);
  
}
const onItemsLoadedBarang = (items) => {
  // console.log('items', items);
  
}

const clearSelectedSupplier = () => {
  // props.store.supplierSelected = null
  // form.value.kode_supplier = ''
}
const clearSelectedBarang = () => {
  props.store.penerimaanSelected = null
  // form.value.kode_barang = ''
  // form.value.satuan_k = ''
  // form.value.satuan_b = ''
  // form.value.isi = 0
  // form.value.jumlah_pesan = 1
}

const handleSave = (e) => {
  // e.preventDefault()
  // e.stopPropagation()
  
  form.value.nopenerimaan = props.store.penerimaanSelected?.nopenerimaan || null
  form.value.noorder = props.store.penerimaanSelected?.noorder || null
  form.value.nofaktur = props.store.penerimaanSelected?.nofaktur || null
  form.value.kode_suplier = props.store.penerimaanSelected?.kode_suplier || null
  form.value.nominal = props.store.penerimaanSelected?.rincian?.reduce((a, b) => a + (parseInt(b.harga_b) * parseInt(b.jumlah_b) || 0), 0) || 0
  form.value.pajak = props.store.penerimaanSelected?.rincian?.reduce((a, b) => a + (parseInt(b.pajak_rupiah) * parseInt(b.jumlah_k) || 0), 0) || 0
  form.value.diskon = props.store.penerimaanSelected?.rincian?.reduce((a, b) => a + (parseInt(b.diskon_rupiah) * parseInt(b.jumlah_k) || 0), 0) || 0
  form.value.total = props.store.penerimaanSelected?.rincian?.reduce((a, b) => a + (parseInt(b.subtotal) || 0), 0) || 0
  
  props.store.create(form.value)
  .then(() => {
    // clearSelectedBarang()
  })
}



const handleFocusJumlah = async (e) => {
  // console.log('handleFocusJumlah', e);
}

const handleBatal = () => {
  clearSelectedBarang()
}

const handleKunci = async (e) => {
  e.preventDefault()
  e.stopPropagation()


  const flag = (props.store.form?.flag === '1' || props.store.form?.flag === 1)
  // if (flag) {
  //   modalCetak.value = true
  //   return 
  // }

  const id = props.store.form?.id
  const nopelunasan = props.store.form?.nopelunasan
  const payload = {
    id,
    nopelunasan
  }
  loadingLock.value = true

  let resp
  try {
    if (!flag) {
    resp = await api.post(`api/v1/transactions/pembayaran-hutang/kunci`, payload)
    } 
    // else {
    //   resp = await api.post(`api/v1/transactions/returpembelian/unlock-order`, payload)
    // }
    // resp = await api.post(`api/v1/transactions/returpembelian/lock-retur-lock_retur_pembelian`, payload)
    // console.log('resp', resp);
    notify({ message: resp?.data?.message, type: 'success' })
  } catch (error) {
    console.log('error', error);
    notify({
      type: 'error',
      message: error?.message
    })
    
  } finally {
    loadingLock.value = false
  }

  const data = resp?.data?.data
  props.store.form.flag = data?.flag
  props.store.initModeEdit(data)
}


onMounted(() => {
  // document.addEventListener('click', handleClickOutside)
  initForm()
})

function initForm(){
  const today = new Date().toISOString().split('T')[0];
  form.value.tgl_pelunasan = today
  form.value.nopelunasan = ''
  // form.value.nopenerimaan = ''
  // form.value.noorder = ''
  props.store.init()
  clearSelectedBarang()
  clearSelectedSupplier()
} 

onUnmounted(() => {
  // document.removeEventListener('click', handleClickOutside)
})

watch(() => ({ ...props.store.form }), (newForm, oldForm) => {
  // console.log('🔥 watch form', newForm, oldForm);
  
  for (const key in newForm) {
    if (newForm[key] !== oldForm[key]) {
      props.store.clearFieldError(key)
    }
  }

  if (newForm) {
    for (const key in newForm) {
      if (key in form.value) {
        form.value[key] = newForm[key]
      }
    }


    const onlyDate = newForm?.tgl_pelunasan?.split(" ")[0] 
    form.value.tgl_pelunasan = onlyDate


    if (props.store.mode === 'add') {
      initForm()
    }

   

    // console.log('🔥 watch form', form.value, newForm);


  }

}, { deep: true })

watch(() => props.store.maxRight, (newMax, oldMax) => {
  // if (!newMax) {
  //   initForm()
  // }
  // console.log('newMax', newMax);
  // console.log('form', form.value);
  
}, { deep: true })

</script>

<style scoped>
@keyframes shake {
  0% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-4px);
  }

  40% {
    transform: translateX(4px);
  }

  60% {
    transform: translateX(-4px);
  }

  80% {
    transform: translateX(4px);
  }

  100% {
    transform: translateX(0);
  }
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
}
</style>