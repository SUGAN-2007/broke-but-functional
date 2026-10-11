import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Home,
  Film,
  Zap,
  Smartphone,
  Wifi,
  Dumbbell,
  Plus,
  Check,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { bills as initialBills } from '@/data/mock'
import { formatCurrency, getDayForDate } from '@/lib/utils'
import type { Bill } from '@/data/mock'
import { fadeUp } from '@/lib/motion'
import { AddBillDialog } from '@/components/dialogs/FinanceDialogs'

const categoryIcons = {
  Home,
  Film,
  Zap,
  Smartphone,
  Wifi,
  Dumbbell,
}

/* ── Graduated due status badge ──────────────────────── */
function DueStatusBadge({ bill }: { bill: Bill }) {
  if (bill.status === 'paid') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-safe-bg text-safe border border-safe/30">
        <CheckCircle2 size={11} aria-hidden="true" />
        Paid
      </span>
    )
  }

  // Graduated:
  // red: due in 1-2 days or overdue
  // amber: 3-7 days
  // neutral: 8+ days
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

function BillRow({
  bill,
  onMarkPaid,
}: {
  bill: Bill
  onMarkPaid: (id: string) => void
}) {
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
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-surface border border-border text-[10px] font-mono font-[600] uppercase text-ink-muted">
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
          <Button
            size="sm"
            variant="outline"
            onClick={() => onMarkPaid(bill.id)}
            className="hidden sm:inline-flex gap-1 text-xs py-1 px-2.5"
            title="Mark this bill as paid"
          >
            <Check size={12} /> Paid
          </Button>
        )}
      </div>
    </div>
  )
}

export default function Commitments() {
  const [billList, setBillList] = useState<Bill[]>(initialBills)
  const [addBillOpen, setAddBillOpen] = useState(false)

  const handleMarkPaid = (id: string) => {
    setBillList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'paid' as const } : b))
    )
  }

  const unpaidBills = billList.filter((b) => b.status !== 'paid')
  const totalUnpaid = unpaidBills.reduce((sum, b) => sum + b.amount, 0)
  const totalCommitted = billList.reduce((sum, b) => sum + b.amount, 0)
  const paidBills = billList.filter((b) => b.status === 'paid')

  // Group unpaid by graduated urgency
  const urgent = unpaidBills.filter((b) => b.dueInDays <= 2)
  const soon = unpaidBills.filter((b) => b.dueInDays > 2 && b.dueInDays <= 7)
  const later = unpaidBills.filter((b) => b.dueInDays > 7)

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      className="flex flex-col gap-6"
    >
      {/* Header with Add Bill CTA */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
            Committed Bills & Dues
          </h1>
          <p className="font-body text-xs sm:text-sm text-ink-muted mt-1">
            Committed life dues that must be protected before any discretionary spending.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setAddBillOpen(true)}
          className="self-start sm:self-auto gap-1.5 text-xs font-semibold"
        >
          <Plus size={14} /> Add Bill
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4">
            <CardLabel>Total Committed</CardLabel>
            <p className="font-mono font-[700] text-2xl text-ink mt-1">
              {formatCurrency(totalCommitted)}
            </p>
            <p className="font-body text-xs text-ink-muted mt-0.5">Across {billList.length} total obligations</p>
          </Card>

          <Card className="p-4 border-warning/50">
            <CardLabel>Unpaid (Dashboard Total)</CardLabel>
            <p className="font-mono font-[700] text-2xl text-warning mt-1">
              {formatCurrency(totalUnpaid)}
            </p>
            <p className="font-body text-xs text-ink-muted mt-0.5">{unpaidBills.length} dues pending payment</p>
          </Card>

          <Card className="p-4">
            <CardLabel>Settled So Far</CardLabel>
            <p className="font-mono font-[700] text-2xl text-safe mt-1">
              {formatCurrency(paidBills.reduce((s, b) => s + b.amount, 0))}
            </p>
            <p className="font-body text-xs text-ink-muted mt-0.5">{paidBills.length} bills cleared this month</p>
          </Card>
        </div>
      </motion.div>

      {/* Urgent Dues (1-2 days) */}
      {urgent.length > 0 && (
        <motion.div variants={fadeUp}>
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
                <BillRow key={b.id} bill={b} onMarkPaid={handleMarkPaid} />
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Due in 3-7 Days */}
      {soon.length > 0 && (
        <motion.div variants={fadeUp}>
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
                <BillRow key={b.id} bill={b} onMarkPaid={handleMarkPaid} />
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Later this month (8+ days) */}
      {later.length > 0 && (
        <motion.div variants={fadeUp}>
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
                <BillRow key={b.id} bill={b} onMarkPaid={handleMarkPaid} />
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Paid section */}
      <motion.div variants={fadeUp}>
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
              <BillRow key={b.id} bill={b} onMarkPaid={handleMarkPaid} />
            ))}
          </div>
        </Card>
      </motion.div>

      <AddBillDialog open={addBillOpen} onOpenChange={setAddBillOpen} />
    </motion.div>
  )
}
