<template>
  <u-col class="w-full pb-4 pt-1 px-2 relative">
    <u-grid cols="6">

      <!-- HEADER 1 -->
      <u-card class="col-span-2 h-full min-h-[100px] space-y-2">
        <u-row>
          <u-icon name="layers" class="w-4 h-4" />
          <u-text class="font-bold">Informasi Penjualan</u-text>
        </u-row>
        <u-row >
          <div 
            class="bg-primary/10 border border-primary rounded-xl shadow-sm p-2 transition-all duration-300 hover:shadow-md w-full">
            <div class="flex flex-1 justify-between items-start">
              <u-row flex1 class="w-full">
                <u-avatar icon="users" size="w-10 h-10" ></u-avatar>
                <u-col gap="gap-0">
                  <u-text class="font-bold">
                    Petugas Saat ini
                  </u-text>
                  <u-text>
                    {{ auth?.user?.nama }}
                  </u-text>
                </u-col>
              </u-row>
             
            </div>
          </div>
        </u-row>
        <u-row >
          <div 
            class="bg-primary/10 border border-primary rounded-xl shadow-sm p-2 transition-all duration-300 hover:shadow-md w-full">
            <div class="flex flex-1 justify-center items-center">
              <u-text class="font-medium" size="md" color="text-light-primary">{{ currentTime }}</u-text>
             
            </div>
          </div>
        </u-row>
        
      </u-card>

      <!-- HEADER 2 -->
      <u-card class="col-span-2 h-full space-y-2">
        <u-row>
          <u-icon name="users" class="w-4 h-4" />
          <u-text class="font-bold">Data Pelanggan</u-text>
        </u-row>
        <u-row>
          <u-autocomplete v-model="searchPelanggan" placeholder="Cari Pelanggan" 
            :debounce="300" :min-search-length="2" 
            item-key="id" 
            item-label="nama"
            not-found-text="Data Pelanggan tidak ditemukan" 
            not-found-subtext="Coba kata kunci lain" 
            :show-add-button="false"
            api-url="/api/v1/master/pelanggan/get-list" api-response-path="data.data" :api-params="{ per_page: 5 }"
            :use-api="true" @select="handleSelectedPelanggan"
          ></u-autocomplete>
        </u-row>
        <u-row>
          <div v-if="store?.pelangganSelected"
            class="bg-primary/10 border border-primary rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md w-full">
            <div class="flex flex-1 justify-between items-start">
              <u-row flex1 class="w-full">
                <u-icon name="UserSearch" class="w-5 h-5 text-primary" />
                <u-text>
                  {{ store.pelangganSelected?.nama }}
                </u-text>
              </u-row>
              <button @click="clearSelectedPelanggan"
                class="text-primary hover:text-danger " aria-label="Hapus">
                <u-icon name="X" class="w-4 h-4" />
              </button>
            </div>
          </div>


          <div v-else
            class="bg-danger/10 border border-danger rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md w-full">
            <u-row class="items-start" padding="p-0">
              <u-icon name="UserSearch" class="w-4 h-4 text-primary" />
              <div>
                <u-text>
                  Silahkan cari Pelanggan
                </u-text>
              </div>
            </u-row>
          </div>
          
        </u-row>
      </u-card>
      <!-- HEADER 3 -->
      <u-card class="col-span-2 h-full space-y-2">
        <u-row>
          <u-icon name="users" class="w-4 h-4" />
          <u-text class="font-bold">Data Dokter</u-text>
        </u-row>
        <u-row>
          <u-autocomplete v-model="searchDokter" placeholder="Cari Dokter" 
            :debounce="300" :min-search-length="2" 
            item-key="id" 
            item-label="nama_dokter"
            not-found-text="Data Dokter tidak ditemukan" 
            not-found-subtext="Coba kata kunci lain" 
            :show-add-button="false"
            api-url="/api/v1/master/dokter/get-list" api-response-path="data.data" :api-params="{ per_page: 5 }"
            :use-api="true" @select="handleSelectedDokter"
          ></u-autocomplete>
        </u-row>
        <u-row>
          <div v-if="store?.dokterSelected"
            class="bg-primary/10 border border-primary rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md w-full">
            <div class="flex flex-1 justify-between items-start">
              <u-row flex1 class="w-full">
                <u-icon name="UserSearch" class="w-5 h-5 text-primary" />
                <u-text>
                  {{ store.dokterSelected?.nama_dokter }}
                </u-text>
              </u-row>
              <button @click="clearSelectedDokter"
                class="text-primary hover:text-danger " aria-label="Hapus">
                <u-icon name="X" class="w-4 h-4" />
              </button>
            </div>
          </div>


          <div v-else
            class="bg-danger/10 border border-danger rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md w-full">
            <u-row class="items-start" padding="p-0">
              <u-icon name="UserSearch" class="w-4 h-4 text-primary" />
              <div>
                <u-text>
                  Silahkan cari data dokter
                </u-text>
              </div>
            </u-row>
          </div>
          
        </u-row>
      </u-card>

      
      
    </u-grid>
  
    <!-- CONTENT -->
    <u-grid cols="12">

      <!-- List Items -->
        <u-card class="col-span-9 h-full space-y-4">
          <u-row>
            <u-icon name="baggage-claim" class="w-4 h-4" />
            <u-text class="font-bold">Informasi Item</u-text>
          </u-row>
          <u-row>
            <u-autocomplete v-model="searchBarang" placeholder="Cari Barang" 
              :debounce="300" :min-search-length="2" 
              item-key="id" 
              item-label="nama"
              not-found-text="Data Barang tidak ditemukan" 
              not-found-subtext="Coba kata kunci lain" 
              :show-add-button="false"
              api-url="/api/v1/transactions/penjualan/get-list-obat" api-response-path="data.data" :api-params="{ per_page: 10 }"
              :use-api="true" @select="handleSelectedBarang" 
            >
              <template #item="{ item }">
                <u-col gap="gap-1">
                  <u-text size="sm" class="font-medium">{{ item?.nama }}</u-text>
                  <u-row class="-mt-1" gap="gap-1">
                    <u-text class="">{{ item?.kode }}</u-text>, 
                    <u-text class="">{{ item?.satuan_k }}</u-text> | 
                    <u-text class="">{{ item?.satuan_b }}</u-text>
                    <u-text class="">Isi {{ item?.isi }}</u-text>
                  </u-row>
                </u-col>
              </template>
            </u-autocomplete>
          </u-row>

          <u-row class="relative -mt-4">
            <div v-if="store?.barangSelected"
              ref="menuBarangRef"
              class="bg-background border-1 border-primary rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md w-full absolute z-10 -top-4">
              <u-grid cols="12" gap="gap-4">
                <div class="col-span-4">
                  <u-text class="font-bold">Nama Barang</u-text>
                  <u-text>{{ store.barangSelected?.nama || '-' }}</u-text>
                </div>
                <div class="col-span-4 text-center">
                  <u-text class="font-bold">Satuan</u-text>
                  <u-text>{{ store.barangSelected?.satuan_k || '-' }} | {{ store.barangSelected?.satuan_b || '-' }}, {{ store.barangSelected?.isi || 0 }}</u-text>
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
                    :error="isError('jumlah_pesan')"
                    :error-message="errorMessage('jumlah_pesan')" 
                  />
                </u-row>
                <u-row right class="col-span-8 ">
                  <u-btn variant="secondary" label="Batal"  @click="handleBatal"/>
                  <u-btn :loading="store.loadingSave" label="Simpan" @click.stop="handleSubmit"  />
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
          </u-row>

        </u-card>

        <u-col align="items-end" class="col-span-3">
          <u-text class="font-bold" size="sm">Summary Penjualan</u-text>
          <u-separator spacing="-my-2"></u-separator>
          <u-row>
            <u-text>Total Item : </u-text>
            <u-text class="font-bold" size="sm">{{ store.form?.order_records?.length || 0 }}</u-text>
          </u-row>
          <u-row>
            <u-badge v-if="store.form?.flag" variant="danger">Terkunci</u-badge>
            <u-badge v-else :variant="store.mode === 'add' ? 'success' : 'warning'">Mode {{ store.mode === 'add' ? 'Tambah' : 'Edit' }}</u-badge>
          </u-row>
          <u-separator spacing="-my-1"></u-separator>
          <u-row class="z-99">
            <u-btn v-if="store.mode === 'edit'" variant="secondary" @click="initForm">Order Baru</u-btn>
            <u-btn v-if="store.form" :loading="loadingLock" @click="handleKunci">{{ store.form?.flag ? 'Buka Kunci' : 'Kunci Order' }}</u-btn>
          </u-row>
        </u-col>
    </u-grid>

    <div v-if="store.form?.flag" class="absolute top-0 left-0 right-0 w-full h-full rounded-2xl flex items-center justify-center p-4 bg-light-primary/10" padding="p-0"></div>
  
  </u-col>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted, watch, defineAsyncComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/services/api'


