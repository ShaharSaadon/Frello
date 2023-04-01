import { createApp } from 'vue'
   

import { router } from './router.js'
import { store } from './store/store.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import vClickOutside from 'v-click-outside'




import './assets/styles/main.scss'
import App from './App.vue'

const app = createApp(App)
app.directive('click-outside', vClickOutside)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VCalendar, {})

app.mount('#app')
