import { CalendarDays, Flame, AlertCircle, Check, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { CalendarDay } from '@/types/finance'
import { formatCurrency } from '@/lib/format'

export interface CalendarGridProps {
  days: CalendarDay[]
  selectedDay: CalendarDay
  onSelectDay: (day: CalendarDay) => void
  expensiveLimit: number
  dailyAllowance: number
}

export function CalendarGrid({
  days,
  selectedDay,
  onSelectDay,
  expensiveLimit,
  dailyAllowance,
}: CalendarGridProps) {
  const getDayTone = (d: CalendarDay) => {
    if (d.isFuture) return 'future'
    if (d.discretionarySpend > expensiveLimit) return 'expensive'
    if (d.discretionarySpend > dailyAllowance) return 'amber'
    return 'calm'
  }

  const getCellCue = (tone: string) => {
    switch (tone) {
      case 'expensive':
        return { label: 'Burn', icon: Flame, badgeClass: 'bg-danger/20 text-danger border-danger/40' }
      case 'amber':
        return { label: 'Above', icon: AlertCircle, badgeClass: 'bg-warning/20 text-warning border-warning/40' }
      case 'calm':
        return { label: 'Calm', icon: Check, badgeClass: 'bg-safe/20 text-safe border-safe/40' }
      default:
        return { label: 'Plan', icon: Clock, badgeClass: 'bg-surface text-ink-muted border-border' }
    }
  }

  // Monday to Sunday order
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  // Oct 3, 2026 is Saturday -> 5 empty leading cells (Mon, Tue, Wed, Thu, Fri)
  const emptyLeadingCells = 5

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-brand" />
          <h2 className="font-display font-[700] text-sm text-ink">
            October 3 – November 1, 2026 (Mon–Sun Grid)
          </h2>
        </div>

        {/* Legend with Non-Colour Text Cues */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-safe-bg border border-safe/40" /> Calm (&lt;₹200)
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-warning-bg border border-warning/40" /> Above
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-danger-bg border border-danger/40" /> Burn (&gt;₹300)
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-surface border border-border border-dashed" /> Planned
          </span>
        </div>
      </div>

      {/* Desktop / Tablet Mon-Sun Grid */}
      <div className="hidden sm:grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted py-1"
          >
            {day}
          </div>
        ))}

        {/* 5 Empty Leading Cells (Mon to Fri) for Oct 3 start on SAT */}
        {Array.from({ length: emptyLeadingCells }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="h-22 rounded-[12px] p-2 bg-surface/30 border border-border/40 border-dashed opacity-40 pointer-events-none"
            aria-hidden="true"
          />
        ))}

        {days.map((d) => {
          const tone = getDayTone(d)
          const isSelected = selectedDay.dayNumber === d.dayNumber
          const cue = getCellCue(tone)
          const CueIcon = cue.icon

          return (
            <button
              key={d.dayNumber}
              type="button"
              onClick={() => onSelectDay(d)}
              aria-label={`${d.dateStr}, Day ${d.dayNumber}. ${d.isToday ? 'Today. ' : ''}Total outflow: ₹${d.totalSpend}`}
              aria-pressed={isSelected}
              className={[
                'h-22 rounded-[12px] p-2 flex flex-col justify-between text-left transition-all border cursor-pointer relative',
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
                  <span className="font-mono text-xs sm:text-sm font-bold text-ink truncate">
                    {d.dateStr}
                  </span>
                  <span className="font-mono text-[10px] text-ink-muted shrink-0">
                    (D{d.dayNumber})
                  </span>
                </div>
                {d.isToday && (
                  <span className="w-2 h-2 rounded-full bg-accent ring-2 ring-accent/30 shrink-0 ml-1" />
                )}
              </div>

              {/* Amount >= 12px */}
              <div>
                <p className="font-mono text-xs sm:text-sm font-bold text-ink truncate">
                  {d.isFuture ? (
                    d.totalSpend > 0 ? (
                      <span className="text-ink-muted font-normal text-xs">~{formatCurrency(d.totalSpend)}</span>
                    ) : (
                      <span className="text-border-strong text-xs">—</span>
                    )
                  ) : (
                    formatCurrency(d.totalSpend)
                  )}
                </p>

                {/* Non-Colour Cue Badge & Markers */}
                <div className="flex items-center justify-between mt-1">
                  <span
                    className={`inline-flex items-center gap-0.5 px-1 py-0.2 rounded text-[9px] font-bold border uppercase tracking-wider ${cue.badgeClass}`}
                  >
                    <CueIcon size={8} />
                    {cue.label}
                  </span>

                  <div className="flex items-center gap-1">
                    {d.hasBillDue && (
                      <span title="Bill due" className="w-1.5 h-1.5 rounded-full bg-warning" />
                    )}
                    {d.hasIncome && (
                      <span title="Income" className="w-2 h-2 rounded-[2px] bg-safe text-[8px] text-white flex items-center justify-center font-bold">
                        +
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Mobile Scrollable View (<640px) */}
      <div className="flex sm:hidden flex-col divide-y divide-border overflow-y-auto max-h-[380px]">
        {days.map((d) => {
          const tone = getDayTone(d)
          const isSelected = selectedDay.dayNumber === d.dayNumber
          const cue = getCellCue(tone)
          const CueIcon = cue.icon

          return (
            <div
              key={d.dayNumber}
              onClick={() => onSelectDay(d)}
              className={[
                'py-3 px-2 flex items-center justify-between cursor-pointer rounded-lg transition-colors',
                isSelected ? 'bg-surface-raised ring-1 ring-brand' : 'hover:bg-surface',
              ].join(' ')}
            >
              <div className="flex items-center gap-3">
                <div
                  className={[
                    'w-10 h-10 rounded-[10px] flex flex-col items-center justify-center font-mono text-xs font-bold border',
                    tone === 'expensive'
                      ? 'bg-danger-bg text-danger border-danger/40'
                      : tone === 'amber'
                      ? 'bg-warning-bg text-warning border-warning/40'
                      : tone === 'calm'
                      ? 'bg-safe-bg text-safe border-safe/40'
                      : 'bg-surface text-ink-muted border-border',
                  ].join(' ')}
                >
                  <span>D{d.dayNumber}</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-xs sm:text-sm text-ink">
                      {d.dateStr} ({d.dayOfWeek})
                    </span>
                    <span className={`inline-flex items-center gap-0.5 px-1 py-0.2 rounded text-[9px] font-bold border ${cue.badgeClass}`}>
                      <CueIcon size={8} /> {cue.label}
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
                <span className="font-mono font-bold text-xs sm:text-sm text-ink block">
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
  )
}
