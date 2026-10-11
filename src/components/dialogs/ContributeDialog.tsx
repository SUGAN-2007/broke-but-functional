import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Goal } from '@/types/finance'

export interface ContributeDialogProps {
  goal: Goal | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContributeDialog({ goal, open, onOpenChange }: ContributeDialogProps) {
  const [amount, setAmount] = useState('200')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange(false)
  }

  if (!goal) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contribute to {goal.name}</DialogTitle>
          <DialogDescription>
            Lock savings directly from your balance into this reserve pot.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Contribution Amount (₹)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="10"
            required
          />

          <div className="flex gap-2">
            {[100, 200, 500].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setAmount(v.toString())}
                className="flex-1 py-1 px-2 rounded-[8px] bg-surface-raised border border-border text-xs font-mono font-bold text-ink hover:border-brand transition-colors cursor-pointer"
              >
                +₹{v}
              </button>
            ))}
          </div>

          <div className="p-3 rounded-[12px] bg-warning-bg/40 border border-warning/30 text-xs text-ink-muted">
            <span className="font-semibold text-warning">Rule Check: </span>
            Contributions are locked until Oct 28 (Day 26) clearance to safeguard emergency runway.
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" className="flex-1">
              Confirm Contribution
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ContributeDialog
