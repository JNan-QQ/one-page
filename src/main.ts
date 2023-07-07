import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

declare module 'particles.vue3';
import Particles from 'particles.vue3'

createApp(App).use(Particles).mount('#app')
