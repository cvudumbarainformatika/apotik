import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from '@/services/api'

export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isError: false,
    error: null,
    loading: false,
  }),

  persist: true,

  actions: {
    // setUser(user, token) {
    //   this.user = user
    //   this.token = token
    //   this.isAuthenticated = !!token
    // },
    setLoading(status) {
      this.loading = status
    },

    async login(form) {

      this.loading = true

      try {
        const response = await api.post('/api/v1/auth/login', form)
        console.log('response', response);
        const tkn = response?.data?.token
        this.token = tkn
        this.isAuthenticated = !!tkn
        // console.log('token', tkn);
        
        // this.setUser(null, response?.token)
        // return response
      } catch (error) {
        console.error('Login error:', error)
        this.isError = true
        this.error = error
        throw error
      } finally {
        this.loading = false
      }
    },
    async getProfile() {

      this.loading = true

      try {
        const response = await api.post('/api/v1/auth/profile')
        // console.log('response', response);
        // this.setUser(response?.data?.user, null)
        this.user = response?.data?.user
        // return response
      } catch (error) {
        console.error('Login error:', error)
        this.isError = true
        this.error = error
        throw error
      } finally {
        this.loading = false
      }
    },



    async logout() {
      // this.loading = true

      this.user = null
      this.token = null
      this.isAuthenticated = false

      // try {
      //   await api.post('/api/v1/logout')
      //   this.user = null
      //   this.token = null
      //   this.isAuthenticated = false

      // } catch (error) {
      //   console.error('Logout error:', error)
      // } finally {
      //   this.loading = false
      // }


    },

    clearFieldError(field) {
      if (this.error?.response?.data?.errors?.[field]) {
        delete this.error.response.data.errors[field]
      }
    },

  },



  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))

}
