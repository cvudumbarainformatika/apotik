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
              <button @click="clearSelectedOrder" class="text-primary hover:text-danger " aria-label="Hapus">
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
        <!-- <u-grid cols="2">
          <u-input class="col-span-1" v-model="form.nofaktur" label="Nomor Faktur" :error="isError('nofaktur')"
            :error-message="errorMessage('nofaktur')" />
          <u-input-date label="Tanggal Faktur" type="date" v-model="form.tgl_faktur"
            :error="errorMessage('tgl_faktur')" />
        </u-grid> -->
        <u-grid cols="2">
          <u-select label="Jenis Pajak" v-model="form.jenispajak" :options="optionJenispajaks"
            :error="isError('jenispajak')" :error-message="errorMessage('jenispajak')" @update:modelValue="(val) => {
              console.log('valjenispajak', val);
              form.pajak = val === 'Exclude' ? 11 : 0
            }" />
          <u-input class="col-span-1" v-model="form.pajak" label="Pajak" :error="isError('pajak')" type="number"
            :error-message="errorMessage('pajak')" />
        </u-grid>
      </u-card>



    </u-grid>

    <!-- CONTENT -->
    <u-grid cols="12">

      <!-- List Items -->
      <u-card class="col-span-8 h-full space-y-4">
        <u-row>
          <u-icon name="baggage-claim" class="w-4 h-4" />
          <u-text class="font-bold">Informasi Item</u-text>
        </u-row>
        <u-row v-if="store.orderSelected && form.jenispajak">
          <u-list :items="store.orderSelected?.order_records">
            <template #item="{ item }">
              <u-view flex1 class="w-full" padding="px-3 py-3">
                <u-row flex1 class="w-full">
                  <u-grid cols="12" gap="gap-4">
                    <div class="col-span-3">
                      <u-text class="font-bold">Nama Barang</u-text>
                      <u-text size="sm" class="font-medium">{{ item.master?.nama || '-'
                        }}</u-text>
                    </div>
                    <div class="col-span-3 text-center">
                      <u-text class="font-bold">Jumlah Pesan</u-text>
                      <u-text size="sm" class="font-medium">{{ item.jumlah_pesan || '-' }}
                        {{ item.satuan_k || '-'}}</u-text>
                    </div>
                    <div class="col-span-3 text-center">
                      <u-text class="font-bold">Satuan</u-text>
                      <u-text size="sm" class="font-medium">per{{ item.satuan_b || '-' }}
                        isi {{ item.isi || '-'}} {{ item.satuan_k || '-' }}</u-text>
                    </div>
                    <div class="col-span-3 text-right">
                      <u-text class="font-bold">Kode Obat</u-text>
                      <u-text size="sm" class="font-medium">{{ item.kode_barang || '-' }}</u-text>
                    </div>
                    <div class="col-span-12">
                      <u-separator spacing="-my-2"></u-separator>
                    </div>
                    <u-row class="col-span-4">
                      <u-input v-model="form.jumlah_b" label="Penerimaan (Besar)" :error="isError('jumlah_b')"
                        :error-message="errorMessage('jumlah_b')" type="number" />
                    </u-row>
                    <u-row class="col-span-3">
                      <u-input v-model="form.harga" label="Harga" :error="isError('harga')"
                        :error-message="errorMessage('harga')" type="number" />
                    </u-row>
                    <u-row class="col-span-3">
                      <u-input v-model="form.nobatch" label="Nobatch" :error="isError('nobatch')"
                        :error-message="errorMessage('nobatch')" />
                    </u-row>
                    <u-row class="col-span-2">
                      <u-input v-model="form.diskon_persen" label="Disc(%)" :error="isError('diskon_persen')"
                        :error-message="errorMessage('diskon_persen')" />
                    </u-row>
                    <u-row center>
                      <u-btn variant="secondary" label="Batal" @click="handleBatal" />
                      <u-btn :loading="store.loadingSave" label="Simpan" @click.stop="handleSubmit($event, item)" />
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
        <u-text class="font-bold" size="sm">Summary Order</u-text>
        <u-separator spacing="-my-2"></u-separator>
        <u-row>
          <u-text>Total Item Order : </u-text>
          <u-text class="font-bold" size="sm">{{ store.form?.order_records?.length || 0 }}</u-text>
        </u-row>
        <u-badge :variant="store.mode === 'add' ? 'success' : 'warning'">Mode {{ store.mode === 'add' ? 'Tambah' :
          'Edit' }}</u-badge>
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
import { ref, computed, nextTick, onMounted, onUnmounted, watch, defineAsyncComponent } from 'vue'
import { useOrderStore } from '@/stores/template/register'
import { getYearStartDate, getYearEndDate } from '@/utils/dateHelper'


const ModalData = defineAsyncComponent(() => import('./ModalGetdata.vue'))
const ListRincian = defineAsyncComponent(() => import('./ListRincian.vue'))

const props = defineProps({
  store: { type: Object, required: true },
  title: { type: String, default: 'Data' },
  mode: { type: String, default: 'add' }
})
const storeorder = useOrderStore()


