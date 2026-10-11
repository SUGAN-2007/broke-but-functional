import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Calculator,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Select } from '@/components/ui/input'
import { categoryOptions, heroData } from '@/data/mock'
import { formatCurrency } from '@/lib/utils'


interface Delta {
  label: string
  before: string | number
  after: string | number
  unit?: string
  direction: 'up' | 'down' | 'neutral'
  highlight?: boolean
}

function DeltaRow({ delta }: { delta: Delta }) {
  const icon = {
    up:      <ArrowUp size={14} className="text-danger" aria-hidden="true" />,
    down:    <ArrowDown size={14} className="text-safe" aria-hidden="true" />,
    neutral: <ArrowRight size={14} className="text-ink-muted" aria-hidden="true" />,
  }[delta.direction]

  return (
    <div className={[
      'flex items-center justify-between gap-3 py-3',
      delta.highlight && 'bg-warning-bg rounded-[10px] px-3 -mx-3',
    ].filter(Boolean).join(' ')}>
      <span className="font-body text-[0.875rem] text-ink-muted">{delta.label}</span>
      <div className="flex items-center gap-2 font-mono text-[0.875rem] font-[600]">
        <span className="text-ink-muted">{typeof delta.before === 'number' ? formatCurrency(delta.before) : delta.before}</span>
        {icon}
        <span className={delta.direction === 'up' ? 'text-danger' : delta.direction === 'down' ? 'text-safe' : 'text-ink'}>
          {typeof delta.after === 'number' ? formatCurrency(delta.after) : delta.after}
          {delta.unit && <span className="font-body font-[400] text-ink-muted ml-0.5">{delta.unit}</span>}
        </span>
      </div>
    </div>
  )
}

export default function Simulator() {
  const [item, setItem] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState('Today')
  const [simulated, setSimulated] = useState(false)

  const amt = parseFloat(amount) || 0
  const newBalance = heroData.balance - amt
  const newAllowance = Math.max(0, (heroData.balance - amt) / (heroData.totalDays - heroData.day))
  const inRed = newBalance < 2000
  const verdictDanger = newBalance < 0

  const deltas: Delta[] = [
    {
      label: 'Balance',
      before: heroData.balance,
      after: newBalance,
      direction: amt > 0 ? 'up' : 'neutral',
      highlight: inRed,
    },
    {
      label: 'Daily allowance',
      before: heroData.dailyAllowance,
      after: Math.round(newAllowance),
      unit: '/day',
      direction: amt > 0 ? 'up' : 'neutral',
    },
    {
      label: 'Savings goal impact',
      before: 'On track',
      after: amt > 500 ? 'Delayed ~1 week' : 'Minimal impact',
      direction: amt > 500 ? 'up' : 'neutral',
    },
    {
      label: 'Forecast risk',
      before: 'Medium',
      after: inRed ? 'High' : 'Medium',
      direction: inRed ? 'up' : 'neutral',
    },
    {
      label: 'Health score',
      before: heroData.healthScore,
      after: Math.max(0, heroData.healthScore - Math.floor(amt / 200)),
      direction: amt > 0 ? 'up' : 'neutral',
    },
  ]

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className="flex flex-col gap-[var(--section-gap)]"
    >
      <motion.div variants={fadeUp}>
        <h1 className="font-display font-[700] text-[clamp(1.75rem,3vw+1rem,2.75rem)] text-ink tracking-[-0.02em]">
          Decision Simulator
        </h1>
        <p className="font-body text-ink-muted mt-1 max-w-[60ch]">
          Before you spend, see what happens to your balance, allowance, and goals — in real time.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--grid-gap)] items-start">
        {/* ── Left: Form ── */}
        <motion.div variants={fadeUp}>
          <Card>
            <h2 className="font-display font-[600] text-[1.125rem] text-ink mb-5 flex items-center gap-2">
              <Calculator size={18} aria-hidden="true" className="text-brand" />
              What are you considering?
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                label="Item or expense"
                placeholder="Fatty Bao dinner, new headphones…"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
              <Input
                label="Amount (₹)"
                type="number"
                placeholder="1200"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
              <div className="flex gap-3">
                <div className="flex-1">
                  <Select
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={categoryOptions.map((c) => ({ value: c, label: c }))}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => setSimulated(true)}
                  disabled={!amount}
                >
                  Simulate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { setSimulated(false); setAmount(''); setItem('') }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Right: Before / After ── */}
        <motion.div variants={fadeUp}>
          <Card className={simulated && inRed ? 'border-warning' : ''}>
            <h2 className="font-display font-[600] text-[1.125rem] text-ink mb-1">Before vs After</h2>
            {!simulated ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <div className="w-16 h-16 rounded-[16px] bg-surface-raised flex items-center justify-center">
                  <Calculator size={28} className="text-ink-muted" aria-hidden="true" />
                </div>
                <p className="font-body text-ink-muted text-center max-w-[28ch]">
                  Fill in the form and hit <strong>Simulate</strong> to see the impact.
                </p>
              </div>
            ) : (
              <>
                {/* Verdict banner */}
                <div className={[
                  'rounded-[12px] px-4 py-3 mb-5 flex items-center gap-3',
                  verdictDanger
                    ? 'bg-danger-bg border border-danger'
                    : inRed
                    ? 'bg-warning-bg border border-warning'
                    : 'bg-safe-bg border border-safe',
                ].join(' ')}>
                  {verdictDanger
                    ? <XCircle size={18} className="text-danger shrink-0" aria-hidden="true" />
                    : inRed
                    ? <AlertTriangle size={18} className="text-warning shrink-0" aria-hidden="true" />
                    : <CheckCircle2 size={18} className="text-safe shrink-0" aria-hidden="true" />
                  }
                  <p className={[
                    'font-body font-[600] text-[0.9375rem]',
                    verdictDanger ? 'text-danger' : inRed ? 'text-warning' : 'text-safe',
                  ].join(' ')}>
                    {verdictDanger
                      ? `This puts you in the red immediately. You can't afford it.`
                      : inRed
                      ? `This tightens your budget significantly — you'll have only ${formatCurrency(newBalance)} left.`
                      : `Manageable. Your daily allowance drops to ${formatCurrency(Math.round(newAllowance))}/day.`
                    }
                  </p>
                </div>

                {/* Delta rows */}
                <div className="flex flex-col divide-y divide-border">
                  {deltas.map((d, i) => (
                    <DeltaRow key={i} delta={d} />
                  ))}
                </div>

                <hr className="ledger-divider my-4" />

                <div className="flex gap-3">
                  <Button variant={verdictDanger ? 'danger' : 'primary'} className="flex-1" size="md">
                    {verdictDanger ? 'Confirm anyway' : 'Confirm spend'}
                  </Button>
                  <Button variant="outline" onClick={() => setSimulated(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
