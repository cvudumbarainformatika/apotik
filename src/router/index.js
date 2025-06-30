import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/admin' },
    {
      path: '/admin',
      component: () => import('../layout/AdminLayout.vue'),
      children: [
        { path: '', redirect: '/home' },
        {
          path: '/home',
          component: () => import('../components/HelloWorld.vue'),
        },
        
      ],
    },
    
  ]
})

export default router