import { describe, it, expect } from 'vitest'
import { config, isFeatureEnabled, getConfig, getThemeColors } from '@/config'

/**
 * ============================================================
 * Unit Tests: Config
 * ============================================================
 */

describe('getConfig', () => {
  it('sollte die Konfiguration zurückgeben', () => {
    const conf = getConfig()
    expect(conf).toBeDefined()
    expect(conf.app).toBeDefined()
    expect(conf.app.name).toBeDefined()
  })
})

describe('config', () => {
  it('sollte App-Konfiguration haben', () => {
    expect(config.app).toBeDefined()
    expect(config.app.name).toBeTruthy()
    expect(config.app.url).toBeTruthy()
  })

  it('sollte Features-Konfiguration haben', () => {
    expect(config.features).toBeDefined()
    expect(typeof config.features.auth).toBe('boolean')
  })

  it('sollte Theme-Konfiguration haben', () => {
    expect(config.theme).toBeDefined()
    expect(config.theme.colors).toBeDefined()
  })
})

describe('isFeatureEnabled', () => {
  it('sollte Feature-Status zurückgeben', () => {
    // Auth sollte in der Standard-Config aktiviert sein
    const authEnabled = isFeatureEnabled('auth')
    expect(typeof authEnabled).toBe('boolean')
  })

  it('sollte false für unbekannte Features zurückgeben', () => {
    // @ts-expect-error - Testing invalid feature
    const result = isFeatureEnabled('unknownFeature')
    expect(result).toBe(false)
  })
})

describe('getThemeColors', () => {
  it('sollte Theme-Farben zurückgeben', () => {
    const colors = getThemeColors()
    expect(colors).toBeDefined()
    expect(colors.primary).toBeDefined()
  })
})
