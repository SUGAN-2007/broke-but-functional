import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import {
  CalendarDays,
  Sliders,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { calendarDays, heroData, type CalendarDay } from '@/data/mock'
import { formatCurrency } from '@/lib/utils'

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState<CalendarDay>(
    calendarDays.find((d) => d.isToday) || calendarDays[7]
  )
  const [purchaseThreshold, setPurchaseThreshold] = useState('500')
  const [dayMultiplier, setDayMultiplier] = useState<'1.25' | '1.5' | '2'>('1.5')

  const mult = parseFloat(dayMultiplier)
  const expensiveDayLimit = heroData.dailyAllowance * mult // e.g. 200 * 1.5 = 300

  // Calculate statistics from past/today days (days 1 to 8)
  const pastDays = calendarDays.filter((d) => !d.isFuture)
  const expensiveDaysCount = pastDays.filter((d) => d.totalSpend > expensiveDayLimit).length
  const noSpendDaysCount = pastDays.filter((d) => d.totalSpend === 0).length
  const biggestPurchase = 'Room Rent (₹3,000)'

  const getDayTone = (d: CalendarDay) => {
    if (d.isFuture) return 'future'
    if (d.totalSpend > expensiveDayLimit) return 'expensive' // Red
    if (d.totalSpend > heroData.dailyAllowance) return 'amber' // Amber
    return 'calm' // Green/calm
  }

  const handleSelectDay = (d: CalendarDay) => {
    setSelectedDay(d)
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
              Spending Heatmap & Calendar
            </h1>
            <p className="font-body text-xs sm:text-sm text-ink-muted mt-1">
              At-a-glance visibility into expensive burn days, upcoming bills, and no-spend milestones.
            </p>
          </div>
          <Badge variant="warning" className="self-start sm:self-auto text-xs py-1 px-2.5">
            Daily Allowance: ₹{heroData.dailyAllowance}/day
          </Badge>
        </div>
      </motion.div>

      {/* Month Summary Strip */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 border-danger/30 bg-danger-bg/20">
            <CardLabel>Expensive Burn Days</CardLabel>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono font-[700] text-2xl text-danger">{expensiveDaysCount} days</span>
              <span className="text-xs text-ink-muted">(&gt;₹{expensiveDayLimit}/d)</span>
            </div>
            <p className="font-body text-xs text-ink-muted mt-0.5">Oct 4 (Day 2, Rent) & Oct 10 (Day 8, Swiggy dinner)</p>
          </Card>

          <Card className="p-4">
            <CardLabel>Biggest Single Purchase</CardLabel>
            <p className="font-mono font-[700] text-2xl text-ink mt-1">{biggestPurchase}</p>
            <p className="font-body text-xs text-ink-muted mt-0.5">Room Rent share on Oct 4 (Day 2)</p>
          </Card>

          <Card className="p-4 border-safe/30 bg-safe-bg/20">
            <CardLabel>Zero-Spend Discipline Days</CardLabel>
            <p className="font-mono font-[700] text-2xl text-safe mt-1">{noSpendDaysCount} days</p>
            <p className="font-body text-xs text-ink-muted mt-0.5">Protected runway without dipping into allowance</p>
          </Card>
        </div>
      </motion.div>

      {/* "What counts as expensive?" Config & Definition Bar */}
      <motion.div variants={fadeUp}>
        <Card className="p-4 bg-surface border-border">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-2.5">
              <Sliders size={18} className="text-brand shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <p className="font-display font-bold text-xs text-ink">What counts as expensive?</p>
                <p className="text-[11px] text-ink-muted font-body">
                  Expensive day: spend &gt;{dayMultiplier}x daily allowance (₹{expensiveDayLimit}). Expensive purchase: single item &gt;₹{purchaseThreshold}.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-ink-muted">Single item threshold:</span>
                <div className="flex items-center bg-surface-raised border border-border rounded-[8px] px-2 py-1">
                  <span className="text-xs font-mono font-bold text-ink">₹</span>
                  <input
                    type="number"
                    value={purchaseThreshold}
                    onChange={(e) => setPurchaseThreshold(e.target.value)}
                    className="w-14 text-xs font-mono font-bold bg-transparent outline-none pl-1"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-ink-muted">Day multiplier:</span>
                <div className="flex items-center bg-surface-raised border border-border rounded-[8px] p-0.5">
                  {(['1.25', '1.5', '2'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDayMultiplier(m)}
                      className={[
                        'px-2 py-0.5 rounded-[6px] text-xs font-mono font-bold transition-colors cursor-pointer',
                        dayMultiplier === m ? 'bg-brand text-brand-fg' : 'text-ink-muted hover:text-ink',
                      ].join(' ')}
                    >
                      {m}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Grid: Heatmap + Selected Day Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Heatmap Area (8 cols on desktop) */}
        <motion.div variants={fadeUp} className="lg:col-span-8 flex flex-col gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-brand" />
                <h2 className="font-display font-[700] text-sm text-ink">
                  October 3 – November 1 (30 Days)
                </h2>
              </div>

              {/* Legend */}
              <div className="hidden sm:flex items-center gap-3 text-[11px] text-ink-muted">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-safe-bg border border-safe/40" /> Calm
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-warning-bg border border-warning/40" /> Above allowance
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-danger-bg border border-danger/40" /> Expensive
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-surface border border-border border-dashed" /> Future
                </span>
              </div>
            </div>

            {/* Desktop / Tablet Grid (hidden on screen <640px) */}
            <div className="hidden sm:grid grid-cols-7 gap-2">
              {['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'].map((day) => (
                <div key={day} className="text-center font-mono text-[10px] font-bold uppercase tracking-wider text-ink-muted py-1">
                  {day}
                </div>
              ))}

              {calendarDays.map((d) => {
                const tone = getDayTone(d)
                const isSelected = selectedDay.dayNumber === d.dayNumber

                return (
                  <button
                    key={d.dayNumber}
                    type="button"
                    onClick={() => handleSelectDay(d)}
                    className={[
                      'h-20 rounded-[12px] p-2 flex flex-col justify-between text-left transition-all border cursor-pointer relative',
                      isSelected ? 'ring-2 ring-brand scale-[1.02] z-10 shadow-sm' : '',
                      tone === 'expensive'
                        ? 'bg-danger-bg/40 border-danger/40 hover:bg-danger-bg/60'
                        : tone === 'amber'
                        ? 'bg-warning-bg/40 border-warning/40 hover:bg-warning-bg/60'
                        : tone === 'calm'
                        ? 'bg-safe-bg/25 border-safe/30 hover:bg-safe-bg/40'
                        : 'bg-surface/50 border-border border-dashed hover:bg-surface-raised',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-baseline gap-1 min-w-0">
                        <span className="font-mono text-xs font-bold text-ink truncate">
                          {d.dateStr}
                        </span>
                        <span className="font-mono text-[10px] text-ink-muted shrink-0">
                          (D{d.dayNumber})
                        </span>
                      </div>
                      {d.isToday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent ring-2 ring-accent/30 shrink-0 ml-1" />
                      )}
                    </div>

                    <div>
                      <p className="font-mono text-xs font-bold text-ink truncate">
                        {d.isFuture ? (
                          d.totalSpend > 0 ? (
                            <span className="text-ink-muted font-normal">~{formatCurrency(d.totalSpend)}</span>
                          ) : (
                            <span className="text-border-strong text-[11px]">—</span>
                          )
                        ) : (
                          formatCurrency(d.totalSpend)
                        )}
                      </p>

                      {/* Markers */}
                      <div className="flex items-center gap-1 mt-1">
                        {d.hasBillDue && (
                          <span
                            title="Bill due"
                            className="w-1.5 h-1.5 rounded-full bg-warning"
                          />
                        )}
                        {d.hasIncome && (
                          <span
                            title="Income credited"
                            className="w-2.5 h-2 rounded-[2px] bg-safe text-[8px] text-white flex items-center justify-center font-bold"
                          >
                            +
                          </span>
                        )}
                        {d.hasEvent && (
                          <span
                            title="Event flag"
                            className="w-1.5 h-1.5 rounded-full bg-danger"
                          />
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Mobile View (<640px): Scrollable Week-by-Week List */}
            <div className="flex sm:hidden flex-col divide-y divide-border overflow-y-auto max-h-[380px]">
              {calendarDays.map((d) => {
                const tone = getDayTone(d)
                const isSelected = selectedDay.dayNumber === d.dayNumber

                return (
                  <div
                    key={d.dayNumber}
                    onClick={() => handleSelectDay(d)}
                    className={[
                      'py-3 px-2 flex items-center justify-between cursor-pointer rounded-lg transition-colors',
                      isSelected ? 'bg-surface-raised ring-1 ring-brand' : 'hover:bg-surface',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={[
                          'w-9 h-9 rounded-[10px] flex flex-col items-center justify-center font-mono text-xs font-bold border',
                          tone === 'expensive'
                            ? 'bg-danger-bg text-danger border-danger/40'
                            : tone === 'amber'
                            ? 'bg-warning-bg text-warning border-warning/40'
                            : tone === 'calm'
                            ? 'bg-safe-bg text-safe border-safe/40'
                            : 'bg-surface text-ink-muted border-border',
                        ].join(' ')}
                      >
                        <span>{d.dayNumber}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-semibold text-xs text-ink">
                            {d.dateStr} ({d.dayOfWeek}) • Day {d.dayNumber} of 30
                          </span>
                          {d.isToday && (
                            <span className="text-[10px] font-bold text-accent px-1.5 rounded-full bg-accent/15">
                              Today
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-ink-muted">
                          {d.transactions.length > 0 ? `${d.transactions.length} items logged` : 'No spend logged'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-xs text-ink block">
                        {d.isFuture ? (d.totalSpend > 0 ? `~${formatCurrency(d.totalSpend)}` : '₹0') : formatCurrency(d.totalSpend)}
                      </span>
                      <div className="flex items-center justify-end gap-1 mt-0.5">
                        {d.hasBillDue && <span className="text-[10px] text-warning font-semibold">Bill Due</span>}
                        {d.hasIncome && <span className="text-[10px] text-safe font-semibold">+Income</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </motion.div>

        {/* Selected Day Detail Panel (4 cols on desktop) */}
        <motion.div variants={fadeUp} className="lg:col-span-4">
          <Card className="p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-display font-[800] text-sm text-ink">
                      {selectedDay.dateStr} (Day {selectedDay.dayNumber} of 30)
                    </h3>
                    {selectedDay.isToday && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-accent/20 text-accent">
                        Today
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs text-ink-muted mt-0.5">
                    {selectedDay.isToday ? 'Today (Active Current Day)' : selectedDay.isFuture ? 'Forecasted Future Day' : 'Logged History'}
                  </p>
                </div>
                <Badge
                  variant={
                    getDayTone(selectedDay) === 'expensive'
                      ? 'danger'
                      : getDayTone(selectedDay) === 'amber'
                      ? 'warning'
                      : 'safe'
                  }
                >
                  {getDayTone(selectedDay) === 'expensive'
                    ? 'Expensive Day'
                    : getDayTone(selectedDay) === 'amber'
                    ? 'Above Allowance'
                    : 'Within Budget'}
                </Badge>
              </div>

              {/* Spend vs Allowance Comparison Bar */}
              <div className="mb-4 p-3 rounded-[12px] bg-surface border border-border">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-ink-muted">Day Spend vs ₹{heroData.dailyAllowance} Allowance</span>
                  <span className="font-mono font-bold text-ink">{formatCurrency(selectedDay.totalSpend)}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className={[
                      'h-full rounded-full transition-all',
                      selectedDay.totalSpend > expensiveDayLimit
                        ? 'bg-danger'
                        : selectedDay.totalSpend > heroData.dailyAllowance
                        ? 'bg-warning'
                        : 'bg-safe',
                    ].join(' ')}
                    style={{
                      width: `${Math.min(100, (selectedDay.totalSpend / Math.max(heroData.dailyAllowance, selectedDay.totalSpend)) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Day's Transactions List */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-ink uppercase tracking-wider font-display">
                  Transactions & Dues
                </p>

                {selectedDay.transactions.length === 0 ? (
                  <div className="p-6 text-center text-xs text-ink-muted border border-dashed border-border rounded-[12px]">
                    No transactions recorded on this day.
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {selectedDay.transactions.map((tx, idx) => {
                      const isHighItem = tx.amount > parseFloat(purchaseThreshold)

                      return (
                        <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-ink">{tx.description}</span>
                              {isHighItem && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-danger-bg text-danger border border-danger/30">
                                  Expensive
                                </span>
                              )}
                              {tx.isAutoSynced && (
                                <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-surface text-ink-muted border border-border">
                                  Auto-synced
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-ink-muted">{tx.category}</p>
                          </div>
                          <span className="font-mono font-bold text-ink">
                            {formatCurrency(tx.amount)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-border mt-4 flex items-center justify-between text-[11px] text-ink-muted">
              <span>Target allowance: ₹200/day</span>
              {!selectedDay.isToday && (
                <button
                  type="button"
                  onClick={() => setSelectedDay(calendarDays.find((d) => d.isToday) || calendarDays[7])}
                  className="font-semibold text-brand hover:underline cursor-pointer"
                >
                  ← Back to Today (Oct 10, Day 8)
                </button>
              )}
            </div>
          </Card>
        </motion.div>

      </div>
    </motion.div>
  )
}