const ListRincian = defineAsyncComponent(() => import('./ListRincian.vue'))

const props = defineProps({
  store: { type: Object, required: true },
  title: { type: String, default: 'Data' },
  mode: { type: String, default: 'add' }
})

const auth = useAuthStore()

const searchPelanggan = ref('')
const searchDokter = ref('')
const searchBarang = ref('')
const menuBarangRef = ref(null)
const inpJumlahRef = ref(null)
const loadingLock = ref(false)


const currentTime = ref('')
let timer = null

const updateClock = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const form = ref({
  nopenjualan: '',
  kode_pelanggan: '',
  kode_dokter: '',
  kode_barang: '',
  jumlah_k: 1,
  satuan_k: '',
  satuan_b: '',
  isi: '',
  harga_jual: 0,
  harga_beli: 0,
  id_penerimaan_rinci: null,
  nopenerimaan: null,
  nobatch: null,
  tgl_exprd: null,
  id_stok: null,

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

const handleSelectedPelanggan = (item) => {
  // console.log('pelanggan', item);
  
  props.store.pelangganSelected = item
  form.value.kode_pelanggan = item?.kode ?? null
  searchPelanggan.value = ''
  
}
const handleSelectedDokter = (item) => {
  // console.log('dokter', item);
  
  props.store.dokterSelected = item
  form.value.kode_dokter = item?.kode ?? null
  searchDokter.value = ''
  
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

// const onItemsLoaded = (items) => {
//   // console.log('items', items);
  
// }
// const onItemsLoadedBarang = (items) => {
//   // console.log('items', items);
  
// }

const clearSelectedPelanggan = () => {
  props.store.pelangganSelected = null
  // form.value.kode_supplier = ''
}
const clearSelectedDokter = () => {
  props.store.dokterSelected = null
  // form.value.kode_supplier = ''
}
const clearSelectedBarang = () => {
  props.store.barangSelected = null
  form.value.kode_barang = ''
  form.value.satuan_k = ''
  form.value.satuan_b = ''
  form.value.isi = 0
  form.value.jumlah_pesan = 1
}

const handleSubmit = (e) => {
  e.preventDefault()
  e.stopPropagation()
  // console.log('form', form.value);
  props.store.create(form.value)
  .then(() => {
    clearSelectedBarang()
  })
}

const handleBatal = () => {
  clearSelectedBarang()
}

const handleKunci = async (e) => {
  e.preventDefault()
  e.stopPropagation()
  // console.log('store', props.store.items);
  // console.log('store form', props.store.form);

  const flag = (props.store.form?.flag === '1' || props.store.form?.flag === 1)
  const nomor_order = props.store.form?.nomor_order
  const payload = {
    nomor_order
  }

  loadingLock.value = true

  let resp
  try {
    if (!flag) {
      resp = await api.post(`api/v1/transactions/order/lock-order`, payload)
    } else {
      resp = await api.post(`api/v1/transactions/order/unlock-order`, payload)
    }

    // console.log('resp', resp);
  } catch (error) {
    console.log('error', error);
    
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
  form.value.tgl_order = today
  form.value.nomor_order = ''
  props.store.init()
  clearSelectedBarang()
  clearSelectedPelanggan()
  clearSelectedDokter()
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
      nomor_order: newForm?.nomor_order ?? '',
      tgl_order: newForm?.tgl_order ?? '',
      // kode_user: newForm?.kode_user,
      kode_supplier: newForm?.kode_supplier ?? '',
      
    }
  }

}, { deep: true })

watch(() => props.store.maxRight, (newMax, oldMax) => {
  // if (!newMax) {
  //   initForm()
  // }
  console.log('newMax', newMax);
  console.log('form', form.value);
  
}, { deep: true })

</script>