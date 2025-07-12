// src/stores/register.js
import { createTemplateStore } from './useTemplateStore'

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

// export const useSupplierStore = createTemplateStore('supplier', {
//   baseUrl: '/api/supplier',
//   persist: false
// })

// dan seterusnya...
