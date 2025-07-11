// src/stores/useTemplateStore.js
import { defineStore } from 'pinia'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notification'

const notify = useNotificationStore().notify

export function createTemplateStore(storeId, config) {
  return defineStore(storeId, {
    state: () => ({
      items: [],
      item: null,
      loading: false,
      loadingSave: false,
      loadingDelete: false,
      error: null,

      emptyTitle:`Belum Ada Data ${storeId}`,
      emptySubtitle:`Silahkan tambahkan data terlebih dahulu / Lakukan Pencarian Data dengan Kata Kunci yang Sesuai`,

      page: 1,
      per_page: 10,
      total: 0,
      q: '',


      modalFormOpen: false,


      ...config.state
    }),
    actions: {
      async fetchAll(extraParams = {}) {
        this.loading = true
        try {
          const params = {
            page: this.page,
            per_page: this.per_page,
            q: this.q,
            ...extraParams
          }
          const res = await api.get(config.baseUrl + '/get-list', { params })
          // console.log(`resp ${storeId} fetch All : `, res);
          
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
      async create(data, mode) {
        // console.log('data', data);
        // console.log('mode', mode);
        
        
        try {
          this.loadingSave = true
          const res = await api.post(config.baseUrl + '/simpan', data)
          console.log(`resp ${storeId} create : `, res);
          if (res.status === 200) {
            const result = res.data.data
            if (mode === 'add') {
              this.items.unshift(result)
            }else {
              this.items = this.items.map((item) => {
                if (item.id === result.id) {
                  return result
                }
                return item
              })
            }

            this.error = null
            this.modalFormOpen = false
          }

          
        } catch (err) {
          console.log(`error ${storeId} create : `, err);
          this.error = err
        } finally {
          this.loadingSave = false
        }
      },
      async update(id, data) {
        return await api.put(`${config.baseUrl}/${id}`, data)
      },
      async remove(id) {
        // return await api.delete(`${config.baseUrl}/${id}`)
        try {
          this.loadingDelete = true
          const res = await api.post(`${config.baseUrl}/delete`, { id })
          console.log(`resp ${storeId} delete : `, res);
          if (res.status === 200) {
            this.items = this.items.filter(item => item.id !== id)
            this.error = null
            notify({ message: res.data.message ?? 'Berhasil menghapus data', type: 'success' })
          }
        } catch (err) {
          console.log(`error ${storeId} delete : `, err);
          this.error = err
        } finally {
          this.loadingDelete = false
        }
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

      clearFieldError(field) {
        if (this.error?.response?.data?.errors?.[field]) {
          delete this.error.response.data.errors[field]
        }
      },
      reset() {
        this.item = null
        this.error = null
        this.loading = false
        this.page = 1
        this.q = ''
      }
    },
    // 💡 Hanya aktifkan persist jika config.persist = true
    persist: config.persist === true ? {
      paths: ['items', 'per_page'], // atau ['items', 'item'] sesuai kebutuhan
    } : false
  })
}
