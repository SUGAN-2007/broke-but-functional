import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  GitCompare,
  Sparkles,
  Check,
  History,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Select } from '@/components/ui/input'
import { categoryOptions, heroData, quickScenarios } from '@/data/mock'
import { formatCurrency, getDateForDay } from '@/lib/utils'

interface Delta {
  label: string
  before: string | number
  after: string | number
  unit?: string
  diffText?: string
  status: 'safe' | 'warning' | 'danger' | 'neutral'
}

function DeltaRow({ delta }: { delta: Delta }) {
  const statusColor = {
    safe: 'text-safe',
    warning: 'text-warning font-semibold',
    danger: 'text-danger font-bold',
    neutral: 'text-ink-muted',
  }[delta.status]

  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-border/60 last:border-0">
      <span className="font-body text-xs sm:text-sm text-ink-muted">{delta.label}</span>
      <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
        <span className="text-ink-muted">
          {typeof delta.before === 'number' ? formatCurrency(delta.before) : delta.before}
        </span>
        <ArrowRight size={12} className="text-border-strong shrink-0" aria-hidden="true" />
        <span className={statusColor}>
          {typeof delta.after === 'number' ? formatCurrency(delta.after) : delta.after}
          {delta.unit && <span className="font-body font-[400] text-ink-muted ml-0.5">{delta.unit}</span>}
        </span>
        {delta.diffText && (
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-surface border border-border text-ink-muted ml-1">
            {delta.diffText}
          </span>
        )}
      </div>
    </div>
  )
}

