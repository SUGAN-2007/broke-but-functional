import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Share2,
  CheckCircle2,
  XCircle,
  PieChart as PieIcon,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { monthSummary, heroData, categories } from '@/data/mock'
import { formatCurrency, getDateForDay } from '@/lib/utils'
import { fadeUp } from '@/lib/motion'

function GradeBadge({ grade }: { grade: string }) {
  const colors: Record<string, string> = {
    'A+': 'text-safe border-safe bg-safe-bg',
    'A':  'text-safe border-safe bg-safe-bg',
    'B+': 'text-brand border-brand bg-brand/10',
    'B':  'text-brand border-brand bg-brand/10',
    'C+': 'text-warning border-warning bg-warning-bg',
    'C':  'text-warning border-warning bg-warning-bg',
    'D':  'text-danger border-danger bg-danger-bg',
    'F':  'text-danger border-danger bg-danger-bg',
  }

  return (
    <div
      className={[
        'w-24 h-24 rounded-[22px] border-2 flex flex-col items-center justify-center shadow-xs',
        colors[grade] ?? 'text-ink border-border bg-surface-raised',
      ].join(' ')}
    >
      <span className="font-display font-[800] text-[3.2rem] leading-none tracking-[-0.04em]">
        {grade}
      </span>
    </div>
  )
}

