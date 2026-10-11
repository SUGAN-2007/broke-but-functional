import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import {
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Info,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Card, CardLabel, CardValue } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { heroData, transactions, categories, forecastData, insights, healthReasons } from '@/data/mock'
import { formatCurrency } from '@/lib/utils'
import AddExpenseDialog from '@/components/dashboard/AddExpenseDialog'

/* ── Animated counter ───────────────────────────── */
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0)
  const raf = useRef<number>(0)
  const start = useRef<number | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setCount(target); return }

    const animate = (ts: number) => {
      if (!start.current) start.current = ts
      const elapsed = ts - start.current
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3) // cubic ease-out
      setCount(Math.round(ease * target))
      if (progress < 1) raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration])

  return count
}

/* ── Day strip ───────────────────────────────────── */
function DayStrip({ current, total }: { current: number; total: number }) {
  return (
    <div
      className="flex gap-[2px] flex-wrap"
      role="img"
      aria-label={`Day ${current} of ${total} — ${total - current} days remaining`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={[
            'h-[6px] rounded-full transition-all',
            i < current
              ? 'bg-brand'
              : i === current
              ? 'bg-accent w-[14px]'
              : 'bg-border',
          ].join(' ')}
          style={{ width: i === current ? 14 : 8 }}
        />
      ))}
    </div>
  )
}

/* ── Health Score Ring ───────────────────────────── */
function HealthRing({ score }: { score: number }) {
  const radius = 52
  const circ = 2 * Math.PI * radius
  const dash = (score / 100) * circ
  const color = score >= 70 ? 'var(--safe)' : score >= 45 ? 'var(--warning)' : 'var(--danger)'

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[128px] h-[128px]">
        <svg width="128" height="128" viewBox="0 0 128 128" aria-hidden="true">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="var(--border)" strokeWidth="8" />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            transform="rotate(-90 64 64)"
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-[800] text-[1.75rem] tracking-[-0.02em] text-ink">{score}</span>
          <span className="font-body text-[0.75rem] uppercase tracking-wider text-ink-muted">score</span>
        </div>
      </div>
    </div>
  )
}

/* ── Custom tooltip ──────────────────────────────── */
function ForecastTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface-raised border border-border rounded-[12px] px-3 py-2 shadow-[var(--shadow-raised)]">
      <p className="font-body text-[0.8125rem] text-ink-muted mb-1">{label}</p>
      <p className="font-mono text-[1rem] font-[600] text-ink">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  )
}

/* ── Transaction row ─────────────────────────────── */
function TxRow({ tx }: { tx: typeof transactions[0] }) {
  const isCredit = tx.type === 'credit'
  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className={[
          'w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0',
          isCredit ? 'bg-safe-bg' : 'bg-surface-raised',
        ].join(' ')}
        aria-hidden="true"
      >
        <span className={['font-mono font-[700] text-[0.875rem]', isCredit ? 'text-safe' : 'text-ink-muted'].join(' ')}>
          {tx.category.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body font-[500] text-[0.9375rem] text-ink truncate">{tx.merchant}</p>
        <p className="font-body text-[0.8125rem] text-ink-muted">{tx.description} · {tx.date}</p>
      </div>
      <p className={[
        'font-mono font-[600] text-[0.9375rem] shrink-0',
        isCredit ? 'text-safe' : 'text-ink',
      ].join(' ')}>
        {isCredit ? '+' : '−'}{formatCurrency(tx.amount)}
      </p>
    </div>
  )
}

/* ── Insight card ────────────────────────────────── */
function InsightChip({ insight }: { insight: typeof insights[0] }) {
  const cfg = {
    good:    { icon: CheckCircle2, color: 'text-safe',    bg: 'bg-safe-bg' },
    warning: { icon: AlertTriangle,color: 'text-warning', bg: 'bg-warning-bg' },
    tip:     { icon: Info,         color: 'text-brand',   bg: 'bg-surface-raised' },
  }[insight.type]

  return (
    <div className="rounded-[16px] border border-border bg-surface p-4 flex gap-3">
      <div className={['w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0', cfg.bg].join(' ')}>
        <cfg.icon size={16} className={cfg.color} aria-hidden="true" />
      </div>
      <div>
        <p className="font-body font-[600] text-[0.9375rem] text-ink mb-1">{insight.headline}</p>
        <p className="font-body text-[0.8125rem] text-ink-muted leading-relaxed">{insight.body}</p>
      </div>
    </div>
  )
}

