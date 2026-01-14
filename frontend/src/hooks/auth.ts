import { useAuthStore } from '@/stores'
export function useAuth(role: string | string[]) {
  const authStore = useAuthStore()
  if (Array.isArray(role)) {
    return role.some((item) => authStore.roleMap.has(item))
  } else if (typeof role === 'string') {
    return authStore.roleMap.has(role)
  }
  return false
}
