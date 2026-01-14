// 初始版本设为空，将在 mounted 时从 version.json 获取
import { NButton, useNotification } from 'naive-ui'
export function useUpdateChecker(time = 1000 * 60 * 5) {
  const notification = useNotification()
  let currentVersion = ''
  let timer: any = null

  const checkUpdate = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}version.json?t=${Date.now()}`)
      const data = await response.json()

      // 第一次获取时设置当前版本
      if (!currentVersion) {
        currentVersion = data.version
        return
      }

      // 比较版本
      if (data.version !== currentVersion) {
        clearInterval(timer) // 清除定时器

        openDiaLog()
      }
    } catch (error) {
      console.error('版本检查失败:', error)
    }
  }

  function openDiaLog() {
    notification.info({
      title: '温馨提示',
      content: '检测到新版本，是否刷新页面？',
      action: () => {
        return (
          <NButton block type="info" onClick={() => refreshPage()}>
            刷新
          </NButton>
        )
      },
    })
  }
  onMounted(() => {
    checkUpdate()
    // 定时检查（例如每5分钟）
    timer = setInterval(checkUpdate, time)
  })

  const refreshPage = () => {
    window.location.reload()
  }
}
