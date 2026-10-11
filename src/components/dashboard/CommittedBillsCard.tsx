import { Link } from 'react-router-dom'
import { Card, CardLabel, CardValue } from '@/components/ui/card'
import { AlertTriangle, Clock } from 'lucide-react'
import { heroData, bills } from '@/data'
import { formatCurrency, getDateForDay } from '@/lib/format'

export function CommittedBillsCard() {
  // Next 3 upcoming unpaid bills
  const nextBills = bills
    .filter((b) => b.status !== 'paid')
    .slice(0, 3)

  return (
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

        {/* Next 3 bills with dates filling the middle */}
        <div className="mt-3.5 pt-3 border-t border-border/80 space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-muted block">
            Next 3 Upcoming
          </span>
          <div className="space-y-1.5">
            {nextBills.map((b) => (
              <div key={b.id} className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-1.5 truncate">
                  <Clock size={11} className="text-warning shrink-0" />
                  <span className="font-semibold text-ink truncate">{b.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                  <span className="text-ink-muted">{b.dueDate}</span>
                  <span className="font-bold text-ink">{formatCurrency(b.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-danger font-semibold flex items-center gap-1">
            <AlertTriangle size={12} /> 2 bills due soon
          </span>
          <span className="text-ink-muted font-mono">5 bills left</span>
        </div>
        <div className="flex items-center gap-1 w-full" role="progressbar" aria-label="Month days progress">
          {Array.from({ length: heroData.totalDays }, (_, i) => {
            const d = i + 1
            const isPast = d < heroData.day
            const isCurrent = d === heroData.day
            const isDanger = d >= heroData.dangerDay

            return (
              <div
                key={d}
                title={`${getDateForDay(d)} (Day ${d})${isCurrent ? ' (Today)' : ''}${isDanger ? ' (Danger zone)' : ''}`}
                className={[
                  'flex-1 h-2 rounded-[2px] transition-all',
                  isCurrent
                    ? 'bg-accent ring-1 ring-accent/30'
                    : isPast
                    ? 'bg-brand'
                    : isDanger
                    ? 'bg-danger/30 border border-danger/40'
                    : 'bg-border',
                ].join(' ')}
              />
            )
          })}
        </div>
      </div>
    </Card>
  )
}
