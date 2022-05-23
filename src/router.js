import { createRouter, createWebHashHistory } from 'vue-router'
import CreatePage from '@/pages/CreatePage.vue'
import ViewPage from '@/pages/ViewPage.vue'

const routes = [
  { path: '/', component: CreatePage, name: 'home' },
  { path: '/view/:config', component: ViewPage, name: 'view' },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
