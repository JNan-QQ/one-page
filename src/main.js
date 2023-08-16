import { createApp } from 'vue'

import App from '@/App.vue'
import ElementPlus from 'element-plus'

import '@/assets/css/style.css'
import "animate.css"
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).mount('#app')
