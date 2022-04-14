import { createApp } from 'vue'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


createApp(App).use(Notifications).use(router).mount('#app')
