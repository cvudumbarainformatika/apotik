// src/stores/register.js
import { createTemplateStore } from './useTemplateStore'

export const useBarangStore = createTemplateStore('barang', {
  baseUrl: 'api/v1/master/barang',
  persist: false
})
export const useSatuanStore = createTemplateStore('satuan', {
  baseUrl: 'api/v1/master/satuan',
  persist: false
})

// export const useSupplierStore = createTemplateStore('supplier', {
//   baseUrl: '/api/supplier',
//   persist: false
// })

// dan seterusnya...
