import { createApp, nextTick } from 'vue'
import App from './App.vue'
import './style.css'



import pinia from './stores'
import router from './router'
import components from './components/global/index.js';
import { setupDynamicRoutes } from './router/modules/setupDynamicRoutes'


import confirmPlugin from './plugins/confirm'

const app = createApp(App);
app.use(pinia)

setupDynamicRoutes(pinia).then(async () => {
  app.use(router)
  app.use(components)
  app.use(confirmPlugin)
  app.mount('#app')
})
