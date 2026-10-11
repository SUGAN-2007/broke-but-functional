import { CheckCircle2, AlertTriangle, Clock } from 'lucide-react'
import type { Bill } from '@/types/finance'

export function DueStatusBadge({ bill }: { bill: Bill }) {
  if (bill.status === 'paid') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-safe-bg text-safe border border-safe/30">
        <CheckCircle2 size={11} aria-hidden="true" />
        Paid
      </span>
    )
  }

  if (bill.dueInDays <= 2) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-danger-bg text-danger border border-danger/30">
        <AlertTriangle size={11} aria-hidden="true" />
        {bill.dueInDays <= 0 ? 'Due Today' : `Due in ${bill.dueInDays}d`}
      </span>
    )
  }

  if (bill.dueInDays <= 7) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-warning-bg text-warning border border-warning/30">
        <Clock size={11} aria-hidden="true" />
        Due in {bill.dueInDays}d
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface text-ink-muted border border-border">
      Due in {bill.dueInDays}d
    </span>
  )
}
