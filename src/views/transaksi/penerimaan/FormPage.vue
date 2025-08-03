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
          class="bg-danger/10 border border-danger rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md w-full">
          <u-row>
            <u-row class="items-start" padding="p-0">
              <u-icon name="file-search-2" class="w-4 h-4 text-primary" />
              <div>
                <u-text>
                  Silahkan cari dan pilih Nomer Order di tombol samping
                </u-text>
              </div>
            </u-row>
            <u-btn label="Order" @click="modalOpendata = true" />
          </u-row>
        </div>

      </u-card>

      <!-- HEADER 2 -->
      <u-card class="col-span-3 h-full space-y-4">
        <u-row>
          <u-icon name="users" class="w-4 h-4" />
          <u-text class="font-bold">Informasi Order</u-text>
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
          <u-input class="col-span-1" v-model="form.nofaktur" label="Nomor Faktur" :error="isError('nofaktur')"
            :error-message="errorMessage('nofaktur')" />
          <u-input-date label="Tanggal Faktur" type="date" v-model="form.tgl_faktur"
            :error="errorMessage('tgl_faktur')" />
        </u-grid>
        <u-grid cols="2">
          <u-input class="col-span-1" v-model="form.jenispajak" label="Jenis Pajak" :error="isError('jenispajak')"
            :error-message="errorMessage('jenispajak')" />
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
        <u-row v-if="store.orderSelected">
          <u-list :items="store.orderSelected?.order_records">
            <template #item="{ item }">
              <u-view padding="px-3 py-3">
                <u-row flex1 class="w-full">
                  <u-col gap="gap-3">
                    <u-text size="sm" class="font-medium">{{ item.master?.nama }}</u-text>
                    <u-row class="-mt-1" gap="gap-1">
                      <u-text class="">Jumlah Pesan : {{ item?.jumlah_pesan }}</u-text>
                      <u-text class="">{{ item?.satuan_k }}</u-text> |
                      <u-text class="">{{ item?.satuan_b }}</u-text>
                      <u-text class="">Isi {{ item?.isi }}</u-text>
                    </u-row>
                  </u-col>
                  <u-col gap="gap-3">
                    <u-grid cols="2" gap="gap-2">
                      <u-input class="col-span-1" v-model="form.jumlah_b" label="Jml Penerimaan (Besar)"
                        :error="isError('jumlah_b')" :error-message="errorMessage('jumlah_b')" :autofocus="n === 0" />
                      <u-input class="col-span-1" v-model="form.pajak" label="Pajak" :error="isError('pajak')"
                        type="number" :error-message="errorMessage('pajak')" />
                    </u-grid>
                  </u-col>
                </u-row>

              </u-view>
            </template>
          </u-list>
        </u-row>
        <u-row v-else>
          <u-empty title="Belum Ada Items" icon="baggage-claim" />
        </u-row>

        <!-- <u-row class="relative -mt-4">
          <div v-if="store?.barangSelected" ref="menuBarangRef"
            class="bg-background border-1 border-primary rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md w-full absolute z-10 -top-4">
            <u-grid cols="12" gap="gap-4">
              <div class="col-span-4">
                <u-text class="font-bold">Nama Barang</u-text>
                <u-text>{{ store.barangSelected?.nama || '-' }}</u-text>
              </div>
              <div class="col-span-4 text-center">
                <u-text class="font-bold">Satuan</u-text>
                <u-text>{{ store.barangSelected?.satuan_k || '-' }} | {{ store.barangSelected?.satuan_b || '-' }}, {{
                  store.barangSelected?.isi || 0 }}</u-text>
              </div>
              <div class="col-span-4 text-right">
                <u-text class="font-bold">Kode</u-text>
                <u-text>{{ store.barangSelected?.kode || '-' }}</u-text>
              </div>

              <div class="col-span-12">
                <u-separator spacing="-my-2"></u-separator>
              </div>

              <u-row class="col-span-4">
                <u-input ref="inpJumlahRef" v-model="form.jumlah_pesan" label="jumlah_pesan" type="number"
                  :error="isError('jumlah_pesan')" :error-message="errorMessage('jumlah_pesan')" />
              </u-row>
              <u-row right class="col-span-8 ">
                <u-btn variant="secondary" label="Batal" @click="handleBatal" />
                <u-btn :loading="store.loadingSave" label="Simpan" @click.stop="handleSubmit" />
              </u-row>
            </u-grid>
          </div>
        </u-row>
        <u-row>
          <u-empty v-if="!store.form?.order_records?.length" title="Belum Ada Items" icon="baggage-claim" />
          <u-list v-else :spaced="true" anim :items="store.form?.order_records">
            <template #item="{ item }">
              <ListRincian :item="item" :store="store" />
            </template>
          </u-list>
        </u-row> -->

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

const ModalData = defineAsyncComponent(() => import('./ModalGetdata.vue'))
const ListRincian = defineAsyncComponent(() => import('./ListRincian.vue'))

const props = defineProps({
  store: { type: Object, required: true },
  title: { type: String, default: 'Data' },
  mode: { type: String, default: 'add' }
})

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

  // RINCIAN FORM
  kode_barang: '',
  nobatch: '',
  jumlah_b: 0,
  jumlah_k: 0,
  harga: 0,
  diskon_persen: '',
  isi: 0,
  satuan_k: '',
  satuan_b: '',
  pajak_rupiah: '',
  diskon_rupiah: '',
  flag: '',
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
  form.value.kode_supplier = item?.kode ?? null
  searchSupplier.value = ''
  
}
const handleSelectedBarang = (item) => {
  
  props.store.barangSelected = item
  form.value.kode_barang = item?.kode ?? null
  form.value.satuan_k = item?.satuan_k ?? null
  form.value.satuan_b = item?.satuan_b ?? null
  form.value.isi = item?.isi ?? null
  searchBarang.value = ''
  // console.log('handleSelectedBarang', form.value);

  // await nextTick()
  // console.log('ref', inpJumlahRef.value);
  // const el 
  // inpJumlahRef.value?.inputRef?.focus()
  handleFocus(inpJumlahRef)
  
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

const clearSelectedOrder = () => {
  props.store.supplierSelected = null
  props.store.orderSelected = null
  form.value.noorder = ''
}
const clearSelectedBarang = () => {
  props.store.barangSelected = null
  form.value.kode_barang = ''
  form.value.satuan_k = ''
  form.value.satuan_b = ''
  form.value.isi = 0
  form.value.jumlah_pesan = 1
}

const handleSubmit = () => {
  // console.log('form', form.value);
  props.store.create(form.value)
  .then(() => {
    clearSelectedBarang()
  })
}

const handleBatal = () => {
  clearSelectedBarang()
}

onMounted(() => {
  // document.addEventListener('click', handleClickOutside)
  initForm()
})

function initForm(){
  const today = new Date().toISOString().split('T')[0];
  form.value.tgl_order = today
  form.value.nomor_order = ''
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
      nomor_order: newForm?.nomor_order,
      tgl_order: newForm?.tgl_order,
      // kode_user: newForm?.kode_user,
      kode_supplier: newForm?.kode_supplier
    }
  }

}, { deep: true })

</script>