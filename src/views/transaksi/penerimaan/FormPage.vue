<template>
  <u-col class="w-full pb-4 pt-1 px-2">
    <u-grid cols="5">
      <!-- HEADER 1 -->
      <u-card class="col-span-2 h-full min-h-[100px] space-y-4">
        <u-row>
          <u-icon name="layers" class="w-4 h-4" />
          <u-text class="font-bold">Informasi Penerimaan</u-text>
        </u-row>
        <u-row>
          <u-input-date type="date" v-model="form.tgl_penerimaan" :error="errorMessage('tgl_penerimaan')" />
        </u-row>
        <u-row>
          <u-input v-model="form.nopenerimaan" label="Nomor Penerimaan (Auto)" readonly :error="isError('nopenerimaan')"
            :error-message="errorMessage('nopenerimaan')" />
        </u-row>
        <u-row>
          <u-input v-model="form.nofaktur" label="Nomor Faktur" :error="isError('nofaktur')"
            :error-message="errorMessage('nofaktur')" />
        </u-row>
        <u-row>
          <u-input-date label="Tanggal Faktur" type="date" v-model="form.tgl_faktur"
            :error="errorMessage('tgl_faktur')" />
        </u-row>
      </u-card>

      <!-- HEADER 2 -->
      <u-card class="col-span-3 h-full space-y-4">
        <u-row>
          <u-icon name="users" class="w-4 h-4" />
          <u-text class="font-bold">Informasi Order</u-text>
        </u-row>
        <u-row>
          <div v-if="store?.orderSelected"
            class="bg-primary/10 border border-primary rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md w-full">
            <div class="flex flex-1 justify-between items-start">
              <u-row flex1 class="w-full">
                <u-icon name="file-search-2" class="w-5 h-5 text-primary" />
                <u-text>
                  {{ store.orderSelected?.nomor_order }}
                </u-text>
              </u-row>
              <button @click="clearSelectedOrder" class="text-primary hover:text-danger" aria-label="Hapus">
                <u-icon name="X" class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div v-else
            class="bg-danger/10 border border-danger rounded-xl shadow-sm px-4 py-2 transition-all duration-300 hover:shadow-md w-full">
            <u-grid cols="3">
              <u-row flex1 class="col-span-2">
                <u-icon name="file-search-2" class="w-4 h-4 text-primary" />
                <div class="w-full">
                  <u-text>
                    Silahkan cari dan pilih Nomer Order di tombol samping
                  </u-text>
                </div>
              </u-row>
              <div class="text-right">
                <u-btn label="Order" @click="modalOpendata = true" />
              </div>
            </u-grid>
          </div>
        </u-row>
        <u-row>
          <div v-if="store?.supplierSelected"
            class="bg-primary/10 border border-primary rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md w-full">
            <div class="flex flex-1 justify-between items-start">
              <u-row flex1 class="w-full">
                <u-icon name="user" class="w-5 h-5 text-primary" />
                <u-text>
                  {{ store.supplierSelected?.nama }}
                </u-text>
              </u-row>
            </div>
          </div>
          <div v-else
            class="bg-danger/10 border border-danger rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md w-full">
            <u-row class="items-start" padding="p-0">
              <u-icon name="user" class="w-4 h-4 text-primary" />
              <div>
                <u-text>
                  Nama Supplier
                </u-text>
              </div>
            </u-row>
          </div>
        </u-row>
        <u-grid cols="2">
          <u-select label="Jenis Pajak" v-model="form.jenispajak" :options="optionJenispajaks"
            :error="isError('jenispajak')" :error-message="errorMessage('jenispajak')" @update:modelValue="(val) => {
              form.pajak = val === 'Exclude' ? parseInt(11) : parseInt(0)
            }" />
          <u-input readonly class="col-span-1" v-model="form.pajak" label="Pajak" :error="isError('pajak')"
            type="number" :error-message="errorMessage('pajak')" />
        </u-grid>
      </u-card>
    </u-grid>

    <u-grid cols="12">
      <!-- List Items -->
      <u-card class="col-span-8 h-full space-y-4">
        <u-row>
          <u-icon name="baggage-claim" class="w-4 h-4" />
          <u-text class="font-bold">Informasi Item</u-text>
        </u-row>
        <u-row v-if="store.orderSelected && form.jenispajak">
          <u-list :items="listItems">
            <template #item="{ item }">
              <u-view flex1 class="w-full" padding="px-3 py-3">
                <u-row flex1 class="w-full">
                  <u-grid cols="12" gap="gap-4">
                    <div class="col-span-3">
                      <u-text class="font-bold">Nama Barang</u-text>
                      <u-text size="sm" class="font-medium">{{ item.nama || item.master?.nama || '-' }}</u-text>
                    </div>
                    <div class="col-span-3 text-center">
                      <u-text class="font-bold">Jumlah Pesan</u-text>
                      <u-text size="sm" class="font-medium">{{ item.jumlah_pesan || '-' }} {{ item.satuan_k || '-'
                      }}</u-text>
                    </div>
                    <div class="col-span-3 text-center">
                      <u-text class="font-bold">Satuan</u-text>
                      <u-text size="sm" class="font-medium">per {{ item.satuan_b || '-' }} isi {{ item.isi || '-' }} {{
                        item.satuan_k || '-' }}</u-text>
                    </div>
                    <div class="col-span-3 text-right">
                      <u-text class="font-bold">Kode Obat</u-text>
                      <u-text size="sm" class="font-medium">{{ item.kode_barang || '-' }}</u-text>
                    </div>
                    <div class="col-span-12">
                      <u-separator spacing="-my-2"></u-separator>
                    </div>
                    <u-row class="col-span-4">
                      <u-input v-model="form.rincian[item.kode_barang].jumlah_b" label="Penerimaan (Besar)"
                        :error="isError(`rincian.${item.kode_barang}.jumlah_b`)"
                        :error-message="errorMessage(`rincian.${item.kode_barang}.jumlah_b`)" type="number" />
                    </u-row>
                    <u-row class="col-span-3">
                      <u-input v-model="form.rincian[item.kode_barang].harga" label="Harga"
                        :error="isError(`rincian.${item.kode_barang}.harga`)"
                        :error-message="errorMessage(`rincian.${item.kode_barang}.harga`)" type="number" />
                    </u-row>
                    <u-row class="col-span-3">
                      <u-input v-model="form.rincian[item.kode_barang].nobatch" label="Nobatch"
                        :error="isError(`rincian.${item.kode_barang}.nobatch`)"
                        :error-message="errorMessage(`rincian.${item.kode_barang}.nobatch`)" />
                    </u-row>
                    <u-row class="col-span-2">
                      <u-input v-model="form.rincian[item.kode_barang].diskon_persen" label="Disc(%)"
                        :error="isError(`rincian.${item.kode_barang}.diskon_persen`)" type="number"
                        :error-message="errorMessage(`rincian.${item.kode_barang}.diskon_persen`)" />
                    </u-row>
                    <u-row class="col-span-4">
                      <u-input-date label="Tanggal Expired" type="date"
                        v-model="form.rincian[item.kode_barang].tgl_exprd"
                        :error-message="errorMessage(`rincian.${item.kode_barang}.tgl_exprd`)"
                        :error="isError(`rincian.${item.kode_barang}.tgl_exprd`)" />
                    </u-row>
                    <u-row class="col-span-8">
                      <u-btn variant="secondary" label="Batal" @click="handleBatal(item.kode_barang)" />
                      <u-btn :loading="form.rincian[item.kode_barang]?.loading" label="Simpan"
                        @click.stop="handleSubmit($event, item)" />
                    </u-row>
                  </u-grid>
                </u-row>
              </u-view>
            </template>
          </u-list>
        </u-row>
        <u-row v-else>
          <u-empty title="Belum Ada Items" icon="baggage-claim" />
        </u-row>
      </u-card>

      <u-col align="items-end" class="col-span-4">
        <u-text class="font-bold" size="sm">Ringkasan Penerimaan</u-text>
        <u-separator spacing="-my-2"></u-separator>
        <u-row>
          <u-text>Total Item Order : </u-text>
          <u-text class="font-bold" size="sm">{{ listItems.length || 0 }}</u-text>
        </u-row>
        <u-row>
          <u-text>Nilai Total Penerimaan : </u-text>
          <u-text class="font-bold" size="sm">{{ formatRupiah(TotalPenerimaan) || 0 }}</u-text>
        </u-row>
        <u-badge :variant="store.mode === 'add' ? 'success' : 'warning'">Mode {{ store.mode === 'add' ? 'Tambah' :
          'Edit'
        }}</u-badge>
        <u-separator spacing="-my-1"></u-separator>
        <u-row>
          <u-btn v-if="store.mode === 'edit'" variant="secondary" @click="initForm">Order Baru</u-btn>
          <u-btn v-if="store.form">{{ store.form?.flag ? 'Buka Kunci' : 'Kunci Order' }}</u-btn>
        </u-row>
      </u-col>
    </u-grid>

    <modal-data v-if="modalOpendata" v-model="modalOpendata" title="Data Order" :store="store"
      @close="modalOpendata = false" />
  </u-col>
