import { get, set, createStore } from 'idb-keyval'
import {
  CURRENT_SCHEMA_VERSION,
  SettingsSchema,
  ThemeSchema,
  FinanceStateSchema,
  type SettingsData,
  type ThemeData,
  type FinanceStateData,
} from '@/types/schemas'
import { transactions as seedTransactions } from '@/data/transactions'
import { bills as seedBills } from '@/data/bills'
import { goals as seedGoals } from '@/data/goals'

// Custom single store for the application
const appStore = typeof window !== 'undefined'
  ? createStore('broke-but-functional-db', 'app-store')
  : undefined

// In-memory fallback in case IndexedDB is blocked, unsupported, or in private mode
const memoryFallback: Record<string, unknown> = {
  'schema-version': CURRENT_SCHEMA_VERSION,
  theme: 'light',
  settings: {
    budget: 10000,
    startDate: '2026-10-03',
    purchaseThreshold: 500,
    dayMultiplier: '1.5' as const,
  },
  'finance-state': {
    transactions: seedTransactions,
    bills: seedBills,
    goals: seedGoals,
  },
}

// Debounce helper
const writeTimeouts: Record<string, ReturnType<typeof setTimeout>> = {}

function debounceWrite(key: string, fn: () => Promise<void>, wait = 300) {
  if (writeTimeouts[key]) {
    clearTimeout(writeTimeouts[key])
  }
  writeTimeouts[key] = setTimeout(() => {
    delete writeTimeouts[key]
    fn().catch((err) => {
      console.warn(`[storage] Debounced write failed for key "${key}":`, err)
    })
  }, wait)
}

/**
 * Check schema version. If version is mismatched, reset state to seed data.
 */
async function checkSchemaMigration(): Promise<boolean> {
  if (!appStore) return false
  try {
    const storedVersion = await get<number>('schema-version', appStore)
    if (storedVersion === undefined) {
      await set('schema-version', CURRENT_SCHEMA_VERSION, appStore)
      return true
    }
    if (storedVersion !== CURRENT_SCHEMA_VERSION) {
      console.warn(`[storage] Schema migration: v${storedVersion} -> v${CURRENT_SCHEMA_VERSION}. Resetting corrupted/outdated data to seed.`)
      await set('schema-version', CURRENT_SCHEMA_VERSION, appStore)
      await set('finance-state', memoryFallback['finance-state'], appStore)
      return false
    }
    return true
  } catch (err) {
    console.warn('[storage] IndexedDB schema check failed, using in-memory defaults:', err)
    return false
  }
}

// ── SETTINGS ──

export async function getStoredSettings(): Promise<SettingsData> {
  const defaultSettings = memoryFallback.settings as SettingsData
  if (!appStore) return defaultSettings

  try {
    await checkSchemaMigration()
    const raw = await get('settings', appStore)
    if (!raw) return defaultSettings

    const parsed = SettingsSchema.safeParse(raw)
    if (parsed.success) {
      return parsed.data
    }
    console.warn('[storage] Invalid settings in IndexedDB, discarding and using default:', parsed.error)
    return defaultSettings
  } catch (err) {
    console.warn('[storage] Failed to read settings from IndexedDB:', err)
    return defaultSettings
  }
}

export function saveStoredSettings(settings: SettingsData): void {
  memoryFallback.settings = settings
  if (!appStore) return

  debounceWrite('settings', async () => {
    try {
      const validated = SettingsSchema.parse(settings)
      await set('settings', validated, appStore)
    } catch (err) {
      console.warn('[storage] Failed to write settings to IndexedDB:', err)
    }
  }, 300)
}

// ── THEME ──

export async function getStoredTheme(): Promise<ThemeData> {
  const defaultTheme = memoryFallback.theme as ThemeData
  if (!appStore) return defaultTheme

  try {
    const raw = await get('theme', appStore)
    if (!raw) return defaultTheme

    const parsed = ThemeSchema.safeParse(raw)
    if (parsed.success) {
      return parsed.data
    }
    return defaultTheme
  } catch (err) {
    console.warn('[storage] Failed to read theme from IndexedDB:', err)
    return defaultTheme
  }
}

export function saveStoredTheme(theme: ThemeData): void {
  memoryFallback.theme = theme
  if (!appStore) return

  debounceWrite('theme', async () => {
    try {
      const validated = ThemeSchema.parse(theme)
      await set('theme', validated, appStore)
    } catch (err) {
      console.warn('[storage] Failed to write theme to IndexedDB:', err)
    }
  }, 300)
}

// ── FINANCE STATE ──

export async function getStoredFinanceState(): Promise<FinanceStateData> {
  const seedState = memoryFallback['finance-state'] as FinanceStateData
  if (!appStore) return seedState

  try {
    await checkSchemaMigration()
    const raw = await get('finance-state', appStore)
    if (!raw) return seedState

    const parsed = FinanceStateSchema.safeParse(raw)
    if (parsed.success) {
      return parsed.data
    }
    console.warn('[storage] Invalid finance state in IndexedDB, resetting to seed data:', parsed.error)
    return seedState
  } catch (err) {
    console.warn('[storage] Failed to read finance state from IndexedDB:', err)
    return seedState
  }
}

export function saveStoredFinanceState(state: FinanceStateData): void {
  memoryFallback['finance-state'] = state
  if (!appStore) return

  debounceWrite('finance-state', async () => {
    try {
      const validated = FinanceStateSchema.parse(state)
      await set('finance-state', validated, appStore)
    } catch (err) {
      console.warn('[storage] Failed to write finance state to IndexedDB:', err)
    }
  }, 300)
}

// ── RESET STORAGE ──

export async function resetAllStorage(): Promise<void> {
  memoryFallback.settings = {
    budget: 10000,
    startDate: '2026-10-03',
    purchaseThreshold: 500,
    dayMultiplier: '1.5' as const,
  }
  memoryFallback.theme = 'system'
  memoryFallback['finance-state'] = {
    transactions: seedTransactions,
    bills: seedBills,
    goals: seedGoals,
  }

  if (!appStore) return
  try {
    await set('settings', memoryFallback.settings, appStore)
    await set('theme', memoryFallback.theme, appStore)
    await set('finance-state', memoryFallback['finance-state'], appStore)
    await set('schema-version', CURRENT_SCHEMA_VERSION, appStore)
  } catch (err) {
    console.warn('[storage] Failed to reset IndexedDB:', err)
  }
}
