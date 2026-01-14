import { setupDirectives } from './directives'
import type { App } from 'vue'

export function setupPlugins(app: App) {
  setupDirectives(app)
}