</template>

<script setup>
import { ref, computed, watch, defineAsyncComponent, onMounted } from 'vue'
import { useOrderStore } from '@/stores/template/register'
import { getYearStartDate, getYearEndDate } from '@/utils/dateHelper'
import { formatRupiah } from '@/utils/numberHelper'
import { useNotificationStore } from '@/stores/notification'
const ModalData = defineAsyncComponent(() => import('./ModalGetdata.vue'))
const props = defineProps({
  store: { type: Object, required: true },
  title: { type: String, default: 'Data' },
  mode: { type: String, default: 'add' }
})
const storeorder = useOrderStore()
const notify = useNotificationStore().notify
const modalOpendata = ref(false)
const isSubmitting = ref(false)
const skipWatch = ref(false)

const form = ref({
  nopenerimaan: '',
  noorder: '',
  tgl_penerimaan: '',
  nofaktur: '',
  tgl_faktur: '',
  kode_suplier: '',
  jenispajak: '',
  pajak: '',
  flag: null,

  // rincian (object key by kode_barang)
  kode_barang: '',
  nobatch: '',
  jumlah_b: '',
  jumlah_k: '',
  harga: '',
  diskon_persen: '',
  isi: '',
  satuan_k: '',
  satuan_b: '',
  pajak_rupiah: '',
  diskon_rupiah: '',
  tgl_exprd: '',

  rincian: {},
})

