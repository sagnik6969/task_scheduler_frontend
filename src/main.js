import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
// import 'vuetify/styles'
import vutify from './vutify.js'
import router from './router/index.js'
import VueApexCharts from 'vue3-apexcharts'
import { VueDraggableNext } from 'vue-draggable-next'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'

createApp(App).use(store).use(vutify).use(router).use(VueApexCharts).use(ToastPlugin).mount('#app')