export default function Summary() {
  const [copied, setCopied] = useState(false)

  const handleCopyRecap = () => {
    navigator.clipboard?.writeText(monthSummary.shareTagline)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
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
        <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
          Challenge Midpoint Verdict & Summary
        </h1>
        <p className="font-body text-xs sm:text-sm text-ink-muted mt-1">
          {getDateForDay(8)} (Day 8 of 30) audit. Starting plan vs actual burn velocity analysis.
        </p>
      </motion.div>

      {/* Grade + stats row */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
          {/* Grade card */}
          <Card className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 gap-3">
            <GradeBadge grade={monthSummary.grade} />
            <div>
              <p className="font-display font-[700] text-base text-ink">Mid-Challenge Grade</p>
              <p className="font-body text-xs text-ink-muted mt-0.5 leading-relaxed">
                Surviving with scratches. Food delivery is threatening the final week.
              </p>
            </div>
          </Card>

          {/* Key stats grid */}
          <div className="md:col-span-8 grid grid-cols-2 gap-4">
            <Card className="p-4">
              <CardLabel>Total Outflow So Far</CardLabel>
              <p className="font-mono font-[700] text-2xl text-ink mt-1">
                {formatCurrency(monthSummary.totalSpent)}
              </p>
              <p className="font-body text-xs text-ink-muted mt-0.5">
                of ₹{monthSummary.startingBudget.toLocaleString('en-IN')} (+₹2,000 top-up)
              </p>
            </Card>

            <Card className="p-4">
              <CardLabel>Goals & Stash Locked</CardLabel>
              <p className="font-mono font-[700] text-2xl text-safe mt-1">
                {formatCurrency(monthSummary.totalSaved)}
              </p>
              <p className="font-body text-xs text-ink-muted mt-0.5">
                Headphones + Emergency cushion
              </p>
            </Card>

            <Card className="p-4">
              <CardLabel>Health Index</CardLabel>
              <p className="font-mono font-[700] text-2xl text-warning mt-1">
                {heroData.healthScore} <span className="text-xs text-ink-muted font-normal">/ 100</span>
              </p>
              <p className="font-body text-xs text-ink-muted mt-0.5">Sum of all 7 weighted factors</p>
            </Card>

            <Card className="p-4 border-danger/30 bg-danger-bg/20">
              <CardLabel>Danger Point</CardLabel>
              <p className="font-mono font-[700] text-2xl text-danger mt-1">
                {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})
              </p>
              <p className="font-body text-xs text-ink-muted mt-0.5">Balance projected to reach ₹0</p>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* STARTING PLAN VS ACTUAL OUTCOME BEFORE/AFTER */}
      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-[700] text-sm text-ink">
                Starting Plan vs Actual Outcome ({getDateForDay(8)} / Day 8 Reality Check)
              </h2>
              <p className="font-body text-xs text-ink-muted">
                How reality deviated from your {getDateForDay(1)} (Day 1) financial projections
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-warning">Variance: -₹2,560</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                metric: 'Budget Available',
                plan: '₹10,000 (flat)',
                actual: '₹12,000 (+₹2k top-up)',
                status: 'positive',
                delta: '+₹2,000 inflow',
              },
              {
                metric: `${getDateForDay(8)} (Day 8) Cumulative Burn`,
                plan: '₹3,200 planned',
                actual: '₹5,760 actual',
                status: 'negative',
                delta: 'Overrun by ₹2,560',
              },
              {
                metric: 'Daily Runway Left',
                plan: '₹309/day target',
                actual: '₹200/day actual',
                status: 'negative',
                delta: '-₹109/day slower',
              },
              {
                metric: 'Insolvency Horizon',
                plan: `${getDateForDay(30)} (Day 30) • Surplus ₹1,500`,
                actual: `${getDateForDay(heroData.dangerDay)} (Day 26) • Deficit -₹320`,
                status: 'negative',
                delta: '4 days cut short',
              },
            ].map((row, i) => (
              <div key={i} className="p-3.5 rounded-[12px] bg-surface border border-border flex flex-col justify-between">
                <div>
                  <span className="font-display font-bold text-xs text-ink block mb-2">{row.metric}</span>
                  <div className="text-xs space-y-1 font-mono">
                    <div className="text-ink-muted flex items-center justify-between">
                      <span>Plan:</span>
                      <span>{row.plan}</span>
                    </div>
                    <div className="text-ink font-bold flex items-center justify-between">
                      <span>Actual:</span>
                      <span className={row.status === 'negative' ? 'text-danger' : 'text-safe'}>{row.actual}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-border/60">
                  <span className={`text-[10px] font-bold ${row.status === 'negative' ? 'text-danger' : 'text-safe'}`}>
                    {row.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* CATEGORY BREAKDOWN TABLE / CARDS */}
      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <PieIcon size={16} className="text-brand" />
              <h2 className="font-display font-[700] text-sm text-ink">Category Burn Breakdown</h2>
            </div>
            <span className="text-xs text-ink-muted font-mono">Total: ₹5,760</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const pct = Math.round((cat.spent / cat.budget) * 100)
              const isOver = pct >= 80

              return (
                <div key={cat.name} className="p-3.5 rounded-[12px] bg-surface border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-semibold text-xs text-ink">{cat.name}</span>
                    <span className={`font-mono text-xs font-bold ${isOver ? 'text-danger' : 'text-ink'}`}>
                      {pct}%
                    </span>
                  </div>
                  <Progress
                    value={cat.spent}
                    max={cat.budget}
                    variant={isOver ? 'danger' : 'brand'}
                    size="sm"
                  />
                  <div className="flex justify-between items-center text-[11px] text-ink-muted font-mono mt-2">
                    <span>Spent: {formatCurrency(cat.spent)}</span>
                    <span>Cap: {formatCurrency(cat.budget)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </motion.div>

      {/* Wins + Mistakes */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Wins */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={18} className="text-safe" aria-hidden="true" />
              <h2 className="font-display font-[700] text-sm text-ink">Discipline Wins</h2>
            </div>
            <ul className="flex flex-col gap-2.5">
              {monthSummary.wins.map((win, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs">
                  <span className="w-5 h-5 rounded-full bg-safe-bg text-safe flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="font-body text-ink leading-relaxed">{win}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Mistakes */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle size={18} className="text-danger" aria-hidden="true" />
              <h2 className="font-display font-[700] text-sm text-ink">Runway Hazards & Slips</h2>
            </div>
            <ul className="flex flex-col gap-2.5">
              {monthSummary.mistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs">
                  <span className="w-5 h-5 rounded-full bg-danger-bg text-danger flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="font-body text-ink leading-relaxed">{mistake}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </motion.div>

      {/* Best & Toughest Day Highlights */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4 border-safe/40 bg-safe-bg/20">
            <CardLabel className="text-safe">Best Survival Day</CardLabel>
            <p className="font-display font-bold text-sm text-ink mt-1">{monthSummary.bestDay}</p>
          </Card>
          <Card className="p-4 border-danger/40 bg-danger-bg/20">
            <CardLabel className="text-danger">Toughest Outflow Day</CardLabel>
            <p className="font-display font-bold text-sm text-ink mt-1">{monthSummary.worstDay}</p>
          </Card>
        </div>
      </motion.div>

      {/* Shareable Recap Card */}
      <motion.div variants={fadeUp}>
        <Card className="p-5 bg-brand text-brand-fg border-brand">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-display font-bold text-sm text-brand-fg">Shareable Challenge Card</p>
              <p className="font-body text-xs opacity-80 mt-1 max-w-[55ch]">
                "{monthSummary.shareTagline}"
              </p>
            </div>
            <Button
              variant="accent"
              size="sm"
              onClick={handleCopyRecap}
              className="self-start sm:self-auto gap-1.5 text-xs font-semibold"
            >
              {copied ? (
                <>
                  <CheckCircle2 size={14} /> Copied to Clipboard
                </>
              ) : (
                <>
                  <Share2 size={14} /> Copy Recap
                </>
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