const error = computed(() => {
  const err = props.store.error
  const status = err?.status === 422
  if (status) {
    return err?.response?.data?.errors
  }
  return null
})

function isError(field) {
  return !!error.value?.[field]
}

function errorMessage(field) {
  return error.value?.[field]?.[0] ?? null
}

const optionJenispajaks = computed(() => [
  { value: 'Exclude', label: 'Exclude' },
  { value: 'Include', label: 'Include' }
])

const params = computed(() => ({
  from: getYearStartDate(),
  to: getYearEndDate()
}))

const listItems = computed(() => {
  const rincian = form.value.rincian || {}
  const orderRecords = props.store.orderSelected?.order_records || []

  if (Object.keys(rincian).length > 0) {
    return Object.values(rincian)
  }

  return orderRecords.map(item => ({
    nama: item.master?.nama || item.nama || '',
    jumlah_pesan: item.jumlah_pesan || '',
    jumlah_b: item.jumlah_b || '',
    harga: item.harga || '',
    nobatch: item.nobatch || '',
    diskon_persen: item.diskon_persen || 0,
    satuan_b: item.satuan_b || item.master?.satuan_b || '',
    satuan_k: item.satuan_k || item.master?.satuan_k || '',
    isi: parseInt(item.isi || item.master?.isi) || 1,
    jumlah_k: (parseInt(item.jumlah_b) || 0) * (parseInt(item.isi || item.master?.isi) || 1),
    kode_barang: item.kode_barang,
    pajak_rupiah: parseInt(item.pajak_rupiah) || 0,
    diskon_rupiah: parseInt(item.diskon_rupiah) || 0,
    loading: false,
    master: item.master || null,
  }))
})

