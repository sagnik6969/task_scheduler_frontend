import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import vutify from './vutify'
import router from './router/index.js'

import { createApp } from 'vue'
import App from './App.vue'
createApp(App).use(vutify).use(router).mount('#app')