/* ── Main Dashboard ──────────────────────────────── */
export default function Dashboard() {
  const animatedBalance = useCountUp(heroData.balance)
  const [addExpenseOpen, setAddExpenseOpen] = useState(false)

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-[var(--section-gap)]"
    >
      {/* ── Page title (screen reader) ── */}
      <h1 className="sr-only">Dashboard — Broke But Functional</h1>

      {/* ── Bento Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[var(--grid-gap)]">

        {/* HERO: Balance + Day strip */}
        <motion.div variants={fadeUp} className="lg:col-span-7 md:col-span-2">
          <Card className="paper-texture h-full relative overflow-hidden">
            {/* Risk badge */}
            <div className="absolute top-[var(--card-px)] right-[var(--card-px)]">
              <Badge variant={heroData.riskLevel === 'medium' ? 'warning' : heroData.riskLevel === 'high' ? 'danger' : 'safe'}>
                {heroData.riskLevel === 'medium' ? '⚠ Medium risk' : heroData.riskLevel === 'high' ? '⛔ High risk' : '✓ Low risk'}
              </Badge>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              {/* Left: big number */}
              <div className="flex-1">
                <CardLabel>Remaining balance</CardLabel>
                <CardValue size="hero" className="text-ink my-2">
                  ₹{animatedBalance.toLocaleString('en-IN')}
                </CardValue>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5">
                    <TrendingDown size={14} className="text-warning" aria-hidden="true" />
                    <span className="font-body text-[0.8125rem] text-ink-muted">
                      Yesterday: <span className="text-warning font-[600]">{formatCurrency(heroData.yesterdaySpend)}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: allowance + strip */}
              <div className="flex flex-col gap-4 lg:min-w-[200px]">
                <div>
                  <CardLabel>Daily allowance</CardLabel>
                  <p className="font-mono font-[700] text-[1.5rem] text-ink tracking-[-0.02em] mt-1">
                    {formatCurrency(heroData.dailyAllowance)}
                    <span className="text-[0.875rem] font-[400] text-ink-muted font-body ml-1">/day</span>
                  </p>
                </div>

                <div>
                  <CardLabel className="mb-2">Day {heroData.day} of {heroData.totalDays}</CardLabel>
                  <DayStrip current={heroData.day} total={heroData.totalDays} />
                  <p className="font-body text-[0.8125rem] text-ink-muted mt-2">
                    {heroData.totalDays - heroData.day} days remaining
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* STAT: Committed bills */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <Card hover className="h-full">
            <CardLabel>Committed bills</CardLabel>
            <CardValue size="lg" className="mt-2 mb-1">₹1,357</CardValue>
            <p className="font-body text-[0.8125rem] text-ink-muted">due this month</p>
            <hr className="ledger-divider mt-3" />
            <p className="font-body text-[0.8125rem] text-warning">2 bills due soon</p>
          </Card>
        </motion.div>

        {/* STAT: Projected month-end */}
        <motion.div variants={fadeUp} className="lg:col-span-3">
          <Card hover className="h-full">
            <CardLabel>Projected month-end</CardLabel>
            <CardValue size="lg" className="mt-2 mb-1 text-warning">
              {formatCurrency(heroData.projectedMonthEnd)}
            </CardValue>
            <p className="font-body text-[0.8125rem] text-ink-muted">surplus if spend holds</p>
            <hr className="ledger-divider mt-3" />
            <div className="flex items-center gap-1.5">
              <TrendingDown size={14} className="text-warning" aria-hidden="true" />
              <p className="font-body text-[0.8125rem] text-warning">Trending down</p>
            </div>
          </Card>
        </motion.div>

        {/* HEALTH SCORE */}
        <motion.div variants={fadeUp} className="lg:col-span-3 md:col-span-2">
          <Card hover className="h-full">
            <h2 className="font-display font-[600] text-[1rem] text-ink mb-4">Financial Health</h2>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <HealthRing score={heroData.healthScore} />
              <div className="flex-1 flex flex-col gap-2 w-full">
                {healthReasons.map((r, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <span className="font-body text-[0.8125rem] text-ink-muted truncate">{r.label}</span>
                    <span className={[
                      'font-mono text-[0.8125rem] font-[600] shrink-0',
                      r.status === 'good' ? 'text-safe' : 'text-danger',
                    ].join(' ')}>
                      {r.points > 0 ? `+${r.points}` : r.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* FORECAST CHART */}
        <motion.div variants={fadeUp} className="lg:col-span-8 md:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display font-[600] text-[1rem] text-ink">Balance Forecast</h2>
                <p className="font-body text-[0.8125rem] text-ink-muted">Danger zone kicks in around Day 23</p>
              </div>
              <Badge variant="warning">
                <AlertTriangle size={10} className="mr-1" aria-hidden="true" />
                Red by Day 28
              </Badge>
            </div>
            <div style={{ minHeight: 220 }} aria-label="Balance forecast chart showing balance declining to ₹720 by day 30 with danger zone after day 23">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={forecastData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="brandGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="dangerGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--danger)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.5} vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: 'var(--ink-muted)', fontFamily: 'Manrope' }}
                    axisLine={false}
                    tickLine={false}
                    interval={3}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: 'var(--ink-muted)', fontFamily: 'JetBrains Mono' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<ForecastTooltip />} />
                  {/* Safe balance */}
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="var(--brand)"
                    strokeWidth={1.75}
                    fill="url(#brandGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: 'var(--brand)' }}
                  />
                  {/* Projected (dashed) */}
                  <Area
                    type="monotone"
                    dataKey="projected"
                    stroke="var(--danger)"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                    fill="url(#dangerGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: 'var(--danger)' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* CATEGORY DONUT */}
        <motion.div variants={fadeUp} className="lg:col-span-4">
          <Card className="h-full">
            <h2 className="font-display font-[600] text-[1rem] text-ink mb-4">Spending by category</h2>
            <div style={{ minHeight: 180 }} aria-label="Donut chart: Rent 40%, Food 19%, Transport 6%, others">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={78}
                    dataKey="spent"
                    nameKey="name"
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {categories.map((cat, i) => (
                      <Cell key={i} fill={cat.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => formatCurrency(Number(v) || 0)}
                    contentStyle={{
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      fontSize: '0.8125rem',
                      fontFamily: 'Manrope',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cat.color }} aria-hidden="true" />
                    <span className="font-body text-[0.8125rem] text-ink-muted">{cat.name}</span>
                  </div>
                  <span className="font-mono text-[0.8125rem] font-[600] text-ink">
                    {formatCurrency(cat.spent)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* RECENT TRANSACTIONS */}
        <motion.div variants={fadeUp} className="lg:col-span-5 md:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-[600] text-[1rem] text-ink">Recent transactions</h2>
              <button className="font-body text-[0.8125rem] text-brand font-[600] hover:underline focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded px-1">
                View all
              </button>
            </div>
            <div className="flex flex-col divide-y divide-border">
              {transactions.slice(0, 5).map((tx) => (
                <TxRow key={tx.id} tx={tx} />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* INSIGHTS */}
        <motion.div variants={fadeUp} className="lg:col-span-7 md:col-span-2">
          <div className="flex flex-col gap-3 h-full">
            <h2 className="font-display font-[600] text-[1rem] text-ink">Insights</h2>
            {insights.map((ins) => (
              <InsightChip key={ins.id} insight={ins} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Floating Add Expense button ── */}
      <div className="fixed bottom-[calc(80px+env(safe-area-inset-bottom,0px))] right-6 lg:bottom-8 z-30">
        <button
          id="add-expense-fab"
          onClick={() => setAddExpenseOpen(true)}
          className={[
            'flex items-center gap-2 h-[52px] px-5 rounded-full',
            'bg-brand text-brand-fg font-body font-[600]',
            'shadow-[var(--shadow-raised)] hover:bg-brand-hover',
            'transition-all duration-200 active:scale-95',
            'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none',
          ].join(' ')}
          aria-label="Add expense"
        >
          <TrendingDown size={18} aria-hidden="true" />
          <span className="hidden sm:inline">Add expense</span>
        </button>
      </div>

      <AddExpenseDialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen} />
    </motion.div>
  )
}