onMounted(() => {
  initForm()
  storeorder.per_page = 20
  storeorder.fetchAll(params.value).then(() => {
    props.store.dataorder = storeorder.items
  })
})

const clearSelectedOrder = () => {
  props.store.orderSelected = null
  props.store.supplierSelected = null
  form.value.noorder = ''
  form.value.nopenerimaan = ''
  form.value.nofaktur = ''
  form.value.jenispajak = ''
  form.value.pajak = ''
  form.value.kode_barang = ''
  form.value.nobatch = ''
  form.value.jumlah_b = ''
  form.value.jumlah_k = ''
  form.value.harga = ''
  form.value.diskon_persen = ''
  form.value.isi = ''
  form.value.satuan_k = ''
  form.value.satuan_b = ''
  form.value.pajak_rupiah = ''
  form.value.diskon_rupiah = ''
  form.value.rincian = {}
}

const initializeRincian = (orderRecords) => {
  const rincian = {}
  orderRecords.forEach(item => {
    rincian[item.kode_barang] = {
      nama: item.master?.nama || item.nama || '',
      jumlah_pesan: item.jumlah_pesan || '',
      jumlah_b: item.jumlah_pesan || '',
      harga: item.harga || '',
      nobatch: item.nobatch || '',
      diskon_persen: item.diskon_persen || 0,
      satuan_b: item.satuan_b || item.master?.satuan_b || '',
      satuan_k: item.satuan_k || item.master?.satuan_k || '',
      isi: parseInt(item.isi || item.master?.isi) || 1,
      jumlah_k: (parseInt(item.jumlah_b) || 0) * (parseInt(item.isi || item.master?.isi) || 1),
      kode_barang: item.kode_barang,
      pajak_rupiah: parseInt(item.pajak_rupiah) || 0,
      diskon_rupiah: parseInt(item.diskon_rupiah) || 0,
      loading: false,
      master: item.master || null,
    }
  })
  form.value.rincian = { ...rincian, ...form.value.rincian }
}

