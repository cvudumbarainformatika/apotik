import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from '@/services/api'
import { getToday, getMonthStartDate, getMonthEndDate } from '@/utils/dateHelper'


export const useDashboardStore = defineStore('dashboard-store', {
  state: () => ({
    top5Products:{
      label:[],
      data:[]
    },
    topPbf:{
      label:[],
      data:[]
    },
    params: {
      q: '',
      per_page: 50,
      page: 1,
      order_by: 'created_at',
      sort: 'desc',
      from: getMonthStartDate(),
      to: getMonthEndDate(),
    },
    meta: null,
    loading: false,
    loadingMore: false,

    range:{
      start_date: getToday(),
      end_date: getToday()
    },

    perPages: [50, 100, 200, 500],
    
  }),

  // persist: true,

  actions: {


    getDateMonth() {
      
      return new Promise((resolve, reject) => {
        this.params.start_date = getMonthStartDate()
        this.params.end_date = getMonthEndDate()
        console.log('params', this.params);
        resolve(this.params)
      })  
      
    },
   
    async fetchFastMoving() {
      this.loading = true

      const params = {
        ...this.params,
      }

      const res = await api
        .get('api/v1/laporan/dashboard/fasmoving', params)
        // console.log('res fast moving', res);
        const data = res.data?.data || []

        this.top5Products.label = data?.map(item => item.nama) || []
        this.top5Products.data = data?.map(item => parseInt(item?.total_penjualan)) || []

        console.log('top5Products', this.top5Products);
        
            
    },

    async fetchPbf() {
      this.loading = true

      const params = {
        ...this.params,
      }

      const res = await api
        .get('api/v1/laporan/dashboard/toppbf', params)

        console.log('res top pbf', res);
        const data = res.data?.data || []

        this.topPbf.label = data?.map(item => item.nama) || []
        this.topPbf.data = data?.map(item => parseInt(item?.jumlah)) || []

        
    

    },



  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot))

}
