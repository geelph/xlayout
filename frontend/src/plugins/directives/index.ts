import { setupRoleDirective } from './role'
import type { App } from 'vue'

export function setupDirectives(app: App) {
  setupRoleDirective(app)
}
