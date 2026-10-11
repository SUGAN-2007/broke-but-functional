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
import { AlertCircle } from 'lucide-react'

export interface AddIncomeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddIncomeDialog({ open, onOpenChange }: AddIncomeDialogProps) {
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
                  <AlertCircle size={11} /> Must be greater than ₹0
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5 font-body">
                Received Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-10 px-3 rounded-[12px] bg-surface border border-border text-ink text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>

          <div className="p-3 rounded-[12px] bg-safe-bg/40 border border-safe/30 text-xs text-ink-muted">
            <span className="font-semibold text-safe">Runway Impact: </span>
            Adding ₹{amount || 0} will recalculate daily allowance across remaining days.
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" className="flex-1">
              Add to Balance
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

export default AddIncomeDialog
