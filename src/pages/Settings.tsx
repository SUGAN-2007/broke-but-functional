import { useState, useEffect, useCallback } from 'react'
import { Settings as SettingsIcon, RotateCcw, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { heroData } from '@/data'
import { ConfirmResetDialog } from '@/components/dialogs'
import { ChallengeParamsCard } from '@/components/settings/ChallengeParamsCard'
import { AlertSensitivityCard } from '@/components/settings/AlertSensitivityCard'
import { AppearanceCard } from '@/components/settings/AppearanceCard'
import { DataBackupCard } from '@/components/settings/DataBackupCard'
import {
  getStoredSettings,
  saveStoredSettings,
  getStoredTheme,
  saveStoredTheme,
  getStoredFinanceState,
  resetAllStorage,
} from '@/lib/storage'
import { CURRENT_SCHEMA_VERSION } from '@/types/schemas'

export default function SettingsPage() {
  const [budget, setBudget] = useState('10000')
  const [startDate, setStartDate] = useState('2026-10-03')
  const [purchaseThreshold, setPurchaseThreshold] = useState('500')
  const [dayMultiplier, setDayMultiplier] = useState<'1.25' | '1.5' | '2'>('1.5')
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [exportCopied, setExportCopied] = useState(false)
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  })

  // Hydrate from IndexedDB after mount without blocking first render
  useEffect(() => {
    let mounted = true

    getStoredSettings().then((stored) => {
      if (!mounted) return
      setBudget(String(stored.budget))
      setStartDate(stored.startDate)
      setPurchaseThreshold(String(stored.purchaseThreshold))
      setDayMultiplier(stored.dayMultiplier)
    })

    getStoredTheme().then((theme) => {
      if (!mounted) return
      if (theme === 'dark') {
        setIsDark(true)
        document.documentElement.classList.add('dark')
      } else if (theme === 'light') {
        setIsDark(false)
        document.documentElement.classList.remove('dark')
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  const handleToggleDark = useCallback((val: boolean | ((prev: boolean) => boolean)) => {
    setIsDark((prev) => {
      const next = typeof val === 'function' ? val(prev) : val
      if (next) {
        document.documentElement.classList.add('dark')
        saveStoredTheme('dark')
      } else {
        document.documentElement.classList.remove('dark')
        saveStoredTheme('light')
      }
      return next
    })
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    saveStoredSettings({
      budget: Number(budget) || 10000,
      startDate,
      purchaseThreshold: Number(purchaseThreshold) || 500,
      dayMultiplier,
    })
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  const handleExportJson = async () => {
    const financeState = await getStoredFinanceState()
    const currentTheme = isDark ? 'dark' : 'light'

    const payload = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      timestamp: new Date().toISOString(),
      currentBalance: heroData.balance,
      settings: {
        budget: Number(budget) || 10000,
        startDate,
        purchaseThreshold: Number(purchaseThreshold) || 500,
        dayMultiplier,
      },
      theme: currentTheme as 'light' | 'dark',
      financeState,
    }

    const jsonStr = JSON.stringify(payload, null, 2)

    // Copy to clipboard
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(jsonStr).catch(() => {})
    }

    // Trigger download
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `broke-but-functional-backup-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setExportCopied(true)
    setTimeout(() => setExportCopied(false), 2500)
  }

  const handleImportSuccess = () => {
    // Reload state from storage
    getStoredSettings().then((stored) => {
      setBudget(String(stored.budget))
      setStartDate(stored.startDate)
      setPurchaseThreshold(String(stored.purchaseThreshold))
      setDayMultiplier(stored.dayMultiplier)
    })
    getStoredTheme().then((theme) => {
      if (theme === 'dark') {
        setIsDark(true)
        document.documentElement.classList.add('dark')
      } else {
        setIsDark(false)
        document.documentElement.classList.remove('dark')
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <SettingsIcon size={24} className="text-brand" aria-hidden="true" />
          <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
            Settings & Challenge Controls
          </h1>
        </div>
        <p className="font-body text-xs sm:text-sm text-ink-muted">
          Adjust starting parameters, sensitivity thresholds, active theme, and state exports.
        </p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <div>
          <ChallengeParamsCard
            budget={budget}
            onBudgetChange={setBudget}
            startDate={startDate}
            onStartDateChange={setStartDate}
          />
        </div>

        <div>
          <AlertSensitivityCard
            purchaseThreshold={purchaseThreshold}
            onPurchaseThresholdChange={setPurchaseThreshold}
            dayMultiplier={dayMultiplier}
            onDayMultiplierChange={setDayMultiplier}
            dailyAllowance={heroData.dailyAllowance}
          />
        </div>

        <div>
          <AppearanceCard isDark={isDark} onToggleDark={handleToggleDark} />
        </div>

        <div>
          <DataBackupCard
            exportCopied={exportCopied}
            onExportJson={handleExportJson}
            onImportSuccess={handleImportSuccess}
          />
        </div>

        {/* Save & Reset Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <Button type="submit" variant="primary" className="text-xs font-semibold">
              Save Settings
            </Button>
            {savedSuccess && (
              <span className="text-xs font-semibold text-safe flex items-center gap-1">
                <Check size={14} /> Saved successfully
              </span>
            )}
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setResetDialogOpen(true)}
            className="text-xs text-danger hover:bg-danger-bg hover:text-danger gap-1.5"
          >
            <RotateCcw size={13} /> Reset 30-Day Month
          </Button>
        </div>
      </form>

      {/* Confirm Reset Dialog */}
      <ConfirmResetDialog
        open={resetDialogOpen}
        onOpenChange={setResetDialogOpen}
        onConfirm={async () => {
          await resetAllStorage()
          setBudget('10000')
          setStartDate('2026-10-03')
          setPurchaseThreshold('500')
          setDayMultiplier('1.5')
        }}
      />
    </div>
  )
}
