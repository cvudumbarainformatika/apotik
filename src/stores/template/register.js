// src/stores/register.js
import { createTemplateStore } from './useTemplateStore'
import { createTemplateTransaksiStore } from './useTemplateTransaksiStore'

// MASTER STORE

export const useBarangStore = createTemplateStore('barang', {
  baseUrl: 'api/v1/master/barang',
  persist: false
})
export const useSatuanStore = createTemplateStore('satuan', {
  baseUrl: 'api/v1/master/satuan',
  persist: true
})
export const useJabatanStore = createTemplateStore('jabatan', {
  baseUrl: 'api/v1/master/jabatan',
  persist: true
})
export const useSupplierStore = createTemplateStore('supplier', {
  baseUrl: 'api/v1/master/supplier',
  persist: false
})
export const usePelangganStore = createTemplateStore('pelanggan', {
  baseUrl: 'api/v1/master/pelanggan',
  persist: false
})
export const useUserStore = createTemplateStore('user', {
  baseUrl: 'api/v1/auth',
  persist: false,
  createUrl: 'register',
  updateUrl: 'update'
})

// export const useSupplierStore = createTemplateStore('supplier', {
//   baseUrl: '/api/supplier',
//   persist: false
// })


// TRANSAKSI STORE

export const useOrderStore = createTemplateTransaksiStore('order', {
  baseUrl: '/api/v1/transactions/order',
  persist: true
})

export const usePenerimaanStore = createTemplateTransaksiStore('penerimaan', {
  baseUrl: '/api/v1/transactions/penerimaan',
  persist: true
})

// dan seterusnya...
