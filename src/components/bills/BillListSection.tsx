import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import type { Bill } from '@/types/finance'
import { BillRow } from './BillRow'

interface BillListSectionProps {
  urgent: Bill[]
  soon: Bill[]
  later: Bill[]
  paidBills: Bill[]
  onMarkPaid: (id: string) => void
}

export function BillListSection({
  urgent,
  soon,
  later,
  paidBills,
  onMarkPaid,
}: BillListSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Urgent Dues (1-2 days) */}
      {urgent.length > 0 && (
        <Card className="p-5 border-danger/40 bg-danger-bg/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-danger" />
              <h2 className="font-display font-[700] text-sm text-danger">
                Urgent Dues (Due in 1–2 Days)
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-danger">
              {formatCurrency(urgent.reduce((s, b) => s + b.amount, 0))}
            </span>
          </div>
          <div className="divide-y divide-border/60">
            {urgent.map((b) => (
              <BillRow key={b.id} bill={b} onMarkPaid={onMarkPaid} />
            ))}
          </div>
        </Card>
      )}

      {/* Due in 3-7 Days */}
      {soon.length > 0 && (
        <Card className="p-5 border-warning/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-warning" />
              <h2 className="font-display font-[700] text-sm text-ink">
                Upcoming Soon (3–7 Days)
              </h2>
            </div>
            <span className="font-mono text-xs font-semibold text-warning">
              {formatCurrency(soon.reduce((s, b) => s + b.amount, 0))}
            </span>
          </div>
          <div className="divide-y divide-border">
            {soon.map((b) => (
              <BillRow key={b.id} bill={b} onMarkPaid={onMarkPaid} />
            ))}
          </div>
        </Card>
      )}

      {/* Later this month (8+ days) */}
      {later.length > 0 && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-[700] text-sm text-ink">
              Later This Month (8+ Days)
            </h2>
            <span className="font-mono text-xs text-ink-muted">
              {formatCurrency(later.reduce((s, b) => s + b.amount, 0))}
            </span>
          </div>
          <div className="divide-y divide-border">
            {later.map((b) => (
              <BillRow key={b.id} bill={b} onMarkPaid={onMarkPaid} />
            ))}
          </div>
        </Card>
      )}

      {/* Paid section */}
      <Card className="p-5 opacity-90">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-safe" />
            <h2 className="font-display font-[700] text-sm text-ink">
              Cleared Bills ({paidBills.length})
            </h2>
          </div>
          <span className="font-mono text-xs text-safe font-semibold">
            {formatCurrency(paidBills.reduce((s, b) => s + b.amount, 0))}
          </span>
        </div>
        <div className="divide-y divide-border">
          {paidBills.map((b) => (
            <BillRow key={b.id} bill={b} onMarkPaid={onMarkPaid} />
          ))}
        </div>
      </Card>
    </div>
  )
}
