import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, CheckCircle2, XCircle, BarChart3 } from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { monthSummary, heroData, categories } from '@/data/mock'
import { formatCurrency } from '@/lib/utils'
import { fadeUp } from '@/lib/motion'

function GradeBadge({ grade }: { grade: string }) {
  const colors: Record<string, string> = {
    'A+': 'text-safe border-safe bg-safe-bg',
    'A':  'text-safe border-safe bg-safe-bg',
    'B+': 'text-brand border-brand bg-surface-raised',
    'B':  'text-brand border-brand bg-surface-raised',
    'C':  'text-warning border-warning bg-warning-bg',
    'D':  'text-danger border-danger bg-danger-bg',
    'F':  'text-danger border-danger bg-danger-bg',
  }

  return (
    <div className={[
      'w-28 h-28 rounded-[20px] border-2 flex flex-col items-center justify-center',
      colors[grade] ?? 'text-ink border-border bg-surface-raised',
    ].join(' ')}>
      <span className="font-display font-[800] text-[3.5rem] leading-none tracking-[-0.04em]">
        {grade}
      </span>
    </div>
  )
}

export default function Summary() {
  const [shared, setShared] = useState(false)
  const topCategory = categories.sort((a, b) => b.spent - a.spent)[0]

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className="flex flex-col gap-[var(--section-gap)]"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="font-display font-[700] text-[clamp(1.75rem,3vw+1rem,2.75rem)] text-ink tracking-[-0.02em]">
          Month Summary
        </h1>
        <p className="font-body text-ink-muted mt-1">October 2026 — The verdict is in.</p>
      </motion.div>

      {/* Grade + stats row */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[var(--grid-gap)]">
          {/* Grade card (hero) */}
          <Card className="md:col-span-4 flex flex-col items-center justify-center gap-4 py-8">
            <GradeBadge grade={monthSummary.grade} />
            <div className="text-center">
              <p className="font-display font-[700] text-[1.25rem] text-ink">October 2026</p>
              <p className="font-body text-[0.9375rem] text-ink-muted mt-1">
                You survived. Barely, but decisively.
              </p>
            </div>
          </Card>

          {/* Key stats */}
          <div className="md:col-span-8 grid grid-cols-2 gap-[var(--grid-gap)]">
            <Card>
              <CardLabel>Total spent</CardLabel>
              <p className="font-mono font-[700] text-[1.75rem] text-ink tracking-[-0.02em] mt-2">
                {formatCurrency(monthSummary.totalSpent)}
              </p>
              <p className="font-body text-[0.8125rem] text-ink-muted mt-1">
                of {formatCurrency(10000)} budget
              </p>
            </Card>
            <Card>
              <CardLabel>Saved</CardLabel>
              <p className="font-mono font-[700] text-[1.75rem] text-safe tracking-[-0.02em] mt-2">
                {formatCurrency(monthSummary.totalSaved)}
              </p>
              <p className="font-body text-[0.8125rem] text-ink-muted mt-1">
                {((monthSummary.totalSaved / 10000) * 100).toFixed(1)}% of income
              </p>
            </Card>
            <Card>
              <CardLabel>Health score</CardLabel>
              <p className="font-mono font-[700] text-[1.75rem] text-ink tracking-[-0.02em] mt-2">
                {heroData.healthScore}<span className="text-ink-muted font-[400] text-[1rem]">/100</span>
              </p>
              <p className="font-body text-[0.8125rem] text-ink-muted mt-1">Above average</p>
            </Card>
            <Card>
              <CardLabel>Top spend</CardLabel>
              <p className="font-mono font-[700] text-[1.75rem] text-ink tracking-[-0.02em] mt-2">
                {formatCurrency(topCategory.spent)}
              </p>
              <p className="font-body text-[0.8125rem] text-ink-muted mt-1">{topCategory.name}</p>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* Best/Worst day */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--grid-gap)]">
          <Card className="border-safe">
            <CardLabel className="text-safe">Best day</CardLabel>
            <p className="font-body font-[600] text-[1rem] text-ink mt-2">{monthSummary.bestDay}</p>
          </Card>
          <Card className="border-danger">
            <CardLabel className="text-danger">Toughest day</CardLabel>
            <p className="font-body font-[600] text-[1rem] text-ink mt-2">{monthSummary.worstDay}</p>
          </Card>
        </div>
      </motion.div>

      {/* Wins + Mistakes */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--grid-gap)]">
          {/* Wins */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={18} className="text-safe" aria-hidden="true" />
              <h2 className="font-display font-[600] text-[1.0625rem] text-ink">Wins</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {monthSummary.wins.map((win, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-safe-bg text-safe flex items-center justify-center text-[0.75rem] font-[700] shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-body text-[0.9375rem] text-ink">{win}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Mistakes */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <XCircle size={18} className="text-danger" aria-hidden="true" />
              <h2 className="font-display font-[600] text-[1.0625rem] text-ink">Mistakes</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {monthSummary.mistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-danger-bg text-danger flex items-center justify-center text-[0.75rem] font-[700] shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-body text-[0.9375rem] text-ink">{mistake}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </motion.div>

      {/* Shareable recap card */}
      <motion.div variants={fadeUp}>
        <Card className="bg-brand text-brand-fg border-brand">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <BarChart3 size={22} aria-hidden="true" className="text-brand-fg/70" />
              <div>
                <p className="font-display font-[700] text-[1rem]">Share your recap</p>
                <p className="font-body text-[0.875rem] opacity-75 max-w-[50ch] mt-0.5">
                  "{monthSummary.shareTagline}"
                </p>
              </div>
            </div>
            <Button
              variant="accent"
              onClick={() => setShared(true)}
              className="shrink-0"
            >
              {shared ? <><CheckCircle2 size={15} aria-hidden="true" /> Copied!</> : <><Share2 size={15} aria-hidden="true" /> Copy recap</>}
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
