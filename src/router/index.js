import { createRouter, createWebHistory } from 'vue-router'

// import modules from './modules'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/admin' },
    {
      path: '/admin',
      name: 'admin', // ✅ Tambahkan ini
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