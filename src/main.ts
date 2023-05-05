import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 导入持久化插件，并安装到pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'

import '@/assets/css/index.scss'

import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
