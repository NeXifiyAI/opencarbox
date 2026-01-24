/**
 * Config Loader
 * =============
 * 
 * Lädt und validiert die project.config.ts
 */

import config from '../../project.config'
import type { ProjectConfig } from './types'

// Singleton für gecachte Config
let cachedConfig: ProjectConfig | null = null

/**
 * Lädt die Projekt-Konfiguration
 */
export function getConfig(): ProjectConfig {
  if (cachedConfig) return cachedConfig
  cachedConfig = config
  return cachedConfig
}

/**
 * Prüft ob ein Feature aktiviert ist
 */
export function isFeatureEnabled(feature: keyof ProjectConfig['features']): boolean {
  const conf = getConfig()
  return conf.features[feature]?.enabled ?? false
}

/**
 * Holt Theme-Farben
 */
export function getThemeColors() {
  return getConfig().theme.colors
}

/**
 * Holt SEO-Defaults
 */
export function getSeoDefaults() {
  return getConfig().seo
}

/**
 * Holt Projekt-Infos
 */
export function getProjectInfo() {
  return getConfig().project
}

/**
 * Generiert CSS-Variablen aus Theme
 */
export function generateCssVariables(): string {
  const { colors } = getConfig().theme
  
  return `
    :root {
      --color-primary: ${colors.primary};
      --color-secondary: ${colors.secondary};
      --color-accent: ${colors.accent};
      --color-destructive: ${colors.destructive};
      --color-success: ${colors.success};
      --color-warning: ${colors.warning};
    }
  `.trim()
}

/**
 * Export für direkten Import
 */
export { config }
export type { ProjectConfig }
