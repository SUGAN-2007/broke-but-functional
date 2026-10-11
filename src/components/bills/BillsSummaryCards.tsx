import { Card, CardLabel } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import type { Bill } from '@/types/finance'

interface BillsSummaryCardsProps {
  totalCommitted: number
  totalUnpaid: number
  totalPaid: number
  billsCount: number
  unpaidCount: number
  paidCount: number
  paidBills: Bill[]
}

export function BillsSummaryCards({
  totalCommitted,
  totalUnpaid,
  billsCount,
  unpaidCount,
  paidCount,
  paidBills,
}: BillsSummaryCardsProps) {
  const unpaidText = `${unpaidCount} ${unpaidCount === 1 ? 'bill' : 'bills'} pending payment`
  const paidText = `${paidCount} ${paidCount === 1 ? 'bill' : 'bills'} cleared this month`

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="p-4">
        <CardLabel>Total Committed</CardLabel>
        <p className="font-mono font-[700] text-2xl text-ink mt-1">
          {formatCurrency(totalCommitted)}
        </p>
        <p className="font-body text-xs text-ink-muted mt-0.5">
          Across {billsCount} total obligations
        </p>
      </Card>

      <Card className="p-4 border-warning/50">
        <CardLabel>Unpaid</CardLabel>
        <p className="font-mono font-[700] text-2xl text-warning mt-1">
          {formatCurrency(totalUnpaid)}
        </p>
        <p className="font-body text-xs text-ink-muted mt-0.5">{unpaidText}</p>
      </Card>

      <Card className="p-4">
        <CardLabel>Settled So Far</CardLabel>
        <p className="font-mono font-[700] text-2xl text-safe mt-1">
          {formatCurrency(paidBills.reduce((s, b) => s + b.amount, 0))}
        </p>
        <p className="font-body text-xs text-ink-muted mt-0.5">{paidText}</p>
      </Card>
    </div>
  )
}
