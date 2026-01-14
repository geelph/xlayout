import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'

import './assets/styles/main.css'

import { createApp } from 'vue'
import { setupPinia } from './stores'
import { setupRouter } from './router'
import { setupPlugins } from './plugins'

import AppLoading from './components/AppLoading/index.vue'
import AppProvider from './components/AppProvider/index.vue'

async function bootstrap() {
  const loadingApp = createApp(AppLoading)
  loadingApp.mount('#app-loading')
  const app = createApp(AppProvider)
  setupPinia(app)
  setupPlugins(app)
  await setupRouter(app)
  app.mount('#app')
  loadingApp.unmount()
}

bootstrap()
