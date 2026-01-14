import { ref } from 'vue'
export function useLoading(_loading = false) {
  const loading = ref(_loading)
  function startLoading() {
    loading.value = true
  }
  function endLoading() {
    loading.value = false
  }
  return {
    loading,
    startLoading,
    endLoading,
  }
}