export default function Simulator() {
  // Pre-filled example as required: Swiggy dinner, ₹1,200, Food
  const [item, setItem] = useState('Swiggy dinner')
  const [amount, setAmount] = useState('1200')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState('2026-10-10')
  const [compareMode, setCompareMode] = useState(false)
  const [decisionConfirmed, setDecisionConfirmed] = useState(false)

  const amt = parseFloat(amount) || 0
  const currentLiquid = heroData.balance
  const newBalance = Math.max(-1000, currentLiquid - amt)

  // (balance - unpaid bills) / days left
  const daysLeft = heroData.daysLeft
  const newAllowance = Math.max(0, Math.round((newBalance - heroData.unpaidBills) / daysLeft))
  const dangerDayShift = amt >= 2000 ? 5 : amt >= 1000 ? 3 : amt >= 500 ? 1 : 0
  const simulatedDangerDay = Math.max(8, heroData.dangerDay - dangerDayShift)

  const isCritical = newBalance < 0 || simulatedDangerDay <= 15
  const isSevere = amt >= 1000 || simulatedDangerDay <= 23

  const deltas: Delta[] = [
    {
      label: 'Liquid Balance',
      before: heroData.balance,
      after: newBalance,
      diffText: amt > 0 ? `-${formatCurrency(amt)}` : undefined,
      status: newBalance < 4000 ? 'danger' : 'warning',
    },
    {
      label: 'Calculated Daily Allowance',
      before: heroData.dailyAllowance,
      after: newAllowance,
      unit: '/day',
      diffText: `-${formatCurrency(heroData.dailyAllowance - newAllowance)}/d`,
      status: newAllowance < 150 ? 'danger' : 'warning',
    },
    {
      label: 'Savings Goal Delay',
      before: 'On track (32% Headphones)',
      after: amt >= 2000 ? 'Deadlock (Headphones frozen)' : amt >= 1000 ? 'Delayed 6 days' : 'Minor delay',
      status: amt >= 1000 ? 'danger' : 'warning',
    },
    {
      label: 'Projected Insolvency Day',
      before: `${getDateForDay(heroData.dangerDay)} (Day ${heroData.dangerDay})`,
      after: `${getDateForDay(simulatedDangerDay)} (Day ${simulatedDangerDay})`,
      diffText: dangerDayShift > 0 ? `${dangerDayShift}d earlier` : 'Unchanged',
      status: dangerDayShift > 0 ? 'danger' : 'safe',
    },
    {
      label: 'Month Forecast Risk',
      before: `Danger: ${getDateForDay(heroData.dangerDay)} (Day ${heroData.dangerDay})`,
      after: isCritical ? 'Critical Emergency' : 'High Risk',
      status: 'danger',
    },
    {
      label: 'Financial Health Score',
      before: heroData.healthScore,
      after: Math.max(20, heroData.healthScore - (amt >= 2000 ? 18 : amt >= 1000 ? 10 : 5)),
      diffText: amt >= 1000 ? '-10 pts' : '-5 pts',
      status: 'danger',
    },
  ]

  const handleApplyScenario = (scenario: { label: string; amount: number; category: string }) => {
    setItem(scenario.label)
    setAmount(scenario.amount.toString())
    setCategory(scenario.category)
    setDecisionConfirmed(false)
  }

  const handleReset = () => {
    setItem('')
    setAmount('0')
    setDecisionConfirmed(false)
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
            Decision Simulator
          </h1>
          <p className="font-body text-xs sm:text-sm text-ink-muted mt-1">
            Test any purchase before you tap UPI. See exact ripple effects on your daily allowance and insolvency day.
          </p>
        </div>

        {/* Compare Mode Toggle */}
        <button
          type="button"
          onClick={() => setCompareMode((v) => !v)}
          className={[
            'self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 rounded-[10px] border text-xs font-semibold transition-all cursor-pointer',
            compareMode
              ? 'bg-brand text-brand-fg border-brand'
              : 'bg-surface border-border text-ink hover:bg-surface-raised',
          ].join(' ')}
          aria-pressed={compareMode}
        >
          <GitCompare size={14} />
          <span>{compareMode ? 'Comparing 2 Scenarios' : 'Compare Two Decisions'}</span>
        </button>
      </motion.div>

      {/* Quick Scenario Chips */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-ink-muted font-body font-medium flex items-center gap-1">
            <Sparkles size={13} className="text-accent" /> Quick Scenarios:
          </span>
          {quickScenarios.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => handleApplyScenario(s)}
              className={[
                'px-2.5 py-1 rounded-[8px] text-xs font-semibold border transition-all cursor-pointer',
                item === s.label
                  ? 'bg-ink text-surface border-ink'
                  : 'bg-surface border-border text-ink hover:bg-surface-raised',
              ].join(' ')}
            >
              {s.label} <span className="font-mono text-ink-muted">({formatCurrency(s.amount)})</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Grid: Form + Simulator Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Form (5 cols) */}
        <motion.div variants={fadeUp} className="lg:col-span-5">
          <Card className="p-5 h-full flex flex-col justify-between">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              <div>
                <h2 className="font-display font-[700] text-sm text-ink mb-1">
                  Scenario Parameters
                </h2>
                <p className="text-xs text-ink-muted font-body">
                  Configure purchase details to run the cashflow delta.
                </p>
              </div>

              <Input
                label="Item or Expense Description"
                placeholder="e.g. Swiggy dinner, Metro card..."
                value={item}
                onChange={(e) => {
                  setItem(e.target.value)
                  setDecisionConfirmed(false)
                }}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    label="Amount (₹)"
                    type="number"
                    placeholder="1200"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value)
                      setDecisionConfirmed(false)
                    }}
                    min="1"
                    required
                  />
                </div>
                <div>
                  <Select
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={categoryOptions.map((c) => ({ value: c, label: c }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5 font-body">
                  Target Purchase Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-[12px] bg-surface border border-border text-ink text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              {/* Context notes */}
              <div className="p-3.5 rounded-[12px] bg-surface border border-border text-xs text-ink-muted">
                <div className="flex items-center justify-between font-semibold text-ink mb-1">
                  <span>Current Liquid Baseline:</span>
                  <span className="font-mono">{formatCurrency(heroData.balance)}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>Unpaid bills protected:</span>
                  <span className="font-mono text-danger">-{formatCurrency(heroData.unpaidBills)}</span>
                </div>
              </div>
            </form>

            <div className="pt-4 border-t border-border flex items-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-full text-xs font-semibold"
              >
                Reset Parameters
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Right Column: Comparison Panel (7 cols) */}
        <motion.div variants={fadeUp} className="lg:col-span-7">
          <Card className="p-5 h-full flex flex-col justify-between">
            <div>
              {/* Verdict Banner */}
              <div
                className={[
                  'rounded-[14px] p-3.5 sm:p-4 mb-4 border flex items-start gap-3',
                  isCritical
                    ? 'bg-danger-bg border-danger/40 text-danger'
                    : isSevere
                    ? 'bg-danger-bg/40 border-danger/30 text-danger'
                    : 'bg-safe-bg/40 border-safe/30 text-safe',
                ].join(' ')}
              >
                {isSevere ? (
                  <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="font-display font-[800] text-xs sm:text-sm uppercase tracking-wide">
                    {isCritical
                      ? 'Critical Insolvency Alert'
                      : isSevere
                      ? 'Danger: Danger Zone Pulled Forward'
                      : 'Safe to Proceed'}
                  </h3>
                  <p className="font-body text-xs mt-1 text-ink-muted leading-relaxed">
                    Spending <span className="font-bold font-mono text-ink">{formatCurrency(amt)}</span> on {item || 'this item'} pulls your ₹0 danger day forward by{' '}
                    <span className="font-bold text-danger">{dangerDayShift} days</span> (from {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay}) to {getDateForDay(simulatedDangerDay)} (Day {simulatedDangerDay})). Daily allowance contracts to{' '}
                    <span className="font-bold text-danger">{formatCurrency(newAllowance)}/day</span>.
                  </p>
                </div>
              </div>

              {/* Side-by-Side Comparison if Compare Mode Enabled */}
              {compareMode ? (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 rounded-[12px] bg-danger-bg/20 border border-danger/30">
                    <span className="text-[10px] font-bold text-danger uppercase tracking-wider block mb-1">
                      Scenario A: Buy Now (₹{amt})
                    </span>
                    <p className="font-mono text-lg font-bold text-ink">{formatCurrency(newBalance)}</p>
                    <p className="text-[11px] text-danger font-semibold mt-1">
                      {formatCurrency(newAllowance)}/day • Danger: {getDateForDay(simulatedDangerDay)} (Day {simulatedDangerDay})
                    </p>
                    <p className="text-[10px] text-ink-muted mt-2">
                      Headphones delayed 6 days. Month end deficit deepens.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-[12px] bg-safe-bg/20 border border-safe/30">
                    <span className="text-[10px] font-bold text-safe uppercase tracking-wider block mb-1">
                      Scenario B: Wait 7 Days (₹0 now)
                    </span>
                    <p className="font-mono text-lg font-bold text-ink">{formatCurrency(heroData.balance)}</p>
                    <p className="text-[11px] text-safe font-semibold mt-1">
                      {formatCurrency(heroData.dailyAllowance)}/day • Danger: {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})
                    </p>
                    <p className="text-[10px] text-ink-muted mt-2">
                      Full daily runway preserved. Cushion remains intact.
                    </p>
                  </div>
                </div>
              ) : null}

              {/* Live Accessible Delta Table */}
              <div aria-live="polite" aria-atomic="true">
                <div className="flex items-center justify-between pb-2 mb-1 border-b border-border">
                  <span className="text-xs font-bold text-ink font-display uppercase tracking-wider">Metric Impact</span>
                  <span className="text-xs font-bold text-ink font-display uppercase tracking-wider">Before → Simulated</span>
                </div>
                <div className="divide-y divide-border/60">
                  {deltas.map((d) => (
                    <DeltaRow key={d.label} delta={d} />
                  ))}
                </div>
              </div>
            </div>

            {/* Decision Action Bar */}
            <div className="pt-4 mt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-ink-muted font-body">
                {decisionConfirmed ? (
                  <span className="text-safe font-semibold flex items-center gap-1">
                    <Check size={14} /> Decision simulated & recorded in cache
                  </span>
                ) : (
                  <span>Ready to commit this decision to your plan?</span>
                )}
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="flex-1 sm:flex-none text-xs font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  variant={isSevere ? 'warning' : 'primary'}
                  size="sm"
                  onClick={() => setDecisionConfirmed(true)}
                  className="flex-1 sm:flex-none text-xs font-semibold gap-1.5"
                >
                  <Check size={14} /> Confirm Decision
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

      </div>

      {/* LOWER HALF: SIMULATION ENGINE LOGIC & PAST SIMULATED SCENARIOS */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-2">
        {/* Left: Engine Rules (6 cols) */}
        <div className="lg:col-span-6">
          <Card className="p-5 h-full">
            <div className="flex items-center gap-2 mb-2">
              <Calculator size={16} className="text-brand" />
              <h2 className="font-display font-[700] text-sm text-ink">
                How the Simulator Computes Ripple Effects
              </h2>
            </div>
            <p className="font-body text-xs text-ink-muted leading-relaxed mb-4">
              A standard budgeting app only subtracts money. Broke But Functional recalculates the four core survival vectors:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-md bg-brand/10 text-brand flex items-center justify-center shrink-0 font-mono font-bold text-[11px]">
                  1
                </span>
                <div>
                  <span className="font-bold text-ink">Daily Allowance Recalibration: </span>
                  <span className="text-ink-muted">
                    Subsumes all unpaid committed bills (₹1,840) first before dividing remaining balance across 22 days.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-md bg-accent/20 text-accent-fg flex items-center justify-center shrink-0 font-mono font-bold text-[11px]">
                  2
                </span>
                <div>
                  <span className="font-bold text-ink">Insolvency Day Acceleration: </span>
                  <span className="text-ink-muted">
                    Any single discretionary purchase &gt;₹1,000 immediately brings {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay}) forward by 3 days.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-md bg-safe/10 text-safe flex items-center justify-center shrink-0 font-mono font-bold text-[11px]">
                  3
                </span>
                <div>
                  <span className="font-bold text-ink">Goal Opportunity Cost: </span>
                  <span className="text-ink-muted">
                    Translates the price tag into days delayed for your Headphones (₹2,500 target) or Emergency Cushion.
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Past Simulation History (6 cols) */}
        <div className="lg:col-span-6">
          <Card className="p-5 h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <History size={16} className="text-brand" />
                <h2 className="font-display font-[700] text-sm text-ink">Recent What-If Simulations</h2>
              </div>
              <span className="text-[10px] text-ink-muted font-mono font-semibold">Simulated Today</span>
            </div>

            <div className="divide-y divide-border">
              {[
                { item: 'Uniqlo Oversized T-shirt', amt: 1990, verdict: 'Rejected: Delays Headphones 14d', date: '1 hour ago', color: 'text-danger' },
                { item: 'Zomato Late Night Biryani', amt: 450, verdict: 'Approved: Within surplus buffer', date: '3 hours ago', color: 'text-safe' },
                { item: 'Noise Cancelling Buds', amt: 2500, verdict: 'Postponed to Nov 2 top-up', date: 'Yesterday', color: 'text-warning' },
              ].map((sim, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-ink">{sim.item}</p>
                    <p className={`text-[11px] ${sim.color} mt-0.5 font-medium`}>{sim.verdict}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-ink">{formatCurrency(sim.amt)}</span>
                    <p className="text-[10px] text-ink-muted">{sim.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}
