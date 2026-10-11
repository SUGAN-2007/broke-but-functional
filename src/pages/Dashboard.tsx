import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { staggerContainer, fadeUp } from '@/lib/motion'
import {
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  Zap,
  Sparkles,
  RefreshCw,
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
import { Button } from '@/components/ui/button'
import {
  heroData,
  transactions,
  categories,
  forecastData,
  insights,
  healthReasons,
} from '@/data/mock'
import { formatCurrency, getDateForDay } from '@/lib/utils'
import AddExpenseDialog from '@/components/dashboard/AddExpenseDialog'
import { AddIncomeDialog } from '@/components/dialogs/FinanceDialogs'

/* ── Count-up animation hook ────────────────────────── */
function useCountUp(target: number, duration = 800) {
  const [val, setVal] = useState(0)
  const startTime = useRef<number | null>(null)

  useEffect(() => {
    let animId: number
    const step = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = Math.min((timestamp - startTime.current) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(ease * target))
      if (progress < 1) {
        animId = requestAnimationFrame(step)
      }
    }
    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [target, duration])

  return val
}

/* ── Financial Health Ring ───────────────────────────── */
function HealthRing({ score }: { score: number }) {
  const radius = 38
  const circ = 2 * Math.PI * radius
  const strokeDashoffset = circ - (score / 100) * circ
  const strokeColor =
    score >= 75 ? 'var(--safe)' : score >= 55 ? 'var(--warning)' : 'var(--danger)'

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96" aria-hidden="true">
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="stroke-border"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke={strokeColor}
          strokeWidth="8"
          strokeDasharray={circ}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono font-[700] text-xl text-ink tracking-tight">{score}</span>
        <span className="text-[10px] text-ink-muted uppercase font-bold tracking-wider">/ 100</span>
      </div>
    </div>
  )
}

/* ── Day strip ───────────────────────────────────────── */
function DayStrip({ current, total }: { current: number; total: number }) {
  return (
    <div
      className="flex items-center gap-1 w-full"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Day ${current} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const d = i + 1
        const isPast = d < current
        const isCurrent = d === current
        const isDanger = d >= heroData.dangerDay

        return (
          <div
            key={d}
            title={`${getDateForDay(d)} (Day ${d})${isCurrent ? ' (Today)' : ''}${isDanger ? ' (Danger zone)' : ''}`}
            className={[
              'flex-1 h-3 rounded-[3px] transition-all',
              isCurrent
                ? 'bg-accent ring-2 ring-accent/30 scale-y-125'
                : isPast
                ? 'bg-brand'
                : isDanger
                ? 'bg-danger/25 border border-danger/40'
                : 'bg-border',
            ].join(' ')}
          />
        )
      })}
    </div>
  )
}

/* ── Custom chart tooltip ────────────────────────────── */
function ForecastTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ value?: number; payload: { day?: number; label: string; dangerZone?: boolean } }>
}) {
  if (!active || !payload?.length) return null
  const data = payload[0]
  const val = Number(data.value) || 0
  const isDanger = data.payload.dangerZone
  const dayNum = data.payload.day

  return (
    <div className="bg-surface-raised border border-border rounded-[12px] p-2.5 shadow-md font-body text-xs">
      <p className="font-bold text-ink">
        {dayNum ? `${getDateForDay(dayNum)} (Day ${dayNum})` : data.payload.label}
      </p>
      <p className="font-mono text-sm font-semibold mt-0.5">
        <span className="text-ink-muted">Balance: </span>
        <span className={val <= 0 ? 'text-danger font-bold' : val < 2000 ? 'text-warning' : 'text-brand'}>
          {formatCurrency(val)}
        </span>
      </p>
      {isDanger && (
        <p className="text-[10px] text-danger font-semibold mt-1 flex items-center gap-1">
          <AlertTriangle size={11} /> Red Zone (₹0 reached)
        </p>
      )}
    </div>
  )
}

