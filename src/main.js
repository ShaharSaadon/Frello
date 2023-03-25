import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import TextareaAutosize from 'vue-textarea-autosize'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



import './assets/styles/main.scss'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(TextareaAutosize)
app.use(ElementPlus)

app.mount('#app')