const searchSupplier = ref('')
const searchBarang = ref('')
const menuBarangRef = ref(null)
const inpJumlahRef = ref(null)
const modalOpendata = ref(false)
const form = ref({
  // HEADER FORM
  nopenerimaan: '',
  noorder: '',
  tgl_penerimaan: '',
  nofaktur: '',
  tgl_faktur: '',
  kode_suplier: '',
  jenispajak: '',
  pajak: '',
  flag: '',

  // RINCIAN FORM
  kode_barang: '',
  nobatch: '',
  jumlah_b: '',
  jumlah_k: 0,
  harga: '',
  diskon_persen: 0,
  isi: 0,
  satuan_k: '',
  satuan_b: '',
  pajak_rupiah: 0,
  diskon_rupiah: 0,
})

const error = computed(() => {
  const err = props.store.error
  const status = err?.status === 422
  if (status) {
    return err?.response?.data?.errors
  }
  return null
})

const optionJenispajaks = computed(() => {
  return [
    { value: 'Exclude', label: 'Exclude' },
    { value: 'Include', label: 'Include' }
  ]
})

const range = computed(() => {
  return {
    from: getYearStartDate(),
    to: getYearEndDate()
  }
})

onMounted(() => {
  
  initForm()
  storeorder.per_page = 20
  Promise.all([
    storeorder.fetchAll(range),
    console.log('Date ', range.value),
    console.log('Mounted ', storeorder.items),
    props.store.dataorder = storeorder.items
  ])
})

function isError(field){
  return !!error.value?.[field]
}

function errorMessage(field){
  return error.value?.[field]?.[0] ?? null
} 

// const handleSelected = (item) => {
//   props.store.supplierSelected = item
//   form.value.kode_supplier = item?.kode ?? null
//   searchSupplier.value = ''
  
// }
// const handleSelectedBarang = (item) => {
  
//   props.store.barangSelected = item
//   form.value.kode_barang = item?.kode ?? null
//   form.value.satuan_k = item?.satuan_k ?? null
//   form.value.satuan_b = item?.satuan_b ?? null
//   form.value.isi = item?.isi ?? null
//   searchBarang.value = ''
//   // console.log('handleSelectedBarang', form.value);

//   // await nextTick()
//   // console.log('ref', inpJumlahRef.value);
//   // const el 
//   // inpJumlahRef.value?.inputRef?.focus()
//   handleFocus(inpJumlahRef)
  
// }

// const handleFocus = async (e) => {
  
//   await nextTick()
//   const el = e?.value
//   // console.log('handleFocus', el);
//   el?.inputRef?.focus()
//   el?.inputRef?.select()
  
// }

// function handleClickOutside(event) {
//   if (menuBarangRef.value && !menuBarangRef.value.contains(event.target)) {
//     clearSelectedBarang()
//   }
// }

const onItemsLoaded = (items) => {
  // console.log('items', items);
  
}
const onItemsLoadedBarang = (items) => {
  // console.log('items', items);
  
}

const clearSelectedOrder = () => {
  props.store.supplierSelected = null
  props.store.orderSelected = null
  form.value.noorder = ''
}
const clearSelectedBarang = () => {
  props.store.barangSelected = null
  form.value.harga = 0
  form.value.jumlah_b = 0
  
}

const handleSubmit = (e, item) => {
  e.preventDefault()
  e.stopPropagation()
  
  form.value.satuan_b = item?.satuan_b
  form.value.satuan_k = item?.satuan_k
  form.value.isi = item?.isi
  form.value.jumlah_k = form.value.jumlah_b * parseInt(item.isi)
  form.value.kode_barang = item?.kode_barang
  form.value.nopenerimaan = props.store.form?.nopenerimaan || ''
  form.value.kode_suplier = props.store.supplierSelected?.kode || ''
  form.value.noorder = props.store.orderSelected?.nomor_order || ''
  form.value.flag = 0
  console.log('form', form.value);
  // console.log('item', item?.satuan_b);
  props.store.create(form.value)
  // .then(() => {
  //   clearSelectedBarang()
  // })
}

const handleBatal = () => {
  clearSelectedBarang()
}



function initForm(){
  const today = new Date().toISOString().split('T')[0];
  form.value.tgl_penerimaan = today
  form.value.tgl_faktur = today
  form.value.noorder = ''
  props.store.init()
  clearSelectedBarang()
  clearSelectedOrder()
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
    form.value = {
      nopenerimaan: newForm?.nopenerimaan,
      noorder: newForm?.noorder,
      tgl_penerimaan: newForm?.tgl_penerimaan,
      nofaktur: newForm?.nofaktur,
      tgl_faktur: newForm?.tgl_faktur,
      kode_suplier: newForm?.kode_suplier,
      nama: newForm?.suplier?.nama
    }
  }

}, { deep: true })

// watch(() => props.store.orderSelected?.order_records, (newRecords) => {
//   if (newRecords) {
//     form.value.jumlah_k = newRecords.map(() => 0);
//     form.value.harga = newRecords.map(() => 0);
//     form.value.subtotal = newRecords.map(() => 0);
//   } else {
//     form.value.jumlah_k = [];
//     form.value.harga = [];
//     form.value.subtotal = [];
//   }
// }, { immediate: true })
</script>