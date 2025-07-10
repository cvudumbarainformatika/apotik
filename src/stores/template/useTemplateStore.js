// src/stores/useTemplateStore.js
import { defineStore } from 'pinia'
import { api } from '@/services/api'

export function createTemplateStore(storeId, config) {
  return defineStore(storeId, {
    state: () => ({
      items: [],
      item: null,
      loading: false,
      error: null,
      page: 1,
      per_page: 10,
      total: 0,
      q: '',
      ...config.state
    }),
    actions: {
      async fetchAll(extraParams = {}) {
        this.loading = true
        try {
          const params = {
            page: this.page,
            perPage: this.perPage,
            search: this.search,
            ...extraParams
          }
          const res = await api.get(config.baseUrl + '/get-list', { params })
          console.log(`resp ${storeId} fetch All : `, res);
          
          this.items = res.data.data ?? res.data
          this.total = res.data.total ?? this.items.length
        } catch (err) {
          console.log(`error ${storeId} fetch All : `, err);
          this.error = err
        } finally {
          this.loading = false
        }
      },
      async fetchOne(id) {
        this.loading = true
        try {
          const res = await api.get(`${config.baseUrl}/${id}`)
          this.item = res.data
        } catch (err) {
          this.error = err
        } finally {
          this.loading = false
        }
      },
      async create(data) {
        return await api.post(config.baseUrl, data)
      },
      async update(id, data) {
        return await api.put(`${config.baseUrl}/${id}`, data)
      },
      async remove(id) {
        return await api.delete(`${config.baseUrl}/${id}`)
      },
      setPage(page) {
        this.page = page
        this.fetchAll()
      },
      setSearch(term) {
        this.search = term
        this.page = 1
        this.fetchAll()
      },
      reset() {
        this.items = []
        this.item = null
        this.error = null
        this.loading = false
        this.page = 1
        this.search = ''
      }
    },
    // 💡 Hanya aktifkan persist jika config.persist = true
    persist: config.persist === true ? {
      paths: ['items'], // atau ['items', 'item'] sesuai kebutuhan
    } : false
  })
}
