import type { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { setupUnocssPlugin } from './unocss'
import { setupRouter } from './router'
import { setupAutoImportPlugin } from './import'
import { setupInject } from './inject'
import { setupVersion } from './version'
export function setupVitePlugins() {
  const plugins: PluginOption[] = [
    setupInject(),
    vue(),
    vueJsx(),
    vueDevTools(),
    setupRouter(),
    setupUnocssPlugin(),
    ...setupAutoImportPlugin(),
    setupVersion(),
  ]
  return plugins
}
