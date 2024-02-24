import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
// import 'vuetify/styles'
import vutify from './vutify.js'
import router from './router/index.js'

import { createApp } from 'vue'
import App from './App.vue'
createApp(App).use(vutify).use(router).mount('#app')