const handleSubmit = async (e, item) => {
  e.preventDefault()
  e.stopPropagation()
 
  skipWatch.value = true
  isSubmitting.value = true

  const kode_barang = item.kode_barang
  const suplier = props.store.supplierSelected
  const orderan = props.store.orderSelected

  const rincianItem = form.value.rincian[kode_barang] || {}
  

  form.value.kode_barang = kode_barang
  form.value.nobatch = rincianItem.nobatch || ''
  form.value.jumlah_b = rincianItem.jumlah_b || ''
  form.value.jumlah_k = (parseInt(rincianItem.jumlah_b) || 0) * (parseInt(item.isi || item.master?.isi) || 1)
  form.value.harga = rincianItem.harga || ''
  form.value.diskon_persen = rincianItem.diskon_persen || 0
  form.value.isi = parseInt(item.isi || item.master?.isi) || 1
  form.value.satuan_k = item.satuan_k || item.master?.satuan_k || ''
  form.value.satuan_b = item.satuan_b || item.master?.satuan_b || ''
  form.value.pajak_rupiah = parseInt(rincianItem.pajak_rupiah) || 0
  form.value.diskon_rupiah = parseInt(rincianItem.diskon_rupiah) || 0
  form.value.tgl_exprd = rincianItem.tgl_exprd || ''
  form.value.kode_suplier = props.store.supplierSelected?.kode || ''
  form.value.noorder = props.store.orderSelected?.nomor_order || ''
  form.value.rincian[kode_barang] = {
    nama: item.master?.nama || item.nama || '',
    jumlah_pesan: item.jumlah_pesan || '',
    jumlah_b: parseInt(rincianItem.jumlah_b) || '',
    harga: rincianItem.harga || '',
    nobatch: rincianItem.nobatch || '',
    diskon_persen: rincianItem.diskon_persen || 0,
    satuan_b: item.satuan_b || item.master?.satuan_b || '',
    satuan_k: item.satuan_k || item.master?.satuan_k || '',
    isi: parseInt(item.isi || item.master?.isi) || 1,
    jumlah_k: (parseInt(rincianItem.jumlah_b) || 0) * (parseInt(item.isi || item.master?.isi) || 1),
    kode_barang: kode_barang,
    pajak_rupiah: parseInt(rincianItem.pajak_rupiah) || 0,
    diskon_rupiah: parseInt(rincianItem.diskon_rupiah) || 0,
    tgl_exprd: rincianItem.tgl_exprd || '',
    loading: true,
    master: item.master || null,
  }

  try {
    const a = form.value.rincian[kode_barang].jumlah_pesan
    const b = form.value.rincian[kode_barang].jumlah_b
    console.log('ab', a,b)
    if (parseInt(b) > parseInt(a)) {
      notify({ message: 'Penerimaan Lebih Besar Dari Jumlah Pesanan', type: 'error' })
    } 
    else {
      await props.store.create(form.value)
      props.store.supplierSelected = suplier
      props.store.orderSelected = orderan

      props.store.mode = 'edit'
    }
    form.value.nopenerimaan = props.store?.items[0]?.header?.nopenerimaan
    form.value.rincian[kode_barang].loading = false

  } catch (err) {
    console.error('Error saat menyimpan:', err)
    if (form.value.rincian[kode_barang]) {
      form.value.rincian[kode_barang].loading = false
    }
  } finally {
    skipWatch.value = false
    isSubmitting.value = false
  }
}

const handleBatal = (kode_barang) => {
  if (form.value.rincian[kode_barang]) {
    form.value.rincian[kode_barang] = {
      nama: form.value.rincian[kode_barang].nama || '',
      jumlah_pesan: form.value.rincian[kode_barang].jumlah_pesan || '',
      jumlah_b: '',
      harga: '',
      nobatch: '',
      diskon_persen: 0,
      satuan_b: form.value.rincian[kode_barang].satuan_b || '',
      satuan_k: form.value.rincian[kode_barang].satuan_k || '',
      isi: form.value.rincian[kode_barang].isi || 1,
      jumlah_k: 0,
      kode_barang: kode_barang,
      tgl_exprd: '',
      pajak_rupiah: 0,
      diskon_rupiah: 0,
      loading: false,
      master: form.value.rincian[kode_barang].master || null,
    }
  }
}

watch(() => props.store.orderSelected, (newOrderSelected) => {
  if (newOrderSelected?.order_records) {
    initializeRincian(newOrderSelected.order_records)
  } else {
    form.value.rincian = {}
  }
}, { deep: true })


