import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/verb/:name',
    name: 'verb-display',
    component: () => import('../views/VerbDisplay.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
