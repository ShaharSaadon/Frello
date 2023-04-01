import App from './App.vue'
import { createApp } from 'vue'
import { router } from './router.js'
import { store } from './store/store.js'
import vClickOutside from 'v-click-outside'
import ElementPlus from 'element-plus'
import VCalendar from 'v-calendar'
import 'element-plus/dist/index.css'
import 'v-calendar/style.css'
import './assets/styles/main.scss'


const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VCalendar, {})
app.use(vClickOutside)

app.mount('#app')