/* ── Main Dashboard ──────────────────────────────── */
export default function Dashboard() {
  const animatedBalance = useCountUp(heroData.balance)
  const [addExpenseOpen, setAddExpenseOpen] = useState(false)
  const [addIncomeOpen, setAddIncomeOpen] = useState(false)

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-5 sm:gap-6"
    >
      {/* ── Screen reader title ── */}
      <h1 className="sr-only">Dashboard — Broke But Functional</h1>

      {/* ── ACTIVE EVENT BANNER (links to /events) ── */}
      <motion.div variants={fadeUp}>
        <div className="relative overflow-hidden rounded-[16px] bg-danger-bg border border-danger/30 p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-danger text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <Zap size={18} aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-ink">
                  Active Event: Phone screen cracked
                </span>
                <Badge variant="danger" className="text-[10px] py-0 px-1.5 uppercase font-bold">
                  High Risk
                </Badge>
              </div>
              <p className="font-body text-xs text-ink-muted mt-0.5">
                Estimated repair: <span className="font-mono font-semibold text-danger">₹1,500</span>. Will pull your danger day from {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay}) to {getDateForDay(23)} (Day 23).
              </p>
            </div>
          </div>
          <Link
            to="/events"
            className="self-stretch sm:self-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-danger hover:bg-danger/90 text-white font-display font-semibold text-xs tracking-wide transition-colors shadow-xs"
          >
            <span>Resolve Event</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </motion.div>

      {/* ── BENTO GRID (STRICT 12-COLUMN ALIGNMENT) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
        
        {/* ROW 1: HERO CARD (lg:col-span-6) */}
        <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-6">
          <Card className="h-full flex flex-col justify-between p-5 sm:p-6 relative overflow-hidden">
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-ink font-bold">
                    {getDateForDay(heroData.day)} (Day {heroData.day} of {heroData.totalDays})
                  </span>
                  <span className="text-border-strong">•</span>
                  <span className="text-xs text-ink-muted font-body">Oct 3 – Nov 1</span>
                </div>
                <Badge variant="danger" className="font-bold text-xs">
                  <AlertTriangle size={11} className="mr-1" />
                  Red by {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})
                </Badge>
              </div>

              <div className="mt-2">
                <CardLabel>Remaining Liquid Balance</CardLabel>
                <div className="flex items-baseline gap-2 mt-1 mb-2">
                  <CardValue size="hero" className="text-ink tracking-tight font-mono">
                    ₹{animatedBalance.toLocaleString('en-IN')}
                  </CardValue>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                  <span>Start: ₹{heroData.startingBalance.toLocaleString('en-IN')}</span>
                  <span>+ ₹{heroData.incomeTopUp.toLocaleString('en-IN')} top-up</span>
                  <span>- ₹5,760 spent</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <CardLabel>Calculated Daily Allowance</CardLabel>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-mono font-[700] text-2xl text-ink tracking-tight">
                    {formatCurrency(heroData.dailyAllowance)}
                  </span>
                  <span className="text-xs font-medium text-ink-muted font-body">/day</span>
                  <span className="text-[11px] text-ink-muted ml-2">
                    (₹{heroData.balance} - ₹{heroData.unpaidBills}) ÷ {heroData.daysLeft}d
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setAddExpenseOpen(true)}
                  className="gap-1.5 text-xs font-semibold"
                >
                  <Plus size={14} /> Log Expense
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAddIncomeOpen(true)}
                  className="gap-1.5 text-xs font-semibold"
                >
                  + Income
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ROW 1: COMMITTED BILLS (lg:col-span-3) */}
        <motion.div variants={fadeUp} className="md:col-span-1 lg:col-span-3">
          <Card hover className="h-full flex flex-col justify-between p-5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <CardLabel>Committed Bills</CardLabel>
                <Link to="/commitments" className="text-[11px] text-brand hover:underline font-semibold">
                  Manage →
                </Link>
              </div>
              <CardValue size="lg" className="mt-2 mb-1 font-mono">
                {formatCurrency(heroData.unpaidBills)}
              </CardValue>
              <p className="font-body text-xs text-ink-muted">unpaid dues this month</p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-danger font-semibold flex items-center gap-1">
                  <AlertTriangle size={12} /> 2 bills due soon
                </span>
                <span className="text-ink-muted font-mono">5 bills left</span>
              </div>
              <DayStrip current={heroData.day} total={heroData.totalDays} />
            </div>
          </Card>
        </motion.div>

        {/* ROW 1: PROJECTED MONTH-END (lg:col-span-3) */}
        <motion.div variants={fadeUp} className="md:col-span-1 lg:col-span-3">
          <Card hover className="h-full flex flex-col justify-between p-5">
            <div>
              <CardLabel>Projected Month-End</CardLabel>
              <CardValue size="lg" className="mt-2 mb-1 text-danger font-mono font-bold">
                {formatCurrency(heroData.projectedMonthEnd)}
              </CardValue>
              <p className="font-body text-xs text-ink-muted">deficit at current burn velocity</p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-danger font-semibold">
                <TrendingDown size={14} aria-hidden="true" />
                <span>Hits ₹0 on {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})</span>
              </div>
              <Link to="/simulate" className="text-[11px] text-brand hover:underline font-semibold">
                Simulate cut →
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* ROW 2: FINANCIAL HEALTH SCORE (lg:col-span-4) */}
        <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-4">
          <Card hover className="h-full flex flex-col p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-[700] text-sm text-ink">Financial Health Index</h2>
              <span className="font-mono text-xs text-ink-muted">Sum = {heroData.healthScore}</span>
            </div>

            <div className="flex items-center gap-4 py-1">
              <HealthRing score={heroData.healthScore} />
              <div className="flex-1">
                <p className="font-display font-semibold text-xs text-ink">Needs Intervention</p>
                <p className="font-body text-[11px] text-ink-muted mt-0.5">
                  Overrun on food delivery threatens {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay}) insolvency.
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border flex flex-col gap-1.5 flex-1 justify-center">
              {healthReasons.map((r, i) => (
                <div key={i} className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-body text-[11px] text-ink-muted truncate">{r.label}</span>
                  <span
                    className={[
                      'font-mono text-[11px] font-bold shrink-0',
                      r.status === 'good' ? 'text-safe' : 'text-danger',
                    ].join(' ')}
                  >
                    {r.points > 0 ? `+${r.points}` : r.points}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* ROW 2: FORECAST CHART (lg:col-span-8) */}
        <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-8">
          <Card className="h-full flex flex-col p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h2 className="font-display font-[700] text-sm text-ink">Balance & Danger Zone Forecast</h2>
                <p className="font-body text-xs text-ink-muted">
                  Balance projected to reach ₹0 by {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})
                </p>
              </div>
              <Badge variant="danger" className="self-start sm:self-auto font-bold text-xs">
                <AlertTriangle size={11} className="mr-1" />
                Red Zone: {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})
              </Badge>
            </div>

            <div className="w-full flex-1 min-h-[220px]" aria-label="Balance forecast chart">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                  data={forecastData}
                  margin={{ top: 8, right: 32, left: -16, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="brandGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="dangerGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--danger)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.6} vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: 'var(--ink-muted)', fontFamily: 'Manrope' }}
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                    padding={{ right: 18 }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: 'var(--ink-muted)', fontFamily: 'JetBrains Mono' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<ForecastTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="var(--brand)"
                    strokeWidth={2}
                    fill="url(#brandGrad)"
                    dot={false}
                    activeDot={{ r: 5, fill: 'var(--brand)' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-xs text-ink-muted">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand" /> Actual Spend
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-danger" /> {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay}) Danger Zone
                </span>
              </div>
              <Link to="/calendar" className="text-brand font-semibold hover:underline">
                View Calendar Grid →
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* ROW 3: CATEGORY EXPENSES BREAKDOWN (lg:col-span-4) */}
        <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-4">
          <Card hover className="h-full flex flex-col p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-[700] text-sm text-ink">Category Spend (₹5,760)</h2>
              <span className="font-mono text-xs text-ink-muted">8 Days</span>
            </div>

            <div className="h-[160px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={categories}
                    dataKey="spent"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={68}
                    paddingAngle={3}
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
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontFamily: 'Manrope',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-1.5 mt-2 flex-1 justify-center">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                    <span className="text-ink-muted font-body">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-semibold text-ink">{formatCurrency(cat.spent)}</span>
                    <span className="text-[10px] text-ink-muted">/ {formatCurrency(cat.budget)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* ROW 3: RECENT TRANSACTIONS (lg:col-span-8) */}
        <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-8">
          <Card className="h-full flex flex-col p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-display font-[700] text-sm text-ink">Recent Transactions</h2>
                <p className="font-body text-xs text-ink-muted">Expenses tagged with auto-sync and expensive alerts</p>
              </div>
              <div className="flex items-center gap-2">
                <Link to="/connect" className="text-xs text-brand hover:underline font-semibold flex items-center gap-1">
                  <RefreshCw size={11} /> Auto-Sync Feed
                </Link>
              </div>
            </div>

            <div className="divide-y divide-border overflow-y-auto max-h-[300px] pr-1">
              {transactions.map((txn) => (
                <div key={txn.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-[10px] bg-surface flex items-center justify-center shrink-0 border border-border">
                      <span className="text-xs font-bold text-ink-muted">{txn.category[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-semibold text-xs text-ink truncate">
                          {txn.description}
                        </span>
                        {txn.isExpensive && (
                          <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-danger-bg text-danger border border-danger/30">
                            Expensive
                          </span>
                        )}
                        {txn.isAutoSynced && (
                          <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-surface text-ink-muted border border-border">
                            Auto-synced
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-ink-muted font-body mt-0.5">
                        {txn.merchant} • {txn.date}, {txn.time}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={[
                        'font-mono text-xs font-bold',
                        txn.type === 'credit' ? 'text-safe' : 'text-ink',
                      ].join(' ')}
                    >
                      {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                    </span>
                    <p className="text-[10px] text-ink-muted">{txn.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* ROW 4: INSIGHTS ROW (SPAN FULL 12 COLUMNS) */}
        <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((ins) => (
              <Card key={ins.id} hover className="p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {ins.type === 'warning' ? (
                      <AlertTriangle size={16} className="text-danger" />
                    ) : ins.type === 'good' ? (
                      <CheckCircle2 size={16} className="text-safe" />
                    ) : (
                      <Sparkles size={16} className="text-accent" />
                    )}
                    <span className="font-display font-bold text-xs text-ink">{ins.headline}</span>
                  </div>
                  <p className="font-body text-xs text-ink-muted leading-relaxed">{ins.body}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Dialogs */}
      <AddExpenseDialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen} />
      <AddIncomeDialog open={addIncomeOpen} onOpenChange={setAddIncomeOpen} />
    </motion.div>
  )
}
