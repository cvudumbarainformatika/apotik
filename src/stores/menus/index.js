import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from '@/services/api'

export const useMenuStore = defineStore('menu-store', {
  state: () => ({
    items: [
      {
        title: 'Dashboard',
        icon: 'home',
        url: 'admin',
        name: 'dashboard',
        view: '/src/views/dashboard',
        component: 'IndexPage',
        children:[]
      },


      //  MASTER
      {
        title: 'Master',
        icon: 'layers',
        url: 'admin/master',
        name: null,
        view: null,
        component: null,
        children:[
          {
            title: 'Master Satuan',
            icon: 'tag',
            url: 'admin/master/satuan',
            name: 'master.satuan',
            view: '/src/views/master/satuan',
            component: 'IndexPage',
          },
          {
            title: 'Master Barang',
            icon: 'layers',
            url: 'admin/master/barang',
            name: 'master.barang',
            view: '/src/views/master/barang',
            component: 'IndexPage',
          },
          {
            title: 'Master Jabatan',
            icon: 'network',
            url: 'admin/master/jabatan',
            name: 'master.jabatan',
            view: '/src/views/master/jabatan',
            component: 'IndexPage',
          },
          {
            title: 'Master Supplier',
            icon: 'users-round',
            url: 'admin/master/supplier',
            name: 'master.supplier',
            view: '/src/views/master/supplier',
            component: 'IndexPage',
          },
          {
            title: 'Master Pelanggan',
            icon: 'users',
            url: 'admin/master/pelanggan',
            name: 'master.pelanggan',
            view: '/src/views/master/pelanggan',
            component: 'IndexPage',
          },
          {
            title: 'Master Pengguna',
            icon: 'users',
            url: 'admin/master/user',
            name: 'master.user',
            view: '/src/views/master/user',
            component: 'IndexPage',
          },
          {
            title: 'Master Dokter',
            icon: 'users',
            url: 'admin/master/dokter',
            name: 'master.dokter',
            view: '/src/views/master/dokter',
            component: 'IndexPage',
          },
          {
            title: 'Master Beban',
            icon: 'users',
            url: 'admin/master/beban',
            name: 'master.beban',
            view: '/src/views/master/beban',
            component: 'IndexPage',
          }
        ]
      },


      // TRANSAKSI
      {
        title: 'Transaksi',
        icon: 'layers',
        url: 'admin/transaksi',
        name: null,
        view: null,
        component: null,
        children:[
          {
            title: 'Order Product',
            icon: 'layers',
            url: 'admin/transaksi/order',
            name: 'transaksi.order',
            view: '/src/views/transaksi/order',
            component: 'IndexPage',
          },
           {
            title: 'Penerimaan',
            icon: 'layers',
            url: 'admin/transaksi/penerimaan',
            name: 'transaksi.penerimaan',
            view: '/src/views/transaksi/penerimaan',
            component: 'IndexPage',
          },
           {
            title: 'Penjualan',
            icon: 'layers',
            url: 'admin/transaksi/penjualan',
            name: 'transaksi.penjualan',
            view: '/src/views/transaksi/penjualan',
            component: 'IndexPage',
          },
           {
            title: 'Stock List',
            icon: 'layers',
            url: 'admin/transaksi/stock',
            name: 'transaksi.stock',
            view: '/src/views/transaksi/stock',
            component: 'IndexPage',
          },
           {
            title: 'Retur PBF',
            icon: 'layers',
            url: 'admin/transaksi/returpembelian',
            name: 'transaksi.returpembelian',
            view: '/src/views/transaksi/returpembelian',
            component: 'IndexPage',
          },
          {
            title: 'Beban Pengeluaran',
            icon: 'layers',
            url: 'admin/transaksi/beban',
            name: 'transaksi.beban',
            view: '/src/views/transaksi/beban',
            component: 'IndexPage',
          }
        ]
      },

      //  LAPORAN
      {
        title: 'Laporan',
        icon: 'layers',
        url: 'admin/laporan',
        name: null,
        view: null,
        component: null,
        children:[
          {
            title: 'Kartu Stok',
            icon: 'layers',
            url: 'admin/laporan/kartustok',
            name: 'laporan.kartustok',
            view: '/src/views/laporan/kartustok',
            component: 'IndexPage',
          },
          
        ]
      },
     
    ],
    
  }),

  // persist: true,

  actions: {

  },



  getters: {
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))

}
