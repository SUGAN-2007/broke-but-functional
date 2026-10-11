import {
  Home,
  Film,
  Zap,
  Smartphone,
  Wifi,
  Dumbbell,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency, getDayForDate } from '@/lib/format'
import type { Bill } from '@/types/finance'
import { DueStatusBadge } from './DueStatusBadge'

const categoryIcons: Record<string, React.ElementType> = {
  Home,
  Film,
  Zap,
  Smartphone,
  Wifi,
  Dumbbell,
}

interface BillRowProps {
  bill: Bill
  onMarkPaid: (id: string) => void
}

export function BillRow({ bill, onMarkPaid }: BillRowProps) {
  const IconComponent = categoryIcons[bill.icon] || Home

  return (
    <div className="flex items-center justify-between gap-3 py-3.5 first:pt-1 last:pb-1">
      {/* Icon + details */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div
          className={[
            'w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border',
            bill.status === 'paid'
              ? 'bg-safe-bg border-safe/30 text-safe'
              : bill.dueInDays <= 2
              ? 'bg-danger-bg border-danger/30 text-danger'
              : bill.dueInDays <= 7
              ? 'bg-warning-bg border-warning/30 text-warning'
              : 'bg-surface border-border text-ink-muted',
          ].join(' ')}
          aria-hidden="true"
        >
          <IconComponent size={18} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-display font-[600] text-sm text-ink truncate">{bill.name}</p>
            {bill.autopay && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-surface border border-border text-[10px] font-mono font-[600] uppercase text-ink-muted">
                <Zap size={9} aria-hidden="true" />
                Auto
              </span>
            )}
          </div>
          <p className="text-xs text-ink-muted font-body mt-0.5">
            {bill.category} • Due: {bill.dueDate}{getDayForDate(bill.dueDate) ? ` (Day ${getDayForDate(bill.dueDate)})` : ''}
          </p>
        </div>
      </div>

      {/* Amount + status + action */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right">
          <span className="font-mono font-[700] text-sm text-ink block">
            {formatCurrency(bill.amount)}
          </span>
          <div className="mt-1">
            <DueStatusBadge bill={bill} />
          </div>
        </div>

        {bill.status !== 'paid' && (
          bill.autopay ? (
            <span className="hidden sm:inline-flex text-xs font-medium text-ink-muted bg-surface/80 border border-border px-2 py-1 rounded-[8px]">
              Auto-pay on {bill.dueDate}
            </span>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onMarkPaid(bill.id)}
              className="hidden sm:inline-flex gap-1 text-xs py-1 px-2.5"
              title="Mark this bill as paid"
            >
              <Check size={12} /> Mark paid
            </Button>
          )
        )}
      </div>
    </div>
  )
}
