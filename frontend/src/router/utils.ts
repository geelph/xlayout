import type { RouteRecordRaw } from 'vue-router'

export function filterRoutes(
  routesTree: RouteRecordRaw[],
  callBack: (node: RouteRecordRaw) => boolean,
): RouteRecordRaw[] {
  function traverse(routes: RouteRecordRaw[]): RouteRecordRaw[] {
    return routes.reduce<RouteRecordRaw[]>((acc, route) => {
      if (callBack(route)) {
        const filteredRoute = { ...route }

        // 如果有子路由，递归过滤
        if (route.children?.length) {
          const filteredChildren = traverse(route.children)
          if (filteredChildren.length) {
            filteredRoute.children = filteredChildren
          } else {
            delete filteredRoute.children
          }
        }

        acc.push(filteredRoute)
      }

      return acc
    }, [])
  }

  return traverse(routesTree)
}

export function traverseRoutes(routesTree: RouteRecordRaw[], callBack: (route: RouteRecordRaw) => void): void {
  function traverse(routes: RouteRecordRaw[]): void {
    routes.forEach((route) => {
      callBack(route)
      if (route.children?.length) {
        traverse(route.children)
      }
    })
  }

  traverse(routesTree)
}
