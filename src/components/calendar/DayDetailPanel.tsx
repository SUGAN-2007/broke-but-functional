import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Receipt, CheckCircle2 } from 'lucide-react'
import type { CalendarDay, Bill } from '@/types/finance'
import { bills, heroData } from '@/data/selectors'
import { formatCurrency } from '@/lib/format'

export interface DayDetailPanelProps {
  selectedDay: CalendarDay
  onResetToday: () => void
  onAddExpenseForDay: (dateStr: string) => void
  purchaseThreshold: number
}

export function DayDetailPanel({
  selectedDay,
  onResetToday,
  onAddExpenseForDay,
  purchaseThreshold,
}: DayDetailPanelProps) {
  // Find bills due on this specific challenge day
  const dueBills: Bill[] = bills.filter((b) => b.dayNumber === selectedDay.dayNumber)

  const tone = selectedDay.discretionarySpend > 300
    ? 'expensive'
    : selectedDay.discretionarySpend > 200
    ? 'amber'
    : 'calm'

  return (
    <Card className="p-5 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-display font-[800] text-sm sm:text-base text-ink">
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
            variant={tone === 'expensive' ? 'danger' : tone === 'amber' ? 'warning' : 'safe'}
          >
            {tone === 'expensive' ? 'Burn Day' : tone === 'amber' ? 'Above Target' : 'Within Budget'}
          </Badge>
        </div>

        {/* Spend vs Allowance Comparison Bar */}
        <div className="mb-4 p-3 rounded-[12px] bg-surface border border-border">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-ink-muted">Discretionary Spend vs ₹{heroData.dailyAllowance} Target</span>
            <span className="font-mono font-bold text-ink">{formatCurrency(selectedDay.discretionarySpend)}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-border overflow-hidden">
            <div
              className={`h-full transition-all ${
                selectedDay.discretionarySpend > 300
                  ? 'bg-danger'
                  : selectedDay.discretionarySpend > heroData.dailyAllowance
                  ? 'bg-warning'
                  : 'bg-safe'
              }`}
              style={{
                width: `${Math.min(100, (selectedDay.discretionarySpend / (heroData.dailyAllowance || 200)) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Section 1: Bills Due on this Day (Fills empty area) */}
        <div className="mb-4 p-3 rounded-[12px] bg-surface-raised border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-display font-bold text-ink flex items-center gap-1.5">
              <Receipt size={13} className="text-brand" /> Committed Bills on this Day
            </span>
            <span className="font-mono text-[11px] text-ink-muted">
              {dueBills.length} {dueBills.length === 1 ? 'bill' : 'bills'}
            </span>
          </div>
          {dueBills.length === 0 ? (
            <p className="text-[11px] text-ink-muted font-body">
              No fixed bills due on this date. Full daily allowance available for living costs.
            </p>
          ) : (
            <div className="space-y-1.5">
              {dueBills.map((b) => (
                <div key={b.id} className="flex items-center justify-between text-xs py-1 border-t border-border/50 first:border-0">
                  <div className="flex items-center gap-1.5">
                    {b.status === 'paid' ? (
                      <CheckCircle2 size={13} className="text-safe" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-warning" />
                    )}
                    <span className="font-semibold text-ink">{b.name}</span>
                    <span className="text-[10px] text-ink-muted capitalize">({b.status})</span>
                  </div>
                  <span className="font-mono font-bold text-ink">{formatCurrency(b.amount)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Logged Transactions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-display font-bold text-ink">
              Logged Transactions ({selectedDay.transactions.length})
            </span>
            <span className="font-mono text-xs font-bold text-ink">
              Total: {formatCurrency(selectedDay.totalSpend)}
            </span>
          </div>

          {selectedDay.transactions.length === 0 ? (
            <div className="p-4 text-center text-xs text-ink-muted border border-dashed border-border rounded-[12px]">
              No transactions recorded on this day.
            </div>
          ) : (
            <div className="divide-y divide-border max-h-[160px] overflow-y-auto pr-1">
              {selectedDay.transactions.map((tx, idx) => {
                const isHighItem = tx.amount > purchaseThreshold

                return (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-ink">{tx.description}</span>
                        {isHighItem && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-danger-bg text-danger border border-danger/30">
                            Expensive
                          </span>
                        )}
                        {tx.isFixedBill && (
                          <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-surface text-ink-muted border border-border">
                            Fixed Bill
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-ink-muted">{tx.category}</p>
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

      {/* Action Footer: Add Expense for this Day + Return to Today */}
      <div className="pt-3 border-t border-border mt-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="primary"
          onClick={() => onAddExpenseForDay(selectedDay.dateStr)}
          className="w-full gap-1.5 text-xs font-semibold"
        >
          <Plus size={14} /> Add expense for {selectedDay.dateStr}
        </Button>

        <div className="flex items-center justify-between text-[11px] text-ink-muted">
          <span>Target allowance: ₹200/day</span>
          {!selectedDay.isToday && (
            <button
              type="button"
              onClick={onResetToday}
              className="font-semibold text-brand hover:underline cursor-pointer"
            >
              ← Back to Today (Oct 10, Day 8)
            </button>
          )}
        </div>
      </div>
    </Card>
  )
}
