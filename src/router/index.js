import { createRouter, createWebHistory } from 'vue-router'

// import modules from './modules'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: () => import('@/layout/LoginLayout.vue'),
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/views/auth/LoginPage.vue')
        }
      ] // diisi dinamis nanti
    },
    {
      path: '/admin',
      name: 'admin', // ✅ Tambahkan ini
      meta: {
        requiresAuth: true
      },
      component: () => import('@/layout/AdminLayout.vue'),
      children: [] // diisi dinamis nanti
    },
    
  ]
})

// Suntikkan route ke dalam layout admin
export function injectAdminRoutes(routes) {
  routes.forEach(route => {
    router.addRoute('admin', route)
  })
}

export default router