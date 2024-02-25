import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
// import 'vuetify/styles'
import vutify from './vutify.js'
import router from './router/index.js'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'


createApp(App).use(store).use(vutify).use(router).mount('#app');