watch(() => props.store.form, (newForm, oldForm) => {
  if (skipWatch.value) {
    return
  }

  if (!newForm) return

  for (const key in newForm) {
    if ((oldForm?.[key]) !== newForm[key]) {
      props.store.clearFieldError(key)
    }
  }
  if (props.store.mode === 'edit') {
    const initialLoad = !oldForm || (oldForm?.nopenerimaan !== newForm?.nopenerimaan)
    if (!initialLoad) {
      return
    }

    const orderRecords = Array.isArray(newForm?.rincian) ? newForm.rincian : (newForm?.order_records || [])
    props.store.orderSelected = {
      order_records: orderRecords,
      nomor_order: newForm?.noorder || ''
    }
    props.store.supplierSelected = newForm?.suplier || props.store.supplierSelected || null

    const rincianObj = {}
    if (Array.isArray(newForm?.rincian)) {
      newForm.rincian.forEach(item => {
        rincianObj[item.kode_barang] = {
          nama: item?.master?.nama || item?.nama || '',
          jumlah_pesan: item?.jumlah_pesan || '',
          jumlah_b: item?.jumlah_b || '',
          harga: item?.harga || '',
          nobatch: item?.nobatch || '',
          diskon_persen: item?.diskon_persen || 0,
          satuan_b: item?.satuan_b || item?.master?.satuan_b || '',
          satuan_k: item?.satuan_k || item?.master?.satuan_k || '',
          isi: parseInt(item?.isi || item?.master?.isi) || 1,
          jumlah_k: (parseInt(item?.jumlah_b) || 0) * (parseInt(item?.isi || item?.master?.isi) || 1),
          kode_barang: item?.kode_barang,
          tgl_exprd: item?.tgl_exprd,
          pajak_rupiah: parseInt(item?.pajak_rupiah) || 0,
          diskon_rupiah: parseInt(item?.diskon_rupiah) || 0,
          loading: false,
          master: item?.master || null,
        }
      })
    } else if (newForm?.rincian && typeof newForm.rincian === 'object') {
      Object.keys(newForm.rincian).forEach(k => {
        const item = newForm.rincian[k]
        rincianObj[k] = { ...item, kode_barang: k, loading: false }
      })
    }

    form.value = {
      ...form.value,
      nopenerimaan: newForm?.nopenerimaan ?? form.value.nopenerimaan ?? '',
      noorder: newForm?.noorder ?? form.value.noorder ?? '',
      tgl_penerimaan: newForm?.tgl_penerimaan ?? form.value.tgl_penerimaan ?? new Date().toISOString().split('T')[0],
      nofaktur: newForm?.nofaktur ?? form.value.nofaktur ?? '',
      tgl_faktur: newForm?.tgl_faktur ?? form.value.tgl_faktur ?? new Date().toISOString().split('T')[0],
      kode_suplier: newForm?.kode_suplier ?? props.store.supplierSelected?.kode ?? form.value.kode_suplier ?? '',
      jenispajak: newForm?.jenispajak ?? form.value.jenispajak ?? '',
      pajak: newForm?.pajak ?? form.value.pajak ?? '',
      flag: newForm?.flag ?? form.value.flag ?? null,
      rincian: { ...rincianObj, ...form.value.rincian }
    }

    return
  }

  if (newForm?.order_records || newForm?.rincian) {
    props.store.orderSelected = newForm
  }

}, { deep: true })


const TotalPenerimaan = computed(() => {
  if (props.store.mode === 'add') {
    return 0
  } else {
    const rincian = form.value.rincian || {}
    return Object.values(rincian).reduce((sum, x) => sum + (parseFloat(x?.harga * x?.jumlah_b) || 0), 0)
  }
})

function initForm() {
  props.store.mode = 'add'
  const today = new Date().toISOString().split('T')[0]
  form.value = {
    tgl_penerimaan: today,
    tgl_faktur: today,
    noorder: '',
    nopenerimaan: '',
    nofaktur: '',
    kode_suplier: '',
    jenispajak: '',
    pajak: '',
    flag: null,
    kode_barang: '',
    nobatch: '',
    jumlah_b: '',
    jumlah_k: '',
    harga: '',
    diskon_persen: '',
    isi: '',
    satuan_k: '',
    satuan_b: '',
    pajak_rupiah: '',
    diskon_rupiah: '',
    rincian: {},
  }

  if (props.store.mode === 'add') {
    props.store.orderSelected = null
    props.store.supplierSelected = null
  }
}

</script>
