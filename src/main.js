import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'

import components from './components/global/index.js';

const app = createApp(App);
app.use(router)
app.use(components)

app.mount('#app')
