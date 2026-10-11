import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import {
  Settings as SettingsIcon,
  Download,
  Upload,
  RotateCcw,
  Sun,
  Moon,
  Check,
  Sliders,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { heroData } from '@/data/mock'
import { ConfirmResetDialog } from '@/components/dialogs/FinanceDialogs'

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
        {/* Core Challenge Configuration */}
        <motion.div variants={fadeUp}>
          <Card className="p-5">
            <h2 className="font-display font-[700] text-sm text-ink mb-1">
              Challenge Core Parameters
            </h2>
            <p className="font-body text-xs text-ink-muted mb-4">
              Baseline budget and starting anchor for the 30-day challenge.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Starting Budget (₹)"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  min="1000"
                  required
                />
                <p className="text-[11px] text-ink-muted mt-1">Default: ₹10,000 for standard run</p>
              </div>

              <div>
                <Input
                  label="Challenge Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
                <p className="text-[11px] text-ink-muted mt-1">October 3 (runs through Nov 1)</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Expensive Threshold Controls */}
        <motion.div variants={fadeUp}>
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Sliders size={16} className="text-accent" />
              <h2 className="font-display font-[700] text-sm text-ink">
                Expensive Alert Sensitivity
              </h2>
            </div>
            <p className="font-body text-xs text-ink-muted mb-4">
              Defines what triggers red heatmap tags on the Calendar and transaction lists.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Per-Purchase Threshold (₹)"
                  type="number"
                  value={purchaseThreshold}
                  onChange={(e) => setPurchaseThreshold(e.target.value)}
                  min="100"
                  required
                />
                <p className="text-[11px] text-ink-muted mt-1">
                  Single expenses above this amount receive the "Expensive" pill badge.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5 font-body">
                  Daily Burn Multiplier ({dayMultiplier}x Allowance)
                </label>
                <div className="flex items-center bg-surface border border-border rounded-[12px] p-1 h-10">
                  {(['1.25', '1.5', '2'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDayMultiplier(m)}
                      className={[
                        'flex-1 py-1.5 rounded-[8px] text-xs font-mono font-bold transition-colors cursor-pointer',
                        dayMultiplier === m ? 'bg-brand text-brand-fg shadow-xs' : 'text-ink-muted hover:text-ink',
                      ].join(' ')}
                    >
                      {m}x (₹{Math.round(heroData.dailyAllowance * parseFloat(m))})
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-ink-muted mt-1">
                  Multiplied against your daily allowance (₹{heroData.dailyAllowance}/day).
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Appearance & Theme */}
        <motion.div variants={fadeUp}>
          <Card className="p-5">
            <h2 className="font-display font-[700] text-sm text-ink mb-1">Appearance & Mode</h2>
            <p className="font-body text-xs text-ink-muted mb-3">
              Light mode (Paper cream & forest green) vs Dark mode (Night market black).
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDark(false)}
                className={[
                  'flex items-center gap-2 px-4 py-2.5 rounded-[12px] border text-xs font-semibold transition-all cursor-pointer',
                  !isDark ? 'border-brand bg-brand/10 text-brand ring-1 ring-brand' : 'border-border text-ink-muted hover:text-ink',
                ].join(' ')}
              >
                <Sun size={15} /> Light (Paper Cream)
              </button>

              <button
                type="button"
                onClick={() => setIsDark(true)}
                className={[
                  'flex items-center gap-2 px-4 py-2.5 rounded-[12px] border text-xs font-semibold transition-all cursor-pointer',
                  isDark ? 'border-brand bg-brand/10 text-brand ring-1 ring-brand' : 'border-border text-ink-muted hover:text-ink',
                ].join(' ')}
              >
                <Moon size={15} /> Dark (Deep Forest)
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Data Portability (Export / Import JSON) */}
        <motion.div variants={fadeUp}>
          <Card className="p-5">
            <h2 className="font-display font-[700] text-sm text-ink mb-1">Data Backup & Sync</h2>
            <p className="font-body text-xs text-ink-muted mb-4">
              Export your challenge state as a portable JSON snapshot or restore previous backup.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleExportJson}
                className="gap-1.5 text-xs font-semibold"
              >
                <Download size={14} />
                {exportCopied ? 'JSON Copied to Clipboard!' : 'Export Challenge Data (JSON)'}
              </Button>

              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] border border-border bg-surface hover:bg-surface-raised text-xs font-semibold text-ink cursor-pointer transition-colors">
                <Upload size={14} /> Import Backup
                <input type="file" accept=".json" className="sr-only" onChange={() => alert('Simulated import: Data restored successfully.')} />
              </label>
            </div>
          </Card>
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
