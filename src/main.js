import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

import './assets/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.directive('focus', (el) => {
  el.focus()
})

app.mount('#app')
