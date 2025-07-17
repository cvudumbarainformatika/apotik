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
          }
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
