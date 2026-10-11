import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { Settings as SettingsIcon, RotateCcw, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { heroData } from '@/data'
import { ConfirmResetDialog } from '@/components/dialogs'
import { ChallengeParamsCard } from '@/components/settings/ChallengeParamsCard'
import { AlertSensitivityCard } from '@/components/settings/AlertSensitivityCard'
import { AppearanceCard } from '@/components/settings/AppearanceCard'
import { DataBackupCard } from '@/components/settings/DataBackupCard'

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

  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [isDark])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  const handleExportJson = () => {
    const data = {
      budget: Number(budget),
      startDate,
      purchaseThreshold: Number(purchaseThreshold),
      dayMultiplier,
      currentBalance: heroData.balance,
      timestamp: new Date().toISOString(),
    }
    navigator.clipboard?.writeText(JSON.stringify(data, null, 2))
    setExportCopied(true)
    setTimeout(() => setExportCopied(false), 2500)
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-2.5 mb-1">
          <SettingsIcon size={24} className="text-brand" aria-hidden="true" />
          <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
            Settings & Challenge Controls
          </h1>
        </div>
        <p className="font-body text-xs sm:text-sm text-ink-muted">
          Adjust starting parameters, sensitivity thresholds, active theme, and state exports.
        </p>
      </motion.div>

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <motion.div variants={fadeUp}>
          <ChallengeParamsCard
            budget={budget}
            onBudgetChange={setBudget}
            startDate={startDate}
            onStartDateChange={setStartDate}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <AlertSensitivityCard
            purchaseThreshold={purchaseThreshold}
            onPurchaseThresholdChange={setPurchaseThreshold}
            dayMultiplier={dayMultiplier}
            onDayMultiplierChange={setDayMultiplier}
            dailyAllowance={heroData.dailyAllowance}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <AppearanceCard isDark={isDark} onToggleDark={setIsDark} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <DataBackupCard exportCopied={exportCopied} onExportJson={handleExportJson} />
        </motion.div>

        {/* Save & Reset Actions Bar */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
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
        </motion.div>
      </form>

      {/* Confirm Reset Dialog */}
      <ConfirmResetDialog
        open={resetDialogOpen}
        onOpenChange={setResetDialogOpen}
        onConfirm={() => {
          setBudget('10000')
          setStartDate('2026-10-03')
          setPurchaseThreshold('500')
          setDayMultiplier('1.5')
        }}
      />
    </motion.div>
  )
}
