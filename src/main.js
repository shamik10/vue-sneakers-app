import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Favorities from './pages/Favorities.vue'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorities', name: 'Favorities', component: Favorities }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App);

app.use(autoAnimatePlugin)
app.use(router)
app.mount('#app')
