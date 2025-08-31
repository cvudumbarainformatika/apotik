// src/stores/register.js
import { createTemplateStore } from './useTemplateStore'
import { createTemplateTransaksiStore } from './useTemplateTransaksiStore'

// MASTER STORE

export const useBarangStore = createTemplateStore('barang', {
  baseUrl: 'api/v1/master/barang',
  order_by: 'nama',
  sort: 'asc',
  order: 'Nama',
  persist: false
})
export const useSatuanStore = createTemplateStore('satuan', {
  baseUrl: 'api/v1/master/satuan',
  order_by: 'nama',
  sort: 'asc',
  order: 'Nama',
  persist: true
})
export const useJabatanStore = createTemplateStore('jabatan', {
  baseUrl: 'api/v1/master/jabatan',
  order_by: 'nama',
  sort: 'asc',
  order: 'Nama',
  persist: true
})
export const useSupplierStore = createTemplateStore('supplier', {
  baseUrl: 'api/v1/master/supplier',
  order_by: 'nama',
  sort: 'asc',
  order: 'Nama',
  persist: false
})
export const usePelangganStore = createTemplateStore('pelanggan', {
  baseUrl: 'api/v1/master/pelanggan',
  order_by: 'nama',
  sort: 'asc',
  order: 'Nama',
  persist: false
})
export const useUserStore = createTemplateStore('user', {
  baseUrl: 'api/v1/auth',
  persist: false,
  createUrl: '/register',
  updateUrl: '/update'
})
export const useDokterStore = createTemplateStore('dokter', {
  baseUrl: 'api/v1/master/dokter',
  order_by: 'nama',
  sort: 'asc',
  order: 'Nama',
  persist: false
})
export const useBebanStore = createTemplateStore('beban', {
  baseUrl: 'api/v1/master/beban',
  persist: false
})
// export const useSupplierStore = createTemplateStore('supplier', {
//   baseUrl: '/api/supplier',
//   persist: false
// })


// TRANSAKSI STORE

export const useOrderStore = createTemplateTransaksiStore('order', {
  baseUrl: '/api/v1/transactions/order',
  persist: false
})

export const usePenerimaanStore = createTemplateTransaksiStore('penerimaan', {
  baseUrl: '/api/v1/transactions/penerimaan',
  persist: false
})

export const usePenjualanStore = createTemplateTransaksiStore('penjualan', {
  baseUrl: '/api/v1/transactions/penjualan',
  persist: false
})

export const useStockStore = createTemplateTransaksiStore('stok', {
  baseUrl: '/api/v1/transactions/stok',
  // createUrl: '/tambah',
  persist: false
})

export const useReturPembelianStore = createTemplateTransaksiStore('retur-pembelian', {
  baseUrl: '/api/v1/transactions/returpembelian',
  persist: false
})

export const useBebanPengeluaranStore = createTemplateTransaksiStore('beban-pengeluaran', {
  baseUrl: '/api/v1/transactions/beban',
  persist: false
})




// LAPORAN STORE
export const useKartuStokStore = createTemplateTransaksiStore('kartu-stok', {
  baseUrl: 'api/v1/transactions/stok',
  persist: false
})





// dan seterusnya...
