import { motion } from 'framer-motion'
import { CalendarDays, Zap, RotateCcw } from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { Stamp } from '@/components/ui/badge'
import { bills } from '@/data/mock'
import { formatCurrency } from '@/lib/utils'
import type { Bill } from '@/data/mock'
import { fadeUp } from '@/lib/motion'

function BillRow({ bill }: { bill: Bill }) {
  const dueLabel = bill.status === 'paid'
    ? 'Paid'
    : bill.dueInDays === 0
    ? 'Due today'
    : bill.dueInDays < 0
    ? `${Math.abs(bill.dueInDays)}d overdue`
    : `Due in ${bill.dueInDays}d`

  return (
    <div className="flex items-center gap-4 py-4">
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-[10px] bg-surface-raised flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <CalendarDays size={18} className="text-ink-muted" />
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-body font-[600] text-[0.9375rem] text-ink truncate">{bill.name}</p>
          {bill.autopay && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-surface-raised border border-border text-[0.625rem] font-mono font-[600] uppercase tracking-wider text-ink-muted">
              <Zap size={8} aria-hidden="true" />
              Auto
            </span>
          )}
        </div>
        <p className="font-body text-[0.8125rem] text-ink-muted mt-0.5">
          {bill.category} · {dueLabel}
        </p>
      </div>

      {/* Amount + stamp */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="font-mono font-[700] text-[1rem] text-ink">
          {formatCurrency(bill.amount)}
        </span>
        <Stamp variant={bill.status} />
      </div>
    </div>
  )
}

export default function Commitments() {
  const totalDue = bills
    .filter(b => b.status !== 'paid')
    .reduce((sum, b) => sum + b.amount, 0)

  const overdue = bills.filter(b => b.status === 'overdue')
  const upcoming = bills.filter(b => b.status === 'due').sort((a, b) => a.dueInDays - b.dueInDays)
  const paid = bills.filter(b => b.status === 'paid')

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      className="flex flex-col gap-[var(--section-gap)]"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="font-display font-[700] text-[clamp(1.75rem,3vw+1rem,2.75rem)] text-ink tracking-[-0.02em]">
          Bills & Subscriptions
        </h1>
        <p className="font-body text-ink-muted mt-1">
          The unavoidable life tax.
        </p>
      </motion.div>

      {/* Monthly total card */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-3 gap-[var(--grid-gap)]">
          <Card className="col-span-3 md:col-span-1">
            <CardLabel>Total committed</CardLabel>
            <p className="font-mono font-[700] text-[2rem] text-ink tracking-[-0.02em] mt-2">
              {formatCurrency(bills.reduce((s, b) => s + b.amount, 0))}
            </p>
            <p className="font-body text-[0.8125rem] text-ink-muted mt-1">across {bills.length} bills</p>
          </Card>
          <Card className="col-span-3 md:col-span-1">
            <CardLabel>Still to pay</CardLabel>
            <p className="font-mono font-[700] text-[2rem] text-warning tracking-[-0.02em] mt-2">
              {formatCurrency(totalDue)}
            </p>
            <p className="font-body text-[0.8125rem] text-ink-muted mt-1">{upcoming.length + overdue.length} bills pending</p>
          </Card>
          <Card className="col-span-3 md:col-span-1">
            <CardLabel>Autopay total</CardLabel>
            <p className="font-mono font-[700] text-[2rem] text-safe tracking-[-0.02em] mt-2">
              {formatCurrency(bills.filter(b => b.autopay).reduce((s, b) => s + b.amount, 0))}
            </p>
            <p className="font-body text-[0.8125rem] text-ink-muted mt-1">handled automatically</p>
          </Card>
        </div>
      </motion.div>

      {/* Overdue section */}
      {overdue.length > 0 && (
        <motion.div variants={fadeUp}>
          <Card className="border-danger">
            <div className="flex items-center gap-2 mb-3">
              <RotateCcw size={16} className="text-danger" aria-hidden="true" />
              <h2 className="font-display font-[600] text-[1rem] text-danger">Overdue</h2>
            </div>
            <div className="flex flex-col divide-y divide-border">
              {overdue.map(bill => <BillRow key={bill.id} bill={bill} />)}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Upcoming section */}
      <motion.div variants={fadeUp}>
        <Card>
          <h2 className="font-display font-[600] text-[1rem] text-ink mb-1">Upcoming</h2>
          <p className="font-body text-[0.8125rem] text-ink-muted mb-4">Sorted by due date</p>
          <div className="flex flex-col divide-y divide-border">
            {upcoming.map(bill => <BillRow key={bill.id} bill={bill} />)}
          </div>
        </Card>
      </motion.div>

      {/* Paid section */}
      <motion.div variants={fadeUp}>
        <Card>
          <h2 className="font-display font-[600] text-[1rem] text-ink mb-4">
            Paid this month
            <span className="ml-2 font-body font-[400] text-[0.8125rem] text-ink-muted">({paid.length})</span>
          </h2>
          <div className="flex flex-col divide-y divide-border">
            {paid.map(bill => <BillRow key={bill.id} bill={bill} />)}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
