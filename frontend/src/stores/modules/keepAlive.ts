import { traverseRoutes } from '@/router/utils'
import { routes } from '@/router/routes'
import { useAuthStore } from './auth'
import { useTabStore } from './tab'
export const useKeepAliveStore = defineStore('keepAlive', () => {
  const authStore = useAuthStore()
  const globalKeepAliveList = ref<RouteRecordName[]>([])

  const tabStore = useTabStore()

  const keepAliveList = computed(() => {
    return globalKeepAliveList.value.filter((item) => {
      return tabStore.tabsList.some((tab) => {
        return tab.name === item
      })
    })
  })
  function initKeepAliveData() {
    const roleMap = authStore.roleMap
    const list: RouteRecordName[] = []
    traverseRoutes(routes, (route) => {
      const roles = route.meta?.role
      if (Array.isArray(roles) && roles.length > 0 && !roles.some((role) => roleMap.has(role))) {
        return
      }
      if (!route.meta?.keepAlive) return
      list.push(route.name as RouteRecordName)
    })
    globalKeepAliveList.value = list
  }

  return {
    keepAliveList,
    initKeepAliveData,
  }
})
