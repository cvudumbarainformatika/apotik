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
            title: 'Master Barang',
            icon: 'layers',
            url: 'admin/master/barang',
            name: 'master.barang',
            view: '/src/views/master/barang',
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
