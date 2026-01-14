import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from './guard'
import { routes } from './routes'
// import { filterRoutes } from './utils'

import type { App } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL), // 使用 Vite 的 base 配置
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
    },
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/404',
    },
    // ...filterRoutes(routes, (route) => !route.meta?.roles || route.meta?.roles.length === 0),
  ],
})

export default router

export async function setupRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
}
