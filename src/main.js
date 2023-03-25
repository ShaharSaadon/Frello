import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import TextareaAutosize from 'vue-textarea-autosize'



import './assets/styles/main.scss'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(TextareaAutosize)

app.mount('#app')
