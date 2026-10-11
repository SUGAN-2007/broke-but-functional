import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input, Select } from '@/components/ui/input'
import { heroData } from '@/data/mock'
import { AlertCircle, AlertTriangle, RotateCcw } from 'lucide-react'

/* ── ADD INCOME DIALOG ──────────────────────────────── */
export function AddIncomeDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [source, setSource] = useState('Parents / Pocket money top-up')
  const [amount, setAmount] = useState('2000')
  const [date, setDate] = useState('2026-10-10')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Income / Top-up</DialogTitle>
          <DialogDescription>
            Record pocket money, freelance stipend, or gifts to expand your survival runway.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Income Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g. Campus stipend, Birthday gift"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                label="Amount (₹)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                required
              />
              {Number(amount) <= 0 && (
                <p className="text-[11px] text-danger mt-1 flex items-center gap-1">
                  <AlertCircle size={10} /> Amount must be greater than ₹0
                </p>
              )}
            </div>
            <div>
              <Input
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="p-3 rounded-[12px] bg-safe-bg/50 border border-safe/30 text-xs text-ink-muted">
            <span className="font-semibold text-safe">Runway Impact: </span>
            Adding ₹{amount || 0} extends your daily allowance by +₹{Math.round((Number(amount) || 0) / 22)}/day.
          </div>

          <div className="flex gap-2.5 pt-2">
            <Button type="submit" variant="primary" className="flex-1">
              Confirm Income
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* ── ADD BILL DIALOG ────────────────────────────────── */
export function AddBillDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [billName, setBillName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Utilities')
  const [dueDate, setDueDate] = useState('2026-10-18')
  const [autopay, setAutopay] = useState(false)
  const [touched, setTouched] = useState(false)

  const isAmountOverBudget = Number(amount) > heroData.balance

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Committed Bill</DialogTitle>
          <DialogDescription>
            Recurring obligations reduce your daily allowance upfront so you never default.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Input
              label="Bill Name"
              placeholder="e.g. Hosteller WiFi share, Mess dues"
              value={billName}
              onChange={(e) => setBillName(e.target.value)}
              onBlur={() => setTouched(true)}
              required
            />
            {touched && !billName && (
              <p className="text-[11px] text-danger mt-1 flex items-center gap-1">
                <AlertCircle size={10} /> Bill name is required
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                label="Amount (₹)"
                type="number"
                placeholder="450"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                required
              />
              {isAmountOverBudget && (
                <p className="text-[11px] text-danger mt-1 flex items-center gap-1">
                  <AlertTriangle size={10} /> Over balance limit (₹{heroData.balance})
                </p>
              )}
            </div>
            <div>
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  { value: 'Rent', label: 'Rent' },
                  { value: 'Utilities', label: 'Utilities (Electricity/Water)' },
                  { value: 'Mobile', label: 'Mobile / Phone' },
                  { value: 'Entertainment', label: 'Streaming / Entertainment' },
                  { value: 'Health', label: 'Gym / Health' },
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 items-center">
            <Input
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
            <label className="flex items-center gap-2 text-xs font-medium text-ink cursor-pointer pt-4">
              <input
                type="checkbox"
                checked={autopay}
                onChange={(e) => setAutopay(e.target.checked)}
                className="w-4 h-4 rounded text-brand focus:ring-brand"
              />
              <span>Enabled on Autopay</span>
            </label>
          </div>

          <div className="flex gap-2.5 pt-2">
            <Button type="submit" variant="primary" className="flex-1" disabled={isAmountOverBudget}>
              Save Bill
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* ── ADD GOAL DIALOG ────────────────────────────────── */
export function AddGoalDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [goalName, setGoalName] = useState('')
  const [target, setTarget] = useState('')
  const [deadline, setDeadline] = useState('2026-11-01')
  const [category, setCategory] = useState('Electronics')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Savings Goal</DialogTitle>
          <DialogDescription>
            Micro-targets that keep you disciplined during the 30-day challenge.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Goal Title"
            placeholder="e.g. Semester Exam Books, Diwali Train"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                label="Target Amount (₹)"
                type="number"
                placeholder="2000"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                min="100"
                required
              />
            </div>
            <div>
              <Select
                label="Category / Icon"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  { value: 'Electronics', label: 'Gadget / Laptop' },
                  { value: 'Emergency', label: 'Emergency Cushion' },
                  { value: 'Travel', label: 'Weekend Trip' },
                  { value: 'Education', label: 'Course Fee' },
                ]}
              />
            </div>
          </div>

          <Input
            label="Target Date"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />

          <div className="flex gap-2.5 pt-2">
            <Button type="submit" variant="primary" className="flex-1">
              Create Goal
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* ── CONTRIBUTE TO GOAL DIALOG ───────────────────────── */
export function ContributeGoalDialog({
  open,
  onOpenChange,
  goalName = 'Headphones',
  saved = 800,
  target = 2500,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  goalName?: string
  saved?: number
  target?: number
}) {
  const [contribution, setContribution] = useState('200')
  const remainingNeeded = target - saved
  const isOverRemaining = Number(contribution) > remainingNeeded
  const isOverBalance = Number(contribution) > heroData.balance

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contribute to {goalName}</DialogTitle>
          <DialogDescription>
            Allocate surplus from liquid balance into this locked goal.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="p-3 rounded-[12px] bg-surface border border-border flex items-center justify-between text-xs">
            <div>
              <span className="text-ink-muted">Currently Saved: </span>
              <span className="font-mono font-bold text-ink">₹{saved}</span>
            </div>
            <div>
              <span className="text-ink-muted">Remaining: </span>
              <span className="font-mono font-bold text-brand">₹{remainingNeeded}</span>
            </div>
          </div>

          <div>
            <Input
              label="Contribution Amount (₹)"
              type="number"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              min="10"
              required
            />
            {isOverBalance && (
              <p className="text-[11px] text-danger mt-1 flex items-center gap-1">
                <AlertTriangle size={10} /> Exceeds current liquid balance (₹{heroData.balance})
              </p>
            )}
            {isOverRemaining && (
              <p className="text-[11px] text-warning mt-1 flex items-center gap-1">
                <AlertCircle size={10} /> Amount exceeds needed target (₹{remainingNeeded})
              </p>
            )}
          </div>

          <div className="flex gap-2.5 pt-2">
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isOverBalance || Number(contribution) <= 0}
            >
              Transfer ₹{contribution || 0}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* ── RESOLVE EVENT DIALOG ───────────────────────────── */
export function ResolveEventDialog({
  open,
  onOpenChange,
  eventTitle = 'Phone screen cracked',
  amount = 1500,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventTitle?: string
  amount?: number
}) {
  const [selectedAction, setSelectedAction] = useState<'pay' | 'defer' | 'skip'>('pay')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resolve: {eventTitle}</DialogTitle>
          <DialogDescription>
            Choose how to handle this unexpected incident and witness immediate balance adjustments.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {[
            {
              id: 'pay',
              label: `Pay now (₹${amount})`,
              desc: 'Immediate fix. Daily allowance drops to ₹131.',
              badge: 'Safe repair',
            },
            {
              id: 'defer',
              label: 'Defer 2 weeks (₹0 now)',
              desc: 'Use screen tape. Protect cash until Oct 24 (Day 22).',
              badge: 'Temporary',
            },
            {
              id: 'skip',
              label: 'Borrow backup phone (₹0)',
              desc: 'Use roommate spare phone. Zero financial cost.',
              badge: 'Frugal win',
            },
          ].map((opt) => (
            <label
              key={opt.id}
              onClick={() => setSelectedAction(opt.id as any)}
              className={[
                'flex items-start gap-3 p-3.5 rounded-[14px] border cursor-pointer transition-all',
                selectedAction === opt.id
                  ? 'border-brand bg-brand/5 shadow-xs'
                  : 'border-border bg-surface hover:bg-surface-raised',
              ].join(' ')}
            >
              <input
                type="radio"
                name="eventAction"
                checked={selectedAction === opt.id}
                onChange={() => setSelectedAction(opt.id as any)}
                className="mt-1 text-brand"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-xs text-ink">{opt.label}</span>
                  <span className="text-[10px] font-semibold text-brand px-1.5 py-0.2 rounded-full bg-brand/10">
                    {opt.badge}
                  </span>
                </div>
                <p className="text-[11px] text-ink-muted mt-0.5">{opt.desc}</p>
              </div>
            </label>
          ))}

          <div className="flex gap-2.5 pt-2">
            <Button type="submit" variant="primary" className="flex-1">
              Confirm Resolution
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* ── CONFIRM RESET DIALOG ───────────────────────────── */
export function ConfirmResetDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm?: () => void
}) {
  const [confirmText, setConfirmText] = useState('')

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()
    if (confirmText.toLowerCase() === 'reset') {
      onConfirm?.()
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-danger flex items-center gap-2">
            <RotateCcw size={18} /> Reset 30-Day Month?
          </DialogTitle>
          <DialogDescription>
            This action restores all budgets, transactions, and simulation records back to Oct 3 (Day 1).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <div className="p-3.5 rounded-[12px] bg-danger-bg/50 border border-danger/30 text-xs text-ink-muted">
            <p className="font-semibold text-danger mb-1">Warning: Irreversible action</p>
            All custom simulation scenarios, connectors cache, and logged expenses will be reset to default mock state.
          </div>

          <div>
            <Input
              label='Type "reset" below to confirm'
              placeholder="reset"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2.5 pt-2">
            <Button
              type="submit"
              variant="danger"
              className="flex-1"
              disabled={confirmText.toLowerCase() !== 'reset'}
            >
              Yes, Reset Everything
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
